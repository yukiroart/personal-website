<script lang="ts">
  const tools = [
    { name: "Toonboom", icon: "/icons/tools/toonboom.png" },
    { name: "IbisPaint", icon: "/icons/tools/ibispaint.svg" },
    { name: "Adobe Photoshop", icon: "/icons/tools/photoshop.svg" },
    { name: "Adobe Premiere", icon: "/icons/tools/premiere.svg" },
    { name: "Adobe After Effects", icon: "/icons/tools/aftereffects.svg" },
  ];

  const exhibitions = [
    {
      year: 2026,
      title: "Luminescence",
      gallery: "Gallery Meridian",
      location: "New York, USA",
    },
    {
      year: 2025,
      title: "Mineral & Void",
      gallery: "Studio Oberlin",
      location: "London, UK",
    },
    {
      year: 2024,
      title: "New Botanical Form",
      gallery: "Pacific Contemporary",
      location: "San Francisco, USA",
    },
    {
      year: 2023,
      title: "Studies in Cadmium",
      gallery: "Atelier Marais",
      location: "Paris, France",
    },
    {
      year: 2022,
      title: "Coastal Strata",
      gallery: "North Light Gallery",
      location: "Melbourne, Australia",
    },
  ];
</script>

<svelte:head>
  <title>About Yukiro — Artist Statement, Biography & Exhibitions</title>
  <meta
    name="description"
    content="Learn about contemporary visual artist Yukiro, her painting practice, materials, and exhibition history."
  />
</svelte:head>

<!-- Masthead Intro Header -->
<section class="about-masthead-section" aria-label="About Introduction">
  <h1 class="about-main-title">About Yukiro</h1>
</section>

<!-- Two-Column Editorial Layout -->
<div class="about-editorial-grid">
  <!-- Left Column: Portrait & Quick Facts -->
  <aside class="about-sidebar">
    <!-- Portrait Card (Instax Mini Polaroid) -->
    <div class="neo-card portrait-card">
      <div
        class="portrait-media-wrap"
        role="img"
        aria-label="Artist portrait placeholder"
      ></div>
    </div>

    <!-- Education Card -->
    <div class="neo-card education-card">
      <h2 class="education-heading">Education</h2>

      <div class="education-item">
        <h3 class="education-school">De La Salle Benilde</h3>
        <p class="education-program">Art & Animation</p>
      </div>
    </div>
  </aside>

  <!-- Right Column: Bio Narrative -->
  <article class="about-content-main">
    <!-- Tools Section -->
    <div class="neo-card tools-card">
      <h2 class="tools-heading">Tools</h2>
      <div class="tools-grid">
        {#each tools as tool}
          <div class="tool-item-card">
            <img
              src={tool.icon}
              alt="{tool.name} logo"
              class="tool-icon"
              loading="lazy"
            />
            <span class="tool-name">{tool.name}</span>
          </div>
        {/each}
      </div>
    </div>

    <!-- Bio Narrative Card -->
    <div class="neo-card bio-card">
      <h2 class="bio-heading">Practice & Technique</h2>
      <div class="bio-text">
        <p>
          Yukiro is a contemporary painter whose work examines natural light,
          organic geology, and botanical forms. Working predominantly with oil
          paints, natural chalks, and raw mineral pigments on hand-primed
          Belgian linen, her canvases capture the meditative stillness of
          coastal landscapes and native flora.
        </p>
        <p>
          Her creative process is slow and layered. Beginning with thin washes
          of earth-toned glazes, each composition gradually accumulates
          structural weight through heavy impasto strokes, palette knife marks,
          and dry pigments. The resulting surfaces possess tactile depth—drawing
          viewers close to inspect micro-textures before stepping back to take
          in the harmonious expanse of the whole piece.
        </p>
        <p>
          Her works are held in private collections across North America,
          Europe, and Australia, and she regularly exhibits with contemporary
          galleries focusing on abstract landscapes and experimental botanical
          still life.
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
    background: #FFFFFF;
    border: 2.5px solid #121212;
    border-radius: 0;
    padding: 16px 16px 56px 16px;
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
    aspect-ratio: 3 / 4;
    background-color: var(--color-green);
    border: 2px solid #121212;
    overflow: hidden;
  }

  .education-card {
    padding: 32px;
  }

  .education-heading {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0 0 18px 0;
  }

  .education-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .education-school {
    font-family: var(--font-heading);
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--color-ink);
    line-height: 1.3;
  }

  .education-program {
    font-family: var(--font-body);
    font-size: 0.92rem;
    font-weight: 500;
    color: var(--color-muted);
    line-height: 1.4;
  }

  /* Main Bio Column */
  .about-content-main {
    display: flex;
    flex-direction: column;
    gap: 28px;
  }

  /* Tools Card */
  .tools-card {
    padding: 32px;
  }

  .tools-heading {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0 0 18px 0;
  }

  .tools-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
    gap: 12px;
  }

  .tool-item-card {
    display: flex;
    align-items: center;
    gap: 10px;
    background: var(--color-surface);
    border: var(--stroke-neo);
    border-radius: var(--radius-neo-sm);
    padding: 10px 14px;
    box-shadow: none;
  }

  .tool-icon {
    width: 24px;
    height: 24px;
    object-fit: contain;
    flex-shrink: 0;
    border-radius: 4px;
  }

  .tool-name {
    font-family: var(--font-heading);
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--color-ink);
    line-height: 1.25;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
