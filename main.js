/**
 * ARKODEEP KOLEY — RUNTIME ENGINE
 * Implements the Interactive Idempotency Simulator,
 * Fact-Guard Visualizer, copy channels, and form handling.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Footer Year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // --------------------------------------------------------------------------
  // 2. Interactive Distributed Lock & Idempotency Simulator (Hero Centerpiece)
  // --------------------------------------------------------------------------
  const simIssuer = document.getElementById('simIssuer');
  const simOperation = document.getElementById('simOperation');
  const codeIssuerVal = document.getElementById('codeIssuerVal');
  const codeKeyVal = document.getElementById('codeKeyVal');
  const codeStateVal = document.getElementById('codeStateVal');
  const simDispatchBtn = document.getElementById('simDispatchBtn');
  const simLatencyPill = document.getElementById('simLatencyPill');
  const simLogBox = document.getElementById('simLogBox');

  const idempotencyStore = new Map();
  let currentKey = createTxHash();

  function createTxHash() {
    const hex = Math.floor(Math.random() * 0xffffffff).toString(16).padStart(8, '0');
    return `idemp_${hex}`;
  }

  function getTimestamp() {
    return new Date().toTimeString().split(' ')[0];
  }

  function refreshCodePreview() {
    const issuer = simIssuer ? simIssuer.value : 'AU_BANK';
    const op = simOperation ? simOperation.value : 'REDEEM';

    if (codeIssuerVal) codeIssuerVal.textContent = `"${issuer}"`;
    if (codeKeyVal) codeKeyVal.textContent = `"${currentKey}"`;
    if (codeStateVal) {
      codeStateVal.textContent = `READY_TO_${op}`;
      codeStateVal.style.color = 'var(--signal-emerald)';
    }
  }

  function pushLog(type, tag, msg) {
    if (!simLogBox) return;
    const line = document.createElement('div');
    line.className = `log-line log-${type}`;
    line.innerHTML = `<span class="ts">${getTimestamp()}</span> [${tag}] ${msg}`;
    simLogBox.appendChild(line);
    simLogBox.scrollTop = simLogBox.scrollHeight;
  }

  if (simIssuer) {
    simIssuer.addEventListener('change', () => {
      currentKey = createTxHash();
      refreshCodePreview();
      pushLog('sys', 'CONFIG', `Proxy routing updated for issuer: ${simIssuer.value}`);
    });
  }

  if (simOperation) {
    simOperation.addEventListener('change', () => {
      currentKey = createTxHash();
      refreshCodePreview();
      pushLog('sys', 'SCHEMA', `Transaction mutation set to: ${simOperation.value}`);
    });
  }

  if (simDispatchBtn) {
    simDispatchBtn.addEventListener('click', dispatchTransaction);
  }

  function dispatchTransaction() {
    const issuer = simIssuer ? simIssuer.value : 'AU_BANK';
    const op = simOperation ? simOperation.value : 'REDEEM';
    const jitter = Math.floor(Math.random() * 15) + 19; // 19ms - 34ms

    // Check if this key was already processed (Demonstrate Idempotency Replay)
    if (idempotencyStore.has(currentKey)) {
      pushLog('replay', 'IDEMP_REPLAY', `Key ${currentKey} already committed. Returning cached receipt (Zero balance mutation). Latency: 2ms.`);
      if (codeStateVal) {
        codeStateVal.textContent = 'IDEMPOTENCY_REPLAY_CACHED';
        codeStateVal.style.color = '#60A5FA';
      }
      if (simLatencyPill) {
        simLatencyPill.innerHTML = `<span>Latency:</span> <strong style="color:#60A5FA;">2ms (Cache Hit)</strong>`;
      }
      return;
    }

    // New Transaction Execution
    simDispatchBtn.disabled = true;
    simDispatchBtn.style.opacity = '0.6';
    if (codeStateVal) {
      codeStateVal.textContent = 'ACQUIRING_REDIS_LOCK...';
      codeStateVal.style.color = '#F59E0B';
    }

    setTimeout(() => {
      idempotencyStore.set(currentKey, { issuer, op, at: Date.now() });

      pushLog(
        'ok',
        '200_COMMITTED',
        `Committed ${op} with ${issuer}. Mutex lock released cleanly. Latency: ${jitter}ms.`
      );

      if (codeStateVal) {
        codeStateVal.textContent = 'COMMITTED_IDEMPOTENT_OK';
        codeStateVal.style.color = 'var(--signal-emerald)';
      }

      if (simLatencyPill) {
        simLatencyPill.innerHTML = `<span>P95 Latency:</span> <strong>${jitter}ms</strong>`;
      }

      simDispatchBtn.disabled = false;
      simDispatchBtn.style.opacity = '1';
    }, 360);
  }

  refreshCodePreview();

  // --------------------------------------------------------------------------
  // 3. Interactive Fact-Guard Diff Visualizer (JobClaw Card)
  // --------------------------------------------------------------------------
  const showRawBtn = document.getElementById('showRawBtn');
  const showGuardedBtn = document.getElementById('showGuardedBtn');
  const diffScreen = document.getElementById('diffScreen');

  if (showRawBtn && showGuardedBtn && diffScreen) {
    showRawBtn.addEventListener('click', () => {
      showRawBtn.classList.add('active');
      showGuardedBtn.classList.remove('active');
      diffScreen.innerHTML = `
        <div class="diff-row"><span class="diff-tag warning">[UNSAFE]</span> LLM context directly populated with raw PII (risk of hallucinated degrees/phone).</div>
        <div class="diff-row"><span class="diff-tag warning">[COST SPIKE]</span> Full master prompt evaluated on each iteration ($0.039 per generation).</div>
        <div class="diff-row"><span class="diff-tag warning">[SILENT FAILURE]</span> HTML-escaped characters corrupt experience requirement parsers undetected.</div>
        <div class="diff-row"><span class="diff-tag warning">[DATA DROP]</span> Discovery client reported 0 results when one upstream source failed.</div>
      `;
    });

    showGuardedBtn.addEventListener('click', () => {
      showGuardedBtn.classList.add('active');
      showRawBtn.classList.remove('active');
      diffScreen.innerHTML = `
        <div class="diff-row"><span class="diff-tag verified">[PRESERVED]</span> Candidate master credentials strictly mapped from deterministic store.</div>
        <div class="diff-row"><span class="diff-tag verified">[ISOLATED]</span> Contact and education data kept completely outside model context token reach.</div>
        <div class="diff-row"><span class="diff-tag verified">[OPTIMIZED]</span> Cost reduced from $0.039 to $0.0049 per resume via targeted delta prompt engineering.</div>
        <div class="diff-row"><span class="diff-tag verified">[INTEGRITY]</span> Fixed silent-success parser failures that previously dropped source data undetected.</div>
      `;
    });
  }

  // --------------------------------------------------------------------------
  // 4. Direct Channel Copy Action
  // --------------------------------------------------------------------------
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const emailVal = document.getElementById('emailVal');
  const copyBtnLabel = document.getElementById('copyBtnLabel');

  if (copyEmailBtn && emailVal && copyBtnLabel) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = emailVal.textContent.trim();
      try {
        await navigator.clipboard.writeText(email);
        copyBtnLabel.textContent = 'Copied';
        copyEmailBtn.style.borderColor = 'var(--signal-emerald)';
        copyEmailBtn.style.color = 'var(--signal-emerald)';
        setTimeout(() => {
          copyBtnLabel.textContent = 'Copy';
          copyEmailBtn.style.borderColor = '';
          copyEmailBtn.style.color = '';
        }, 2000);
      } catch (err) {
        copyBtnLabel.textContent = 'Press Ctrl+C';
      }
    });
  }

  // --------------------------------------------------------------------------
  // 5. Contact Ingestion Form Handling
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const submitFormBtn = document.getElementById('submitFormBtn');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm && submitFormBtn && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('senderName').value.trim();
      const email = document.getElementById('senderEmail').value.trim();
      const subject = document.getElementById('senderSubject').value.trim();
      const message = document.getElementById('senderMessage').value.trim();

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name || !email || !subject || !message) {
        formFeedback.textContent = 'Please fill out all required fields.';
        formFeedback.style.color = '#F87171';
        return;
      }

      if (!emailRegex.test(email)) {
        formFeedback.textContent = 'Please enter a valid email address.';
        formFeedback.style.color = '#F87171';
        return;
      }

      // Valid - simulate transmission
      submitFormBtn.disabled = true;
      submitFormBtn.innerHTML = `<span>Transmitting to Queue...</span>`;
      formFeedback.textContent = '';

      setTimeout(() => {
        contactForm.reset();
        submitFormBtn.disabled = false;
        submitFormBtn.innerHTML = `<span>Transmit Message</span> <span class="btn-glyph">→</span>`;
        formFeedback.textContent = 'Message queued successfully. Arkodeep will review and respond shortly.';
        formFeedback.style.color = 'var(--signal-emerald)';
      }, 900);
    });
  }
});
