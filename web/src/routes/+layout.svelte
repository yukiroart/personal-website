<script lang="ts">
  import { dev } from "$app/environment";
  import { SvelteDevKit } from "svelte-grab";
  import "../styles/tokens.css";
  import { page } from "$app/state";
  import { onMount } from "svelte";

  let { children } = $props();

  let isPortfolio = $derived(
    page.url.pathname === "/" || page.url.pathname === "/portfolio",
  );
  let isServices = $derived(page.url.pathname.startsWith("/services"));
  let isAbout = $derived(page.url.pathname.startsWith("/about"));
  let isQueue = $derived(page.url.pathname.startsWith("/queue"));
  let isContact = $derived(page.url.pathname.startsWith("/contact"));

  let currentTheme = $state("dark");
  let clickSound: HTMLAudioElement | null = null;

  const INTERACTIVE_SELECTOR =
    'button, a, [role="button"], input[type="submit"], input[type="button"], input[type="reset"], input[type="checkbox"], input[type="radio"], summary, label[for]';

  onMount(() => {
    const saved =
      localStorage.getItem("theme") ||
      document.documentElement.getAttribute("data-theme") ||
      "dark";
    currentTheme = saved;
    document.documentElement.setAttribute("data-theme", saved);

    clickSound = new Audio("/sounds/click.wav");
    clickSound.preload = "auto";
  });

  function handleGlobalClick(event: MouseEvent) {
    if (!clickSound) return;
    const target = event.target as HTMLElement | null;
    if (!target) return;

    const interactive = target.closest(INTERACTIVE_SELECTOR) as HTMLElement | null;
    if (!interactive) return;

    if (
      interactive.matches(":disabled") ||
      interactive.getAttribute("aria-disabled") === "true" ||
      interactive.classList.contains("disabled")
    ) {
      return;
    }

    clickSound.currentTime = 0;
    clickSound.play().catch(() => {
      // Ignore browser autoplay policy errors if triggered programmatically
    });
  }

  function toggleTheme() {
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    currentTheme = nextTheme;
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
</script>

<svelte:window onclick={handleGlobalClick} />

<svelte:head>
  <title>Yukiro — Contemporary Visual Art Portfolio</title>
  <meta
    name="description"
    content="Original paintings, botanicals, and abstract studies by Yukiro."
  />
</svelte:head>

<!-- Minimal Neobrutalist Full-Width Masthead -->
<header class="neo-header-wrapper">
  <div class="neo-header">
    <a href="/" class="neo-brand" aria-label="Yukiro Home">
      <span class="brand-badge">Y</span>
      <span class="brand-name">YUKIRO</span>
    </a>

    <!-- 4-link Navigation -->
    <nav class="neo-nav" aria-label="Main Navigation">
      <a
        href="/"
        class="nav-item"
        class:active={isPortfolio}
        data-text="PORTFOLIO"
      >
        <span class="nav-label">PORTFOLIO</span>
      </a>
      <a
        href="/services"
        class="nav-item"
        class:active={isServices}
        data-text="SERVICES"
      >
        <span class="nav-label">SERVICES</span>
      </a>
      <a
        href="/about"
        class="nav-item"
        class:active={isAbout}
        data-text="ABOUT"
      >
        <span class="nav-label">ABOUT</span>
      </a>
      <a
        href="/queue"
        class="nav-item"
        class:active={isQueue}
        data-text="QUEUE"
      >
        <span class="nav-label">QUEUE</span>
      </a>
      <a
        href="/contact"
        class="nav-item"
        class:active={isContact}
        data-text="CONTACT"
      >
        <span class="nav-label">CONTACT</span>
      </a>
    </nav>
  </div>
</header>

<!-- Main Page Content Slot -->
<main class="neo-main">
  {@render children?.()}
</main>

<!-- Full-Width Edge-to-Edge Big Footer -->
<footer class="neo-footer-wrapper">
  <div class="neo-footer">
    <div class="footer-grid">
      <!-- Col 1: Brand & Studio Summary -->
      <div class="footer-col footer-col-brand">
        <a href="/" class="neo-brand footer-brand" aria-label="Yukiro Home">
          <span class="brand-badge">Y</span>
          <span class="brand-name">YUKIRO</span>
        </a>
        <p class="footer-bio">
          Contemporary fine art, botanical studies, and tactile visual
          storytelling. Works available directly through the studio or
          represented galleries.
        </p>
      </div>

      <!-- Col 2: Navigation Links -->
      <div class="footer-col">
        <h3 class="footer-heading">NAVIGATION</h3>
        <ul class="footer-links">
          <li><a href="/" class="footer-link">PORTFOLIO</a></li>
          <li><a href="/services" class="footer-link">SERVICES</a></li>
          <li><a href="/about" class="footer-link">ABOUT</a></li>
          <li><a href="/queue" class="footer-link">QUEUE</a></li>
          <li><a href="/contact" class="footer-link">CONTACT</a></li>
        </ul>
      </div>

      <!-- Col 3: Connect & Social -->
      <div class="footer-col footer-col-social">
        <div class="footer-social-row">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            class="footer-icon-btn"
            aria-label="Yukiro on X / Twitter"
          >
            <svg
              class="social-svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z"
              />
            </svg>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            class="footer-icon-btn"
            aria-label="Yukiro on Instagram"
          >
            <svg
              class="social-svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"
              />
            </svg>
          </a>
          <a
            href="https://artstation.com"
            target="_blank"
            rel="noopener noreferrer"
            class="footer-icon-btn"
            aria-label="Yukiro on ArtStation"
          >
            <svg
              class="social-svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M0 17.723l2.027 3.505h.001a2.424 2.424 0 0 0 2.164 1.333h13.457l-2.792-4.838H0zm24 .025c0-.484-.143-.935-.388-1.314L15.728 2.728a2.424 2.424 0 0 0-2.142-1.289H9.419L21.598 22.54l1.92-3.325c.378-.637.482-.919.482-1.467zm-11.129-3.462L7.428 4.858l-5.444 9.428h10.887z"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>

    <!-- Bottom Bar: Legal + Back to Top -->
    <div class="footer-bottom-bar">
      <div class="footer-legal">
        <span>© {new Date().getFullYear()} Yukiro. All rights reserved.</span>
      </div>
      <button
        onclick={scrollToTop}
        type="button"
        class="back-to-top-btn"
        aria-label="Back to top of page"
      >
        <span>BACK TO TOP</span>
        <span class="arrow-up">↑</span>
      </button>
    </div>
  </div>
</footer>

<!-- Bottom-Left Floating Theme Toggle -->
<button
  onclick={toggleTheme}
  class="neo-theme-toggle"
  type="button"
  aria-label={currentTheme === "dark"
    ? "Switch to light mode"
    : "Switch to dark mode"}
>
  {#if currentTheme === "dark"}
    <!-- Sun icon for light mode affordance -->
    <svg
      class="theme-svg"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      stroke-width="2.2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
  {:else}
    <!-- Moon icon for dark mode affordance -->
    <svg
      class="theme-svg"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      stroke-width="2.2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  {/if}
</button>

{#if dev}
  <SvelteDevKit />
{/if}

<style>
  /* Full-Sized Edge-to-Edge Navbar */
  .neo-header-wrapper {
    width: 100%;
    margin: 0;
    padding: 0;
    position: sticky;
    top: 0;
    z-index: 100;
    background: var(--color-surface);
    border-bottom: var(--stroke-neo);
  }

  .neo-header {
    width: 100%;
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 18px 24px;
    background: transparent;
    border: none;
    box-shadow: none;
    border-radius: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }

  .neo-brand {
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
    color: var(--color-ink);
  }

  .brand-badge {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: var(--color-yellow);
    border: var(--stroke-neo);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-family: var(--font-mono);
    font-size: 1rem;
    box-shadow: var(--shadow-neo-xs);
    color: #121212;
  }

  .brand-name {
    font-family: var(--font-heading);
    font-weight: 700;
    font-size: 1.25rem;
    letter-spacing: 0.02em;
  }

  .neo-nav {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  .nav-item {
    text-decoration: none;
    color: var(--color-ink);
    font-family: var(--font-heading);
    font-size: 0.88rem;
    position: relative;
    padding: 6px 16px;
    border-radius: var(--radius-neo-pill);
    display: inline-grid;
    place-items: center;
    transition:
      background-color 0.2s ease,
      color 0.2s ease;
  }

  /* Pre-reserve container width based on max weight 800 */
  .nav-item::before {
    content: attr(data-text);
    font-weight: 800;
    letter-spacing: 0.01em;
    visibility: hidden;
    grid-area: 1 / 1;
    pointer-events: none;
    user-select: none;
  }

  .nav-label {
    grid-area: 1 / 1;
    font-weight: 600;
    letter-spacing: 0.03em;
    transition:
      font-weight 0.28s cubic-bezier(0.16, 1, 0.3, 1),
      letter-spacing 0.28s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .nav-item:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }

  .nav-item:hover .nav-label {
    font-weight: 800;
    letter-spacing: 0.01em;
  }

  :global(:root[data-theme="dark"]) .nav-item:hover {
    background-color: rgba(255, 255, 255, 0.12);
  }

  .nav-item.active {
    background-color: #121212;
    color: #ffffff;
  }

  .nav-item.active .nav-label {
    font-weight: 800;
    letter-spacing: 0.01em;
  }

  :global(:root[data-theme="dark"]) .nav-item.active {
    background-color: #ffffff;
    color: #121212;
  }

  .neo-main {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 36px 24px 64px;
    width: 100%;
  }

  /* Full-Width Edge-to-Edge Big Footer */
  .neo-footer-wrapper {
    width: 100%;
    background: var(--color-surface);
    border-top: var(--stroke-neo);
    margin-top: 72px;
  }

  .neo-footer {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 64px 24px 36px;
    width: 100%;
  }

  .footer-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 40px;
    align-items: start;
    margin-bottom: 56px;
  }

  .footer-col {
    display: flex;
    flex-direction: column;
  }

  .footer-col-social {
    align-items: flex-end;
  }

  .footer-brand {
    margin-bottom: 16px;
  }

  .footer-bio {
    font-size: 0.9rem;
    color: var(--color-muted);
    line-height: 1.6;
    max-width: 340px;
  }

  .footer-heading {
    font-family: var(--font-heading);
    font-size: 0.8rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    color: var(--color-ink);
    margin-bottom: 18px;
    text-transform: uppercase;
  }

  .footer-links {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .footer-link {
    color: var(--color-muted);
    text-decoration: none;
    font-size: 0.88rem;
    display: inline-block;
    transition:
      color 0.15s ease,
      transform 0.15s ease;
  }

  .footer-link:hover {
    color: var(--color-ink);
    transform: translateX(4px);
  }

  .footer-social-row {
    display: flex;
    gap: 10px;
    margin-top: 18px;
    flex-wrap: wrap;
  }

  .footer-icon-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    background-color: var(--color-surface);
    color: var(--color-ink);
    border: var(--stroke-neo);
    border-radius: var(--radius-neo-pill);
    box-shadow: var(--shadow-neo-xs);
    cursor: var(--cursor-pointer);
    text-decoration: none;
    transition:
      transform 0.1s ease,
      box-shadow 0.1s ease,
      background-color 0.15s ease;
  }

  .footer-icon-btn:hover {
    transform: translate(-1.5px, -1.5px);
    box-shadow: var(--shadow-neo-sm);
    background-color: var(--color-yellow);
    color: #121212;
  }

  :global(:root[data-theme="dark"]) .footer-icon-btn:hover {
    background-color: var(--color-border-subtle);
    color: var(--color-ink);
  }

  .footer-icon-btn:active {
    transform: translate(2px, 2px);
    box-shadow: 0px 0px 0px var(--color-ink);
  }

  .social-svg {
    display: block;
  }

  /* Bottom Bar */
  .footer-bottom-bar {
    padding-top: 24px;
    border-top: 1px solid var(--color-border-subtle);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
  }

  .footer-legal {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--color-muted);
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .back-to-top-btn {
    font-family: var(--font-mono);
    font-size: 0.76rem;
    font-weight: 700;
    padding: 7px 14px;
    border: var(--stroke-neo);
    border-radius: var(--radius-neo-pill);
    background: var(--color-surface);
    color: var(--color-ink);
    box-shadow: var(--shadow-neo-xs);
    cursor: var(--cursor-pointer);
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition:
      transform 0.1s ease,
      box-shadow 0.1s ease,
      background-color 0.15s ease;
  }

  .back-to-top-btn:hover {
    transform: translate(-1.5px, -1.5px);
    box-shadow: var(--shadow-neo-sm);
    background-color: var(--color-yellow);
    color: #121212;
  }

  :global(:root[data-theme="dark"]) .back-to-top-btn:hover {
    background-color: var(--color-border-subtle);
    color: var(--color-ink);
  }

  .back-to-top-btn:active {
    transform: translate(2px, 2px);
    box-shadow: 0px 0px 0px var(--color-ink);
  }

  /* Footer Responsive Breakpoints */
  @media (max-width: 860px) {
    .footer-grid {
      grid-template-columns: 1fr;
      gap: 32px;
    }
    .footer-col-social {
      align-items: flex-start;
    }
  }

  @media (max-width: 680px) {
    .neo-footer {
      padding: 48px 16px 28px;
    }
    .footer-grid {
      grid-template-columns: 1fr;
      gap: 28px;
      margin-bottom: 36px;
    }
    .footer-col-brand {
      grid-column: span 1;
    }
    .footer-bottom-bar {
      flex-direction: column;
      align-items: flex-start;
      gap: 14px;
    }
  }

  /* Responsive Masthead */
  @media (max-width: 992px) {
    .neo-header {
      padding: 14px 20px;
    }
  }

  @media (max-width: 680px) {
    .neo-header {
      flex-direction: column;
      padding: 14px 16px;
      gap: 12px;
    }
    .neo-nav {
      width: 100%;
      justify-content: space-around;
      gap: 6px;
    }
    .neo-main {
      padding: 24px 16px 48px;
    }
  }

  /* Floating Bottom-Left Theme Toggle */
  .neo-theme-toggle {
    position: fixed;
    bottom: 24px;
    left: 24px;
    z-index: 999;
    width: 44px;
    height: 44px;
    padding: 0;
    background: var(--color-surface);
    color: var(--color-ink);
    border: var(--stroke-neo);
    box-shadow: var(--shadow-neo-sm);
    border-radius: var(--radius-neo-pill);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: var(--cursor-pointer);
    user-select: none;
    transition:
      transform 0.12s ease,
      box-shadow 0.12s ease,
      background-color 0.15s ease;
  }

  .neo-theme-toggle:hover {
    transform: translate(-2px, -2px);
    box-shadow: var(--shadow-neo);
    background-color: var(--color-yellow);
    color: #121212;
  }

  :global(:root[data-theme="dark"]) .neo-theme-toggle:hover {
    background-color: var(--color-border-subtle);
    color: var(--color-ink);
  }

  .neo-theme-toggle:active {
    transform: translate(2px, 2px);
    box-shadow: var(--shadow-neo-xs);
  }

  .theme-svg {
    display: block;
    width: 20px;
    height: 20px;
    pointer-events: none;
  }

  @media (max-width: 680px) {
    .neo-theme-toggle {
      bottom: 16px;
      left: 16px;
      width: 40px;
      height: 40px;
    }

    .theme-svg {
      width: 18px;
      height: 18px;
    }
  }
</style>
