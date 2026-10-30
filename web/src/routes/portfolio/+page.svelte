<script lang="ts">
  import { page } from "$app/state";
  import { goto } from "$app/navigation";
  import ArtworkCard from "#lib/components/ArtworkCard.svelte";
  import ArtworkModal from "#lib/components/ArtworkModal.svelte";
  import { sampleArtworks } from "#lib/data/sampleArtworks";

  const collections = [
    { id: "all", label: "All Works" },
    { id: "new-works", label: "New Works" },
    { id: "landscapes", label: "Landscapes & Botanicals" },
    { id: "abstracts", label: "Abstract Studies" },
    { id: "portraits", label: "Portraiture" },
  ];

  let selectedFilter = $state("all");
  let isModalOpen = $state(false);
  let activeModalIndex = $state(0);

  $effect(() => {
    const colParam = page.url.searchParams.get("collection");
    if (colParam && collections.some((c) => c.id === colParam)) {
      selectedFilter = colParam;
    } else if (!colParam) {
      selectedFilter = "all";
    }
  });

  let filteredArtworks = $derived(
    selectedFilter === "all"
      ? sampleArtworks
      : sampleArtworks.filter((art) => art.collection === selectedFilter),
  );

  function selectCollection(id: string) {
    selectedFilter = id;
    const url = new URL(window.location.href);
    if (id === "all") {
      url.searchParams.delete("collection");
    } else {
      url.searchParams.set("collection", id);
    }
    goto(url.search ? url.pathname + url.search : url.pathname, {
      replaceState: true,
      keepFocus: true,
      noScroll: true,
    });
  }

  function openArtwork(artId: string) {
    const idx = filteredArtworks.findIndex((a) => a._id === artId);
    activeModalIndex = idx !== -1 ? idx : 0;
    isModalOpen = true;
  }
</script>

<svelte:head>
  <title>Portfolio — Selected Works & Contemporary Art by Lindsay</title>
  <meta
    name="description"
    content="Explore the complete archive of original paintings, botanicals, and abstract studies by Lindsay."
  />
</svelte:head>

<!-- Gallery Header -->
<section class="gallery-masthead-section" aria-label="Portfolio Introduction">
  <h1 class="gallery-main-title">Selected Works</h1>
</section>

<!-- Bento Box Artwork Showcase -->
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
          onclick={() => selectCollection(col.id)}
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
      transform 0.1s ease,
      box-shadow 0.1s ease,
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
