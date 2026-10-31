<script lang="ts">
  // Contact page — Business inquiries and social presence
</script>

<svelte:head>
  <title>Contact — Yukiro Art Studio & Inquiries</title>
  <meta
    name="description"
    content="Direct contact channels and business inquiries for original artwork, commercial illustration, and collaborations by Yukiro."
  />
</svelte:head>

<div class="contact-page-container">
  <!-- Masthead Intro Header -->
  <header class="contact-masthead">
    <h1 class="contact-page-title">CONTACT</h1>
  </header>

  <!-- Central Contact Card (Similar to DM for a Commission) -->
  <section class="neo-card contact-card" aria-label="Business Inquiries & Social Presence">
    <div class="contact-header">
      <span class="contact-badge">BUSINESS INQUIRIES</span>
    </div>

    <div class="contact-email-block">
      <p class="contact-email-intro">For business inquiries!</p>
      <a href="mailto:yukiroart@gmail.com" class="contact-email-link">
        yukiroart@gmail.com ↗
      </a>
    </div>

    <p class="contact-socmed-label">
      links to my other socmeds (informal, must change this text, placeholder for now)
    </p>

    <!-- Large Tactile Social Icons Row -->
    <div class="contact-icons-row" role="group" aria-label="Social media channels">
      <!-- Discord -->
      <a
        href="https://discord.com"
        target="_blank"
        rel="noopener noreferrer"
        class="contact-icon-btn"
        aria-label="Direct message on Discord"
        title="Discord"
      >
        <svg class="contact-svg" viewBox="0 0 24 24" role="img" aria-hidden="true">
          <path
            fill="currentColor"
            d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"
          />
        </svg>
      </a>

      <!-- Gmail -->
      <a
        href="mailto:yukiroart@gmail.com"
        class="contact-icon-btn"
        aria-label="Send email via Gmail"
        title="Gmail"
      >
        <svg class="contact-svg" viewBox="0 0 24 24" role="img" aria-hidden="true">
          <path
            fill="currentColor"
            d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"
          />
        </svg>
      </a>

      <!-- X -->
      <a
        href="https://x.com"
        target="_blank"
        rel="noopener noreferrer"
        class="contact-icon-btn"
        aria-label="Find Yukiro on X"
        title="X"
      >
        <svg class="contact-svg" viewBox="0 0 24 24" role="img" aria-hidden="true">
          <path
            fill="currentColor"
            d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
          />
        </svg>
      </a>

      <!-- Facebook -->
      <a
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        class="contact-icon-btn"
        aria-label="Find Yukiro on Facebook"
        title="Facebook"
      >
        <svg class="contact-svg" viewBox="0 0 24 24" role="img" aria-hidden="true">
          <path
            fill="currentColor"
            d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
          />
        </svg>
      </a>

      <!-- Instagram -->
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        class="contact-icon-btn"
        aria-label="Find Yukiro on Instagram"
        title="Instagram"
      >
        <svg class="contact-svg" viewBox="0 0 24 24" role="img" aria-hidden="true">
          <path
            fill="currentColor"
            d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"
          />
        </svg>
      </a>

      <!-- ArtStation -->
      <a
        href="https://artstation.com"
        target="_blank"
        rel="noopener noreferrer"
        class="contact-icon-btn"
        aria-label="Find Yukiro on ArtStation"
        title="ArtStation"
      >
        <svg class="contact-svg" viewBox="0 0 24 24" role="img" aria-hidden="true">
          <path
            fill="currentColor"
            d="M0 17.723l2.027 3.505h.001a2.424 2.424 0 0 0 2.164 1.333h13.457l-2.792-4.838H0zm24 .025c0-.484-.143-.935-.388-1.314L15.728 2.728a2.424 2.424 0 0 0-2.142-1.289H9.419L21.598 22.54l1.92-3.325c.378-.637.482-.919.482-1.467zm-11.129-3.462L7.428 4.858l-5.444 9.428h10.887z"
          />
        </svg>
      </a>
    </div>
  </section>
</div>

<style>
  /* Layout Container */
  .contact-page-container {
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    padding-bottom: 72px;
  }

  /* Masthead */
  .contact-masthead {
    margin-bottom: 36px;
  }

  .contact-page-title {
    font-size: clamp(2.4rem, 4.5vw, 3.8rem);
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

  /* Central Contact Card (Similar to DM Card) */
  .contact-card {
    padding: 38px 40px;
    display: flex;
    flex-direction: column;
    gap: 22px;
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

  .contact-email-block {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 4px;
  }

  .contact-email-intro {
    font-size: 1.15rem;
    font-weight: 700;
    color: var(--color-ink);
    margin: 0;
    line-height: 1.4;
  }

  .contact-email-link {
    display: inline-block;
    font-family: var(--font-mono);
    font-size: clamp(1.1rem, 2.4vw, 1.4rem);
    font-weight: 700;
    color: var(--color-ink);
    background: var(--color-bg);
    border: 2px solid var(--color-ink);
    padding: 10px 18px;
    box-shadow: var(--shadow-neo-sm);
    text-decoration: none;
    align-self: flex-start;
    transition:
      transform var(--duration-fast, 120ms) var(--ease-out, cubic-bezier(0.23, 1, 0.32, 1)),
      box-shadow var(--duration-fast, 120ms) var(--ease-out, cubic-bezier(0.23, 1, 0.32, 1)),
      background-color 0.15s ease;
  }

  .contact-email-link:hover {
    transform: translate(-2px, -2px);
    box-shadow: var(--shadow-neo);
    background-color: var(--color-pink);
    color: #121212;
  }

  .contact-email-link:active {
    transform: translate(2px, 2px);
    box-shadow: 0px 0px 0px var(--color-ink);
  }

  .contact-socmed-label {
    font-size: 1rem;
    color: var(--color-text-muted);
    line-height: 1.5;
    margin: 0;
    font-style: italic;
  }

  /* Large Tactile Social Icons Row (Matching DM Icons) */
  .contact-icons-row {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
    margin-top: 6px;
  }

  .contact-icon-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 54px;
    height: 54px;
    background: var(--color-surface);
    color: var(--color-ink);
    border: 2px solid var(--color-ink);
    box-shadow: var(--shadow-neo-sm);
    border-radius: 0;
    cursor: var(--cursor-pointer);
    transition:
      transform var(--duration-fast, 120ms) var(--ease-out, cubic-bezier(0.23, 1, 0.32, 1)),
      box-shadow var(--duration-fast, 120ms) var(--ease-out, cubic-bezier(0.23, 1, 0.32, 1)),
      background-color 0.15s ease,
      color 0.15s ease;
  }

  .contact-icon-btn:hover {
    transform: translate(-2px, -2px);
    box-shadow: var(--shadow-neo);
    background-color: var(--color-yellow);
    color: #121212;
  }

  :global(:root[data-theme="dark"]) .contact-icon-btn:hover {
    background-color: var(--color-border-subtle);
    color: var(--color-ink);
  }

  .contact-icon-btn:active {
    transform: translate(2px, 2px);
    box-shadow: 0px 0px 0px var(--color-ink);
  }

  .contact-svg {
    width: 26px;
    height: 26px;
    display: block;
  }

  /* Responsive Adjustments */
  @media (max-width: 680px) {
    .contact-card {
      padding: 26px 20px;
      gap: 18px;
    }

    .contact-email-link {
      font-size: 1rem;
      padding: 8px 14px;
      width: 100%;
      text-align: center;
      justify-content: center;
    }

    .contact-icon-btn {
      width: 48px;
      height: 48px;
    }

    .contact-svg {
      width: 22px;
      height: 22px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .contact-email-link,
    .contact-icon-btn {
      transition: none !important;
    }
  }
</style>
