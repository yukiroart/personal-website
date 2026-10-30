<script lang="ts">
  const services = [
    {
      title: 'Full Illustrations',
      tag: 'EDITORIAL & FINE ART',
      description: 'Bespoke high-resolution original paintings, cover art, and fine art commissions executed with rich physical textures, mineral pigments, and fine Belgian linen.',
      deliverables: ['Original high-res artwork', 'Print & commercial licensing', 'Custom color palettes'],
      cta: 'Commission Illustration',
    },
    {
      title: 'Visual Animation & Motion',
      tag: '2D MOTION & ART LOOPS',
      description: 'Frame-by-frame and expressive 2D motion loops bringing painterly sketches, botanical forms, and abstract compositions into dynamic living motion.',
      deliverables: ['Seamless 4K video loops', 'Social media motion reels', 'Interactive web motion assets'],
      cta: 'Inquire About Motion',
    },
    {
      title: 'Concept Sketching & Ideation',
      tag: 'CHARCOAL & INK STUDIES',
      description: 'Rapid ideation studies, preliminary storyboards, architectural compositions, and textural line drawings for visual development and creative direction.',
      deliverables: ['Exploratory sketchbooks', 'Compositional thumbnails', 'Raw pencil & ink scans'],
      cta: 'Book Concept Session',
    },
    {
      title: 'Site-Specific Murals & Installations',
      tag: 'LARGE SCALE FORMATS',
      description: 'Custom large-format mural artworks and architectural canvas installations tailored for contemporary hospitality, modern residential spaces, and galleries.',
      deliverables: ['On-site physical painting', 'Scale maquettes & previews', 'Protective archival varnishing'],
      cta: 'Request Mural Proposal',
    },
  ];
</script>

<svelte:head>
  <title>Services — What Can I Do For You | Lindsay Art Portfolio</title>
  <meta name="description" content="Explore bespoke artistic services by Lindsay: Full illustrations, 2D animations, conceptual sketching, and custom fine-art commissions." />
</svelte:head>

<!-- Masthead Header -->
<section class="services-masthead-section" aria-label="Services Introduction">
  <h1 class="services-main-title">What can I do for you</h1>
</section>

<!-- Services Grid -->
<section class="services-grid-section" aria-label="Client Services">
  <div class="services-grid">
    {#each services as service, index}
      <article class="neo-card service-card">
        <div class="service-header-row">
          <span class="service-index">0{index + 1}</span>
          <span class="service-tag">{service.tag}</span>
        </div>

        <h2 class="service-title">{service.title}</h2>
        <p class="service-desc">{service.description}</p>

        <div class="service-deliverables">
          <h3 class="deliverables-title">WHAT'S INCLUDED:</h3>
          <ul class="deliverables-list">
            {#each service.deliverables as item}
              <li class="deliverable-item">
                <span class="bullet-dot"></span>
                {item}
              </li>
            {/each}
          </ul>
        </div>

        <div class="service-footer">
          <a href="/contact" class="neo-btn neo-btn-pink sm service-cta">
            {service.cta} ↗
          </a>
        </div>
      </article>
    {/each}
  </div>
</section>

<style>
  /* Masthead */
  .services-masthead-section {
    margin-bottom: 36px;
  }

  .services-main-title {
    font-size: clamp(2.5rem, 4.5vw, 3.8rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.05;
    margin-bottom: 12px;
  }

  /* Services Grid */
  .services-grid-section {
    margin-bottom: 64px;
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--grid-gap);
  }

  .service-card {
    background: var(--color-surface);
    border: var(--stroke-neo);
    box-shadow: var(--shadow-neo);
    border-radius: 0;
    padding: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }

  .service-card:hover {
    transform: translate(-2px, -2px);
    box-shadow: var(--shadow-neo-hover);
  }

  .service-header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 1.5px dashed var(--color-border-subtle);
  }

  .service-index {
    font-family: var(--font-heading);
    font-size: 1.6rem;
    font-weight: 800;
    color: var(--color-ink);
    line-height: 1;
  }

  .service-tag {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    background: var(--color-yellow);
    color: #121212;
    border: 1.5px solid var(--color-ink);
    padding: 3px 10px;
    border-radius: var(--radius-neo-pill);
    box-shadow: var(--shadow-neo-xs);
  }

  .service-title {
    font-size: 1.65rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.2;
    margin-bottom: 14px;
  }

  .service-desc {
    font-family: var(--font-body);
    font-size: 0.95rem;
    color: var(--color-muted);
    line-height: 1.6;
    margin-bottom: 24px;
  }

  /* Deliverables */
  .service-deliverables {
    margin-bottom: 28px;
    background: var(--color-bg);
    border: 1.5px solid var(--color-ink);
    padding: 16px 20px;
  }

  .deliverables-title {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    color: var(--color-ink);
    margin-bottom: 10px;
  }

  .deliverables-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .deliverable-item {
    font-family: var(--font-body);
    font-size: 0.86rem;
    color: var(--color-ink);
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .bullet-dot {
    width: 6px;
    height: 6px;
    background: var(--color-ink);
    flex-shrink: 0;
  }

  /* Footer Button */
  .service-footer {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .service-cta {
    width: 100%;
  }

  /* Responsive */
  @media (max-width: 860px) {
    .services-grid {
      grid-template-columns: 1fr;
    }

    .service-card {
      padding: 24px;
    }
  }

  @media (max-width: 680px) {
    .services-main-title {
      font-size: 2.2rem;
    }
  }
</style>

