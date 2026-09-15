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
  // 6. Real Contact Form Transmission (FormSubmit.co + Mailto Fallback)
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');
  const submitFormBtn = document.getElementById('submitFormBtn');
  const directMailtoLink = document.getElementById('directMailtoLink');

  // Dynamically update mailto link as user types
  function updateMailtoHref() {
    if (!directMailtoLink) return;
    const name = document.getElementById('senderName')?.value.trim() || '';
    const subject = document.getElementById('senderSubject')?.value.trim() || 'Portfolio Inquiry';
    const message = document.getElementById('senderMessage')?.value.trim() || '';
    const body = `Hi Arkodeep,\n\n${message}\n\nBest regards,\n${name}`;
    directMailtoLink.href = `mailto:arkodeepkoley123@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  ['senderName', 'senderSubject', 'senderMessage'].forEach((fieldId) => {
    document.getElementById(fieldId)?.addEventListener('input', updateMailtoHref);
  });

  if (contactForm && formFeedback && submitFormBtn) {
    contactForm.addEventListener('submit', async (e) => {
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
      submitFormBtn.innerHTML = '<span>Sending to arkodeepkoley123@gmail.com...</span>';
      formFeedback.textContent = '';
      formFeedback.className = 'form-feedback';

      try {
        const payload = {
          name: name,
          email: email,
          _subject: `[Portfolio Contact] ${subject || 'New Message from ' + name}`,
          message: message,
          _template: 'table',
          _captcha: 'false'
        };

        const response = await fetch('https://formsubmit.co/ajax/arkodeepkoley123@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok && (data.success === 'true' || data.success === true || data.message)) {
          submitFormBtn.disabled = false;
          submitFormBtn.innerHTML = '<span>Message Delivered</span> <span class="arrow-icon">✓</span>';
          formFeedback.textContent = `Thank you, ${name}! Your email was dispatched directly to Arkodeep's Gmail inbox.`;
          formFeedback.className = 'form-feedback success';
          contactForm.reset();
          updateMailtoHref();

          setTimeout(() => {
            submitFormBtn.innerHTML = '<span>Transmit Message to Gmail</span> <span class="arrow-icon">→</span>';
          }, 5000);
        } else {
          throw new Error(data.message || 'Server error');
        }
      } catch (err) {
        console.warn('FormSubmit AJAX dispatch encountered an error, falling back to mailto:', err);
        // Fallback: trigger default mail client with prefilled mailto
        const mailtoUrl = `mailto:arkodeepkoley123@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`Hi Arkodeep,\n\n${message}\n\nFrom: ${name} (${email})`)}`;
        window.location.href = mailtoUrl;

        submitFormBtn.disabled = false;
        submitFormBtn.innerHTML = '<span>Opened in Mail App</span> <span class="arrow-icon">↗</span>';
        formFeedback.textContent = `Triggered your mail client to send directly to arkodeepkoley123@gmail.com. Or copy the email directly above.`;
        formFeedback.className = 'form-feedback success';
      }
    });
  }
});
