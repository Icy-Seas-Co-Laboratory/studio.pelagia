---
title: ""
description: "Pelagia is an ROI-first image-analysis platform for extracting, segmenting, organizing, labeling, and training models on biological video and image data."
---

<div class="pelagia-home">
  <section class="pelagia-hero">
    <div>
      <p class="pelagia-kicker">ROI-first biological image analysis</p>
      <h1>From source frames to durable ROI data.</h1>
      <p class="lead">Pelagia extracts, segments, organizes, labels, and trains on biological image data through a Python backend, background workers, reproducible artifacts, and the PelagiaView browser interface.</p>
      <div class="pelagia-actions">
        <a class="pelagia-button primary" href="/platform/">Explore the platform</a>
        <a class="pelagia-button secondary" href="/pelagiaview/">Open the interface story</a>
      </div>
    </div>
    <div class="pelagia-visual" aria-hidden="true">
      <div class="pelagia-ring"></div>
      <img class="pelagia-hero-icon" src="/brand/pelagia_icon.png" alt="" />
      <div class="pelagia-panel main">
        <p class="panel-label">Processing pipeline</p>
        <div class="pipeline-step active"><span>01</span> Ingest video and image assets</div>
        <div class="pipeline-step"><span>02</span> Extract and preprocess frames</div>
        <div class="pipeline-step"><span>03</span> Segment candidate ROIs</div>
        <div class="pipeline-step"><span>04</span> Refine masks and store artifacts</div>
      </div>
      <div class="pelagia-panel signal">
        <p class="panel-label">Project status</p>
        <div class="status-row"><span>Preprocessing</span><strong>succeeded</strong></div>
        <div class="status-row"><span>Candidate ROIs</span><strong>working</strong></div>
        <div class="status-row"><span>Refinement</span><strong>queued</strong></div>
      </div>
    </div>
  </section>

  <section class="pelagia-section">
    <h2>Built around the unit scientists actually review.</h2>
    <p>Large source frames can stay cold while ROI crops, masks, measurements, labels, classifications, and curation state remain available for analysis. Pelagia keeps the durable metadata close to the workflow and moves heavy payloads through replaceable storage adapters.</p>
    <div class="pelagia-grid-list">
      <div class="pelagia-card">
        <h3>Frame ingestion</h3>
        <p>Register source assets, extract frames from video or image collections, and preserve geometry, checksums, paths, and collection metadata.</p>
      </div>
      <div class="pelagia-card">
        <h3>Segmentation and refinement</h3>
        <p>Detect candidate ROIs, store crops and masks, then refine boundaries with learned model artifacts when the workflow needs better masks.</p>
      </div>
      <div class="pelagia-card">
        <h3>Curation-ready outputs</h3>
        <p>Carry ROI records forward into labeling, classification, embeddings, training-set curation, model evaluation, and robust exports.</p>
      </div>
    </div>
  </section>

  <section class="pelagia-section pelagia-split">
    <div>
      <h2>Backend durability, browser operations.</h2>
      <p>Pelagia owns the database, payload storage, job queue, worker sessions, events, artifacts, and HTTP API. PelagiaView stays thin and operational: connect to a backend, monitor health, queue processing, inspect frames and ROIs, and review logs.</p>
    </div>
    <div class="pelagia-metrics">
      <div class="pelagia-metric">
        <strong>API</strong>
        <span>FastAPI routes for system health, assets, frames, detections, jobs, workers, logs, and exports</span>
      </div>
      <div class="pelagia-metric">
        <strong>Jobs</strong>
        <span>Postgres-backed queue with worker heartbeat, events, pause, resume, retry, and shutdown controls</span>
      </div>
      <div class="pelagia-metric">
        <strong>ROIs</strong>
        <span>Crops, masks, geometry, measurements, labels, model outputs, and curation state as first-class records</span>
      </div>
    </div>
  </section>

  <section class="pelagia-section pelagia-cta">
    <div>
      <h2>Run the stack, then open PelagiaView.</h2>
      <p>Start the backend API and workers, connect PelagiaView to the API endpoint, and operate the analysis pipeline from a project-scoped browser session.</p>
    </div>
    <a class="pelagia-button primary" href="/operations/">Review operations</a>
  </section>
</div>
