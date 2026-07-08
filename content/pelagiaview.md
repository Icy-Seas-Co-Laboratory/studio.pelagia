---
title: "PelagiaView"
description: "PelagiaView is the SvelteKit browser interface for operating a running Pelagia backend."
---

<div class="page-simple">

<p class="lead">PelagiaView is the operational browser interface for connecting to Pelagia, monitoring processing, queueing work, exploring frames and ROIs, and reviewing system events.</p>

## Workflow Dashboard

PelagiaView connects to a backend API session, checks system health, and opens a project-scoped dashboard. It keeps endpoint and session state in browser storage, uses bearer-token API calls, and leaves backend jobs and workers running even when a browser disconnects.

## What Operators Can Do

- Monitor `/system/status`, job summaries, worker sessions, and KVStore state.
- Queue ingestion, preprocessing, segmentation, and ROI refinement work.
- Explore original and preprocessed frames with live overlays.
- Browse candidate and refined ROIs with filters, sorting, masks, and frame context.
- Review logs and job events across source, level, stage, status, run, job, and worker.

## Interface Boundaries

PelagiaView intentionally stays on the API boundary. It does not spawn backend processes or inspect server filesystems directly; those responsibilities stay in Pelagia’s backend services and worker stack.

</div>
