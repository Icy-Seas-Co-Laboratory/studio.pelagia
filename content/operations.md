---
title: "Operations"
description: "Operational model for running, maintaining, backing up, and scaling Pelagia."
---

<div class="page-simple">

<p class="lead">Pelagia is built for long-running analysis systems where metadata, binary payloads, jobs, and project access must stay consistent.</p>

## Storage To Treat As One System

PostgreSQL stores users, projects, sessions, metadata, assets, frames, detections, jobs, logs, and processing history. KVStore stores large binary frame payloads and generated frame payloads. Configuration, local model artifacts, plugin manifests, and raw source paths complete the installation state.

## Processing Status Projection

Pelagia maintains a project-scoped frame processing status projection in PostgreSQL. Clients can filter large frame sets by preprocessing, candidate detection, and ROI refinement status without reconstructing state in the browser. For million-frame projects, PelagiaView can request matching frame IDs with cursor pagination instead of pulling unbounded rows.

## Maintenance Pattern

Before large imports, upgrades, resets, or backups, operators can check API, database, and KVStore health. For maintenance that touches storage, the safest pattern is to stop API and workers, back up PostgreSQL and KVStore together, perform the change, run system initialization/checks, restart the stack, and verify project status.

## Scaling Model

Worker roles can be split by stage: frame extraction, segmentation, ROI refinement, classification, curation, export, and model training. Each worker writes events and participates in the same durable queue, so the system can grow without changing the pipeline shape.

</div>
