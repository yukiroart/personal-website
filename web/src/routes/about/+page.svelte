<script lang="ts">
  const exhibitions = [
    { year: 2026, title: 'Luminescence', gallery: 'Gallery Meridian', location: 'New York, USA' },
    { year: 2025, title: 'Mineral & Void', gallery: 'Studio Oberlin', location: 'London, UK' },
    { year: 2024, title: 'New Botanical Form', gallery: 'Pacific Contemporary', location: 'San Francisco, USA' },
    { year: 2023, title: 'Studies in Cadmium', gallery: 'Atelier Marais', location: 'Paris, France' },
    { year: 2022, title: 'Coastal Strata', gallery: 'North Light Gallery', location: 'Melbourne, Australia' },
  ];
</script>

<svelte:head>
  <title>About Lindsay — Artist Statement, Biography & Exhibitions</title>
  <meta name="description" content="Learn about contemporary visual artist Lindsay, her painting practice, materials, and exhibition history." />
</svelte:head>

<!-- Masthead Intro Header -->
<section class="about-masthead-section" aria-label="About Introduction">
  <h1 class="about-main-title">About Lindsay</h1>
</section>

<!-- Two-Column Editorial Layout -->
<div class="about-editorial-grid">
  <!-- Left Column: Portrait & Quick Facts -->
  <aside class="about-sidebar">
    <!-- Portrait Card -->
    <div class="neo-card portrait-card">
      <div class="portrait-media-wrap">
        <img
          src="/artworks/lindsay-portrait.jpg"
          alt="Artist Lindsay in her painting studio surrounded by canvases and pigments"
          class="portrait-img"
          loading="eager"
        />
        <span class="portrait-badge">STUDIO 2026</span>
      </div>
      <div class="portrait-caption-wrap">
        <p class="portrait-caption">
          Lindsay in her natural light studio, coastal California & Pacific Northwest.
        </p>
      </div>
    </div>

    <!-- Quick Facts Card -->
    <div class="neo-card facts-card">
      <span class="facts-sticker">STUDIO PROFILE</span>
      
      <div class="fact-item">
        <h2 class="fact-title">Location</h2>
        <p class="fact-desc">Coastal California & Pacific Northwest</p>
      </div>

      <div class="fact-item">
        <h2 class="fact-title">Primary Focus</h2>
        <p class="fact-desc">Oil, Dry Mineral Pigments, Hand-primed Belgian Linen</p>
      </div>

      <div class="fact-item">
        <h2 class="fact-title">Gallery Representation</h2>
        <p class="fact-desc">Gallery Meridian (New York) · Studio Oberlin (London)</p>
      </div>
    </div>
  </aside>

  <!-- Right Column: Bio Narrative -->
  <article class="about-content-main">
    <!-- Bio Narrative Card -->
    <div class="neo-card bio-card">
      <h2 class="bio-heading">Practice & Technique</h2>
      <div class="bio-text">
        <p>
          Lindsay is a contemporary painter whose work examines natural light, organic geology, and botanical forms.
          Working predominantly with oil paints, natural chalks, and raw mineral pigments on hand-primed Belgian linen,
          her canvases capture the meditative stillness of coastal landscapes and native flora.
        </p>
        <p>
          Her creative process is slow and layered. Beginning with thin washes of earth-toned glazes, each composition
          gradually accumulates structural weight through heavy impasto strokes, palette knife marks, and dry pigments.
          The resulting surfaces possess tactile depth—drawing viewers close to inspect micro-textures before stepping back
          to take in the harmonious expanse of the whole piece.
        </p>
        <p>
          Her works are held in private collections across North America, Europe, and Australia, and she regularly
          exhibits with contemporary galleries focusing on abstract landscapes and experimental botanical still life.
        </p>
      </div>
    </div>
  </article>
</div>

<style>
  /* About Masthead */
  .about-masthead-section {
    margin-bottom: 36px;
  }

  .about-main-title {
    font-size: clamp(2.5rem, 4.5vw, 3.8rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.05;
    margin-bottom: 12px;
  }

  /* Editorial Grid */
  .about-editorial-grid {
    display: grid;
    grid-template-columns: 380px 1fr;
    gap: 32px;
    align-items: start;
  }

  /* Shared Neobrutalist Card */
  .neo-card {
    background: var(--color-surface);
    border: var(--stroke-neo);
    box-shadow: var(--shadow-neo);
    border-radius: var(--radius-neo);
    overflow: hidden;
  }

  .portrait-card {
    border-radius: 0;
  }

  /* Sidebar */
  .about-sidebar {
    display: flex;
    flex-direction: column;
    gap: 28px;
  }

  .portrait-media-wrap {
    position: relative;
    width: 100%;
    aspect-ratio: 4/5;
    background-color: var(--color-surface);
    border-bottom: var(--stroke-neo);
    overflow: hidden;
  }

  .portrait-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .portrait-badge {
    position: absolute;
    top: 14px;
    right: 14px;
    background: var(--color-yellow);
    color: #121212;
    border: 2px solid var(--color-ink);
    box-shadow: var(--shadow-neo-xs);
    padding: 3px 10px;
    border-radius: var(--radius-neo-pill);
    font-family: var(--font-mono);
    font-size: 0.72rem;
    font-weight: 700;
  }

  .portrait-caption-wrap {
    padding: 16px 20px;
  }

  .portrait-caption {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    color: var(--color-muted);
    line-height: 1.5;
  }

  .facts-card {
    padding: 24px;
  }

  .facts-sticker {
    display: inline-block;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    background: var(--color-yellow);
    color: #121212;
    border: 1.5px solid var(--color-ink);
    padding: 2px 8px;
    border-radius: 4px;
    margin-bottom: 18px;
  }

  .fact-item {
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1.5px dashed var(--color-border-subtle);
  }

  .fact-item:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }

  .fact-title {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--color-muted);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 4px;
  }

  .fact-desc {
    font-size: 0.92rem;
    font-weight: 600;
    color: var(--color-ink);
    line-height: 1.4;
  }

  /* Main Bio Column */
  .about-content-main {
    display: flex;
    flex-direction: column;
    gap: 28px;
  }

  .bio-card {
    padding: 32px;
  }

  .bio-heading {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 18px;
  }

  .bio-text p {
    font-size: 1rem;
    line-height: 1.7;
    color: var(--color-ink);
    opacity: 0.92;
    margin-bottom: 16px;
  }

  .bio-text p:last-child {
    margin-bottom: 0;
  }

  /* Responsive Breakpoints */
  @media (max-width: 900px) {
    .about-editorial-grid {
      grid-template-columns: 1fr;
    }
    .portrait-card {
      max-width: 480px;
    }
  }
</style>

