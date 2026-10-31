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
  <title>About Yukiro — Artist Bio, Tools & Background</title>
  <meta
    name="description"
    content="Get to know digital illustrator Yukiro: character design focus, artistic background, and creative software suite."
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
      <div class="portrait-media-wrap">
        <img
          src="/artworks/yukiro-portrait.jpg"
          alt="Portrait of Lindsay (Yukiro)"
          class="portrait-img"
          loading="eager"
        />
      </div>
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
              class:tool-icon-toonboom={tool.name === "Toonboom"}
              loading="lazy"
            />
            <span class="tool-name">{tool.name}</span>
          </div>
        {/each}
      </div>
    </div>

    <!-- Bio Narrative Card -->
    <div class="neo-card bio-card">
      <h2 class="bio-heading">Bio</h2>
      <ul class="bio-list">
        <li>
          Salutations! Thank you for stumbling upon my website. My name is
          Lindsay, and I go by Yukiro as my username.
        </li>
        <li>
          I am a digital illustrator, who enjoys character design! I can also do
          diverse art styles if need be.
        </li>
        <li>
          I love indulging in my hobbies such as wotagei (a unique japanese art
          form where you dance with lightsticks), as I am in a wotagei dance
          group called Zappu!
        </li>
        <li>I also like skateboarding and video games.</li>
      </ul>
    </div>
  </article>
</div>

<style>
  /* About Masthead */
  .about-masthead-section {
    margin-bottom: 36px;
  }

  .about-main-title {
    font-family: var(--font-heading);
    font-size: clamp(2.5rem, 4.5vw, 3.8rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.05;
    color: var(--color-ink);
    margin: 0;
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
    border-radius: 0;
    overflow: hidden;
  }

  .portrait-card {
    background: #ffffff;
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
    background-color: #121212;
    border: 2px solid #121212;
    overflow: hidden;
  }

  .portrait-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
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
    border-radius: 0;
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

  .tool-icon-toonboom {
    filter: invert(1);
    transition: filter 0.15s ease;
  }

  :global(:root[data-theme="dark"]) .tool-icon-toonboom {
    filter: invert(0);
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

  .bio-list {
    list-style: disc;
    padding-left: 20px;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .bio-list li {
    font-family: var(--font-body);
    font-size: 1rem;
    line-height: 1.65;
    color: var(--color-ink);
    opacity: 0.94;
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

  @media (max-width: 640px) {
    .education-card,
    .tools-card,
    .bio-card {
      padding: 22px 18px;
    }

    .tools-grid {
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 10px;
    }

    .tool-item-card {
      padding: 8px 10px;
      min-height: 44px;
    }

    .about-editorial-grid {
      gap: 20px;
    }
  }
</style>
