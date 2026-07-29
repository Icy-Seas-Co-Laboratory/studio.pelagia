# pelagia.studio

The Pelagia Studio website is built with Hugo and the Congo theme.

## Local development

```sh
hugo server --buildDrafts
```

## Responsive images

Production image sources live under `assets/images/`. Use the
`responsive-image` shortcode for page imagery instead of linking directly to a
file:

```go-html-template
{{< responsive-image
  src="images/demo-screenshots/frame_inspection-web.jpg"
  alt="PelagiaView frame inspection."
  widths="480,800,1200,1600"
  sizes="(max-width: 900px) 100vw, 46rem"
  quality="86"
>}}
```

Hugo generates the requested WebP variants during the build, writes a responsive
`srcset`, and retains the source format as a fallback. Below-the-fold images are
lazy-loaded by default. Use `loading="eager"` and `fetchpriority="high"` only
for an image that is visible in the first viewport.

Generated image derivatives are build artifacts and are not committed. Running
`npm run build` also cleans obsolete files from `public/`.

## Export a review draft

The review exporter builds the site, captures every page at a consistent desktop
viewport, and creates comment-friendly PDF and PowerPoint versions. Long web
pages are split into overlapping views so no content is lost.

Install the exporter once:

```sh
npm install
npm run export:setup
```

Create both formats:

```sh
npm run export:review
```

Create one tall PDF page or PowerPoint slide per website route:

```sh
npm run export:review:full
```

In the full-page version, every output page uses the same custom dimensions,
chosen to fit the longest website route. Shorter routes are aligned at the top
with blank space below. This makes it easy to compare whole-page composition at
a glance, although text will naturally appear smaller until the reviewer zooms
in.

The files are written to:

```text
exports/pelagia-studio-review.pdf
exports/pelagia-studio-review.pptx
exports/pelagia-studio-full-page-review.pdf
exports/pelagia-studio-full-page-review.pptx
```

Upload either file to Google Drive and share it with commenting access. The PDF
is best for pixel-faithful review; the PPTX is useful when collaborators prefer
slide-by-slide comments or Google Slides.

Useful variations:

```sh
# Export just one format
npm run export:pdf
npm run export:pptx

# Export selected routes
npm run export:review -- --pages /,/approach/,/field-study/

# Use the one-route-per-page layout with another export variation
npm run export:pdf -- --layout full-page --theme dark

# Export the published site only (drafts and future-dated pages are included by default)
npm run export:review -- --published-only

# Use a custom filename
npm run export:review -- --name pelagia-studio-2026-07-28

# See every option
node scripts/export-review.mjs --help
```

The exports are intentionally visual snapshots rather than reconstructed text
and shapes. That keeps the PDF and PPTX faithful to the browser rendering while
still giving reviewers clear page-by-page comment targets.
