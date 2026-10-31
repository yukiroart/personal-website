<script lang="ts">
  import ArtworkCard from "#lib/components/ArtworkCard.svelte";
  import ArtworkModal from "#lib/components/ArtworkModal.svelte";
  import { sampleArtworks } from "#lib/data/sampleArtworks";

  const collections = [
    { id: "all", label: "All Illustrations" },
    { id: "bust", label: "Bust" },
    { id: "half-body", label: "Half Body" },
    { id: "full-body", label: "Full Body" },
  ];

  let selectedFilter = $state("all");
  let isModalOpen = $state(false);
  let activeModalIndex = $state(0);

  let filteredArtworks = $derived(
    selectedFilter === "all"
      ? sampleArtworks
      : sampleArtworks.filter((art) => art.collection === selectedFilter),
  );

  function openArtwork(artId: string) {
    const idx = filteredArtworks.findIndex((a) => a._id === artId);
    activeModalIndex = idx !== -1 ? idx : 0;
    isModalOpen = true;
  }
</script>

<svelte:head>
  <title>Yukiro's Art Portfolio</title>
  <meta
    name="description"
    content="Original paintings, botanical studies, and textural mineral compositions by Yukiro."
  />
</svelte:head>

<!-- Gallery Introduction Header -->
<section class="gallery-masthead-section" aria-label="Gallery Introduction">
  <h1 class="gallery-main-title">Portfolio</h1>
</section>

<!-- Bento Box Artwork Gallery -->
<section class="gallery-section" aria-label="Artwork Gallery Showcase">
  <!-- Collection Filter Toolbar -->
  <div class="neo-filters-bar">
    <div class="neo-filters" role="tablist" aria-label="Artwork Collections">
      {#each collections as col}
        <button
          type="button"
          role="tab"
          class="neo-filter-pill"
          class:active={selectedFilter === col.id}
          aria-selected={selectedFilter === col.id}
          onclick={() => (selectedFilter = col.id)}
        >
          {col.label}
        </button>
      {/each}
    </div>
  </div>

  <!-- Pure Bento Artwork Grid -->
  <div class="neo-artwork-grid" id="artworkGrid">
    {#each filteredArtworks as art (art._id)}
      <ArtworkCard artwork={art} onclick={() => openArtwork(art._id)} />
    {/each}
  </div>
</section>

<!-- Interactive Lightbox Modal -->
<ArtworkModal
  bind:isOpen={isModalOpen}
  artworks={filteredArtworks}
  initialIndex={activeModalIndex}
/>

<style>
  /* Gallery Introduction Header */
  .gallery-masthead-section {
    margin-bottom: 36px;
  }

  .gallery-main-title {
    font-size: clamp(2.5rem, 4.5vw, 3.8rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.05;
    margin-bottom: 12px;
  }

  /* Collection Filter Bar */
  .neo-filters-bar {
    margin-bottom: 32px;
    overflow-x: auto;
    padding-bottom: 8px;
  }

  .neo-filters {
    display: flex;
    gap: 10px;
    white-space: nowrap;
  }

  .neo-filter-pill {
    background: var(--color-surface);
    border: var(--stroke-neo);
    box-shadow: var(--shadow-neo-xs);
    padding: 9px 18px;
    border-radius: var(--radius-neo-pill);
    font-family: var(--font-mono);
    font-size: 0.82rem;
    font-weight: 700;
    color: var(--color-ink);
    cursor: var(--cursor-pointer);
    user-select: none;
    transition:
      transform var(--duration-fast, 120ms)
        var(--ease-out, cubic-bezier(0.23, 1, 0.32, 1)),
      box-shadow var(--duration-fast, 120ms)
        var(--ease-out, cubic-bezier(0.23, 1, 0.32, 1)),
      background-color 0.15s ease,
      color 0.15s ease;
  }

  .neo-filter-pill:hover {
    background-color: var(--color-border-subtle);
    color: var(--color-ink);
  }

  .neo-filter-pill:active {
    transform: translate(2px, 2px);
    box-shadow: 0px 0px 0px var(--color-ink);
  }

  .neo-filter-pill.active {
    background-color: var(--color-ink);
    color: var(--color-bg);
    box-shadow: var(--shadow-neo-xs);
  }

  .neo-filter-pill.active:hover {
    background-color: var(--color-ink);
    color: var(--color-bg);
  }

  .neo-filter-pill.active:active {
    transform: translate(2px, 2px);
    box-shadow: 0px 0px 0px var(--color-ink);
  }

  @media (prefers-reduced-motion: reduce) {
    .neo-filter-pill,
    .neo-filter-pill:active,
    .neo-filter-pill.active:active {
      transform: none !important;
      transition:
        background-color 0.15s ease,
        color 0.15s ease !important;
    }
  }

  .neo-filter-pill.active:active {
    transform: translate(2px, 2px);
    box-shadow: 0px 0px 0px var(--color-ink);
  }

  /* Bento Artwork Grid */
  .neo-artwork-grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: var(--grid-gap);
    margin-bottom: 64px;
  }

  @media (max-width: 680px) {
    .gallery-main-title {
      font-size: 2.2rem;
    }
  }
</style>
