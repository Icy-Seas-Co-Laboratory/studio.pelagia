---
title: "Software"
description: "Pelagia as an open source analysis server with the PelagiaView web GUI for pelagic imagery workflows."
---

<div class="page-simple">

<p class="lead">Pelagia is the open source analysis server. PelagiaView is the front-end web GUI. Together they give teams a flexible way to process, review, and export pelagic imagery data.</p>

## Server And Web GUI

Pelagia handles the analysis side of the workflow: processing imagery, organizing candidate targets, preserving review products, and preparing outputs. PelagiaView connects to that server through the browser so scientists can inspect imagery, review regions of interest, and track progress interactively.

This architecture keeps the system naturally flexible. The server can run where the data and compute resources live, while the web GUI can be opened from a workstation, laptop, shared lab machine, or demo environment.

## Interactive Review

The software supports fast movement between source imagery, candidate regions, masks, frame context, and review state. That matters for pelagic imagery, where signal can be subtle and confidence often depends on seeing both the cropped target and the surrounding frame.

## High-Performance Workflow

Large imagery collections need more than a folder viewer. Pelagia is structured to run processing work in the background, track progress across stages, and keep the interface responsive while data products are generated.

## Purposeful Technology

Pelagia uses a Python backend with a FastAPI service layer and a browser-based review interface. Those choices make the suite practical to deploy, integrate, and extend while keeping the public workflow focused on imagery, review, and data products.

## Demo And Source

You can explore the hosted demo at [demo.pelagia.studio](https://demo.pelagia.studio/) and review the open source code at [github.com/Icy-Seas-Co-Laboratory/Pelagia](https://github.com/Icy-Seas-Co-Laboratory/Pelagia).

## Built For Pelagic Data

Pelagia is useful for workflows involving plankton, particles, marine snow, organisms, optical survey imagery, and other pelagic visual observations where researchers need to move from raw imagery to measurable, curated records.

## Reproducible Outputs

Review and processing decisions should lead to durable products: curated regions of interest, masks, measurements, labels, classifications, and exports that can be used in statistical analysis, machine-learning workflows, or long-term monitoring.

</div>
