<script lang="ts">
  import type { Artwork } from "#lib/data/sampleArtworks";

  let { artwork, onclick }: { artwork: Artwork; onclick?: () => void } =
    $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_to_interactive_role -->
<article
  class="neo-artwork-card artwork-card"
  class:has-video={!!artwork.videoUrl}
  data-collection={artwork.collection}
  style="--ar: {artwork.aspectRatio ?? 1}"
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
    {#if artwork.videoUrl}
      <video
        src={artwork.videoUrl}
        poster={artwork.imageUrl}
        autoplay
        loop
        muted
        playsinline
        class="art-img art-video"
        aria-label={artwork.alt}
      ></video>
    {:else}
      <img
        src={artwork.imageUrl}
        alt={artwork.alt}
        class="art-img"
        loading="lazy"
      />
    {/if}
  </div>
</article>

<style>
  .neo-artwork-card {
    /* Inner mat + border thickness: constant extra width on every card */
    --mat: 10px;
    --frame: calc(var(--mat) * 2 + 5px);

    /*
      Justified rows: grow factor and ideal width both scale with the image
      ratio (--ar), so every card in a row stretches by the same proportion
      and ends up the same height. --row-h comes from the gallery grid.
    */
    flex: var(--ar) 1 calc(var(--ar) * var(--row-h, 300px) + var(--frame));
    min-width: 0;

    background: var(--color-surface);
    border: var(--stroke-neo);
    box-shadow: var(--shadow-neo);
    border-radius: 0;
    padding: var(--mat);
    overflow: hidden;
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
      transform: scale(1.02);
    }
  }

  /* Tactile press feedback on click / tap */
  .neo-artwork-card:active {
    transform: translate(-1px, -1px);
    box-shadow: var(--shadow-neo-sm);
  }

  /* Box takes the artwork's exact shape, so nothing is ever cropped */
  .art-media-wrap {
    width: 100%;
    aspect-ratio: var(--ar);
    overflow: hidden;
  }

  .art-img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* box already matches the image ratio: 0px cropped */
    display: block;
    transition: transform var(--duration-normal, 220ms)
      var(--ease-out, cubic-bezier(0.23, 1, 0.32, 1));
  }

  @media (prefers-reduced-motion: reduce) {
    .neo-artwork-card,
    .art-img {
      transition: none;
    }
    .neo-artwork-card:hover .art-img {
      transform: none;
    }
  }
</style>
