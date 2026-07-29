#!/usr/bin/env node

import { createReadStream } from "node:fs";
import {
  copyFile,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  rm,
  stat,
  writeFile,
} from "node:fs/promises";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { dirname, extname, join, relative, resolve, sep } from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { chromium } from "playwright";
import pptxgen from "pptxgenjs";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectDir = resolve(scriptDir, "..");

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webmanifest": "application/manifest+json",
  ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8",
};

function printHelp() {
  console.log(`
Create comment-friendly PDF and PowerPoint snapshots of the Pelagia website.

Usage:
  npm run export:review -- [options]

Options:
  --format <both|pdf|pptx>  Export format (default: both)
  --layout <paged|full-page>
                             Split long pages or fit each route on one page
                             (default: paged)
  --output-dir <path>       Destination directory (default: exports)
  --name <filename-stem>    Output filename stem (default depends on layout)
  --pages <routes>          Comma-separated routes, for example /,/approach/,/work/
  --viewport <WxH>          Capture size in pixels (default: 1600x900)
  --overlap <pixels>        Paged-layout overlap between captures (default: 96)
  --theme <light|dark>      Browser color scheme (default: light)
  --published-only          Exclude Hugo draft and future-dated content
  --keep-captures           Keep the PNG captures beside the exports
  --help                    Show this help
`);
}

function parseArgs(argv) {
  const options = {
    format: "both",
    layout: "paged",
    outputDir: resolve(projectDir, "exports"),
    name: null,
    pages: null,
    viewport: { width: 1600, height: 900 },
    overlap: 96,
    theme: "light",
    includeDrafts: true,
    keepCaptures: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const value = argv[index + 1];

    if (arg === "--help" || arg === "-h") {
      printHelp();
      process.exit(0);
    } else if (arg === "--format") {
      options.format = value;
      index += 1;
    } else if (arg === "--layout") {
      options.layout = value;
      index += 1;
    } else if (arg === "--output-dir") {
      options.outputDir = resolve(projectDir, value);
      index += 1;
    } else if (arg === "--name") {
      options.name = value;
      index += 1;
    } else if (arg === "--pages") {
      options.pages = value
        .split(",")
        .map(normalizeRoute)
        .filter(Boolean);
      index += 1;
    } else if (arg === "--viewport") {
      const match = /^(\d+)x(\d+)$/.exec(value ?? "");
      if (!match) throw new Error("--viewport must look like 1600x900");
      options.viewport = { width: Number(match[1]), height: Number(match[2]) };
      index += 1;
    } else if (arg === "--overlap") {
      options.overlap = Number(value);
      index += 1;
    } else if (arg === "--theme") {
      options.theme = value;
      index += 1;
    } else if (arg === "--published-only") {
      options.includeDrafts = false;
    } else if (arg === "--keep-captures") {
      options.keepCaptures = true;
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }

  if (!["both", "pdf", "pptx"].includes(options.format)) {
    throw new Error("--format must be both, pdf, or pptx");
  }
  if (!["paged", "full-page"].includes(options.layout)) {
    throw new Error("--layout must be paged or full-page");
  }
  if (!["light", "dark"].includes(options.theme)) {
    throw new Error("--theme must be light or dark");
  }
  if (
    !Number.isFinite(options.overlap) ||
    options.overlap < 0 ||
    options.overlap >= options.viewport.height
  ) {
    throw new Error("--overlap must be between 0 and one pixel less than the viewport height");
  }
  if (options.viewport.width < 640 || options.viewport.height < 480) {
    throw new Error("--viewport must be at least 640x480");
  }
  if (!options.name) {
    options.name =
      options.layout === "full-page"
        ? "pelagia-studio-full-page-review"
        : "pelagia-studio-review";
  }

  return options;
}

function normalizeRoute(route) {
  if (!route) return null;
  const path = route.startsWith("/") ? route : `/${route}`;
  if (path === "/") return path;
  return path.endsWith("/") ? path : `${path}/`;
}

function run(command, args, options = {}) {
  return new Promise((resolveRun, rejectRun) => {
    const child = spawn(command, args, {
      cwd: projectDir,
      stdio: "inherit",
      ...options,
    });
    child.on("error", rejectRun);
    child.on("exit", (code) => {
      if (code === 0) resolveRun();
      else rejectRun(new Error(`${command} exited with status ${code}`));
    });
  });
}

async function listHtmlFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const absolutePath = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await listHtmlFiles(absolutePath)));
    else if (entry.isFile() && entry.name.endsWith(".html")) files.push(absolutePath);
  }
  return files;
}

function fileToRoute(file, siteDir) {
  const localPath = relative(siteDir, file).split(sep).join("/");
  if (localPath === "index.html") return "/";
  if (localPath.endsWith("/index.html")) {
    return `/${localPath.slice(0, -"index.html".length)}`;
  }
  return `/${localPath}`;
}

async function discoverRoutes(siteDir, requestedRoutes) {
  const routes = (await listHtmlFiles(siteDir))
    .map((file) => fileToRoute(file, siteDir))
    .filter((route) => route !== "/404.html")
    .sort((a, b) => {
      if (a === "/") return -1;
      if (b === "/") return 1;
      return a.localeCompare(b);
    });

  if (!requestedRoutes) return routes;

  const missing = requestedRoutes.filter((route) => !routes.includes(route));
  if (missing.length) {
    throw new Error(`These routes were not found in the Hugo build: ${missing.join(", ")}`);
  }
  return requestedRoutes;
}

async function findStaticFile(siteDir, requestUrl) {
  const pathname = decodeURIComponent(new URL(requestUrl, "http://localhost").pathname);
  const candidates = [];
  const cleanPath = pathname.replace(/^\/+/, "");

  if (pathname.endsWith("/")) {
    candidates.push(join(siteDir, cleanPath, "index.html"));
  } else {
    candidates.push(join(siteDir, cleanPath));
    candidates.push(join(siteDir, cleanPath, "index.html"));
  }

  for (const candidate of candidates) {
    const safeRelativePath = relative(siteDir, candidate);
    if (safeRelativePath.startsWith("..") || safeRelativePath.includes(`${sep}..${sep}`)) {
      continue;
    }
    try {
      if ((await stat(candidate)).isFile()) return candidate;
    } catch {
      // Try the next candidate.
    }
  }
  return null;
}

async function startStaticServer(siteDir) {
  const server = createServer(async (request, response) => {
    try {
      const file = await findStaticFile(siteDir, request.url ?? "/");
      if (!file) {
        response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
        response.end("Not found");
        return;
      }

      response.writeHead(200, {
        "content-type": MIME_TYPES[extname(file).toLowerCase()] ?? "application/octet-stream",
      });
      createReadStream(file).pipe(response);
    } catch (error) {
      response.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
      response.end(error.message);
    }
  });

  await new Promise((resolveListen, rejectListen) => {
    server.once("error", rejectListen);
    server.listen(0, "127.0.0.1", resolveListen);
  });

  const address = server.address();
  return {
    baseUrl: `http://127.0.0.1:${address.port}`,
    close: () => new Promise((resolveClose) => server.close(resolveClose)),
  };
}

function routeSlug(route) {
  return route === "/"
    ? "home"
    : route.replace(/^\/|\/$/g, "").replace(/[^a-z0-9]+/gi, "-").toLowerCase();
}

async function waitForPage(page) {
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
    await Promise.all(
      [...document.images].map((image) => {
        if (image.complete) return undefined;
        return new Promise((resolveImage) => {
          image.addEventListener("load", resolveImage, { once: true });
          image.addEventListener("error", resolveImage, { once: true });
        });
      }),
    );
  });
}

async function scrollThroughPage(page, pageHeight, viewportHeight) {
  for (let y = 0; y < pageHeight; y += viewportHeight) {
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await page.waitForTimeout(40);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(80);
  await waitForPage(page);
}

function pngDimensions(buffer) {
  const pngSignature = "89504e470d0a1a0a";
  if (buffer.subarray(0, 8).toString("hex") !== pngSignature) {
    throw new Error("Expected a PNG capture");
  }
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

async function captureRoutes({ baseUrl, captureDir, options, routes }) {
  let browser;
  try {
    browser = await chromium.launch();
  } catch (error) {
    if (String(error.message).includes("Executable doesn't exist")) {
      throw new Error(
        "Chromium is not installed yet. Run `npm run export:setup` once, then retry.",
      );
    }
    throw error;
  }

  const context = await browser.newContext({
    colorScheme: options.theme,
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
    viewport: options.viewport,
  });
  const page = await context.newPage();
  const captures = [];

  try {
    for (const route of routes) {
      console.log(`Capturing ${route}`);
      await page.goto(`${baseUrl}${route.replace(/^\//, "")}`, {
        waitUntil: "networkidle",
      });
      await page.addStyleTag({
        content: `
          *, *::before, *::after {
            animation-duration: 0s !important;
            animation-delay: 0s !important;
            transition-duration: 0s !important;
            caret-color: transparent !important;
          }
        `,
      });
      await waitForPage(page);

      await page.locator("details.contact-person-bio").evaluateAll((bios) => {
        for (const bio of bios) bio.open = true;
      });

      const pageHeight = await page.evaluate(() =>
        Math.max(
          document.documentElement.scrollHeight,
          document.body?.scrollHeight ?? 0,
        ),
      );

      if (options.layout === "full-page") {
        await scrollThroughPage(page, pageHeight, options.viewport.height);
        const path = join(captureDir, `${routeSlug(route)}.png`);
        const imageBuffer = await page.screenshot({
          path,
          animations: "disabled",
          fullPage: true,
        });
        const dimensions = pngDimensions(imageBuffer);
        captures.push({
          path,
          route,
          part: 1,
          partCount: 1,
          widthPx: dimensions.width,
          heightPx: dimensions.height,
        });
        continue;
      }

      const maxScroll = Math.max(0, pageHeight - options.viewport.height);
      const step = options.viewport.height - options.overlap;
      const positions = [0];
      for (let y = step; y < maxScroll; y += step) positions.push(y);
      if (maxScroll > 0 && positions.at(-1) !== maxScroll) positions.push(maxScroll);

      for (let partIndex = 0; partIndex < positions.length; partIndex += 1) {
        const y = positions[partIndex];
        await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
        await page.waitForTimeout(80);
        const filename = `${routeSlug(route)}-${String(partIndex + 1).padStart(2, "0")}.png`;
        const path = join(captureDir, filename);
        await page.screenshot({ path, animations: "disabled" });
        captures.push({
          path,
          route,
          part: partIndex + 1,
          partCount: positions.length,
          widthPx: options.viewport.width,
          heightPx: options.viewport.height,
        });
      }
    }
  } finally {
    await browser.close();
  }

  return captures;
}

function headerLabel(capture) {
  const routeLabel = capture.route === "/" ? "/" : capture.route;
  if (capture.partCount === 1) return `pelagia.studio${routeLabel}`;
  return `pelagia.studio${routeLabel}  |  view ${capture.part} of ${capture.partCount}`;
}

function outputGeometry(captures, layout) {
  const horizontalMargin = 0.266;
  const imageTop = 0.15;
  const bottomMargin = 0.15;

  if (layout === "paged") {
    return {
      slideWidth: 13.333,
      slideHeight: 7.5,
      imageX: horizontalMargin,
      imageY: imageTop,
      imageWidth: 12.8,
      maxImageHeight: 7.2,
    };
  }

  const maxHeightPx = Math.max(...captures.map((capture) => capture.heightPx));
  const captureWidthPx = captures[0].widthPx;
  if (captures.some((capture) => capture.widthPx !== captureWidthPx)) {
    throw new Error("Full-page captures must all use the same viewport width");
  }

  const maxSlideDimension = 56;
  const verticalChrome = imageTop + bottomMargin;
  const preferredImageWidth = 12.8;
  const imageWidth = Math.min(
    preferredImageWidth,
    ((maxSlideDimension - verticalChrome) * captureWidthPx) / maxHeightPx,
  );
  const maxImageHeight = (maxHeightPx / captureWidthPx) * imageWidth;

  return {
    slideWidth: imageWidth + horizontalMargin * 2,
    slideHeight: maxImageHeight + verticalChrome,
    imageX: horizontalMargin,
    imageY: imageTop,
    imageWidth,
    maxImageHeight,
  };
}

async function createPdf(captures, outputPath, layout) {
  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const geometry = outputGeometry(captures, layout);
  const pointsPerInch = 72;
  const slideWidth = geometry.slideWidth * pointsPerInch;
  const slideHeight = geometry.slideHeight * pointsPerInch;
  const imageX = geometry.imageX * pointsPerInch;
  const imageTop = geometry.imageY * pointsPerInch;
  const imageWidth = geometry.imageWidth * pointsPerInch;

  pdf.setTitle("Pelagia Studio website review");
  pdf.setSubject("Comment-friendly visual snapshot of pelagia.studio");
  pdf.setCreator("Pelagia Studio website export");

  for (const capture of captures) {
    const page = pdf.addPage([slideWidth, slideHeight]);
    const image = await pdf.embedPng(await readFile(capture.path));
    page.drawRectangle({
      x: 0,
      y: 0,
      width: slideWidth,
      height: slideHeight,
      color: rgb(0.94, 0.96, 0.95),
    });
    page.drawText(headerLabel(capture), {
      x: imageX,
      y: slideHeight - 9,
      size: 6.8,
      font,
      color: rgb(0.12, 0.42, 0.34),
    });
    const imageHeight =
      (capture.heightPx / capture.widthPx) * imageWidth;
    page.drawImage(image, {
      x: imageX,
      y: slideHeight - imageTop - imageHeight,
      width: imageWidth,
      height: imageHeight,
    });
  }

  await writeFile(outputPath, await pdf.save());
}

async function createPptx(captures, outputPath, layout) {
  const pptx = new pptxgen();
  const geometry = outputGeometry(captures, layout);
  if (layout === "paged") {
    pptx.layout = "LAYOUT_WIDE";
  } else {
    pptx.defineLayout({
      name: "PELAGIA_FULL_PAGE",
      width: geometry.slideWidth,
      height: geometry.slideHeight,
    });
    pptx.layout = "PELAGIA_FULL_PAGE";
  }
  pptx.author = "Pelagia Studio";
  pptx.company = "Icy Seas Co-Laboratory LLC";
  pptx.subject = "Comment-friendly visual snapshot of pelagia.studio";
  pptx.title = "Pelagia Studio website review";
  pptx.lang = "en-US";
  pptx.theme = {
    headFontFace: "Avenir Next",
    bodyFontFace: "Avenir Next",
    lang: "en-US",
  };

  for (const capture of captures) {
    const slide = pptx.addSlide();
    slide.background = { color: "EEF3F1" };
    slide.addText(headerLabel(capture), {
      x: geometry.imageX,
      y: 0.03,
      w: geometry.imageWidth,
      h: 0.18,
      fontFace: "Avenir Next",
      fontSize: 6.8,
      bold: true,
      color: "1F6B57",
      margin: 0,
      breakLine: false,
      fit: "shrink",
    });
    slide.addImage({
      path: capture.path,
      x: geometry.imageX,
      y: geometry.imageY,
      w: geometry.imageWidth,
      h: (capture.heightPx / capture.widthPx) * geometry.imageWidth,
    });
    slide.addNotes(
      `Source page: https://pelagia.studio${capture.route}\nCapture ${capture.part} of ${capture.partCount}`,
    );
  }

  await pptx.writeFile({ fileName: outputPath });
}

async function copyCaptures(captures, outputDir) {
  const keptDir = join(outputDir, "captures");
  await mkdir(keptDir, { recursive: true });
  await Promise.all(
    captures.map((capture) => copyFile(capture.path, join(keptDir, capture.path.split(sep).at(-1)))),
  );
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const workspace = await mkdtemp(join(tmpdir(), "pelagia-review-"));
  const siteDir = join(workspace, "site");
  const captureDir = join(workspace, "captures");
  await mkdir(siteDir, { recursive: true });
  await mkdir(captureDir, { recursive: true });
  await mkdir(options.outputDir, { recursive: true });

  let staticServer;
  try {
    staticServer = await startStaticServer(siteDir);
    const hugoArgs = [
      "--destination",
      siteDir,
      "--cleanDestinationDir",
      "--baseURL",
      `${staticServer.baseUrl}/`,
    ];
    if (options.includeDrafts) hugoArgs.push("--buildDrafts", "--buildFuture");

    console.log("Building the Hugo draft...");
    await run("hugo", hugoArgs);

    const routes = await discoverRoutes(siteDir, options.pages);
    console.log(`Found ${routes.length} page${routes.length === 1 ? "" : "s"}.`);
    const captures = await captureRoutes({
      baseUrl: `${staticServer.baseUrl}/`,
      captureDir,
      options,
      routes,
    });

    const outputs = [];
    if (options.format === "both" || options.format === "pdf") {
      const pdfPath = join(options.outputDir, `${options.name}.pdf`);
      await createPdf(captures, pdfPath, options.layout);
      outputs.push(pdfPath);
    }
    if (options.format === "both" || options.format === "pptx") {
      const pptxPath = join(options.outputDir, `${options.name}.pptx`);
      await createPptx(captures, pptxPath, options.layout);
      outputs.push(pptxPath);
    }
    if (options.keepCaptures) await copyCaptures(captures, options.outputDir);

    console.log(`Created ${captures.length} review page${captures.length === 1 ? "" : "s"}:`);
    for (const output of outputs) console.log(`  ${relative(projectDir, output)}`);
  } finally {
    if (staticServer) await staticServer.close();
    await rm(workspace, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(`\nExport failed: ${error.message}`);
  process.exitCode = 1;
});
