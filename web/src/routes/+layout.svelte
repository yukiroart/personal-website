<script lang="ts">
  import { dev } from "$app/environment";
  import { SvelteDevKit } from "svelte-grab";
  import "../styles/tokens.css";
  import { page } from "$app/state";
  import { onNavigate } from "$app/navigation";
  import { onMount } from "svelte";
  import { fly, fade } from "svelte/transition";

  let { children } = $props();

  onNavigate((navigation) => {
    if (!document.startViewTransition) return;
    if (navigation.to?.url.pathname === navigation.from?.url.pathname) return;

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });

  let isPortfolio = $derived(
    page.url.pathname === "/" || page.url.pathname === "/portfolio",
  );
  let isCommissions = $derived(page.url.pathname.startsWith("/commissions"));
  let isQueue = $derived(page.url.pathname.startsWith("/queue"));
  let isContact = $derived(page.url.pathname.startsWith("/contact"));
  let isAbout = $derived(page.url.pathname.startsWith("/about"));
  let isError = $derived(page.status >= 400 || !!page.error);

  let scrollY = $state(0);
  let isScrolled = $derived(scrollY > 25);

  let currentTheme = $state("dark");
  let clickSound: HTMLAudioElement | null = null;

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

  let isSoundMuted = $state(false);

  function toggleSound() {
    isSoundMuted = !isSoundMuted;
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("sound_muted", String(isSoundMuted));
    }
    if (!isSoundMuted && clickSound) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
  }

  const INTERACTIVE_SELECTOR =
    'button, a, [role="button"], input[type="submit"], input[type="button"], input[type="reset"], input[type="checkbox"], input[type="radio"], summary, label[for]';

  onMount(() => {
    const saved =
      localStorage.getItem("theme") ||
      document.documentElement.getAttribute("data-theme") ||
      "dark";
    currentTheme = saved;
    document.documentElement.setAttribute("data-theme", saved);

    const savedMuted = localStorage.getItem("sound_muted");
    if (savedMuted !== null) {
      isSoundMuted = savedMuted === "true";
    }

    clickSound = new Audio("/sounds/click.wav");
    clickSound.preload = "auto";
  });

  function handleGlobalClick(event: MouseEvent) {
    if (!clickSound || isSoundMuted) return;
    const target = event.target as HTMLElement | null;
    if (!target) return;

    const interactive = target.closest(
      INTERACTIVE_SELECTOR,
    ) as HTMLElement | null;
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

  // Mobile Hamburger Menu State
  let isMobileMenuOpen = $state(false);

  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
  }

  function closeMobileMenu() {
    isMobileMenuOpen = false;
  }

  $effect(() => {
    // Automatically close mobile menu on route change
    page.url.pathname;
    isMobileMenuOpen = false;
  });

  $effect(() => {
    if (typeof document !== "undefined") {
      if (isMobileMenuOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    }
  });

  function handleWindowKeydown(e: KeyboardEvent) {
    if (e.key === "Escape" && isMobileMenuOpen) {
      isMobileMenuOpen = false;
    }
  }
</script>

<svelte:window
  bind:scrollY
  onclick={handleGlobalClick}
  onkeydown={handleWindowKeydown}
/>

<svelte:head>
  <title>Yukiro — Digital Illustration Portfolio</title>
  <meta
    name="description"
    content="Contemporary digital illustration, character design, and visual art portfolio by Yukiro."
  />
</svelte:head>

{#if !isError}
  <!-- Minimal Neobrutalist Full-Width Masthead -->
  <header class="neo-header-wrapper" class:is-scrolled={isScrolled}>
    <div class="neo-header">
      <a
        href="/"
        class="neo-brand"
        aria-label="Yukiro Home"
        onclick={closeMobileMenu}
      >
        <img
          src="/images/logo.png"
          alt="Yukiro"
          class="brand-logo"
          width="334"
          height="117"
        />
      </a>

      <!-- 5-link Navigation (Desktop) -->
      <nav class="neo-nav desktop-nav" aria-label="Main Navigation">
        <a
          href="/"
          class="nav-item"
          class:active={isPortfolio}
          data-text="PORTFOLIO"
        >
          <span class="nav-label">PORTFOLIO</span>
        </a>
        <a
          href="/commissions"
          class="nav-item"
          class:active={isCommissions}
          data-text="COMMISSIONS"
        >
          <span class="nav-label">COMMISSIONS</span>
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
        <a
          href="/about"
          class="nav-item"
          class:active={isAbout}
          data-text="ABOUT"
        >
          <span class="nav-label">ABOUT</span>
        </a>
      </nav>

      <!-- Tactile Hamburger Button (Mobile & Tablet <= 1024px) -->
      <button
        type="button"
        class="hamburger-btn"
        class:is-active={isMobileMenuOpen}
        onclick={toggleMobileMenu}
        aria-label={isMobileMenuOpen
          ? "Close navigation menu"
          : "Open navigation menu"}
        aria-expanded={isMobileMenuOpen}
        aria-controls="mobile-nav-drawer"
      >
        <span class="hamburger-bar top"></span>
        <span class="hamburger-bar mid"></span>
        <span class="hamburger-bar bot"></span>
      </button>
    </div>

    <!-- Mobile Drawer Menu -->
    {#if isMobileMenuOpen}
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <div
        class="mobile-backdrop"
        onclick={closeMobileMenu}
        role="presentation"
        aria-hidden="true"
      ></div>
    {/if}

    <nav
      id="mobile-nav-drawer"
      class="mobile-nav-drawer"
      class:is-open={isMobileMenuOpen}
      aria-label="Mobile Navigation"
      inert={!isMobileMenuOpen}
    >
      <div class="mobile-nav-links">
        <a
          href="/"
          class="mobile-nav-item"
          class:active={isPortfolio}
          onclick={closeMobileMenu}
        >
          <span class="mobile-nav-index">01</span>
          <span class="mobile-nav-label">PORTFOLIO</span>
        </a>
        <a
          href="/commissions"
          class="mobile-nav-item"
          class:active={isCommissions}
          onclick={closeMobileMenu}
        >
          <span class="mobile-nav-index">02</span>
          <span class="mobile-nav-label">COMMISSIONS</span>
        </a>
        <a
          href="/queue"
          class="mobile-nav-item"
          class:active={isQueue}
          onclick={closeMobileMenu}
        >
          <span class="mobile-nav-index">03</span>
          <span class="mobile-nav-label">QUEUE</span>
        </a>
        <a
          href="/contact"
          class="mobile-nav-item"
          class:active={isContact}
          onclick={closeMobileMenu}
        >
          <span class="mobile-nav-index">04</span>
          <span class="mobile-nav-label">CONTACT</span>
        </a>
        <a
          href="/about"
          class="mobile-nav-item"
          class:active={isAbout}
          onclick={closeMobileMenu}
        >
          <span class="mobile-nav-index">05</span>
          <span class="mobile-nav-label">ABOUT</span>
        </a>
      </div>
    </nav>
  </header>
{/if}

<!-- Main Page Content Slot -->
<main class="neo-main" class:error-main={isError}>
  {@render children?.()}
</main>

{#if !isError}
  <!-- Soft Orange Checkerboard Side Ribbons -->
  <div class="page-checker-ribbon left" aria-hidden="true"></div>
  <div class="page-checker-ribbon right" aria-hidden="true"></div>
{/if}

{#if !isError}
  <!-- Full-Width Edge-to-Edge Big Footer -->
  <footer class="neo-footer-wrapper">
    <div class="neo-footer">
      <div class="footer-grid">
        <!-- Col 1: Brand & Studio Summary -->
        <div class="footer-col footer-col-brand">
          <a href="/" class="neo-brand footer-brand" aria-label="Yukiro Home">
            <img
              src="/images/logo.png"
              alt="Yukiro"
              class="brand-logo footer-logo"
              width="334"
              height="117"
            />
          </a>
          <p class="footer-bio">
            I am a digital illustrator, who enjoys character design! I can also
            do diverse art styles if need be.
          </p>
        </div>

        <!-- Col 2: Navigation Links -->
        <div class="footer-col">
          <h3 class="footer-heading">NAVIGATION</h3>
          <ul class="footer-links">
            <li><a href="/" class="footer-link">PORTFOLIO</a></li>
            <li><a href="/commissions" class="footer-link">COMMISSIONS</a></li>
            <li><a href="/queue" class="footer-link">QUEUE</a></li>
            <li><a href="/contact" class="footer-link">CONTACT</a></li>
            <li><a href="/about" class="footer-link">ABOUT</a></li>
          </ul>
        </div>

        <!-- Col 3: Connect & Social -->
        <div class="footer-col footer-col-social">
          <div class="footer-social-row">
            <!-- X / Twitter -->
            <a
              href="https://x.com/YUKIR0_arts"
              target="_blank"
              rel="noopener noreferrer"
              class="footer-icon-btn"
              aria-label="Yukiro on X"
              title="X (Twitter): @YUKIR0_arts"
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
                  d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
                />
              </svg>
            </a>

            <!-- Gmail -->
            <a
              href="mailto:yukiroart19@gmail.com"
              class="footer-icon-btn"
              aria-label="Email Yukiro via Gmail"
              title="Gmail: yukiroart19@gmail.com"
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
                  d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"
                />
              </svg>
            </a>

            <!-- Discord -->
            <div class="footer-discord-wrap">
              <button
                type="button"
                class="footer-icon-btn discord-icon-btn"
                onclick={copyDiscord}
                aria-label="Copy Discord username (yuk1r0)"
                title="Click to copy yuk1r0"
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
          </div>
        </div>
      </div>

      <!-- Bottom Bar: Legal + Back to Top -->
      <div class="footer-bottom-bar">
        <div class="footer-legal">
          <span>© {new Date().getFullYear()} Yukiro. All rights reserved.</span
          >
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
{/if}

{#if !isError}
  <!-- Floating Watermark Annotation above Netlify Badge -->
  <aside class="watermark-annotation" aria-hidden="true">
    (Ignore this watermark)
  </aside>
{/if}

<!-- Bottom-Left Floating Quick Controls (Sound Mute & Theme) -->
<div class="neo-floating-dock">
  <button
    onclick={toggleSound}
    class="neo-floating-btn"
    type="button"
    aria-label={isSoundMuted ? "Unmute click sounds" : "Mute click sounds"}
    title={isSoundMuted
      ? "Click to unmute sound effects"
      : "Click to mute sound effects"}
  >
    {#if isSoundMuted}
      <!-- Volume Muted / Off Icon -->
      <svg
        class="control-svg"
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
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <line x1="23" y1="9" x2="17" y2="15"></line>
        <line x1="17" y1="9" x2="23" y2="15"></line>
      </svg>
    {:else}
      <!-- Volume Active / On Icon -->
      <svg
        class="control-svg"
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
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
      </svg>
    {/if}
  </button>

  <button
    onclick={toggleTheme}
    class="neo-floating-btn neo-theme-toggle"
    type="button"
    aria-label={currentTheme === "dark"
      ? "Switch to light mode"
      : "Switch to dark mode"}
    title={currentTheme === "dark"
      ? "Switch to light mode"
      : "Switch to dark mode"}
  >
    {#if currentTheme === "dark"}
      <!-- Sun icon for light mode affordance -->
      <svg
        class="control-svg theme-svg"
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
        class="control-svg theme-svg"
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
</div>

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
    padding: 20px 24px;
    background: transparent;
    border: none;
    box-shadow: none;
    border-radius: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    transition: padding var(--duration-normal, 220ms) var(--ease-out);
  }

  .neo-header-wrapper.is-scrolled .neo-header {
    padding: 10px 24px;
  }

  .neo-brand {
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    color: var(--color-ink);
  }

  .brand-logo {
    height: 117px;
    width: auto;
    display: block;
    object-fit: contain;
    /* Light mode: black graffiti lettering with crisp white contour stroke */
    filter: drop-shadow(1.5px 0 0 #ffffff) drop-shadow(-1.5px 0 0 #ffffff)
      drop-shadow(0 1.5px 0 #ffffff) drop-shadow(0 -1.5px 0 #ffffff);
    transition:
      height var(--duration-normal, 220ms) var(--ease-out),
      filter var(--duration-fast, 120ms) var(--ease-out),
      transform var(--duration-fast, 120ms) var(--ease-out);
  }

  .brand-logo:hover {
    transform: scale(1.03);
  }

  .neo-header-wrapper.is-scrolled .brand-logo {
    height: 36px;
  }

  .footer-logo {
    height: 44px !important;
    margin-bottom: 4px;
  }

  :global(:root[data-theme="dark"]) .brand-logo {
    /* Dark mode: inverted to crisp white letters with deep dark outline stroke */
    filter: invert(1) drop-shadow(1.5px 0 0 #000000)
      drop-shadow(-1.5px 0 0 #000000) drop-shadow(0 1.5px 0 #000000)
      drop-shadow(0 -1.5px 0 #000000);
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
      font-weight var(--duration-fast, 120ms) var(--ease-out),
      letter-spacing var(--duration-fast, 120ms) var(--ease-out);
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
    position: relative;
    z-index: 1;
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 36px 24px 64px;
    width: 100%;
    view-transition-name: page-main;
  }

  .neo-main.error-main {
    max-width: 100%;
    margin: 0;
    padding: 0;
    min-height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* View Transitions API (Hardware-Accelerated Composite Page Motion) */
  @keyframes pageExit {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-4px);
    }
  }

  @keyframes pageEnter {
    from {
      opacity: 0;
      transform: translateY(6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  :global(:root::view-transition-old(root)),
  :global(:root::view-transition-new(root)) {
    animation: none !important;
  }

  :global(:root::view-transition-old(page-main)),
  :global(:root::view-transition-new(page-main)) {
    mix-blend-mode: normal;
  }

  :global(:root::view-transition-old(page-main)) {
    animation: pageExit 100ms var(--ease-out, cubic-bezier(0.23, 1, 0.32, 1))
      forwards;
  }

  :global(:root::view-transition-new(page-main)) {
    animation: pageEnter 180ms var(--ease-out, cubic-bezier(0.23, 1, 0.32, 1))
      forwards;
  }

  /* Soft Orange Checkerboard Side Ribbons */
  .page-checker-ribbon {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 48px;
    z-index: 0;
    pointer-events: none;
    background: conic-gradient(
      var(--color-orange-soft, #ffb370) 90deg,
      transparent 90deg 180deg,
      var(--color-orange-soft, #ffb370) 180deg 270deg,
      transparent 270deg
    );
    background-size: 48px 48px;
  }

  .page-checker-ribbon.left {
    left: 0;
    border-right: 2.5px solid var(--color-ink);
  }

  .page-checker-ribbon.right {
    right: 0;
    border-left: 2.5px solid var(--color-ink);
  }

  @media (max-width: 1024px) {
    .page-checker-ribbon {
      display: none !important;
    }
  }

  /* Full-Width Edge-to-Edge Big Footer */
  .neo-footer-wrapper {
    position: relative;
    z-index: 50;
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
    background-color: #121212;
    color: #ffffff;
    border: var(--stroke-neo);
    border-radius: var(--radius-neo-pill);
    box-shadow: var(--shadow-neo-xs);
    cursor: var(--cursor-pointer);
    text-decoration: none;
    transition:
      transform var(--duration-fast, 120ms) var(--ease-out),
      box-shadow var(--duration-fast, 120ms) var(--ease-out),
      background-color 0.15s ease,
      color 0.15s ease;
  }

  .footer-icon-btn:hover {
    transform: translate(-1.5px, -1.5px);
    box-shadow: var(--shadow-neo-sm);
    background-color: var(--color-yellow);
    color: #121212;
  }

  :global(:root[data-theme="dark"]) .footer-icon-btn {
    background-color: #121212;
    color: #ffffff;
    border-color: var(--color-border-subtle);
  }

  :global(:root[data-theme="dark"]) .footer-icon-btn:hover {
    background-color: var(--color-yellow);
    color: #121212;
  }

  .footer-icon-btn:active {
    transform: translate(2px, 2px) scale(0.96);
    box-shadow: 0px 0px 0px var(--color-ink);
  }

  .social-svg {
    display: block;
  }

  /* Footer Discord Wrap & Toast */
  .footer-discord-wrap {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .footer-discord-wrap .toast-anchor {
    position: absolute;
    bottom: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%);
    pointer-events: none;
    z-index: 50;
    display: flex;
    justify-content: center;
  }

  .footer-discord-wrap .toast-popup {
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

  .footer-discord-wrap .toast-popup::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #121212 transparent transparent transparent;
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

  /* Hamburger Menu Button */
  .hamburger-btn {
    display: none;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 4px;
    width: 44px;
    height: 44px;
    padding: 0;
    background: var(--color-surface);
    border: var(--stroke-neo);
    box-shadow: var(--shadow-neo-xs);
    border-radius: 0;
    cursor: var(--cursor-pointer);
    user-select: none;
    transition:
      transform var(--duration-fast, 120ms) var(--ease-out),
      box-shadow var(--duration-fast, 120ms) var(--ease-out),
      background-color 0.15s ease;
  }

  .hamburger-btn:hover {
    background-color: var(--color-border-subtle);
  }

  .hamburger-btn:active {
    transform: translate(2px, 2px) scale(0.96);
    box-shadow: 0px 0px 0px var(--color-ink);
  }

  .hamburger-bar {
    display: block;
    width: 20px;
    height: 2px;
    background-color: var(--color-ink);
    border-radius: 2px;
    transition:
      transform var(--duration-normal, 220ms) var(--ease-out),
      opacity var(--duration-fast, 120ms) var(--ease-out);
  }

  .hamburger-btn.is-active .hamburger-bar.top {
    transform: translateY(6px) rotate(45deg);
  }

  .hamburger-btn.is-active .hamburger-bar.mid {
    opacity: 0;
  }

  .hamburger-btn.is-active .hamburger-bar.bot {
    transform: translateY(-6px) rotate(-45deg);
  }

  /* Mobile Backdrop */
  .mobile-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    height: 100dvh;
    background: rgba(12, 12, 14, 0.65);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    z-index: 90;
    animation: fadeInBackdrop 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  /* Mobile Drawer Menu */
  .mobile-nav-drawer {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: var(--color-surface);
    border-bottom: var(--stroke-neo);
    box-shadow: var(--shadow-neo);
    z-index: 95;
    overflow: hidden;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-8px) scaleY(0.98);
    transform-origin: top center;
    transition:
      transform var(--duration-normal, 220ms) var(--ease-out),
      opacity var(--duration-normal, 220ms) var(--ease-out),
      visibility var(--duration-normal, 220ms);
  }

  .mobile-nav-drawer.is-open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0) scaleY(1);
  }

  .mobile-nav-links {
    padding: 18px 20px 24px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .mobile-nav-item {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 12px 16px;
    background: transparent;
    border: 1.5px solid transparent;
    border-radius: var(--radius-neo-sm);
    text-decoration: none;
    color: var(--color-ink);
    font-family: var(--font-heading);
    font-size: 1.15rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    min-height: 48px;
    transition:
      background-color 0.12s ease,
      border-color 0.12s ease,
      transform 0.1s ease;
  }

  .mobile-nav-index {
    font-family: var(--font-mono);
    font-size: 0.76rem;
    font-weight: 700;
    color: var(--color-muted);
  }

  .mobile-nav-label {
    flex: 1;
  }

  .mobile-nav-item:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  :global(:root[data-theme="dark"]) .mobile-nav-item:hover {
    background: rgba(255, 255, 255, 0.06);
  }

  .mobile-nav-item.active {
    background: var(--color-bg);
    border-color: var(--color-ink);
    box-shadow: var(--shadow-neo-xs);
    font-weight: 800;
  }

  .mobile-nav-item.active .mobile-nav-index {
    color: var(--color-pink);
  }

  :global(:root[data-theme="dark"]) .mobile-nav-item.active {
    background: var(--color-surface);
    border-color: var(--color-ink);
  }

  /* Responsive Masthead */
  @media (max-width: 1024px) {
    .neo-header {
      padding: 14px 20px;
    }

    .neo-header-wrapper.is-scrolled .neo-header {
      padding: 8px 20px;
    }

    .brand-logo {
      height: 72px;
      max-width: calc(100vw - 84px);
    }

    .neo-header-wrapper.is-scrolled .brand-logo {
      height: 32px;
    }

    .desktop-nav {
      display: none !important;
    }

    .hamburger-btn {
      display: inline-flex;
    }
  }

  @media (max-width: 768px) {
    .neo-header {
      padding: 14px 16px;
    }

    .neo-header-wrapper.is-scrolled .neo-header {
      padding: 8px 16px;
    }

    .neo-main {
      padding: 24px 16px 48px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .neo-header,
    .brand-logo,
    .hamburger-btn,
    .hamburger-bar,
    .mobile-backdrop,
    .mobile-nav-drawer,
    .mobile-nav-item,
    .nav-item,
    .nav-label {
      transition: none !important;
      animation: none !important;
      transform: none !important;
    }

    :global(:root::view-transition-old(page-main)),
    :global(:root::view-transition-new(page-main)) {
      animation: none !important;
    }
  }

  /* Bottom-Left Floating Quick Controls Dock */
  .neo-floating-dock {
    position: fixed;
    bottom: 24px;
    left: 24px;
    z-index: 999;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .neo-floating-btn {
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
      background-color 0.15s ease,
      color 0.15s ease;
  }

  .neo-floating-btn:hover {
    transform: translate(-2px, -2px);
    box-shadow: var(--shadow-neo);
    background-color: var(--color-yellow);
    color: #121212;
  }

  :global(:root[data-theme="dark"]) .neo-floating-btn:hover {
    background-color: var(--color-border-subtle);
    color: var(--color-ink);
  }

  .neo-floating-btn:active {
    transform: translate(2px, 2px);
    box-shadow: var(--shadow-neo-xs);
  }

  .control-svg {
    display: block;
    width: 20px;
    height: 20px;
    pointer-events: none;
  }

  @media (max-width: 680px) {
    .neo-floating-dock {
      bottom: 16px;
      left: 16px;
      gap: 8px;
    }

    .neo-floating-btn {
      width: 42px;
      height: 42px;
    }

    .control-svg {
      width: 19px;
      height: 19px;
    }
  }

  /* Floating Watermark Annotation above Netlify Badge */
  .watermark-annotation {
    position: fixed;
    bottom: 60px;
    right: 18px;
    z-index: 90;
    pointer-events: none;
    user-select: none;
    font-family: var(--font-handwriting, "Caveat", cursive);
    font-size: 1.15rem;
    font-weight: 600;
    color: var(--color-muted);
    transform: rotate(-3deg);
    letter-spacing: 0.02em;
    white-space: nowrap;
  }

  @media (max-width: 680px) {
    .watermark-annotation {
      bottom: 56px;
      right: 14px;
      font-size: 1.05rem;
    }
  }
</style>
