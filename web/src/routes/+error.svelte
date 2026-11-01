<script lang="ts">
  import { onMount } from "svelte";

  interface ColorOption {
    id: string;
    label: string;
    color: string;
    hex: string;
  }

  const COLOR_PALETTE: ColorOption[] = [
    { id: "ink", label: "Ink", color: "var(--color-ink)", hex: "#121212" },
    { id: "yellow", label: "Yellow", color: "#FFD027", hex: "#FFD027" },
    { id: "pink", label: "Coral Pink", color: "#E02E53", hex: "#E02E53" },
    { id: "green", label: "Mint Green", color: "#06D6A0", hex: "#06D6A0" },
  ];

  const SIZE_OPTIONS = [
    { id: "fine", label: "Fine", width: 2.5 },
    { id: "bold", label: "Bold", width: 5.5 },
  ];

  let canvasEl = $state<HTMLCanvasElement | null>(null);
  let selectedColor = $state<string>("ink");
  let selectedSize = $state<number>(2.5);
  let hasDrawn = $state<boolean>(false);

  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;

  function resolveColor(): string {
    if (selectedColor === "ink") {
      if (typeof window !== "undefined" && canvasEl) {
        return getComputedStyle(canvasEl).color || "#121212";
      }
      return "#121212";
    }
    const found = COLOR_PALETTE.find((c) => c.id === selectedColor);
    return found ? found.hex : "#121212";
  }

  function getCoords(e: PointerEvent): { x: number; y: number } {
    if (!canvasEl) return { x: 0, y: 0 };
    const rect = canvasEl.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }

  function startDrawing(e: PointerEvent) {
    if (!canvasEl) return;
    canvasEl.setPointerCapture(e.pointerId);
    isDrawing = true;
    hasDrawn = true;

    const coords = getCoords(e);
    lastX = coords.x;
    lastY = coords.y;

    const ctx = canvasEl.getContext("2d");
    if (!ctx) return;
    ctx.beginPath();
    ctx.arc(lastX, lastY, selectedSize / 2, 0, Math.PI * 2);
    ctx.fillStyle = resolveColor();
    ctx.fill();
  }

  function draw(e: PointerEvent) {
    if (!isDrawing || !canvasEl) return;
    const ctx = canvasEl.getContext("2d");
    if (!ctx) return;

    const coords = getCoords(e);
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(coords.x, coords.y);
    ctx.strokeStyle = resolveColor();
    ctx.lineWidth = selectedSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();

    lastX = coords.x;
    lastY = coords.y;
  }

  function stopDrawing(e: PointerEvent) {
    if (!isDrawing) return;
    isDrawing = false;
    if (canvasEl && canvasEl.hasPointerCapture(e.pointerId)) {
      canvasEl.releasePointerCapture(e.pointerId);
    }
  }

  function clearCanvas() {
    if (!canvasEl) return;
    const ctx = canvasEl.getContext("2d");
    if (!ctx) return;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    ctx.restore();
    hasDrawn = false;
  }

  function initCanvas() {
    if (!canvasEl) return;
    const rect = canvasEl.getBoundingClientRect();
    const dpr =
      typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

    // Save existing canvas contents if any across resize
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = canvasEl.width;
    tempCanvas.height = canvasEl.height;
    const tempCtx = tempCanvas.getContext("2d");
    if (tempCtx && canvasEl.width > 0 && canvasEl.height > 0) {
      tempCtx.drawImage(canvasEl, 0, 0);
    }

    canvasEl.width = Math.floor(rect.width * dpr);
    canvasEl.height = Math.floor(rect.height * dpr);

    const ctx = canvasEl.getContext("2d");
    if (ctx) {
      ctx.scale(dpr, dpr);
      if (tempCanvas.width > 0 && tempCanvas.height > 0) {
        ctx.drawImage(
          tempCanvas,
          0,
          0,
          tempCanvas.width / dpr,
          tempCanvas.height / dpr,
        );
      }
    }
  }

  onMount(() => {
    initCanvas();
    const ro = new ResizeObserver(() => {
      initCanvas();
    });
    if (canvasEl) {
      ro.observe(canvasEl);
    }
    return () => {
      ro.disconnect();
    };
  });
</script>

<svelte:head>
  <title>404 — Oh, you're on the wrong page. | Yukiro</title>
  <meta
    name="description"
    content="404 Page Not Found — You've stumbled upon an unfinished canvas in Yukiro's portfolio."
  />
</svelte:head>

<div class="error-page-wrapper">
  <div class="interactive-404-container">
    <!-- Dizzy Character Illustration on Top -->
    <div class="error-art-wrap">
      <img
        src="/images/404_converted.webp"
        alt="Dizzy exhausted character lying down"
        class="error-dizzy-art"
        loading="eager"
      />
    </div>

    <!-- 404 Badge & Narrative -->
    <div class="error-badge-row">
      <span class="error-badge">404</span>
    </div>

    <!-- Page Title & Narrative -->
    <h1 class="error-main-title">Oh, you're on the wrong page.</h1>

    <p class="error-subtitle">
      You've hit something that doesn't exist, while you're at it you can doodle
      here or jump at the portfolio
    </p>

    <!-- Drawing Toolbar -->
    <div class="toolbar" aria-label="Drawing controls">
      <!-- Mini Artist Palette -->
      <div class="palette-group" role="radiogroup" aria-label="Pencil color">
        {#each COLOR_PALETTE as col}
          <button
            type="button"
            class="color-chip"
            class:active={selectedColor === col.id}
            onclick={() => (selectedColor = col.id)}
            aria-label="{col.label} pencil color"
            aria-checked={selectedColor === col.id}
            role="radio"
            title={col.label}
          >
            <span
              class="color-dot"
              class:is-ink={col.id === "ink"}
              style="background-color: {col.color};"
            ></span>
          </button>
        {/each}
      </div>

      <div class="divider-v" aria-hidden="true"></div>

      <!-- Adjustable Stroke Size Toggle -->
      <div class="size-group" role="radiogroup" aria-label="Pencil stroke size">
        {#each SIZE_OPTIONS as s}
          <button
            type="button"
            class="size-btn"
            class:active={selectedSize === s.width}
            onclick={() => (selectedSize = s.width)}
            aria-label="{s.label} stroke width ({s.width}px)"
            aria-checked={selectedSize === s.width}
            role="radio"
          >
            <span
              class="size-indicator"
              style="height: {Math.max(3, s.width)}px;"
            ></span>
            <span>{s.label}</span>
          </button>
        {/each}
      </div>

      <div class="divider-v" aria-hidden="true"></div>

      <!-- Clear Canvas Action -->
      <button
        type="button"
        class="clear-btn"
        onclick={clearCanvas}
        disabled={!hasDrawn}
        aria-label="Clear sketchpad canvas"
      >
        Clear
      </button>
    </div>

    <!-- The Interactive Blank Sketchpad Canvas -->
    <div class="canvas-card">
      <canvas
        bind:this={canvasEl}
        class="sketch-pad"
        onpointerdown={startDrawing}
        onpointermove={draw}
        onpointerup={stopDrawing}
        onpointercancel={stopDrawing}
        onpointerleave={stopDrawing}
        aria-label="Interactive drawing canvas. Click and drag or touch to sketch."
      ></canvas>

      <div class="watermark" class:hidden={hasDrawn} aria-hidden="true">
        <span>CLICK &amp; DRAG TO DRAW</span>
      </div>
    </div>

    <!-- Escape & Return Action -->
    <div class="action-wrap">
      <a href="/" class="neo-btn-primary">
        <span class="btn-arrow">←</span> Jump to Portfolio
      </a>
    </div>
  </div>
</div>

<style>
  .error-page-wrapper {
    width: 100%;
    min-height: 80dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32px 20px;
    box-sizing: border-box;
  }

  .interactive-404-container {
    width: 100%;
    max-width: 680px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 18px;
    animation: entrance-error 240ms cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  @keyframes entrance-error {
    from {
      opacity: 0;
      transform: translateY(14px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .interactive-404-container {
      animation: none;
      opacity: 1;
      transform: none;
    }
  }

  .error-art-wrap {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: -4px;
  }

  .error-dizzy-art {
    width: 100%;
    max-width: 380px;
    height: auto;
    object-fit: contain;
    filter: drop-shadow(4px 4px 0px rgba(0, 0, 0, 0.1));
    transition: transform var(--duration-normal, 220ms) var(--ease-out);
  }

  :global(:root[data-theme="dark"]) .error-dizzy-art {
    filter: drop-shadow(4px 4px 0px rgba(0, 0, 0, 0.45));
  }

  @media (hover: hover) and (pointer: fine) {
    .error-dizzy-art:hover {
      transform: scale(1.03) rotate(-1deg);
    }
  }

  .error-badge-row {
    display: flex;
    justify-content: center;
  }

  .error-badge {
    font-family: var(--font-heading);
    font-size: 1.15rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    padding: 6px 20px;
    background: var(--color-pink);
    color: #ffffff;
    border: 2px solid var(--color-ink);
    box-shadow: var(--shadow-neo-xs);
  }

  .error-main-title {
    font-family: var(--font-heading);
    font-size: clamp(2rem, 4vw, 3.2rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.12;
    color: var(--color-ink);
    margin: 0;
  }

  .error-subtitle {
    font-family: var(--font-body);
    font-size: 1.05rem;
    line-height: 1.55;
    color: var(--color-muted);
    margin: 0;
    max-width: 540px;
  }

  /* Toolbar */
  .toolbar {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: center;
    padding: 6px 14px;
    background: var(--color-surface);
    border: var(--stroke-neo);
    box-shadow: var(--shadow-neo-xs);
  }

  .divider-v {
    width: 1.5px;
    height: 22px;
    background-color: var(--color-border-subtle);
  }

  /* Palette Group */
  .palette-group {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .color-chip {
    width: 28px;
    height: 28px;
    padding: 0;
    border-radius: 50%;
    border: 2px solid var(--color-ink);
    background: var(--color-bg);
    cursor: var(--cursor-pointer);
    display: grid;
    place-items: center;
    transition:
      transform var(--duration-fast, 120ms) var(--ease-out),
      box-shadow var(--duration-fast, 120ms) var(--ease-out);
  }

  .color-chip:hover {
    transform: scale(1.12);
  }

  .color-chip.active {
    transform: scale(1.16);
    box-shadow:
      0 0 0 2px var(--color-bg),
      0 0 0 4px var(--color-ink);
  }

  .color-dot {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    display: block;
  }

  .color-dot.is-ink {
    background-color: var(--color-ink);
  }

  /* Size Group */
  .size-group {
    display: flex;
    gap: 6px;
    align-items: center;
  }

  .size-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 11px;
    background: var(--color-bg);
    border: 1.5px solid var(--color-ink);
    border-radius: var(--radius-neo-pill);
    font-family: var(--font-heading);
    font-size: 0.82rem;
    font-weight: 700;
    color: var(--color-ink);
    cursor: var(--cursor-pointer);
    transition:
      background var(--duration-fast, 120ms) var(--ease-out),
      color var(--duration-fast, 120ms) var(--ease-out),
      transform var(--duration-fast, 120ms) var(--ease-out);
  }

  .size-btn:hover {
    background: rgba(0, 0, 0, 0.06);
  }

  .size-btn.active {
    background: var(--color-ink);
    color: var(--color-bg);
  }

  .size-indicator {
    display: block;
    width: 14px;
    background: currentColor;
    border-radius: 2px;
  }

  /* Clear Button */
  .clear-btn {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    font-weight: 700;
    padding: 5px 12px;
    background: transparent;
    border: 1.5px dashed var(--color-ink);
    color: var(--color-ink);
    cursor: var(--cursor-pointer);
    transition:
      background var(--duration-fast, 120ms) var(--ease-out),
      color var(--duration-fast, 120ms) var(--ease-out),
      border-style var(--duration-fast, 120ms);
  }

  .clear-btn:hover:not(:disabled) {
    background: rgba(244, 63, 94, 0.15);
    color: #f43f5e;
    border-style: solid;
  }

  .clear-btn:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  /* Canvas Card */
  .canvas-card {
    position: relative;
    width: 100%;
    border: 2.5px solid var(--color-ink);
    background-color: var(--color-bg);
    background-image: radial-gradient(
      var(--color-ink) 1.2px,
      transparent 1.2px
    );
    background-size: 18px 18px;
    box-shadow: 5px 5px 0px var(--color-ink);
    overflow: hidden;
  }

  .sketch-pad {
    display: block;
    width: 100%;
    height: 380px;
    cursor: crosshair;
    touch-action: none;
    color: var(--color-ink);
  }

  .watermark {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    opacity: 0.18;
    font-family: var(--font-mono);
    font-weight: 800;
    letter-spacing: 0.14em;
    font-size: 0.95rem;
    color: var(--color-ink);
    transition: opacity var(--duration-normal, 220ms) var(--ease-out);
    user-select: none;
  }

  .watermark.hidden {
    opacity: 0;
  }

  /* Return Button */
  .action-wrap {
    margin-top: 6px;
  }

  .neo-btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--color-yellow);
    color: #121212;
    font-family: var(--font-heading);
    font-size: 0.96rem;
    font-weight: 800;
    padding: 13px 26px;
    border: 2px solid var(--color-ink);
    box-shadow: 4px 4px 0px var(--color-ink);
    text-decoration: none;
    cursor: var(--cursor-pointer);
    transition:
      transform var(--duration-fast, 120ms) var(--ease-out),
      box-shadow var(--duration-fast, 120ms) var(--ease-out);
  }

  .neo-btn-primary:hover {
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0px var(--color-ink);
  }

  .neo-btn-primary:active {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0px var(--color-ink);
  }

  .btn-arrow {
    display: inline-block;
    transition: transform var(--duration-fast, 120ms) var(--ease-out);
  }

  .neo-btn-primary:hover .btn-arrow {
    transform: translateX(-3px);
  }

  @media (max-width: 640px) {
    .sketch-pad {
      height: 280px;
    }

    .toolbar {
      gap: 8px;
      padding: 6px 10px;
    }

    .neo-btn-primary {
      width: 100%;
      justify-content: center;
    }
  }
</style>
