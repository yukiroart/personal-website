<script lang="ts">
  import { fly, fade } from "svelte/transition";
  import FaqAccordion from "#lib/components/FaqAccordion.svelte";
  import { DEFAULT_COMMISSIONS_FAQS, type FaqItem } from "#lib/data/sampleFaq";
  import { DEFAULT_TERMS_BULLETS, formatTermHtml, type TermItem } from "#lib/data/sampleTerms";

  let { data } = $props<{ data: { faqs?: FaqItem[]; terms?: TermItem[] } }>();

  // Defensive hydration state guard to prevent disappearing FAQs
  let initialFaqs = data.faqs && data.faqs.length > 0 ? data.faqs : DEFAULT_COMMISSIONS_FAQS;
  let faqs = $state<FaqItem[]>(initialFaqs);

  $effect(() => {
    if (data.faqs && data.faqs.length > 0) {
      faqs = data.faqs;
    }
  });

  // Defensive hydration state guard for Terms of Service
  let initialTerms = data.terms && data.terms.length > 0 ? data.terms : DEFAULT_TERMS_BULLETS;
  let terms = $state<TermItem[]>(initialTerms);

  $effect(() => {
    if (data.terms && data.terms.length > 0) {
      terms = data.terms;
    }
  });

  // State for Terms and Conditions accordion (defaults to open or togglable)
  let termsOpen = $state<boolean>(false);

  function toggleTerms() {
    termsOpen = !termsOpen;
  }

  let copiedDiscord = $state(false);
  let copyTimeout: ReturnType<typeof setTimeout>;

  async function copyDiscord() {
    try {
      await navigator.clipboard.writeText("yuk1r0");
      copiedDiscord = true;
      clearTimeout(copyTimeout);
      copyTimeout = setTimeout(() => {
        copiedDiscord = false;
      }, 2200);
    } catch (err) {
      console.error("Failed to copy Discord username:", err);
    }
  }
</script>

<svelte:head>
  <title>Commissions & Pricing FAQ — Yukiro Custom Art</title>
  <meta
    name="description"
    content="Direct message Yukiro to request character art commissions, view rates FAQ, progress policies, and read Terms of Service."
  />
  <meta
    property="og:title"
    content="Commissions & Pricing FAQ — Yukiro Custom Art"
  />
  <meta
    property="og:description"
    content="Direct message Yukiro to request character art commissions, view rates FAQ, progress policies, and read Terms of Service."
  />
  <meta
    name="twitter:title"
    content="Commissions & Pricing FAQ — Yukiro Custom Art"
  />
  <meta
    name="twitter:description"
    content="Direct message Yukiro to request character art commissions, view rates FAQ, progress policies, and read Terms of Service."
  />

  <!-- FAQPage Schema for Rich Search Snippets -->
  {@html `<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": ${JSON.stringify(
      faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: (f.accentCallout ? f.accentCallout + ' ' : '') + f.answer.join(' ')
        }
      }))
    )}
  }
  </script>`}
</svelte:head>

<div class="comm-page-container">
  <!-- Masthead Title -->
  <section class="comm-masthead-section" aria-label="Commissions Introduction">
    <h1 class="comm-main-title">Commissions</h1>
  </section>

  <!-- 1st Container: DM FOR A COMMISSION -->
  <section
    class="neo-card dm-card"
    aria-label="Direct Message for a Commission"
  >
    <div class="dm-header">
      <span class="dm-badge">DM FOR A COMMISSION</span>
    </div>

    <p class="dm-copy">
      Hey There! Please don't be afraid to send me a direct message on any of
      these platforms. A simple <em
        >"Hello, I would like to request a commission."</em
      > will suffice!
    </p>

    <!-- Subtle Text-Only Terms & Conditions Dropdown -->
    <div class="dm-terms-dropdown">
      <button
        type="button"
        class="dm-terms-trigger"
        aria-expanded={termsOpen}
        aria-controls="dm-terms-content"
        onclick={toggleTerms}
      >
        <span class="dm-terms-label">Terms of Service</span>
        <svg
          class="chevron-svg"
          class:rotated={termsOpen}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      <div
        id="dm-terms-content"
        class="dm-terms-body"
        class:open={termsOpen}
        inert={!termsOpen}
      >
        <div class="dm-terms-inner">
          <ul class="dm-terms-list">
            {#each terms as term (term._id || term.order)}
              <li class="dm-terms-bullet">
                <span class="bullet-dot" aria-hidden="true">•</span>
                <span class="bullet-text">{@html formatTermHtml(term)}</span>
              </li>
            {/each}
          </ul>
        </div>
      </div>
    </div>

    <!-- Social / Contact Icons: Discord, Gmail, X -->
    <div
      class="dm-icons-row"
      role="group"
      aria-label="Direct message contact channels"
    >
      <!-- Discord -->
      <div class="comm-discord-wrap">
        <button
          type="button"
          class="dm-icon-btn discord-icon-btn"
          onclick={copyDiscord}
          aria-label="Copy Discord username (yuk1r0)"
          title="Click to copy yuk1r0"
        >
          <svg class="dm-svg" viewBox="0 0 24 24" role="img" aria-hidden="true">
            <path
              fill="currentColor"
              d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"
            />
          </svg>
        </button>

        <div class="toast-anchor">
          {#if copiedDiscord}
            <div
              class="toast-popup"
              role="status"
              aria-live="polite"
              in:fly={{ y: 6, duration: 180 }}
              out:fade={{ duration: 150 }}
            >
              Copied discord username!
            </div>
          {/if}
        </div>
      </div>

      <!-- Gmail -->
      <a
        href="mailto:yukiroart19@gmail.com"
        class="dm-icon-btn"
        aria-label="Send direct message via Gmail"
        title="Gmail: yukiroart19@gmail.com"
      >
        <svg class="dm-svg" viewBox="0 0 24 24" role="img" aria-hidden="true">
          <path
            fill="currentColor"
            d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"
          />
        </svg>
      </a>

      <!-- X -->
      <a
        href="https://x.com/yukir0_art"
        target="_blank"
        rel="noopener noreferrer"
        class="dm-icon-btn"
        aria-label="Direct message on X"
        title="X: @yukir0_art"
      >
        <svg class="dm-svg" viewBox="0 0 24 24" role="img" aria-hidden="true">
          <path
            fill="currentColor"
            d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
          />
        </svg>
      </a>
    </div>
  </section>

  <!-- 2nd Container: COMMS FAQ (Dynamic Sanity Accordion) -->
  <FaqAccordion items={faqs} title="COMMS FAQ" idPrefix="comms-faq" />
</div>

<style>
  .comm-page-container {
    max-width: 920px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 36px;
  }

  /* Masthead */
  .comm-masthead-section {
    margin-bottom: 0;
  }

  .comm-main-title {
    font-family: var(--font-heading);
    font-size: clamp(2.5rem, 4.5vw, 3.8rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.05;
    color: var(--color-ink);
    margin: 0;
  }

  /* Neobrutalist Base Card */
  .neo-card {
    background-color: var(--color-surface);
    border: var(--stroke-neo);
    border-radius: 0;
    box-shadow: var(--shadow-neo);
    padding: 32px 36px;
    box-sizing: border-box;
  }

  /* ----------------------------------------------------
     1ST CONTAINER: DM FOR A COMMISSION
     ---------------------------------------------------- */
  .dm-card {
    background-color: var(--color-surface);
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .dm-header {
    display: flex;
    align-items: center;
  }

  .dm-badge {
    display: inline-block;
    background-color: var(--color-yellow);
    color: #121212;
    font-family: var(--font-heading);
    font-size: 0.95rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    padding: 8px 16px;
    border: var(--stroke-neo);
    box-shadow: var(--shadow-neo-xs);
  }

  .dm-copy {
    font-family: var(--font-body);
    font-size: 1.15rem;
    line-height: 1.6;
    color: var(--color-ink);
    margin: 0;
    max-width: 760px;
  }

  .dm-copy em {
    font-style: normal;
    font-weight: 700;
    color: var(--color-pink);
  }

  .dm-icons-row {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
    padding-top: 4px;
  }

  .dm-icon-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 52px;
    height: 52px;
    background-color: #121212;
    color: #ffffff;
    border: var(--stroke-neo);
    box-shadow: var(--shadow-neo-xs);
    cursor: var(--cursor-pointer);
    text-decoration: none;
    transition:
      transform var(--duration-fast) var(--ease-out),
      box-shadow var(--duration-fast) var(--ease-out),
      background-color var(--duration-fast) var(--ease-out),
      color var(--duration-fast) var(--ease-out);
  }

  :global(:root[data-theme="dark"]) .dm-icon-btn {
    background-color: #121212;
    color: #ffffff;
    border-color: var(--color-border-subtle);
  }

  .dm-svg {
    width: 24px;
    height: 24px;
  }

  @media (hover: hover) and (pointer: fine) {
    .dm-icon-btn:hover {
      background-color: var(--color-yellow);
      color: #121212;
      transform: translate(-2px, -2px);
      box-shadow: var(--shadow-neo-sm);
    }
  }

  :global(:root[data-theme="dark"]) .dm-icon-btn:hover {
    background-color: var(--color-yellow);
    color: #121212;
  }

  .dm-icon-btn:active {
    transform: translate(2px, 2px) scale(0.96);
    box-shadow: 0px 0px 0px transparent;
  }

  /* Commissions Discord Wrap & Toast */
  .comm-discord-wrap {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .comm-discord-wrap .toast-anchor {
    position: absolute;
    bottom: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%);
    pointer-events: none;
    z-index: 50;
    display: flex;
    justify-content: center;
  }

  .comm-discord-wrap .toast-popup {
    position: relative;
    background: var(--color-yellow);
    color: #121212;
    border: 2px solid #121212;
    box-shadow: var(--shadow-neo-xs);
    font-family: var(--font-body);
    font-size: 0.88rem;
    font-weight: 500;
    letter-spacing: 0.01em;
    padding: 6px 14px;
    white-space: nowrap;
    border-radius: 0;
  }

  .comm-discord-wrap .toast-popup::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #121212 transparent transparent transparent;
  }

  @media (max-width: 680px) {
    .comm-discord-wrap .toast-anchor {
      left: 0;
      transform: none;
    }

    .comm-discord-wrap .toast-popup::after {
      left: 26px;
    }
  }

  /* ----------------------------------------------------
     SUBTLE TEXT-ONLY TERMS DROPDOWN (Inside DM Card)
     ---------------------------------------------------- */
  .dm-terms-dropdown {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: -6px;
    margin-bottom: 4px;
  }

  .dm-terms-trigger {
    background: transparent;
    border: none;
    padding: 6px 0;
    min-height: 44px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    cursor: var(--cursor-pointer);
    color: var(--color-ink);
    opacity: 0.8;
    font-family: var(--font-body);
    font-size: 0.95rem;
    font-weight: 600;
    width: fit-content;
    text-decoration: underline;
    text-underline-offset: 3px;
    transition:
      opacity var(--duration-fast) var(--ease-out),
      color var(--duration-fast) var(--ease-out);
  }

  @media (hover: hover) and (pointer: fine) {
    .dm-terms-trigger:hover {
      opacity: 1;
      color: var(--color-pink);
    }
  }

  .dm-terms-trigger .chevron-svg {
    display: block;
    width: 14px;
    height: 14px;
    transition: transform var(--duration-normal) var(--ease-out);
  }

  .dm-terms-trigger .chevron-svg.rotated {
    transform: rotate(180deg);
  }

  .dm-terms-body {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows var(--duration-normal) var(--ease-out);
    overflow: hidden;
  }

  .dm-terms-body.open {
    grid-template-rows: 1fr;
  }

  .dm-terms-inner {
    min-height: 0;
    overflow: hidden;
  }

  .dm-terms-list {
    list-style: none;
    margin: 6px 0 16px 0;
    padding: 14px 18px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    background: rgba(0, 0, 0, 0.02);
    border-left: 2px solid var(--color-border-subtle);
  }

  :global(:root[data-theme="dark"]) .dm-terms-list {
    background: rgba(255, 255, 255, 0.02);
  }

  .dm-terms-bullet {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-family: var(--font-body);
    font-size: 0.92rem;
    line-height: 1.55;
    color: var(--color-ink);
  }

  .bullet-dot {
    color: var(--color-pink);
    font-size: 1.1rem;
    line-height: 1.3;
    flex-shrink: 0;
  }

  :global(.dm-terms-bullet strong) {
    font-weight: 700;
    font-family: var(--font-heading);
    margin-right: 2px;
  }

  :global(.terms-highlight-red) {
    color: #e53935;
    font-style: normal;
    font-weight: 600;
  }

  :global(:root[data-theme="dark"] .terms-highlight-red) {
    color: #ff5252;
  }

  /* Responsive Adjustments */
  @media (max-width: 640px) {
    .neo-card {
      padding: 24px 20px;
    }

    .dm-copy {
      font-size: 1.05rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .dm-icon-btn,
    .dm-terms-body {
      transition: none !important;
    }
  }
</style>
