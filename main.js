/**
 * ARKODEEP KOLEY — APPLE-STYLE RUNTIME ENGINE
 * Implements interactive Silicon Die Architecture Inspector,
 * HTML5 Circuit Canvas Bus, Benchmark Bar animations,
 * Email copy, and iOS-smooth Form Handling.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Current Year
  const currentYearEl = document.getElementById('currentYear');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  // --------------------------------------------------------------------------
  // 2. Ambient Cursor Spotlight
  // --------------------------------------------------------------------------
  const ambientSpotlight = document.getElementById('ambientSpotlight');
  if (ambientSpotlight && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 3;
    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function renderSpotlight() {
      currentX += (mouseX - currentX) * 0.1;
      currentY += (mouseY - currentY) * 0.1;
      ambientSpotlight.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
      requestAnimationFrame(renderSpotlight);
    }
    renderSpotlight();
  }

  // --------------------------------------------------------------------------
  // 3. Apple Frosted Glass Navigation & Active State
  // --------------------------------------------------------------------------
  const appleNav = document.getElementById('appleNav');
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const navLinks = document.querySelectorAll('.nav-link');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  // Sticky blur enhancement on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      appleNav?.classList.add('scrolled');
    } else {
      appleNav?.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile menu toggle
  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      menuToggle.classList.toggle('open', isOpen);
      menuToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    drawerLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        menuToggle.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // Active section indicator using IntersectionObserver
  const sections = document.querySelectorAll('section[id]');
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { threshold: 0.35 }
  );

  sections.forEach((sec) => navObserver.observe(sec));

  // --------------------------------------------------------------------------
  // 4. Interactive AK-1 Silicon Die Engine
  // --------------------------------------------------------------------------
  const coreData = {
    'issuer-proxy': {
      badge: 'ROUTING CORE SPEC',
      title: '18x Banking & Loyalty Issuer Service Proxy',
      body: 'Centralized payment proxy written in Go, unifying 18 external banking institutions and loyalty networks (AU Bank, Kotak, RBL, CRED). Operates with dynamic schema-driven routing configurations that replace fragile per-issuer hardcoded integrations, cutting partner onboarding from weeks to just 36 hours.',
      specs: [
        { label: 'Concurrency Control', val: 'Distributed Redis Locks' },
        { label: 'Idempotency Guarantee', val: '100% Zero-Drift Replay' },
        { label: 'Deployable Services', val: '4 Microservices' },
        { label: 'Onboarding Velocity', val: '1.5 Days Total' }
      ],
      sim: 'DISPATCHED: 18ms • Redis Mutex Acquired • 18 Banks Online • 0 Drift'
    },
    'concurrency-mesh': {
      badge: 'CONCURRENCY FABRIC SPEC',
      title: 'Distributed Mutex & Idempotency Key Fabric',
      body: 'High-frequency atomic locking fabric backed by Redis key leases with automatic 10s TTL failover. Guarantees strict mutual exclusion across concurrent wallet adjustments, eliminating double-redemptions, race conditions, and point-timeout anomalies.',
      specs: [
        { label: 'Lock Mechanism', val: 'Redis Key Lease (TTL: 10s)' },
        { label: 'P95 Latency', val: '< 28ms Engine Response' },
        { label: 'Race Anomalies', val: 'Zero Double-Spend' },
        { label: 'Resolution', val: 'Atomic CAS Validation' }
      ],
      sim: 'COLLISION PREVENTED: Redis Lock Acquired in 3ms • 0 Mutation Anomaly'
    },
    'telemetry-core': {
      badge: 'TELEMETRY ACCELERATOR SPEC',
      title: 'Log Compression & Observability Platform',
      body: 'Dynamic log filtering engine engineered with granular controls at issuer, brand, and customer tiers. Curtailed daily production log volume by 92% (from 444M down to 33M lines/day; 240GB down to 53GB/day), saving massive cloud infrastructure overhead.',
      specs: [
        { label: 'Daily Line Reduction', val: '444M → 33M lines/day' },
        { label: 'Storage Reduction', val: '240 GB → 53 GB' },
        { label: 'Filtering Tiers', val: 'Issuer / Brand / Customer' },
        { label: 'MTTR Impact', val: '-75% Incident Time (1 Day)' }
      ],
      sim: 'FILTER ACTIVE: 92% Noise Dropped • 240GB → 53GB Compression Nominal'
    },
    'fact-guard': {
      badge: 'AI INTEGRITY COPROCESSOR SPEC',
      title: 'Fact-Guard Deterministic Resume Verification',
      body: 'Deterministic structural guardrail pipeline in Go that asserts absolute ground truth over candidate data before PDF compilation. Strictly isolates candidate contact and education from LLM reach and reduces per-resume token costs by ~87% ($0.039 down to $0.0049).',
      specs: [
        { label: 'Token Cost Cut', val: '~87% ($0.039 → $0.0049)' },
        { label: 'PII Isolation', val: '100% Deterministic Bounds' },
        { label: 'Platform Scope', val: '32K Go LOC • 243 Tests' },
        { label: 'Approval Gate', val: 'Zero Unauthorized Apply' }
      ],
      sim: 'FACT-GUARD VALIDATED: Master Bounds Verified • PII Isolated • $0.0049 Cost'
    }
  };

  const coreButtons = document.querySelectorAll('.die-core');
  const inspBadge = document.getElementById('inspBadge');
  const inspTitle = document.getElementById('inspTitle');
  const inspBody = document.getElementById('inspBody');
  const inspSpecsGrid = document.getElementById('inspSpecsGrid');
  const triggerCoreSimBtn = document.getElementById('triggerCoreSimBtn');
  const simFeedback = document.getElementById('simFeedback');

  let activeCoreId = 'issuer-proxy';

  function updateInspector(coreId) {
    const data = coreData[coreId];
    if (!data) return;
    activeCoreId = coreId;

    // Highlight core
    coreButtons.forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-core-id') === coreId);
    });

    // Animate content change
    if (inspBadge) inspBadge.textContent = data.badge;
    if (inspTitle) inspTitle.textContent = data.title;
    if (inspBody) inspBody.textContent = data.body;

    if (inspSpecsGrid) {
      inspSpecsGrid.innerHTML = data.specs
        .map(
          (s) => `
          <div class="spec-box">
            <span class="s-label">${s.label}</span>
            <span class="s-value">${s.val}</span>
          </div>
        `
        )
        .join('');
    }

    if (simFeedback) {
      simFeedback.textContent = 'Ready for dispatch';
      simFeedback.classList.remove('success');
    }
  }

  coreButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const coreId = btn.getAttribute('data-core-id');
      updateInspector(coreId);
    });
  });

  // Interactive Simulated Transaction Execution
  if (triggerCoreSimBtn) {
    triggerCoreSimBtn.addEventListener('click', () => {
      const data = coreData[activeCoreId];
      if (!data) return;

      triggerCoreSimBtn.disabled = true;
      triggerCoreSimBtn.style.opacity = '0.6';
      if (simFeedback) {
        simFeedback.textContent = 'Transmitting packet through bus...';
        simFeedback.classList.remove('success');
      }

      setTimeout(() => {
        if (simFeedback) {
          simFeedback.textContent = data.sim;
          simFeedback.classList.add('success');
        }
        triggerCoreSimBtn.disabled = false;
        triggerCoreSimBtn.style.opacity = '1';
      }, 420);
    });
  }

  // --------------------------------------------------------------------------
  // 5. Silicon Die Circuit Canvas Animation
  // --------------------------------------------------------------------------
  const circuitCanvas = document.getElementById('circuitCanvas');
  if (circuitCanvas) {
    const ctx = circuitCanvas.getContext('2d');
    let width = (circuitCanvas.width = circuitCanvas.parentElement.clientWidth);
    let height = (circuitCanvas.height = circuitCanvas.parentElement.clientHeight);

    window.addEventListener('resize', () => {
      if (circuitCanvas.parentElement) {
        width = circuitCanvas.width = circuitCanvas.parentElement.clientWidth;
        height = circuitCanvas.height = circuitCanvas.parentElement.clientHeight;
      }
    });

    // Particle bus traces
    const pulses = Array.from({ length: 8 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: 0.8 + Math.random() * 1.4,
      length: 20 + Math.random() * 30,
      horizontal: Math.random() > 0.5,
      alpha: 0.2 + Math.random() * 0.4
    }));

    function drawCircuit() {
      ctx.clearRect(0, 0, width, height);

      // Subtle Grid / Bus lines
      ctx.strokeStyle = 'rgba(41, 151, 255, 0.05)';
      ctx.lineWidth = 1;
      const step = 40;

      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Moving Data Packets
      pulses.forEach((p) => {
        ctx.strokeStyle = `rgba(41, 151, 255, ${p.alpha})`;
        ctx.lineWidth = 2;
        ctx.beginPath();

        if (p.horizontal) {
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.length, p.y);
          p.x += p.speed;
          if (p.x > width) p.x = -p.length;
        } else {
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x, p.y + p.length);
          p.y += p.speed;
          if (p.y > height) p.y = -p.length;
        }
        ctx.stroke();
      });

      requestAnimationFrame(drawCircuit);
    }

    drawCircuit();
  }

  // --------------------------------------------------------------------------
  // 6. Comparative Benchmark Bars Scroll Animation
  // --------------------------------------------------------------------------
  const compBars = document.querySelectorAll('.bar-fill');
  if (compBars.length > 0) {
    const barsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            compBars.forEach((bar) => {
              const targetWidth = bar.style.width;
              bar.style.width = '0%';
              setTimeout(() => {
                bar.style.width = targetWidth;
              }, 100);
            });
            barsObserver.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    const compCard = document.querySelector('.benchmark-comparison-card');
    if (compCard) {
      barsObserver.observe(compCard);
    }
  }

  // --------------------------------------------------------------------------
  // 7. Direct Email Clipboard Action
  // --------------------------------------------------------------------------
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const copyBtnLabel = document.getElementById('copyBtnLabel');
  const emailVal = document.getElementById('emailVal');

  if (copyEmailBtn && emailVal) {
    copyEmailBtn.addEventListener('click', async () => {
      const emailText = emailVal.textContent.trim();
      try {
        await navigator.clipboard.writeText(emailText);
        if (copyBtnLabel) copyBtnLabel.textContent = 'Copied!';
        copyEmailBtn.style.background = 'rgba(48, 209, 88, 0.2)';
        copyEmailBtn.style.borderColor = 'var(--apple-emerald)';
        setTimeout(() => {
          if (copyBtnLabel) copyBtnLabel.textContent = 'Copy';
          copyEmailBtn.style.background = '';
          copyEmailBtn.style.borderColor = '';
        }, 2200);
      } catch (err) {
        // Fallback prompt
        window.prompt('Copy email:', emailText);
      }
    });
  }

  // --------------------------------------------------------------------------
  // 8. Apple-Style Contact Form
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');
  const submitFormBtn = document.getElementById('submitFormBtn');

  if (contactForm && formFeedback && submitFormBtn) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('senderName')?.value.trim();
      const email = document.getElementById('senderEmail')?.value.trim();
      const subject = document.getElementById('senderSubject')?.value.trim();
      const message = document.getElementById('senderMessage')?.value.trim();

      if (!name || !email || !message) {
        formFeedback.textContent = 'Please fill out all required fields.';
        formFeedback.className = 'form-feedback-text error';
        return;
      }

      // Email format regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        formFeedback.textContent = 'Please enter a valid email address.';
        formFeedback.className = 'form-feedback-text error';
        return;
      }

      submitFormBtn.disabled = true;
      submitFormBtn.innerHTML = '<span>Transmitting...</span>';
      formFeedback.textContent = '';

      setTimeout(() => {
        submitFormBtn.disabled = false;
        submitFormBtn.innerHTML = '<span>Transmitted Successfully</span> <span class="arrow-glyph">✓</span>';
        formFeedback.textContent = `Thank you, ${name}. Your dispatch has been prepared. Arkodeep will respond within 24 hours.`;
        formFeedback.className = 'form-feedback-text success';
        contactForm.reset();

        setTimeout(() => {
          submitFormBtn.innerHTML = '<span>Transmit Message</span> <span class="arrow-glyph">→</span>';
        }, 4000);
      }, 700);
    });
  }
});
