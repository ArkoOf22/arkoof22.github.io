/**
 * ARKODEEP KOLEY — RUNTIME ENGINE
 * Handles cluster tab navigation, ambient lighting,
 * email clipboard copy, and contact form dispatch.
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
  // 3. Navigation & Mobile Drawer
  // --------------------------------------------------------------------------
  const proNav = document.getElementById('proNav');
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const navLinks = document.querySelectorAll('.nav-link');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      proNav?.classList.add('scrolled');
    } else {
      proNav?.classList.remove('scrolled');
    }
  }, { passive: true });

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

  // IntersectionObserver for active nav link
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
    { threshold: 0.25 }
  );

  sections.forEach((sec) => navObserver.observe(sec));

  // --------------------------------------------------------------------------
  // 4. Production Engineering Cluster Tabs
  // --------------------------------------------------------------------------
  const clusterTabs = document.querySelectorAll('.cluster-tab');
  const clusterPanels = document.querySelectorAll('.cluster-panel');

  clusterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const targetCluster = tab.getAttribute('data-cluster');
      if (!targetCluster) return;

      // Update active tab
      clusterTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      // Update active panel
      clusterPanels.forEach((panel) => {
        if (panel.id === `panel-${targetCluster}`) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 4b. Apple-Style Tech Specs Segment Filter
  // --------------------------------------------------------------------------
  const specFilterBtns = document.querySelectorAll('.spec-filter-btn');
  const specGroups = document.querySelectorAll('.apple-spec-group');

  specFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-spec-filter');
      if (!filter) return;

      specFilterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      specGroups.forEach((group) => {
        const cat = group.getAttribute('data-spec-cat');
        if (filter === 'all' || cat === filter || cat === 'all') {
          group.classList.remove('hidden');
        } else {
          group.classList.add('hidden');
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 5. 1-Click Email Clipboard Copy
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
        copyEmailBtn.style.borderColor = 'var(--accent-emerald)';

        setTimeout(() => {
          if (copyBtnLabel) copyBtnLabel.textContent = 'Copy';
          copyEmailBtn.style.background = '';
          copyEmailBtn.style.borderColor = '';
        }, 2200);
      } catch (err) {
        window.prompt('Copy email:', emailText);
      }
    });
  }

  // --------------------------------------------------------------------------
  // 6. Contact Form Validation & Simulated Transmission
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
        formFeedback.className = 'form-feedback error';
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        formFeedback.textContent = 'Please enter a valid email address.';
        formFeedback.className = 'form-feedback error';
        return;
      }

      submitFormBtn.disabled = true;
      submitFormBtn.innerHTML = '<span>Transmitting...</span>';
      formFeedback.textContent = '';

      setTimeout(() => {
        submitFormBtn.disabled = false;
        submitFormBtn.innerHTML = '<span>Transmitted Successfully</span> <span class="arrow-icon">✓</span>';
        formFeedback.textContent = `Thank you, ${name}. Your message has been prepared for Arkodeep. Expect a response within 24 hours.`;
        formFeedback.className = 'form-feedback success';
        contactForm.reset();

        setTimeout(() => {
          submitFormBtn.innerHTML = '<span>Transmit Message</span> <span class="arrow-icon">→</span>';
        }, 4000);
      }, 600);
    });
  }
});
