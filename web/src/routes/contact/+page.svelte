<script lang="ts">
  let name = $state('');
  let email = $state('');
  let inquiryType = $state('acquisition');
  let message = $state('');
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
          <label for="inquiryType" class="form-label">INQUIRY TYPE</label>
          <div class="select-wrap">
            <select id="inquiryType" name="inquiryType" class="neo-select" bind:value={inquiryType}>
              <option value="acquisition">Artwork Acquisition / Availability</option>
              <option value="exhibition">Exhibition / Curatorial Proposal</option>
              <option value="commission">Custom Commission Request</option>
              <option value="press">Press & Publication</option>
              <option value="studio-visit">Private Studio Visit</option>
            </select>
          </div>
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

  .neo-input, .neo-select, .neo-textarea {
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

  .neo-input:focus, .neo-select:focus, .neo-textarea:focus {
    background: var(--color-surface);
    box-shadow: var(--shadow-neo-sm);
    transform: translate(-1px, -1px);
  }

  .neo-select option {
    background-color: var(--color-surface);
    color: var(--color-ink);
  }

  .neo-textarea {
    resize: vertical;
    min-height: 130px;
    line-height: 1.5;
  }

  .select-wrap {
    position: relative;
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
</style>

