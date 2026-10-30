<script lang="ts">
  import type { Artwork } from "#lib/data/sampleArtworks";

  let {
    isOpen = $bindable(false),
    artworks = [],
    initialIndex = 0,
    onclose,
  }: {
    isOpen: boolean;
    artworks: Artwork[];
    initialIndex: number;
    onclose?: () => void;
  } = $props();

  let dialogEl = $state<HTMLDialogElement | null>(null);
  let currentIndex = $state(0);
  let isZoomed = $state(false);
  let zoomOrigin = $state("center center");

  $effect(() => {
    if (isOpen) {
      currentIndex = initialIndex;
      isZoomed = false;
      zoomOrigin = "center center";
      dialogEl?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      if (dialogEl?.open) {
        dialogEl.close();
      }
      document.body.style.overflow = "";
    }
  });

  let currentArt = $derived(artworks[currentIndex]);

  $effect(() => {
    if (isOpen && artworks.length > 1) {
      const prevIdx = (currentIndex - 1 + artworks.length) % artworks.length;
      const nextIdx = (currentIndex + 1) % artworks.length;
      if (artworks[prevIdx]) {
        const p = new Image();
        p.src = artworks[prevIdx].imageUrl;
      }
      if (artworks[nextIdx]) {
        const n = new Image();
        n.src = artworks[nextIdx].imageUrl;
      }
    }
  });

  function closeModal() {
    isOpen = false;
    onclose?.();
  }

  function step(direction: number) {
    if (artworks.length <= 1) return;
    isZoomed = false;
    currentIndex =
      (currentIndex + direction + artworks.length) % artworks.length;
  }

  function toggleZoom(event: MouseEvent) {
    const img = event.currentTarget as HTMLElement;
    isZoomed = !isZoomed;
    if (isZoomed) {
      const rect = img.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;
      const xPercent = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));
      const yPercent = Math.max(
        0,
        Math.min(100, (offsetY / rect.height) * 100),
      );
      zoomOrigin = `${xPercent}% ${yPercent}%`;
    } else {
      zoomOrigin = "center center";
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (!isOpen) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    }
  }

  let touchStartX = 0;
  let touchStartY = 0;

  function handleTouchStart(e: TouchEvent) {
    if (e.touches.length === 1) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }
  }

  function handleTouchEnd(e: TouchEvent) {
    if (isZoomed) return;
    if (e.changedTouches.length === 1) {
      const deltaX = e.changedTouches[0].clientX - touchStartX;
      const deltaY = e.changedTouches[0].clientY - touchStartY;
      if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
        if (deltaX < 0) {
          step(1);
        } else {
          step(-1);
        }
      }
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- svelte-ignore a11y_click_events_have_key_events -->
<dialog
  bind:this={dialogEl}
  class="neo-art-dialog"
  aria-modal="true"
  aria-label="Artwork Preview"
  onclick={(e) => {
    if (e.target === dialogEl) closeModal();
  }}
  onclose={() => {
    isOpen = false;
    onclose?.();
  }}
>
  <div class="dialog-shell">
    <div
      class="dialog-stage"
      ontouchstart={handleTouchStart}
      ontouchend={handleTouchEnd}
      role="region"
      aria-label="Artwork Viewport"
    >
      <!-- Close Button (Minimal Floating Control) -->
      <button
        onclick={closeModal}
        type="button"
        class="dialog-btn dialog-close-btn"
        aria-label="Close modal preview (Escape)"
      >
        ✕
      </button>

      <!-- Navigation Arrows -->
      <button
        onclick={() => step(-1)}
        type="button"
        class="dialog-nav-btn prev"
        aria-label="Previous artwork (Left Arrow)"
      >
        ←
      </button>

      <!-- Fixed Uniform Artwork Viewport -->
      <div class="dialog-viewport">
        <div class="dialog-zoom-track" class:is-zoomed={isZoomed}>
          {#if currentArt}
            <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
            <img
              src={currentArt.imageUrl}
              alt={currentArt.alt}
              class="dialog-img"
              draggable="false"
              onclick={toggleZoom}
              style:transform-origin={zoomOrigin}
            />
          {/if}
        </div>
      </div>

      <button
        onclick={() => step(1)}
        type="button"
        class="dialog-nav-btn next"
        aria-label="Next artwork (Right Arrow)"
      >
        →
      </button>
    </div>
  </div>
</dialog>

<style>
  /* Native <dialog> Reset & Backdrop */
  .neo-art-dialog {
    background: transparent;
    border: none;
    padding: 0;
    margin: auto;
    overflow: visible;
    max-width: 95vw;
    max-height: 94vh;
  }

  .neo-art-dialog::backdrop {
    background: rgba(12, 12, 14, 0.86);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    animation: fadeInBackdrop 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @keyframes fadeInBackdrop {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  /* Sharp Neobrutalist Dialog Frame: Locked Consistent Dimensions */
  .dialog-shell {
    background: var(--color-surface);
    border: var(--stroke-neo);
    box-shadow: var(--shadow-neo);
    border-radius: 0;
    display: flex;
    flex-direction: column;
    width: min(88vw, 960px, calc(84vh * (4 / 3)));
    aspect-ratio: 4 / 3;
    max-height: 84vh;
    overflow: hidden;
    position: relative;
    animation: zoomInDialog 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @keyframes zoomInDialog {
    from {
      opacity: 0;
      transform: scale(0.96) translateY(8px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  /* Main Visual Stage */
  .dialog-stage {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-bg);
    width: 100%;
    height: 100%;
    padding: 24px;
    box-sizing: border-box;
    overflow: hidden;
  }

  /* Minimal Action Buttons */
  .dialog-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: var(--color-surface);
    color: var(--color-ink);
    border: var(--stroke-neo);
    border-radius: 0;
    box-shadow: var(--shadow-neo-xs);
    font-family: var(--font-heading);
    font-size: 1.05rem;
    font-weight: 700;
    cursor: pointer;
    transition:
      transform 0.1s ease,
      box-shadow 0.1s ease,
      background 0.1s ease;
  }

  .dialog-close-btn {
    position: absolute;
    top: 14px;
    right: 14px;
    z-index: 20;
  }

  .dialog-btn:hover {
    background: var(--color-border-subtle);
  }

  .dialog-btn:active {
    transform: translate(2px, 2px);
    box-shadow: 0px 0px 0px var(--color-ink);
  }

  .dialog-nav-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 15;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    background: var(--color-surface);
    color: var(--color-ink);
    border: var(--stroke-neo);
    border-radius: 0;
    box-shadow: var(--shadow-neo-xs);
    font-family: var(--font-heading);
    font-size: 1.25rem;
    font-weight: 700;
    cursor: pointer;
    transition:
      transform 0.1s ease,
      box-shadow 0.1s ease,
      background 0.1s ease;
  }

  .dialog-nav-btn.prev {
    left: 14px;
  }

  .dialog-nav-btn.next {
    right: 14px;
  }

  .dialog-nav-btn:hover {
    background: var(--color-border-subtle);
  }

  .dialog-nav-btn:active {
    transform: translateY(-50%) translate(2px, 2px);
    box-shadow: 0px 0px 0px var(--color-ink);
  }

  /* Consistent Image Viewport & Zoom Track */
  .dialog-viewport {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .dialog-zoom-track {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .dialog-zoom-track.is-zoomed {
    overflow: auto;
  }

  .dialog-img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    cursor: zoom-in;
    transition:
      transform 0.28s cubic-bezier(0.16, 1, 0.3, 1),
      opacity 0.12s ease;
    user-select: none;
    -webkit-user-drag: none;
  }

  .dialog-zoom-track.is-zoomed .dialog-img {
    cursor: zoom-out;
    transform: scale(1.85);
  }

  /* Responsive Adjustments */
  @media (max-width: 768px) {
    .dialog-shell {
      width: 92vw;
      max-height: 80vh;
    }

    .dialog-stage {
      padding: 12px;
    }

    .dialog-close-btn {
      top: 8px;
      right: 8px;
      width: 36px;
      height: 36px;
      font-size: 0.95rem;
    }

    .dialog-nav-btn {
      width: 38px;
      height: 38px;
      font-size: 1.1rem;
    }

    .dialog-nav-btn.prev {
      left: 8px;
    }

    .dialog-nav-btn.next {
      right: 8px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .dialog-shell,
    .neo-art-dialog::backdrop {
      animation: none !important;
    }

    .dialog-img,
    .dialog-btn,
    .dialog-nav-btn {
      transition: none !important;
    }
  }
</style>
