<script lang="ts">
  import { fly, fade } from "svelte/transition";

  let copied = $state(false);
  let copyTimeout: ReturnType<typeof setTimeout>;

  async function copyDiscord() {
    try {
      await navigator.clipboard.writeText("yuk1r0");
      copied = true;
      clearTimeout(copyTimeout);
      copyTimeout = setTimeout(() => {
        copied = false;
      }, 2200);
    } catch (err) {
      console.error("Failed to copy Discord username:", err);
    }
  }
</script>

<svelte:head>
  <title>Contact — Yukiro Business Inquiries & Channels</title>
  <meta
    name="description"
    content="Direct contact channels for business inquiries and illustration projects: Discord, Gmail, and X."
  />
</svelte:head>

<div class="contact-page-container">
  <!-- Masthead Intro Header -->
  <section class="contact-masthead-section" aria-label="Contact Introduction">
    <h1 class="contact-main-title">Contact</h1>
  </section>

  <!-- Central Contact Card -->
  <section class="neo-card contact-card" aria-label="Contacts">
    <div class="contact-header">
      <span class="contact-badge">CONTACTS</span>
    </div>

    <!-- Contact Items: Text with Icons -->
    <div class="contact-items-list">
      <!-- Discord item (click to copy) -->
      <div class="contact-item discord-item-wrap">
        <button
          type="button"
          class="contact-link-row discord-btn"
          onclick={copyDiscord}
          aria-label="Copy Discord username yuk1r0"
          title="Click to copy yuk1r0"
        >
          <img
            src="/icons/contacts/discord.svg"
            alt="Discord"
            class="contact-icon icon-monochrome"
            loading="lazy"
          />
          <span class="contact-label">yuk1r0</span>
        </button>

        {#if copied}
          <div
            class="toast-popup"
            role="status"
            aria-live="polite"
            in:fly={{ x: -8, duration: 180 }}
            out:fade={{ duration: 150 }}
          >
            Copied discord username!
          </div>
        {/if}
      </div>

      <!-- Gmail item -->
      <div class="contact-item">
        <a
          href="mailto:yukiroart19@gmail.com"
          class="contact-link-row"
          title="Send email to yukiroart19@gmail.com"
        >
          <img
            src="/icons/contacts/gmail.svg"
            alt="Gmail"
            class="contact-icon icon-monochrome"
            loading="lazy"
          />
          <span class="contact-label">yukiroart19@gmail.com</span>
        </a>
      </div>

      <!-- X item -->
      <div class="contact-item">
        <a
          href="https://x.com/yukir0_art"
          target="_blank"
          rel="noopener noreferrer"
          class="contact-link-row"
          title="Yukiro on X"
        >
          <img
            src="/icons/contacts/x.svg"
            alt="X"
            class="contact-icon icon-monochrome"
            loading="lazy"
          />
          <span class="contact-label">yukir0_art</span>
        </a>
      </div>
    </div>
  </section>
</div>

<style>
  /* Layout Container */
  .contact-page-container {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    min-height: calc(100vh - 100px);
    min-height: calc(100dvh - 100px);
    padding-bottom: 140px;
  }

  /* Masthead Intro Header */
  .contact-masthead-section {
    margin-bottom: 36px;
  }

  .contact-main-title {
    font-family: var(--font-heading);
    font-size: clamp(2.5rem, 4.5vw, 3.8rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.05;
    margin: 0;
  }

  /* Shared Neobrutalist Card */
  .neo-card {
    background: var(--color-surface);
    border: var(--stroke-neo);
    box-shadow: var(--shadow-neo);
    border-radius: 0;
  }

  /* Central Contact Card */
  .contact-card {
    padding: 38px 40px;
    display: flex;
    flex-direction: column;
    gap: 28px;
  }

  .contact-header {
    display: flex;
    align-items: center;
  }

  .contact-badge {
    display: inline-block;
    font-family: var(--font-heading);
    font-size: 0.88rem;
    font-weight: 800;
    letter-spacing: 0.05em;
    padding: 6px 14px;
    background: var(--color-yellow);
    color: #121212;
    border: 2px solid var(--color-ink);
    box-shadow: var(--shadow-neo-xs);
  }

  /* Contact Items List */
  .contact-items-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .contact-item {
    position: relative;
    width: fit-content;
  }

  .discord-item-wrap {
    display: inline-flex;
    align-items: center;
    gap: 14px;
    position: relative;
    width: fit-content;
  }

  .contact-link-row {
    display: inline-flex;
    align-items: center;
    gap: 14px;
    background: var(--color-bg);
    color: var(--color-ink);
    border: 2px solid var(--color-ink);
    box-shadow: var(--shadow-neo-sm);
    padding: 12px 20px;
    border-radius: var(--radius-neo-pill);
    text-decoration: none;
    font-family: var(--font-mono);
    font-size: clamp(1rem, 2.2vw, 1.15rem);
    font-weight: 700;
    cursor: var(--cursor-pointer);
    transition:
      transform var(--duration-fast, 120ms)
        var(--ease-out, cubic-bezier(0.23, 1, 0.32, 1)),
      box-shadow var(--duration-fast, 120ms)
        var(--ease-out, cubic-bezier(0.23, 1, 0.32, 1)),
      background-color 0.15s ease,
      color 0.15s ease;
  }

  @media (hover: hover) and (pointer: fine) {
    .contact-link-row:hover {
      transform: translate(-2px, -2px);
      box-shadow: var(--shadow-neo);
      background-color: var(--color-yellow);
      color: #121212;
    }

    :global(:root[data-theme="dark"]) .contact-link-row:hover {
      background-color: var(--color-border-subtle);
      color: var(--color-ink);
    }

    :global(:root[data-theme="dark"]) .contact-link-row:hover .icon-monochrome {
      filter: invert(0);
    }
  }

  .contact-link-row:active {
    transform: translate(2px, 2px);
    box-shadow: 0px 0px 0px var(--color-ink);
  }

  .contact-icon {
    width: 26px;
    height: 26px;
    object-fit: contain;
    flex-shrink: 0;
  }

  :global(:root[data-theme="dark"]) .icon-monochrome {
    filter: invert(1);
  }

  .contact-label {
    line-height: 1.2;
    word-break: break-all;
  }

  /* Toast Notification */
  .toast-popup {
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
    z-index: 20;
    pointer-events: none;
  }

  .toast-popup::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 100%;
    margin-top: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent #121212 transparent transparent;
  }

  /* Responsive Adjustments */
  @media (max-width: 680px) {
    .contact-card {
      padding: 26px 20px;
      gap: 20px;
    }

    .contact-link-row {
      padding: 10px 16px;
      font-size: 0.95rem;
      gap: 10px;
      width: 100%;
    }

    .contact-item {
      width: 100%;
    }

    .discord-item-wrap {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
      width: 100%;
    }

    .toast-popup::after {
      top: auto;
      bottom: 100%;
      left: 24px;
      right: auto;
      margin-top: 0;
      border-color: transparent transparent #121212 transparent;
    }

    .contact-icon {
      width: 22px;
      height: 22px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .contact-link-row {
      transition: none !important;
    }
  }
</style>
