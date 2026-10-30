<script lang="ts">
  import type { Artwork } from "#lib/data/sampleArtworks";

  let { artwork, onclick }: { artwork: Artwork; onclick?: () => void } =
    $props();
  let spanClass = $derived(`neo-${artwork.bentoSpan}`);
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_to_interactive_role -->
<article
  class="neo-artwork-card {spanClass} artwork-card"
  data-collection={artwork.collection}
  role="button"
  tabindex="0"
  aria-label="View {artwork.title} in lightbox preview"
  {onclick}
  onkeydown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onclick?.();
    }
  }}
>
  <div class="art-media-wrap">
    <img
      src={artwork.imageUrl}
      alt={artwork.alt}
      class="art-img"
      loading="lazy"
    />
  </div>
</article>

<style>
  .neo-artwork-card {
    background: var(--color-surface);
    border: var(--stroke-neo);
    box-shadow: var(--shadow-neo);
    border-radius: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    cursor: var(--cursor-pointer);
    transition:
      transform var(--duration-fast, 120ms)
        var(--ease-out, cubic-bezier(0.23, 1, 0.32, 1)),
      box-shadow var(--duration-fast, 120ms)
        var(--ease-out, cubic-bezier(0.23, 1, 0.32, 1));
  }

  /* Only apply lift on desktop pointers to avoid sticky touch states */
  @media (hover: hover) and (pointer: fine) {
    .neo-artwork-card:hover {
      transform: translate(-3px, -3px);
      box-shadow: var(--shadow-neo-hover);
    }

    .neo-artwork-card:hover .art-img {
      transform: scale(1.025);
    }
  }

  /* Tactile press feedback on click / tap */
  .neo-artwork-card:active {
    transform: translate(-1px, -1px);
    box-shadow: var(--shadow-neo-sm);
  }

  /* Bento Spans */
  .neo-hero {
    grid-column: span 7;
  }

  .neo-tall {
    grid-column: span 5;
  }

  .neo-square {
    grid-column: span 4;
  }

  .neo-wide {
    grid-column: span 8;
  }

  .art-media-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: var(--color-surface);
    overflow: hidden;
  }

  .neo-hero .art-media-wrap {
    aspect-ratio: 16/10;
  }

  .neo-tall .art-media-wrap {
    aspect-ratio: 4/5;
  }

  .neo-square .art-media-wrap {
    aspect-ratio: 1/1;
  }

  .neo-wide .art-media-wrap {
    aspect-ratio: 16/9;
  }

  .art-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform var(--duration-normal, 220ms)
      var(--ease-out, cubic-bezier(0.23, 1, 0.32, 1));
  }

  /* Responsive Spans */
  @media (max-width: 992px) {
    .neo-hero,
    .neo-wide {
      grid-column: span 12;
    }
    .neo-tall,
    .neo-square {
      grid-column: span 6;
    }
  }

  @media (max-width: 680px) {
    .neo-tall,
    .neo-square {
      grid-column: span 12;
    }
  }

  /* Respect reduced motion preferences */
  @media (prefers-reduced-motion: reduce) {
    .neo-artwork-card,
    .neo-artwork-card:hover,
    .neo-artwork-card:active,
    .art-img,
    .neo-artwork-card:hover .art-img {
      transform: none !important;
      transition: none !important;
    }
  }
</style>
