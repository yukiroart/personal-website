<script lang="ts">
  import { QUEUE_COLUMNS, SAMPLE_QUEUE_ITEMS, type QueueStage } from '#lib/data/sampleQueue';

  const queueItems = SAMPLE_QUEUE_ITEMS;

  function getItemsByStage(stage: QueueStage) {
    return queueItems.filter((item) => item.stage === stage);
  }
</script>

<svelte:head>
  <title>Commission Queue — Lindsay Studio Workflow & Active Projects</title>
  <meta
    name="description"
    content="Live studio commission queue and project status tracker for original fine art, illustrations, and motion by Lindsay."
  />
</svelte:head>

<!-- Masthead Section -->
<section class="queue-masthead" aria-label="Commission Queue Header">
  <div class="masthead-top-row">
    <h1 class="queue-main-title">Commission Queue</h1>
    <div class="status-indicator-pill">
      <span class="live-dot" aria-hidden="true"></span>
      <span class="status-text">STATUS: COMMISSIONS OPEN</span>
    </div>
  </div>
</section>

<!-- Kanban Board Section -->
<section class="kanban-section" aria-label="Interactive Project Board">
  <div class="kanban-scroll-wrapper">
    <div class="kanban-board">
      {#each QUEUE_COLUMNS as column}
        {@const itemsInColumn = getItemsByStage(column.id)}
        <div class="kanban-column">
          <!-- Column Header -->
          <div class="column-header" style="--col-accent: {column.color};">
            <div class="column-header-top">
              <span class="column-badge">{column.badge}</span>
              <h2 class="column-title">{column.title}</h2>
              <span class="column-count">{itemsInColumn.length}</span>
            </div>
          </div>

          <!-- Column Cards Stack -->
          <div class="column-cards">
            {#if itemsInColumn.length === 0}
              <div class="empty-column-slot">
                <span class="empty-plus">+</span>
                <p class="empty-text">No active works in this stage</p>
              </div>
            {:else}
              {#each itemsInColumn as item}
                <article class="queue-card">
                  <h3 class="card-client-title">{item.client}</h3>
                  <p class="card-description">{item.description}</p>
                </article>
              {/each}
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Under-Page Contacts Section -->
<section class="queue-contact-section" aria-label="Commission Inquiries & Booking">
  <div class="neo-card contact-dispatch-card">
    <div class="dispatch-header">
      <span class="dispatch-sticker">COMMISSION BOOKING</span>
      <h2 class="dispatch-title">Request a Studio Commission</h2>
      <p class="dispatch-lead">
        Lindsay accepts a limited number of bespoke original paintings, editorial illustrations,
        and site-specific architectural installations per cycle. Inquiries are reviewed in the order received.
      </p>
    </div>

    <div class="dispatch-grid">
      <!-- Direct Inquiries -->
      <div class="dispatch-channel">
        <h3 class="channel-heading">Direct Correspondence</h3>
        <p class="channel-text">
          Send project scope, reference imagery, desired dimensions, and target completion dates directly:
        </p>
        <a href="mailto:studio@lindsay-art.com?subject=Commission%20Inquiry" class="dispatch-email-link">
          studio@lindsay-art.com ↗
        </a>
      </div>

      <!-- Turnaround & Terms -->
      <div class="dispatch-channel">
        <h3 class="channel-heading">Standard Guidelines</h3>
        <ul class="channel-list">
          <li><strong>Deposit:</strong> 50% non-refundable booking deposit upon contract approval.</li>
          <li><strong>Process:</strong> Two rounds of composition sketching included with all original commissions.</li>
          <li><strong>Shipping:</strong> Worldwide archival insured crate delivery via bespoke art couriers.</li>
        </ul>
      </div>
    </div>

    <div class="dispatch-cta-row">
      <a href="/contact" class="neo-btn neo-btn-pink">
        VISIT STUDIO CONTACT PAGE ✦
      </a>
      <a href="/services" class="neo-btn neo-btn-yellow">
        VIEW CREATIVE SERVICES ↗
      </a>
    </div>
  </div>
</section>

<style>
  /* Masthead */
  .queue-masthead {
    margin-bottom: 36px;
  }

  .masthead-top-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    flex-wrap: wrap;
    margin-bottom: 16px;
  }

  .queue-main-title {
    font-size: clamp(2.4rem, 4.2vw, 3.8rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.05;
  }

  .status-indicator-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--color-surface);
    color: var(--color-ink);
    border: var(--stroke-neo);
    border-radius: var(--radius-neo-pill);
    padding: 8px 18px;
    font-family: var(--font-mono);
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    box-shadow: var(--shadow-neo-xs);
  }

  .live-dot {
    width: 9px;
    height: 9px;
    background-color: var(--color-green);
    border-radius: 50%;
    display: inline-block;
    box-shadow: 0 0 8px var(--color-green);
  }

  /* Kanban Board Track */
  .kanban-section {
    margin-bottom: 56px;
  }

  .kanban-scroll-wrapper {
    overflow-x: auto;
    padding-bottom: 16px;
    -webkit-overflow-scrolling: touch;
  }

  .kanban-board {
    display: grid;
    grid-template-columns: repeat(5, minmax(280px, 1fr));
    gap: 20px;
    min-width: 1420px;
  }

  /* Column Container */
  .kanban-column {
    display: flex;
    flex-direction: column;
    background: var(--color-surface);
    border: var(--stroke-neo);
    box-shadow: var(--shadow-neo);
  }

  .column-header {
    padding: 16px;
    border-bottom: var(--stroke-neo);
    background: var(--color-bg);
    border-top: 5px solid var(--col-accent);
  }

  .column-header-top {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .column-badge {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    font-weight: 800;
    background: var(--color-ink);
    color: var(--color-bg);
    padding: 2px 6px;
    border-radius: var(--radius-neo-pill);
  }

  .column-title {
    font-family: var(--font-heading);
    font-size: 1.15rem;
    font-weight: 800;
    letter-spacing: -0.01em;
    flex: 1;
  }

  .column-count {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    font-weight: 700;
    width: 24px;
    height: 24px;
    display: grid;
    place-items: center;
    background: var(--color-surface);
    border: 1.5px solid var(--color-ink);
    border-radius: 50%;
  }

  /* Cards List */
  .column-cards {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    flex: 1;
    min-height: 240px;
  }

  .queue-card {
    padding: 18px;
    border: 2px dashed var(--color-ink);
    background: var(--color-surface);
    box-shadow: none;
    border-radius: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
    transition: border-color 0.15s ease, background-color 0.15s ease;
  }

  .queue-card:hover {
    border-color: var(--color-pink);
    box-shadow: none;
    transform: none;
  }

  .card-client-title {
    font-family: var(--font-heading);
    font-size: 1.15rem;
    font-weight: 700;
    line-height: 1.25;
    margin: 0;
    color: var(--color-ink);
  }

  .card-description {
    font-size: 0.88rem;
    color: var(--color-text-muted);
    line-height: 1.5;
    margin: 0;
  }

  /* Empty State Slot */
  .empty-column-slot {
    border: 2px dashed var(--color-border-subtle);
    padding: 32px 16px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: var(--color-text-muted);
    min-height: 140px;
  }

  .empty-plus {
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1;
  }

  .empty-text {
    font-family: var(--font-mono);
    font-size: 0.75rem;
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

  .dispatch-sticker {
    display: inline-block;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 700;
    background: var(--color-yellow);
    color: #121212;
    padding: 4px 10px;
    border: 1.5px solid var(--color-ink);
    border-radius: var(--radius-neo-pill);
    box-shadow: var(--shadow-neo-xs);
    margin-bottom: 12px;
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

  .dispatch-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
    padding: 24px 0;
    border-top: 1px dashed var(--color-border-subtle);
    border-bottom: 1px dashed var(--color-border-subtle);
    margin-bottom: 28px;
  }

  .channel-heading {
    font-family: var(--font-heading);
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 8px;
  }

  .channel-text {
    font-size: 0.92rem;
    color: var(--color-text-muted);
    line-height: 1.5;
    margin-bottom: 14px;
  }

  .dispatch-email-link {
    display: inline-block;
    font-family: var(--font-heading);
    font-size: 1.15rem;
    font-weight: 700;
    color: var(--color-ink);
    text-decoration: underline;
    text-underline-offset: 4px;
    transition: color 0.15s ease;
  }

  .dispatch-email-link:hover {
    color: var(--color-pink);
  }

  .channel-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 0.88rem;
    color: var(--color-text-muted);
    line-height: 1.45;
  }

  .channel-list strong {
    color: var(--color-ink);
  }

  .dispatch-cta-row {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }

  /* Responsive Adjustments */
  @media (max-width: 900px) {
    .dispatch-grid {
      grid-template-columns: 1fr;
      gap: 24px;
    }

    .contact-dispatch-card {
      padding: 24px 20px;
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
</style>

