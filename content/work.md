---
title: "Work"
description: "Example pelagic imagery analysis workflows and partner-facing data products supported by Pelagia."
layout: "simple"
---

<div class="page-work">

<p class="lead">Pelagia's workflow was shaped by the UAF Deep-Focus Particle Imager operated for the Northern Gulf of Alaska LTER program. A single survey can produce tens of terabytes of coupled imagery and environmental observations—far more than a science team can inspect manually.</p>

<section class="work-section">
  <p class="pelagia-kicker">Northern Gulf of Alaska LTER</p>
  <h2>Built through sustained work with the DPI.</h2>
  <p>Work with Russ Hopcroft's instrument has driven Pelagia's real-time pipeline, interactive review tools, and high-throughput architecture. It is a proving ground for the suite: biologically diverse imagery, demanding field conditions, and the need to preserve the relationship between every image, its sensor context, and the ecological observation it becomes. <a href="/field-study/">Read the full DPI field study.</a></p>
</section>

<section class="work-section work-feature">
  <div>
    <p class="pelagia-kicker">Example analysis</p>
    <h2>From full-frame imagery to reviewable biological observations.</h2>
    <p>Pelagic images can contain sparse targets, suspended particles, uneven illumination, and biological forms that are easy to miss when review happens one frame at a time. Pelagia supports the practical workflow between raw instrument imagery and structured observations: candidate detection, frame inspection, ROI review, scale-aware comparison, and export.</p>
  </div>
  <figure class="work-frame">
    <img src="/example-dpi/plankton-frame-original-web.jpg" alt="Full-frame pelagic image with a candidate plankton organism highlighted by a bounding box." />
    <figcaption>Full-frame context with a candidate organism highlighted for review.</figcaption>
  </figure>
</section>

<section class="work-section">
  <h2>Frame context and ROI detail belong together.</h2>
  <p>Reviewers need to move between the original observation and the cropped target without losing confidence in where the target came from. The same workflow can support detection review, quality control, morphology measurements, and training-data preparation.</p>
  <div class="work-image-grid">
    <figure class="work-frame tall">
      <img src="/example-dpi/plankton-frame-preprocessed-web.jpg" alt="Preprocessed pelagic frame with multiple candidate plankton regions highlighted." />
      <figcaption>Preprocessed frame with candidate regions highlighted.</figcaption>
    </figure>
    <figure class="work-roi">
      <img src="/example-dpi/plankton-roi-large-web.jpg" alt="Cropped plankton region of interest with scale bar." />
      <figcaption>Scale-bar ROI for focused morphology and review.</figcaption>
    </figure>
  </div>
</section>

<section class="work-section">
  <h2>Outputs for science teams, not just screenshots.</h2>
  <p>Pelagia is aimed at partner workflows where imagery needs to become durable, reviewable data: curated ROIs, masks, measurements, labels, classifications, and exports that can move into analysis notebooks, survey summaries, model training, and long-term monitoring.</p>
  <div class="work-roi-strip">
    <figure>
      <img src="/example-dpi/plankton-roi-vertical-web.jpg" alt="Vertical cropped plankton region of interest with scale bar." />
    </figure>
    <figure>
      <img src="/example-dpi/plankton-roi-horizontal-web.jpg" alt="Horizontal cropped plankton region of interest with scale bar." />
    </figure>
    <figure>
      <img src="/example-dpi/plankton-roi-large-web.jpg" alt="Detailed cropped plankton region of interest with scale bar." />
    </figure>
  </div>
</section>

<section class="work-section">
  <h2>Partner-facing workflows</h2>
  <div class="work-card-grid">
    <div class="pelagia-card">
      <h3>Instrument imagery review</h3>
      <p>Organize full-frame imagery, candidate detections, and review state so survey teams can inspect biological signal efficiently.</p>
    </div>
    <div class="pelagia-card">
      <h3>Training data creation</h3>
      <p>Build curated ROI collections with context, labels, scale, and quality-control decisions for model development and evaluation.</p>
    </div>
    <div class="pelagia-card">
      <h3>Analysis-ready exports</h3>
      <p>Prepare structured outputs for abundance workflows, morphology analysis, image classification, reporting, and reproducible data science.</p>
    </div>
  </div>
</section>

</div>
