<script lang="ts">
  import { page } from "$app/state";
  import { goto } from "$app/navigation";
  import ArtworkCard from "#lib/components/ArtworkCard.svelte";
  import ArtworkModal from "#lib/components/ArtworkModal.svelte";
  import {
    ARTWORK_TYPES,
    ARTWORK_TAGS,
    type ArtworkTag,
    type Artwork,
  } from "#lib/data/sampleArtworks";

  let { data } = $props<{ data: { artworks: Artwork[] } }>();

  let selectedFilter = $state<string>("all");
  let selectedTag = $state<ArtworkTag | "all">("all");
  let isModalOpen = $state(false);
  let activeModalIndex = $state(0);

  let artworks = $derived(data.artworks || []);

  $effect(() => {
    const colParam = page.url.searchParams.get("collection");
    if (colParam && ARTWORK_TYPES.some((c) => c.id === colParam)) {
      selectedFilter = colParam;
    } else if (!colParam) {
      selectedFilter = "all";
    }

    const tagParam = page.url.searchParams.get("tag");
    if (tagParam && ARTWORK_TAGS.includes(tagParam as ArtworkTag)) {
      selectedTag = tagParam as ArtworkTag;
    } else if (!tagParam) {
      selectedTag = "all";
    }
  });

  let filteredArtworks = $derived(
    artworks.filter((art) => {
      const matchesType =
        selectedFilter === "all" ||
        (selectedFilter === "illustration"
          ? [
              "bust",
              "half-body",
              "full-body",
              "chibi",
              "illustration",
            ].includes(art.collection)
          : art.collection === selectedFilter);
      const matchesTag =
        selectedTag === "all" || art.tags.includes(selectedTag);
      return matchesType && matchesTag;
    }),
  );

  function syncUrlParams(collectionId: string, tagId: ArtworkTag | "all") {
    const url = new URL(window.location.href);
    if (collectionId === "all") {
      url.searchParams.delete("collection");
    } else {
      url.searchParams.set("collection", collectionId);
    }
    if (tagId === "all") {
      url.searchParams.delete("tag");
    } else {
      url.searchParams.set("tag", tagId);
    }
    goto(url.search ? url.pathname + url.search : url.pathname, {
      replaceState: true,
      keepFocus: true,
      noScroll: true,
    });
  }

  function selectCollection(id: string) {
    selectedFilter = id;
    syncUrlParams(id, selectedTag);
  }

  function selectTag(tag: ArtworkTag | "all") {
    const nextTag = tag !== "all" && selectedTag === tag ? "all" : tag;
    selectedTag = nextTag;
    syncUrlParams(selectedFilter, nextTag);
  }

  function resetFilters() {
    selectedFilter = "all";
    selectedTag = "all";
    syncUrlParams("all", "all");
  }

  function openArtwork(artId: string) {
    const idx = filteredArtworks.findIndex((a) => a._id === artId);
    activeModalIndex = idx !== -1 ? idx : 0;
    isModalOpen = true;
  }
</script>

<svelte:head>
  <title>Portfolio Archive — Yukiro Visual Art & Illustrations</title>
  <meta
    name="description"
    content="Browse the complete digital art catalog by Yukiro: character designs, original paintings, animations, and commission archive."
  />
  <meta
    property="og:title"
    content="Portfolio Archive — Yukiro Visual Art & Illustrations"
  />
  <meta
    property="og:description"
    content="Browse the complete digital art catalog by Yukiro: character designs, original paintings, animations, and commission archive."
  />
  <meta
    name="twitter:title"
    content="Portfolio Archive — Yukiro Visual Art & Illustrations"
  />
  <meta
    name="twitter:description"
    content="Browse the complete digital art catalog by Yukiro: character designs, original paintings, animations, and commission archive."
  />
</svelte:head>

<!-- Gallery Header -->
<section class="gallery-masthead-section" aria-label="Portfolio Introduction">
  <h1 class="gallery-main-title">Portfolio</h1>
</section>

<!-- Bento Box Artwork Showcase -->
<section class="gallery-section" aria-label="Artwork Gallery Showcase">
  <!-- Framing Type Filter Toolbar -->
  <div class="neo-filters-bar">
    <span class="filter-row-label">Type</span>
    <div class="neo-filters" role="tablist" aria-label="Artwork Types">
      {#each ARTWORK_TYPES as col}
        <button
          type="button"
          role="tab"
          class="neo-filter-pill"
          class:active={selectedFilter === col.id}
          aria-selected={selectedFilter === col.id}
          onclick={() => selectCollection(col.id)}
          data-text={col.label}
        >
          <span class="pill-label">{col.label}</span>
        </button>
      {/each}
    </div>
  </div>

  <!-- Secondary Tag Filter Toolbar -->
  <div class="neo-tags-filter-bar" aria-label="Artwork Tags">
    <span class="filter-row-label">Tag</span>
    <div class="neo-tags-list" role="group" aria-label="Filter by tag">
      <button
        type="button"
        class="neo-tag-pill"
        class:active={selectedTag === "all"}
        aria-pressed={selectedTag === "all"}
        onclick={() => selectTag("all")}
        data-text="ALL TAGS"
      >
        <span class="pill-label">ALL TAGS</span>
      </button>
      {#each ARTWORK_TAGS as tag}
        <button
          type="button"
          class="neo-tag-pill"
          class:active={selectedTag === tag}
          aria-pressed={selectedTag === tag}
          onclick={() => selectTag(tag)}
          data-text="#{tag}"
        >
          <span class="pill-label">#{tag}</span>
        </button>
      {/each}
    </div>
  </div>

  <!-- Pure Bento Artwork Grid -->
  {#if filteredArtworks.length > 0}
    <div class="neo-artwork-grid" id="artworkGrid">
      {#each filteredArtworks as art (art._id)}
        <ArtworkCard artwork={art} onclick={() => openArtwork(art._id)} />
      {/each}
    </div>
  {:else}
    <div class="empty-filter-state">
      <p class="empty-filter-text">
        No artworks match this Type + Tag combination yet.
      </p>
      <button type="button" class="reset-filter-btn" onclick={resetFilters}>
        Reset Filters
      </button>
    </div>
  {/if}
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
    font-family: var(--font-heading);
    font-size: clamp(2.5rem, 4.5vw, 3.8rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.05;
    color: var(--color-ink);
    margin: 0;
  }

  /* Collection Filter Bar */
  .neo-filters-bar {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 14px;
    overflow-x: auto;
    padding-bottom: 8px;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
  }

  .neo-filters-bar::-webkit-scrollbar {
    display: none;
  }

  .filter-row-label {
    font-family: var(--font-body);
    font-size: 0.9rem;
    font-weight: 400;
    color: var(--color-ink-muted);
    white-space: nowrap;
    flex-shrink: 0;
    min-width: 44px;
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
    padding: 8px 18px;
    min-height: 44px;
    display: inline-grid;
    place-items: center;
    border-radius: var(--radius-neo-pill);
    font-family: var(--font-mono);
    font-size: 0.82rem;
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

  /* Pre-reserve container width based on bold font-weight 700 */
  .neo-filter-pill::before {
    content: attr(data-text);
    font-weight: 700;
    visibility: hidden;
    grid-area: 1 / 1;
    pointer-events: none;
    user-select: none;
    white-space: nowrap;
  }

  .neo-filter-pill .pill-label {
    grid-area: 1 / 1;
    font-weight: 400;
    white-space: nowrap;
    transition: font-weight 0.15s ease;
  }

  .neo-filter-pill:hover {
    background-color: var(--color-border-subtle);
    color: var(--color-ink);
  }

  .neo-filter-pill:hover .pill-label {
    font-weight: 700;
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

  .neo-filter-pill.active .pill-label {
    font-weight: 700;
  }

  .neo-filter-pill.active:hover {
    background-color: var(--color-ink);
    color: var(--color-bg);
  }

  .neo-filter-pill.active:active {
    transform: translate(2px, 2px);
    box-shadow: 0px 0px 0px var(--color-ink);
  }

  /* Secondary Tag Filter Bar */
  .neo-tags-filter-bar {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 32px;
    overflow-x: auto;
    padding-bottom: 6px;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
  }

  .neo-tags-filter-bar::-webkit-scrollbar {
    display: none;
  }

  .neo-tags-list {
    display: flex;
    align-items: center;
    gap: 8px;
    white-space: nowrap;
  }

  .neo-tag-pill {
    background: var(--color-surface);
    border: 2px solid var(--color-ink);
    box-shadow: 2px 2px 0px var(--color-ink);
    padding: 5px 13px;
    min-height: 36px;
    display: inline-grid;
    place-items: center;
    border-radius: var(--radius-neo-pill);
    font-family: var(--font-mono);
    font-size: 0.75rem;
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

  /* Pre-reserve container width based on bold font-weight 700 */
  .neo-tag-pill::before {
    content: attr(data-text);
    font-weight: 700;
    visibility: hidden;
    grid-area: 1 / 1;
    pointer-events: none;
    user-select: none;
    white-space: nowrap;
  }

  .neo-tag-pill .pill-label {
    grid-area: 1 / 1;
    font-weight: 400;
    white-space: nowrap;
    transition: font-weight 0.15s ease;
  }

  .neo-tag-pill:hover {
    background-color: var(--color-border-subtle);
  }

  .neo-tag-pill:hover .pill-label {
    font-weight: 700;
  }

  .neo-tag-pill:active {
    transform: translate(2px, 2px);
    box-shadow: 0px 0px 0px var(--color-ink);
  }

  .neo-tag-pill.active {
    background-color: var(--color-yellow, #ffd027);
    color: #121212;
    box-shadow: 2px 2px 0px var(--color-ink);
  }

  .neo-tag-pill.active .pill-label {
    font-weight: 700;
  }

  .neo-tag-pill.active:hover {
    background-color: var(--color-yellow, #ffd027);
    color: #121212;
  }

  /* Empty State */
  .empty-filter-state {
    border: var(--stroke-neo);
    box-shadow: var(--shadow-neo-sm);
    background: var(--color-surface);
    border-radius: var(--radius-neo);
    padding: 40px 24px;
    text-align: center;
    margin-bottom: 64px;
  }

  .empty-filter-text {
    font-family: var(--font-mono);
    font-size: 0.9rem;
    color: var(--color-ink-muted);
    margin: 0 0 16px;
  }

  .reset-filter-btn {
    background: var(--color-yellow, #ffd027);
    color: #121212;
    border: var(--stroke-neo);
    box-shadow: var(--shadow-neo-xs);
    border-radius: var(--radius-neo-pill);
    padding: 8px 18px;
    font-family: var(--font-mono);
    font-size: 0.8rem;
    font-weight: 700;
    cursor: var(--cursor-pointer);
  }

  @media (prefers-reduced-motion: reduce) {
    .neo-filter-pill,
    .neo-filter-pill:active,
    .neo-filter-pill.active:active,
    .neo-tag-pill,
    .neo-tag-pill:active {
      transform: none !important;
      transition:
        background-color 0.15s ease,
        color 0.15s ease !important;
    }
  }

  /* Justified-rows gallery: equal height per row, zero cropping, left-to-right order */
  .neo-artwork-grid {
    --row-h: 300px;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: var(--grid-gap, 24px);
    margin-bottom: 64px;
  }

  /* Filler keeps the last row at natural height instead of stretching it */
  .neo-artwork-grid::after {
    content: "";
    flex-grow: 999999;
  }

  @media (max-width: 992px) {
    .neo-artwork-grid {
      --row-h: 240px;
    }
  }

  @media (max-width: 600px) {
    .neo-artwork-grid {
      --row-h: 200px;
    }
  }

  @media (max-width: 680px) {
    .gallery-main-title {
      font-size: 2.2rem;
    }
  }
</style>
