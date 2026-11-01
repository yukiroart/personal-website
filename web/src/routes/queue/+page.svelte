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
</script>

<svelte:head>
  <title>Commission Queue & Availability Tracker — Yukiro</title>
  <meta
    name="description"
    content="Real-time 4-stage Kanban commission queue tracking active client artwork progress, review milestones, and queue openings."
  />
  <meta
    property="og:title"
    content="Commission Queue & Availability Tracker — Yukiro"
  />
  <meta
    property="og:description"
    content="Real-time 4-stage Kanban commission queue tracking active client artwork progress, review milestones, and queue openings."
  />
  <meta
    name="twitter:title"
    content="Commission Queue & Availability Tracker — Yukiro"
  />
  <meta
    name="twitter:description"
    content="Real-time 4-stage Kanban commission queue tracking active client artwork progress, review milestones, and queue openings."
  />
</svelte:head>

<div class="queue-page-container">
  <!-- Masthead Section -->
  <section class="queue-masthead" aria-label="Commission Queue Header">
    <h1 class="queue-main-title">Commission Queue</h1>
  </section>

  <!-- 4-Column Fitted Kanban Board -->
  <section class="kanban-section" aria-label="4-Column Fitted Project Board">
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
</div>

<style>
  /* Page Container (Whitespace & Min-Height) */
  .queue-page-container {
    width: 100%;
    min-height: calc(100vh - 100px);
    min-height: calc(100dvh - 100px);
    padding-bottom: 140px;
    display: flex;
    flex-direction: column;
  }
  /* Masthead */
  .queue-masthead {
    margin-bottom: 36px;
  }

  .queue-main-title {
    font-family: var(--font-heading);
    font-size: clamp(2.5rem, 4.5vw, 3.8rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.05;
    color: var(--color-ink);
    margin: 0;
  }

  /* 4-Column Fitted Kanban Board */
  .kanban-section {
    margin-bottom: 56px;
  }

  .fitted-kanban-board {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 16px;
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

  /* Responsive Breakpoints */
  @media (max-width: 1024px) {
    .fitted-kanban-board {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 600px) {
    .queue-masthead {
      margin-bottom: 24px;
    }

    .fitted-kanban-board {
      grid-template-columns: 1fr;
    }

    .column-cards {
      min-height: auto;
      gap: 10px;
      padding: 10px;
    }

    .empty-column-slot {
      padding: 16px;
      min-height: 70px;
    }
  }
</style>
