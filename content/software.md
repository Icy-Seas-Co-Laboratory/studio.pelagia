---
title: "Software"
description: "Pelagia is a real-time, high-throughput pelagic image processing and plankton identification suite."
---

<div class="page-simple">

<p class="lead">Pelagia is an integrated, real-time pelagic image processing suite. Its processing engine and PelagiaView scientific workspace work together to identify plankton, manage high-throughput imagery, and turn instrument streams into reviewable, analysis-ready data.</p>

<figure class="pelagia-page-image">
  {{< responsive-image src="images/demo-screenshots/roi_browser-web.jpg" alt="PelagiaView ROI Browser showing filter controls and tiled candidate ROI imagery." widths="480,800,1200,1600" sizes="(max-width: 900px) 100vw, 46rem" quality="86" >}}
</figure>

## A Real-Time Processing Suite

Pelagia handles the full analysis path: ingesting and processing imagery, detecting and identifying plankton, organizing candidate targets, preserving review products, and preparing outputs. PelagiaView connects through the browser so scientists can monitor incoming observations, inspect imagery, review regions of interest, and track progress interactively.

This architecture keeps the system naturally flexible. The server can run where the data and compute resources live, while the web GUI can be opened from a workstation, laptop, shared lab machine, or demo environment.

## Interactive Review

The software supports fast movement between source imagery, candidate regions, masks, frame context, and review state. That matters for pelagic imagery, where signal can be subtle and confidence often depends on seeing both the cropped target and the surrounding frame.

<figure class="pelagia-page-image">
  {{< responsive-image src="images/demo-screenshots/frame_inspection-web.jpg" alt="PelagiaView frame inspection with detections highlighted on a source frame." widths="480,800,1200,1600" sizes="(max-width: 900px) 100vw, 46rem" quality="86" >}}
</figure>

## High-Throughput by Design

Large, continuous image streams—especially those produced by ISIIS-DPI plankton cameras—need more than a folder viewer. Pelagia is structured for concurrent background processing, staged data products, and a responsive interface, supporting real-time interpretation during acquisition as well as rapid processing of accumulated collections.

## Purposeful Technology

Pelagia uses a Python backend with a FastAPI service layer and a browser-based review interface. Those choices make the suite practical to deploy, integrate, and extend while keeping the public workflow focused on imagery, review, and data products.

## Try Pelagia

Explore the complete workflow in the hosted [Pelagia demo](https://demo.pelagia.studio/?server=https%3A%2F%2Fdemoapi.pelagia.studio&username=demo&password=demo). The Pelagia processing engine is also available on [GitHub](https://github.com/Icy-Seas-Co-Laboratory/Pelagia) for teams building reproducible and extensible analysis workflows.

## Built For Pelagic Data

Pelagia is useful for workflows involving plankton, particles, marine snow, organisms, optical survey imagery, and other pelagic visual observations where researchers need to move from raw imagery to measurable, curated records.

## Reproducible Outputs

Review and processing decisions should lead to durable products: curated regions of interest, masks, measurements, labels, classifications, and exports that can be used in statistical analysis, machine-learning workflows, or long-term monitoring. Every derived product remains connected to its source imagery, acquisition metadata, processing and model versions, and review state so results can be audited and reproduced.

</div>
