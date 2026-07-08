---
title: "Platform"
description: "Pelagia backend architecture and ROI-first image-analysis pipeline."
---

<div class="page-simple">

<p class="lead">Pelagia is the Python backend that owns storage, processing, jobs, workers, and the HTTP API for biological image-analysis workflows.</p>

## ROI-First By Design

Pelagia is built for datasets where full source frames are large and mostly cold, while segmented ROIs are the primary unit of analysis. Full-frame payloads can live in cold storage; ROI crops, masks, measurements, classifications, and curation state stay close to the database-backed workflow.

## Core Pipeline

- Register video and image assets, extract frames, and preserve searchable metadata.
- Apply frame correction and preprocessing before segmentation or review.
- Detect candidate ROIs, store crops, masks, geometry, and image statistics.
- Refine ROI masks with learned models such as U-Net-style refinement artifacts.
- Add labels, predictions, embeddings, curation decisions, and exportable datasets.

## System Shape

The backend keeps API, CLI, and worker entrypoints thin. Shared services coordinate Postgres metadata, cold payload storage, processing routines, and durable job/event history. Independent workers claim jobs by stage, heartbeat while active, and can scale from a single development machine to specialized background processes.

## Data Products

Pelagia is designed to produce reproducible analysis outputs: ROI crops, masks, labels, measurements, embeddings, model results, curated training sets, and frame or ROI metadata exports.

</div>
