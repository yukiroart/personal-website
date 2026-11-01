<script lang="ts">
  import type { FaqItem } from '#lib/data/sampleFaq';

  interface Props {
    items: FaqItem[];
    title?: string;
    idPrefix?: string;
  }

  let { items = [], title = 'COMMS FAQ', idPrefix = 'comms-faq' }: Props = $props();

  let openFaq = $state<number | null>(0);

  function toggleFaq(index: number) {
    openFaq = openFaq === index ? null : index;
  }

  function formatQuestion(question: string, highlight?: string): string {
    if (!highlight || !highlight.trim()) return question;
    const escaped = highlight.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'i');
    return question.replace(regex, '<strong class="faq-accent">$1</strong>');
  }
</script>

<section class="neo-card comms-faq-card" aria-labelledby="{idPrefix}-heading">
  <div class="faq-header">
    <h2 class="faq-title" id="{idPrefix}-heading">{title}</h2>
  </div>

  <div class="faq-accordion-list">
    {#each items as item, index (item._id || index)}
      <article class="faq-item" class:open={openFaq === index}>
        <button
          type="button"
          class="faq-trigger"
          onclick={() => toggleFaq(index)}
          aria-expanded={openFaq === index}
          aria-controls="{idPrefix}-ans-{item._id || index}"
        >
          <span class="faq-question-text">
            {@html formatQuestion(item.question, item.highlight)}
          </span>
          <span class="faq-toggle-icon" aria-hidden="true">
            <svg
              class="chevron-svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </span>
        </button>

        <div
          id="{idPrefix}-ans-{item._id || index}"
          class="faq-body"
          role="region"
          aria-labelledby="{idPrefix}-trigger-{item._id || index}"
        >
          <div class="faq-body-inner">
            <div class="faq-content-wrap">
              {#if item.accentCallout}
                <p class="faq-answer-text">
                  <strong class="faq-accent">{item.accentCallout}</strong>
                </p>
              {/if}
              {#each item.answer as para}
                <p class="faq-answer-text">{@html para}</p>
              {/each}
            </div>
          </div>
        </div>
      </article>
    {/each}
  </div>
</section>

<style>
  .comms-faq-card {
    display: flex;
    flex-direction: column;
    gap: 24px;
    background: var(--color-surface);
    border: var(--stroke-neo);
    box-shadow: var(--shadow-neo);
    padding: 32px;
  }

  .faq-header {
    border-bottom: 1.5px solid var(--color-border-subtle);
    padding-bottom: 16px;
  }

  .faq-title {
    font-family: var(--font-heading);
    font-size: 1.6rem;
    font-weight: 800;
    letter-spacing: -0.01em;
    color: var(--color-ink);
    margin: 0;
  }

  .faq-accordion-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .faq-item {
    background: transparent;
    border: 1.5px solid var(--color-ink);
    box-shadow: none;
    transition:
      border-color var(--duration-normal) var(--ease-out),
      box-shadow var(--duration-normal) var(--ease-out);
  }

  .faq-item.open {
    border-color: var(--color-ink);
    box-shadow: var(--shadow-neo-xs);
  }

  .faq-trigger {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    background: transparent;
    border: none;
    padding: 18px 20px;
    text-align: left;
    cursor: var(--cursor-pointer);
    color: var(--color-ink);
    font-family: var(--font-heading);
    font-size: 1.05rem;
    font-weight: 700;
    transition: background-color var(--duration-fast) var(--ease-out);
  }

  @media (hover: hover) and (pointer: fine) {
    .faq-trigger:hover {
      background: rgba(0, 0, 0, 0.03);
    }

    :global(:root[data-theme='dark']) .faq-trigger:hover {
      background: rgba(255, 255, 255, 0.04);
    }
  }

  .faq-question-text {
    flex: 1;
    line-height: 1.4;
  }

  .faq-toggle-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background-color: var(--color-surface);
    border: 1.5px solid var(--color-ink);
    color: var(--color-ink);
    flex-shrink: 0;
    transition:
      background-color var(--duration-normal) var(--ease-out),
      border-color var(--duration-normal) var(--ease-out);
  }

  .chevron-svg {
    display: block;
    width: 14px;
    height: 14px;
    transition: transform var(--duration-normal) var(--ease-out);
  }

  .faq-item.open .faq-toggle-icon {
    background-color: var(--color-yellow);
    color: #121212;
  }

  .faq-item.open .chevron-svg {
    transform: rotate(180deg);
  }

  .faq-body {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows var(--duration-normal) var(--ease-out);
    overflow: hidden;
  }

  .faq-item.open .faq-body {
    grid-template-rows: 1fr;
  }

  .faq-body-inner {
    min-height: 0;
    overflow: hidden;
  }

  .faq-content-wrap {
    padding: 14px 20px 20px 20px;
    border-top: 1px solid var(--color-border-subtle);
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .faq-answer-text {
    font-family: var(--font-body);
    font-size: 0.98rem;
    line-height: 1.6;
    color: var(--color-ink);
    margin: 0;
    opacity: 0.9;
  }

  .faq-question-text :global(.faq-accent),
  .faq-answer-text :global(.faq-accent) {
    color: #e02e53;
    font-weight: 800;
  }

  :global(:root[data-theme='dark']) .faq-question-text :global(.faq-accent),
  :global(:root[data-theme='dark']) .faq-answer-text :global(.faq-accent) {
    color: var(--color-pink);
  }

  @media (max-width: 768px) {
    .comms-faq-card {
      padding: 24px 18px;
    }

    .faq-title {
      font-size: 1.35rem;
    }

    .faq-trigger {
      padding: 14px 16px;
      font-size: 0.98rem;
    }

    .faq-content-wrap {
      padding: 12px 16px 16px 16px;
    }
  }
</style>
