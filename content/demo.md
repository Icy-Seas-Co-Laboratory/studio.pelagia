---
title: "Pelagia Demo"
description: "Learn what is included in the shared Pelagia demonstration, how access is managed, and what to expect before opening the live instance."
---

<div class="page-demo">

<section class="demo-hero">
  <p class="pelagia-kicker">A guided entry to the live software</p>
  <h2>Explore Pelagia in a working environment.</h2>
  <p class="lead">The public demo provides a hands-on view of Pelagia’s browser-based scientific workspace and the processing system behind it. Use this page to understand the shared environment, current hardware, and access level before opening the live instance. <b>N.B. Pelagia is under constant development under a small team; so please forgive changes, downtime, and errors while we work to make it the best we can.</b></p>
  <div class="pelagia-actions">
    <a class="pelagia-button primary" href="https://demo.pelagia.studio/?server=https%3A%2F%2Fdemoapi.pelagia.studio&amp;username=demo&amp;password=demo" target="_blank" rel="noopener noreferrer">Open the shared demo <span aria-hidden="true">↗</span></a>
    <a class="pelagia-button secondary" href="/software/">Explore the software</a>
  </div>
</section>

<aside class="demo-notice" aria-labelledby="demo-before-you-enter">
  <div>
    <p class="demo-eyebrow">Before you enter</p>
    <h2 id="demo-before-you-enter">Treat this as a shared workspace.</h2>
  </div>
  <ul>
    <li>Do not upload confidential, sensitive, unpublished, or personally identifiable data.</li>
    <li>Other visitors may be able to see changes made through the shared account.</li>
    <li>Datasets, processing state, and account access may be changed or reset without notice.</li>
    <li>Performance reflects current traffic and this particular deployment, not a formal benchmark.</li>
  </ul>
</aside>

<section class="demo-section demo-overview" aria-labelledby="demo-current">
  <div class="demo-section-heading">
    <p class="pelagia-kicker">Current demonstration</p>
    <h2 id="demo-current">One shared project, ready to explore.</h2>
  </div>
  <div class="demo-access-card demo-access-card-active">
    <div class="demo-access-card-header">
      <div>
        <p class="demo-eyebrow">Available now</p>
        <h3>General Pelagia demo</h3>
      </div>
      <span class="demo-status"><span aria-hidden="true"></span> Shared access</span>
    </div>
    <p>The launch link supplies the current shared connection details and opens the Demo User in a single demonstration project with Editor access. It is intended for exploring the interface and representative workflows—not for storing research data.</p>
    <dl class="demo-access-facts">
      <div><dt>Account</dt><dd>Shared Demo User</dd></div>
      <div><dt>Project</dt><dd>Test</dd></div>
      <div><dt>Role</dt><dd>Editor</dd></div>
    </dl>
    <a class="pelagia-button primary" href="https://demo.pelagia.studio/?server=https%3A%2F%2Fdemoapi.pelagia.studio&amp;username=demo&amp;password=demo" target="_blank" rel="noopener noreferrer">Launch this demo <span aria-hidden="true">↗</span></a>
  </div>
</section>

<section class="demo-section" aria-labelledby="demo-explore">
  <div class="demo-section-heading">
    <p class="pelagia-kicker">What to explore</p>
    <h2 id="demo-explore">Follow imagery from source to scientific review.</h2>
    <p>The available data and processing state may evolve, but the demo is designed to show how Pelagia connects high-throughput processing with interactive inspection.</p>
  </div>
  <div class="demo-feature-grid">
    <article>
      <span class="demo-feature-number">01</span>
      <h3>Browse source imagery</h3>
      <p>Move through registered assets and frames while retaining acquisition and processing context.</p>
    </article>
    <article>
      <span class="demo-feature-number">02</span>
      <h3>Inspect candidate ROIs</h3>
      <p>Review detected regions of interest, masks, measurements, and the frames in which they occurred.</p>
    </article>
    <article>
      <span class="demo-feature-number">03</span>
      <h3>Track processing</h3>
      <p>See how jobs, workers, and staged data products support traceable, high-throughput workflows.</p>
    </article>
  </div>
</section>

<section class="demo-section demo-environment" aria-labelledby="demo-environment">
  <div class="demo-section-heading">
    <p class="pelagia-kicker">Current environment</p>
    <h2 id="demo-environment">A substantial shared deployment—not a hardware requirement.</h2>
    <p>Pelagia can be configured for different data volumes, instruments, and computing environments. These figures describe the resources currently allocated to the public demo and may change as the deployment evolves.</p>
  </div>
  <div class="demo-hardware-grid">
    <div><strong>22</strong><span>allocated CPU cores</span></div>
    <div><strong>120 GB</strong><span>system memory</span></div>
    <div><strong>~22 TB</strong><span>shared data volume</span></div>
    <div><strong>~900 GB</strong><span>database volume</span></div>
  </div>
  <p class="demo-technical-note">The current instance runs on Linux with PostgreSQL for durable metadata and project-scoped storage for image products. Pelagia’s background-worker architecture can also distribute processing across additional CPU or dedicated GPU/ML workers when a deployment requires it.</p>
</section>

<section class="demo-section" aria-labelledby="demo-roles">
  <div class="demo-section-heading">
    <p class="pelagia-kicker">Authentication and permissions</p>
    <h2 id="demo-roles">Access can be matched to each collaboration.</h2>
    <p>Pelagia uses project-scoped sessions so a person’s role can differ between projects. The public demo uses Editor access; managed deployments can assign the other levels when appropriate.</p>
  </div>
  <div class="demo-role-grid">
    <article><h3>Viewer</h3><p>Read-only access for browsing project data and reviewing available results.</p></article>
    <article class="is-current"><p class="demo-current-label">Public demo</p><h3>Editor</h3><p>Viewer access plus permission to create or modify scientific project records and workflows.</p></article>
    <article><h3>Manager</h3><p>Editor access plus project-scoped user and account management.</p></article>
    <article><h3>Administrator</h3><p>Project or system administration for teams responsible for the deployment and its users.</p></article>
  </div>
</section>

<section class="demo-section demo-final-cta" aria-labelledby="demo-ready">
  <div>
    <p class="pelagia-kicker">Ready to look around?</p>
    <h2 id="demo-ready">Open the shared Pelagia instance.</h2>
    <p>By continuing, you acknowledge that this is a shared, non-production environment. See the <a href="/privacy/">privacy notice</a> for information about the Pelagia Studio website and linked services.</p>
  </div>
  <div class="pelagia-actions compact">
    <a class="pelagia-button primary" href="https://demo.pelagia.studio/?server=https%3A%2F%2Fdemoapi.pelagia.studio&amp;username=demo&amp;password=demo" target="_blank" rel="noopener noreferrer">Enter the demo <span aria-hidden="true">↗</span></a>
    <a class="pelagia-button secondary" href="/contact/">Discuss a private demo</a>
  </div>
</section>

</div>
