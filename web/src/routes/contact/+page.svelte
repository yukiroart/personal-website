<script lang="ts">
  let name = $state('');
  let email = $state('');
  let message = $state('');
  let acceptedTerms = $state(false);
  let isSubmitted = $state(false);

  function handleSubmit(e: SubmitEvent) {
    // Form submits via mailto or action
    // In Svelte, we can also give feedback
  }
</script>

<svelte:head>
  <title>Contact Lindsay — Studio Inquiries, Commissions & Gallery Representation</title>
  <meta name="description" content="Contact artist Lindsay for original artwork acquisitions, gallery exhibitions, studio visits, and commissions." />
</svelte:head>

<!-- Masthead Intro Header -->
<section class="contact-masthead-section" aria-label="Contact Introduction">
  <h1 class="contact-main-title">Contact Lindsay</h1>
</section>

<!-- Two-Column Contact Layout -->
<div class="contact-editorial-grid">
  <!-- Left Column: Direct Email Details -->
  <aside class="contact-sidebar">
    <!-- Direct Email Card -->
    <div class="neo-card detail-card">
      <span class="detail-sticker">DIRECT EMAIL</span>
      <h2 class="detail-heading">Studio Correspondence</h2>
      <a href="mailto:studio@lindsay-art.com" class="email-link">
        studio@lindsay-art.com ↗
      </a>
      <p class="detail-desc">
        For general correspondence, private acquisitions, press, and curatorial requests.
      </p>
    </div>
  </aside>

  <!-- Right Column: Interactive Inquiry Form -->
  <section class="contact-form-main">
    <div class="neo-card form-card">
      <div class="form-card-header">
        <span class="meta-sticker">INQUIRY DISPATCH</span>
        <h2 class="form-title">Send a Studio Message</h2>
        <p class="form-lead">
          Please fill out the form below. Inquiries are reviewed and answered within 2–3 business days.
        </p>
      </div>

      <form 
        class="inquiry-form" 
        action="mailto:studio@lindsay-art.com" 
        method="post" 
        enctype="text/plain"
        onsubmit={handleSubmit}
      >
        <div class="form-group">
          <label for="name" class="form-label">YOUR NAME</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            required 
            class="neo-input" 
            placeholder="e.g. Eleanor Vance"
            bind:value={name}
          />
        </div>

        <div class="form-group">
          <label for="email" class="form-label">EMAIL ADDRESS</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            required 
            class="neo-input" 
            placeholder="eleanor@example.com"
            bind:value={email}
          />
        </div>

        <div class="form-group">
          <label for="message" class="form-label">MESSAGE</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            required
            class="neo-textarea"
            placeholder="Share details about the work you are interested in or your project proposal..."
            bind:value={message}
          ></textarea>
        </div>

        <div class="terms-group">
          <label class="terms-checkbox-label">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              required
              class="neo-checkbox"
              bind:checked={acceptedTerms}
            />
            <span class="terms-text">
              I've read the <a
                href="#terms-modal"
                class="terms-link"
                onclick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  (document.getElementById('terms-modal') as HTMLDialogElement)?.showModal();
                }}
              >terms and service</a>
            </span>
          </label>
        </div>

        <div class="form-submit-row">
          <button type="submit" class="neo-btn neo-btn-pink">
            SEND STUDIO INQUIRY ✦
          </button>
          <span class="form-privacy-note">
            Direct connection to studio inbox. No spam.
          </span>
        </div>
      </form>
    </div>
  </section>
</div>

<!-- Terms and Service Modal (Placeholder for user-provided terms) -->
<dialog
  id="terms-modal"
  class="terms-dialog"
  onclick={(e) => {
    if (e.target === e.currentTarget) (e.currentTarget as HTMLDialogElement).close();
  }}
>
  <div class="terms-modal-card">
    <div class="terms-modal-header">
      <h3 class="terms-modal-title">Terms & Service</h3>
      <button
        type="button"
        class="terms-close-btn"
        onclick={() => (document.getElementById('terms-modal') as HTMLDialogElement)?.close()}
        aria-label="Close terms modal"
      >
        ✕
      </button>
    </div>
    <div class="terms-modal-body">
      <p class="terms-placeholder-text">
        Studio terms and service details will be provided here.
      </p>
    </div>
  </div>
</dialog>

<style>
  /* Contact Masthead */
  .contact-masthead-section {
    margin-bottom: 36px;
  }

  .contact-main-title {
    font-size: clamp(2.5rem, 4.5vw, 3.8rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.05;
    margin-bottom: 12px;
  }

  /* Two-Column Editorial Grid */
  .contact-editorial-grid {
    display: grid;
    grid-template-columns: 400px 1fr;
    gap: 32px;
    align-items: start;
  }

  /* Shared Neobrutalist Card */
  .neo-card {
    background: var(--color-surface);
    border: var(--stroke-neo);
    box-shadow: var(--shadow-neo);
    border-radius: var(--radius-neo);
    overflow: hidden;
  }

  /* Sidebar Details */
  .contact-sidebar {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .detail-card {
    padding: 24px;
  }

  .detail-sticker {
    display: inline-block;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    background: var(--color-yellow);
    color: #121212;
    border: 1.5px solid var(--color-ink);
    padding: 2px 8px;
    border-radius: 4px;
    margin-bottom: 14px;
  }

  .detail-heading {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 10px;
  }

  .email-link {
    display: inline-block;
    font-family: var(--font-mono);
    font-size: 1rem;
    font-weight: 700;
    color: var(--color-ink);
    background: var(--color-surface);
    border: 1.5px solid var(--color-ink);
    padding: 6px 12px;
    border-radius: var(--radius-neo-sm);
    box-shadow: var(--shadow-neo-xs);
    margin-bottom: 12px;
    transition: transform 0.12s ease;
  }

  .email-link:hover {
    transform: translate(-1px, -1px);
    background-color: var(--color-pink);
    color: #121212;
  }

  .detail-desc {
    font-size: 0.88rem;
    color: var(--color-muted);
    line-height: 1.55;
  }

  /* Form Column */
  .contact-form-main {
    width: 100%;
  }

  .form-card {
    padding: 36px;
  }

  .form-card-header {
    margin-bottom: 28px;
  }

  .form-title {
    font-size: 1.6rem;
    font-weight: 700;
    margin-top: 10px;
    margin-bottom: 8px;
  }

  .form-lead {
    font-size: 0.92rem;
    color: var(--color-muted);
    line-height: 1.55;
  }

  .inquiry-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .form-label {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    color: var(--color-ink);
  }

  .neo-input, .neo-textarea {
    width: 100%;
    font-family: var(--font-body);
    font-size: 0.95rem;
    padding: 12px 16px;
    background: var(--color-surface);
    border: 2px solid var(--color-ink);
    border-radius: var(--radius-neo-sm);
    color: var(--color-ink);
    box-shadow: var(--shadow-neo-xs);
    transition: all 0.12s ease;
    outline: none;
  }

  .neo-input:focus, .neo-textarea:focus {
    background: var(--color-surface);
    box-shadow: var(--shadow-neo-sm);
    transform: translate(-1px, -1px);
  }

  .neo-textarea {
    resize: vertical;
    min-height: 130px;
    line-height: 1.5;
  }

  /* Terms Checkbox */
  .terms-group {
    display: flex;
    align-items: center;
    padding: 6px 0;
  }

  .terms-checkbox-label {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    cursor: var(--cursor-pointer);
    user-select: none;
  }

  .neo-checkbox {
    appearance: none;
    -webkit-appearance: none;
    width: 22px;
    height: 22px;
    border: 2px solid var(--color-ink);
    background: var(--color-surface);
    border-radius: 4px;
    box-shadow: var(--shadow-neo-xs);
    cursor: var(--cursor-pointer);
    display: grid;
    place-items: center;
    position: relative;
    transition: all 0.12s ease;
    flex-shrink: 0;
  }

  .neo-checkbox:hover {
    transform: translate(-1px, -1px);
    box-shadow: var(--shadow-neo-sm);
  }

  .neo-checkbox:checked {
    background-color: var(--color-pink);
  }

  .neo-checkbox:checked::after {
    content: "✓";
    font-size: 14px;
    font-weight: 800;
    color: #121212;
    display: block;
    line-height: 1;
  }

  .terms-text {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--color-ink);
    letter-spacing: 0.01em;
  }

  .terms-link {
    color: var(--color-ink);
    text-decoration: underline;
    text-underline-offset: 3px;
    text-decoration-thickness: 1.5px;
    transition: color 0.12s ease;
  }

  .terms-link:hover {
    color: var(--color-pink);
  }

  .form-submit-row {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-top: 8px;
    flex-wrap: wrap;
  }

  .form-privacy-note {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--color-muted);
  }

  /* Responsive Breakpoints */
  @media (max-width: 900px) {
    .contact-editorial-grid {
      grid-template-columns: 1fr;
    }
    .form-card {
      padding: 24px;
    }
  }

  /* Terms and Service Dialog */
  .terms-dialog {
    border: none;
    background: transparent;
    padding: 0;
    max-width: min(90vw, 540px);
    width: 100%;
    margin: auto;
  }

  .terms-dialog::backdrop {
    background: rgba(0, 0, 0, 0.65);
    backdrop-filter: blur(4px);
  }

  .terms-modal-card {
    background: var(--color-surface);
    border: var(--stroke-neo);
    box-shadow: var(--shadow-neo);
    padding: 28px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .terms-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px dashed var(--color-border-subtle);
    padding-bottom: 12px;
  }

  .terms-modal-title {
    font-family: var(--font-heading);
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--color-ink);
    margin: 0;
  }

  .terms-close-btn {
    width: 32px;
    height: 32px;
    border: 1.5px solid var(--color-ink);
    background: var(--color-bg);
    color: var(--color-ink);
    border-radius: 50%;
    font-weight: 700;
    cursor: var(--cursor-pointer);
    display: grid;
    place-items: center;
    transition: all 0.12s ease;
  }

  .terms-close-btn:hover {
    background: var(--color-pink);
    color: #121212;
  }

  .terms-placeholder-text {
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--color-muted);
    margin: 0;
  }
</style>

