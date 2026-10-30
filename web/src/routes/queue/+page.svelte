<script lang="ts">
  import {
    QUEUE_COLUMNS,
    SAMPLE_QUEUE_ITEMS,
    type QueueStage,
  } from "#lib/data/sampleQueue";

  const queueItems = SAMPLE_QUEUE_ITEMS;

  function getItemsByStage(stage: QueueStage) {
    return queueItems.filter((item) => item.stage === stage);
  }

  const faqs = [
    {
      question: "How does the commission queue work?",
      answer:
        'Once your project scope is approved and the booking deposit is received, your commission enters the queue under "Approved". You can monitor live studio milestones as the artwork progresses through Sketching, Lineart, Coloring, and final Completion.',
    },
    {
      question: "What is the typical turnaround time for a custom piece?",
      answer:
        "Turnaround times generally range from 4 to 6 weeks depending on scale, medium, and drying times for oil layers. Editorial illustrations and digital commissions can often be accommodated on accelerated timelines.",
    },
    {
      question: "What payment schedule and deposit do you require?",
      answer:
        "A 50% non-refundable deposit is required to lock in your active queue slot. The remaining 50% balance, along with insured archival shipping costs, is settled upon final photographic approval prior to dispatch.",
    },
    {
      question: "Can I request revisions during the creation process?",
      answer:
        "Yes. Two iterative review rounds are included during the initial composition and sketching stage. Once physical lineart and permanent pigment layers begin, structural alterations are limited.",
    },
    {
      question: "How is physical artwork packaged and shipped?",
      answer:
        "All physical works on canvas and cradled wood panel are packed in custom museum-grade archival wooden crates with corner guards and climate moisture barriers, insured and shipped via specialized fine-art couriers.",
    },
  ];

  let openFaq = $state<number | null>(0);

  function toggleFaq(index: number) {
    openFaq = openFaq === index ? null : index;
  }
</script>

<svelte:head>
  <title>Commission Queue — Yukiro Studio Workflow & Active Projects</title>
  <meta
    name="description"
    content="Live studio commission queue and project status tracker for original fine art, illustrations, and motion by Yukiro."
  />
</svelte:head>

<!-- Masthead Section -->
<section class="queue-masthead" aria-label="Commission Queue Header">
  <h1 class="queue-main-title">Commission Queue</h1>
</section>

<!-- 5-Column Fitted Kanban Board -->
<section class="kanban-section" aria-label="5-Column Fitted Project Board">
  <div class="fitted-kanban-board">
    {#each QUEUE_COLUMNS as column}
      {@const itemsInColumn = getItemsByStage(column.id)}
      <div class="kanban-column">
        <div class="column-header" style="--col-accent: {column.color};">
          <div class="column-header-top">
            <h2 class="column-title">{column.title}</h2>
            <span class="column-count">{itemsInColumn.length}</span>
          </div>
        </div>

        <div class="column-cards">
          {#if itemsInColumn.length === 0}
            <div class="empty-column-slot">
              <span class="empty-plus">+</span>
              <p class="empty-text">Open stage</p>
            </div>
          {:else}
            {#each itemsInColumn as item}
              <article class="queue-card">
                <h3 class="card-client-title">{item.client}</h3>
                <p class="card-description">{item.description}</p>
                <svg class="receipt-edge" aria-hidden="true">
                  <defs>
                    <pattern
                      id="receipt-tooth-{item.id}"
                      width="12"
                      height="8"
                      patternUnits="userSpaceOnUse"
                    >
                      <path d="M 0,0 L 6,7 L 12,0 Z" class="tooth-fill" />
                      <path d="M 0,0 L 6,7 L 12,0" class="tooth-stroke" />
                    </pattern>
                  </defs>
                  <rect
                    width="100%"
                    height="8"
                    fill="url(#receipt-tooth-{item.id})"
                  />
                </svg>
              </article>
            {/each}
          {/if}
        </div>
      </div>
    {/each}
  </div>
</section>

<!-- Under-Page Contacts Section -->
<section
  class="queue-contact-section"
  aria-label="Commission Inquiries & Booking"
>
  <div class="neo-card contact-dispatch-card">
    <div class="dispatch-header">
      <h2 class="dispatch-title">Request a Studio Commission</h2>
      <p class="dispatch-lead">
        Yukiro accepts a limited number of bespoke original paintings,
        editorial illustrations, and site-specific architectural installations
        per cycle. Inquiries are reviewed in the order received.
      </p>
    </div>

    <div class="dispatch-cta-row">
      <a href="mailto:yukiroart19@gmail.com" class="neo-btn neo-btn-pink">
        SEND ME AN EMAIL ↗
      </a>

      <div class="dispatch-social-row">
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          class="dispatch-icon-btn"
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
          class="dispatch-icon-btn"
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
          class="dispatch-icon-btn"
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
</section>

<!-- Commission FAQ Section -->
<section class="queue-faq-section" aria-label="Frequently Asked Questions">
  <div class="neo-card faq-card">
    <div class="faq-header">
      <h2 class="faq-title">Commission FAQ</h2>
    </div>

    <div class="faq-accordion">
      {#each faqs as faq, i}
        <div class="faq-item" class:is-open={openFaq === i}>
          <button
            type="button"
            class="faq-trigger"
            onclick={() => toggleFaq(i)}
            aria-expanded={openFaq === i}
            aria-controls="faq-answer-{i}"
            id="faq-question-{i}"
          >
            <span class="faq-question-text">{faq.question}</span>
            <span class="faq-icon" aria-hidden="true">+</span>
          </button>

          <div
            id="faq-answer-{i}"
            class="faq-body"
            role="region"
            aria-labelledby="faq-question-{i}"
            inert={openFaq !== i}
          >
            <div class="faq-body-inner">
              <p class="faq-answer-text">{faq.answer}</p>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  /* Masthead */
  .queue-masthead {
    margin-bottom: 36px;
  }

  .queue-main-title {
    font-size: clamp(2.4rem, 4.2vw, 3.8rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.05;
  }

  /* 5-Column Fitted Kanban Board */
  .kanban-section {
    margin-bottom: 56px;
  }

  .fitted-kanban-board {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 14px;
    width: 100%;
    align-items: stretch;
  }

  .kanban-column {
    display: flex;
    flex-direction: column;
    background: var(--color-surface);
    border: var(--stroke-neo);
    box-shadow: var(--shadow-neo-sm);
    min-width: 0;
  }

  .column-header {
    padding: 12px 12px;
    border-bottom: var(--stroke-neo);
    background: var(--color-bg);
    border-top: 5px solid var(--col-accent);
  }

  .column-header-top {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
  }

  .column-title {
    font-family: var(--font-heading);
    font-size: 0.98rem;
    font-weight: 800;
    letter-spacing: -0.01em;
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .column-count {
    font-family: var(--font-mono);
    font-size: 0.74rem;
    font-weight: 700;
    width: 22px;
    height: 22px;
    display: grid;
    place-items: center;
    background: var(--color-surface);
    border: 1.5px solid var(--color-ink);
    border-radius: 50%;
    flex-shrink: 0;
  }

  .column-cards {
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    flex: 1;
    min-height: 200px;
  }

  .queue-card {
    position: relative;
    padding: 14px 14px 10px;
    border: 1.5px solid var(--color-ink);
    border-bottom: none;
    background: var(--color-bg);
    box-shadow: none;
    border-radius: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 8px;
    transition: border-color 0.15s ease;
  }

  .queue-card:hover {
    border-color: var(--color-pink);
  }

  .receipt-edge {
    position: absolute;
    left: -1.5px;
    bottom: -8px;
    width: calc(100% + 3px);
    height: 8px;
    display: block;
    pointer-events: none;
    overflow: visible;
  }

  .tooth-fill {
    fill: var(--color-bg);
  }

  .tooth-stroke {
    fill: none;
    stroke: var(--color-ink);
    stroke-width: 1.5;
    stroke-linejoin: miter;
    transition: stroke 0.15s ease;
  }

  .queue-card:hover .tooth-stroke {
    stroke: var(--color-pink);
  }

  .card-client-title {
    font-family: var(--font-heading);
    font-size: 1.02rem;
    font-weight: 700;
    line-height: 1.25;
    margin: 0;
    padding-bottom: 6px;
    border-bottom: 1px dashed var(--color-border-subtle);
    color: var(--color-ink);
    overflow-wrap: break-word;
  }

  .card-description {
    font-size: 0.82rem;
    color: var(--color-text-muted);
    line-height: 1.45;
    margin: 0;
  }

  .empty-column-slot {
    border: 2px dashed var(--color-border-subtle);
    padding: 24px 12px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    color: var(--color-text-muted);
    min-height: 120px;
  }

  .empty-plus {
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 1;
  }

  .empty-text {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    margin: 0;
  }

  /* Under-Page Contacts Section */
  .queue-contact-section {
    margin-bottom: 32px;
  }

  .contact-dispatch-card {
    padding: 36px;
    background: var(--color-surface);
    border: var(--stroke-neo);
    box-shadow: var(--shadow-neo);
  }

  .dispatch-header {
    margin-bottom: 28px;
  }

  .dispatch-title {
    font-size: clamp(1.8rem, 3.2vw, 2.5rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    margin-bottom: 10px;
  }

  .dispatch-lead {
    font-size: 1.05rem;
    line-height: 1.6;
    color: var(--color-text-muted);
    max-width: 780px;
    margin: 0;
  }

  .dispatch-cta-row {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
  }

  .dispatch-social-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .dispatch-icon-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    background-color: var(--color-surface);
    color: var(--color-ink);
    border: var(--stroke-neo);
    border-radius: var(--radius-neo-pill);
    box-shadow: var(--shadow-neo-xs);
    cursor: var(--cursor-pointer);
    text-decoration: none;
    transition:
      transform var(--duration-fast, 120ms)
        var(--ease-out, cubic-bezier(0.23, 1, 0.32, 1)),
      box-shadow var(--duration-fast, 120ms)
        var(--ease-out, cubic-bezier(0.23, 1, 0.32, 1)),
      background-color 0.15s ease;
  }

  .dispatch-icon-btn:hover {
    transform: translate(-1.5px, -1.5px);
    box-shadow: var(--shadow-neo-sm);
    background-color: var(--color-yellow);
    color: #121212;
  }

  :global(:root[data-theme="dark"]) .dispatch-icon-btn:hover {
    background-color: var(--color-border-subtle);
    color: var(--color-ink);
  }

  .dispatch-icon-btn:active {
    transform: translate(2px, 2px);
    box-shadow: 0px 0px 0px var(--color-ink);
  }

  .social-svg {
    display: block;
  }

  /* Responsive Breakpoints */
  @media (max-width: 1100px) {
    .fitted-kanban-board {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  @media (max-width: 900px) {
    .contact-dispatch-card {
      padding: 24px 20px;
    }
  }

  @media (max-width: 760px) {
    .fitted-kanban-board {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 600px) {
    .queue-masthead {
      margin-bottom: 24px;
    }

    .dispatch-cta-row {
      flex-direction: column;
    }

    .dispatch-cta-row .neo-btn {
      width: 100%;
      text-align: center;
      justify-content: center;
    }
  }

  @media (max-width: 520px) {
    .fitted-kanban-board {
      grid-template-columns: 1fr;
    }
  }

  /* Commission FAQ Section */
  .queue-faq-section {
    margin-bottom: 32px;
  }

  .faq-card {
    padding: 36px;
    background: var(--color-surface);
    border: var(--stroke-neo);
    box-shadow: var(--shadow-neo);
  }

  .faq-header {
    margin-bottom: 24px;
  }

  .faq-title {
    font-size: clamp(1.8rem, 3.2vw, 2.5rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    margin: 0;
  }

  .faq-accordion {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .faq-item {
    border: 2px dashed var(--color-ink);
    background: var(--color-bg);
    box-shadow: 0 0 0 var(--color-ink);
    transition:
      background-color var(--duration-normal, 220ms) ease,
      box-shadow var(--duration-normal, 220ms)
        var(--ease-out, cubic-bezier(0.23, 1, 0.32, 1));
  }

  .faq-item.is-open {
    background: var(--color-surface);
    box-shadow: var(--shadow-neo-xs);
  }

  .faq-trigger {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 18px 20px;
    background: transparent;
    border: none;
    cursor: var(--cursor-pointer);
    text-align: left;
    transition: background-color 0.12s ease;
  }

  .faq-trigger:hover {
    background: rgba(0, 0, 0, 0.03);
  }

  :global(:root[data-theme="dark"]) .faq-trigger:hover {
    background: rgba(255, 255, 255, 0.04);
  }

  .faq-question-text {
    font-family: var(--font-heading);
    font-size: 1.12rem;
    font-weight: 700;
    color: var(--color-ink);
    line-height: 1.35;
  }

  .faq-icon {
    font-family: var(--font-mono);
    font-size: 1.25rem;
    font-weight: 800;
    color: var(--color-ink);
    width: 28px;
    height: 28px;
    display: grid;
    place-items: center;
    border: 1.5px solid var(--color-ink);
    border-radius: 50%;
    background: var(--color-surface);
    flex-shrink: 0;
    line-height: 1;
    transition: transform var(--duration-normal, 220ms)
      var(--ease-out, cubic-bezier(0.23, 1, 0.32, 1));
  }

  .faq-item.is-open .faq-icon {
    transform: rotate(45deg);
  }

  .faq-body {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows var(--duration-normal, 220ms)
      var(--ease-out, cubic-bezier(0.23, 1, 0.32, 1));
  }

  .faq-item.is-open .faq-body {
    grid-template-rows: 1fr;
  }

  .faq-body-inner {
    min-height: 0;
    overflow: hidden;
  }

  .faq-answer-text {
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--color-text-muted);
    margin: 0 20px 20px;
    padding-top: 14px;
    border-top: 1px dashed var(--color-border-subtle);
    opacity: 0;
    transition: opacity var(--duration-fast, 120ms) ease;
  }

  .faq-item.is-open .faq-answer-text {
    opacity: 1;
    transition: opacity var(--duration-normal, 220ms) ease 60ms;
  }

  @media (max-width: 600px) {
    .faq-card {
      padding: 24px 20px;
    }

    .faq-trigger {
      padding: 14px 16px;
    }

    .faq-question-text {
      font-size: 1rem;
    }

    .faq-answer-text {
      margin: 0 16px 16px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .faq-body,
    .faq-icon {
      transition: none !important;
    }
  }
</style>
