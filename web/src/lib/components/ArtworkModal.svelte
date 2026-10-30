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
  let pad = (n: number) => String(n).padStart(2, "0");
  let counterText = $derived(
    `${pad(currentIndex + 1)} / ${pad(artworks.length)}`,
  );

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
    <!-- Top Utility Bar: Counter, Controls & Close -->
    <header class="dialog-top-bar">
      <div class="dialog-counter-badge" aria-live="polite">
        {counterText}
      </div>

      <div class="dialog-top-actions">
        <span class="dialog-hint-pill desktop-only"
          >Click image to zoom • ← / → to cycle • Esc to close</span
        >
        <button
          onclick={closeModal}
          type="button"
          class="dialog-btn dialog-close-btn"
          aria-label="Close modal preview (Escape)"
        >
          ✕
        </button>
      </div>
    </header>

    <!-- Main Visual Stage: Prev Button, Image Viewport, Next Button -->
    <div
      class="dialog-stage"
      ontouchstart={handleTouchStart}
      ontouchend={handleTouchEnd}
      role="region"
      aria-label="Artwork Viewport"
    >
      <button
        onclick={() => step(-1)}
        type="button"
        class="dialog-nav-btn prev"
        aria-label="Previous artwork (Left Arrow)"
      >
        ←
      </button>

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

    <!-- Mobile Hint Bar -->
    <footer class="dialog-bottom-bar mobile-only">
      <span class="dialog-hint-pill"
        >Swipe or tap arrows to cycle • Tap to zoom</span
      >
    </footer>
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

  /* Sharp Neobrutalist Dialog Frame */
  .dialog-shell {
    background: var(--color-surface);
    border: var(--stroke-neo);
    box-shadow: var(--shadow-neo);
    border-radius: 0;
    display: flex;
    flex-direction: column;
    max-width: 95vw;
    max-height: 94vh;
    overflow: hidden;
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

  /* Top Bar */
  .dialog-top-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    background: var(--color-surface);
    border-bottom: var(--stroke-neo);
    gap: 16px;
  }

  .dialog-counter-badge {
    font-family: var(--font-heading);
    font-size: 0.82rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    padding: 5px 12px;
    background: var(--color-bg);
    color: var(--color-ink);
    border: var(--stroke-neo);
    border-radius: 0;
    box-shadow: var(--shadow-neo-xs);
  }

  .dialog-top-actions {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .dialog-hint-pill {
    font-family: var(--font-body);
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    color: var(--color-muted);
    text-transform: uppercase;
  }

  .dialog-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background: var(--color-surface);
    color: var(--color-ink);
    border: var(--stroke-neo);
    border-radius: 0;
    box-shadow: var(--shadow-neo-xs);
    font-family: var(--font-heading);
    font-size: 0.95rem;
    font-weight: 700;
    cursor: pointer;
    transition:
      transform 0.1s ease,
      box-shadow 0.1s ease,
      background 0.1s ease;
  }

  .dialog-btn:hover {
    background: var(--color-border-subtle);
  }

  .dialog-btn:active {
    transform: translate(2px, 2px);
    box-shadow: 0px 0px 0px var(--color-ink);
  }

  /* Main Visual Stage */
  .dialog-stage {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-bg);
    padding: 18px 24px;
    overflow: hidden;
  }

  .dialog-nav-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
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
    left: 16px;
  }

  .dialog-nav-btn.next {
    right: 16px;
  }

  .dialog-nav-btn:hover {
    background: var(--color-border-subtle);
  }

  .dialog-nav-btn:active {
    transform: translateY(-50%) translate(2px, 2px);
    box-shadow: 0px 0px 0px var(--color-ink);
  }

  /* Viewport & Image Zoom Track */
  .dialog-viewport {
    position: relative;
    max-width: min(84vw, 1100px);
    max-height: 76vh;
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
    max-width: 100%;
    max-height: 76vh;
    overflow: hidden;
    border: 2px solid var(--color-ink);
    box-shadow: var(--shadow-neo);
    background: var(--color-surface);
  }

  .dialog-zoom-track.is-zoomed {
    overflow: auto;
  }

  .dialog-img {
    display: block;
    max-width: 100%;
    max-height: 76vh;
    width: auto;
    height: auto;
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

  /* Bottom Bar for Mobile */
  .dialog-bottom-bar {
    display: none;
    align-items: center;
    justify-content: center;
    padding: 10px 14px;
    background: var(--color-surface);
    border-top: var(--stroke-neo);
    text-align: center;
  }

  /* Responsive Adjustments */
  .desktop-only {
    display: inline-block;
  }

  .mobile-only {
    display: none;
  }

  @media (max-width: 768px) {
    .desktop-only {
      display: none;
    }

    .mobile-only {
      display: flex;
    }

    .dialog-stage {
      padding: 12px;
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

    .dialog-viewport {
      max-width: 90vw;
      max-height: 70vh;
    }

    .dialog-img {
      max-height: 70vh;
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
