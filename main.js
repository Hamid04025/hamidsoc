/* ============================================
   HAMID - CYBERSECURITY PORTFOLIO
   Production-Ready JavaScript
   ============================================ */

(function() {
  'use strict';

  // ==========================================
  // LOADING SCREEN
  // ==========================================
  const loadingScreen = document.getElementById('loadingScreen');

  window.addEventListener('load', () => {
    setTimeout(() => {
      if (loadingScreen) {
        loadingScreen.classList.add('hidden');
      }
    }, 1800);
  });

  // ==========================================
  // CURSOR SPOTLIGHT
  // ==========================================
  const cursorSpotlight = document.getElementById('cursorSpotlight');
  let spotlightRAF = null;
  let spotlightX = 0, spotlightY = 0;
  let currentX = 0, currentY = 0;

  if (cursorSpotlight && window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
      spotlightX = e.clientX;
      spotlightY = e.clientY;
    }, { passive: true });

    function updateSpotlight() {
      currentX += (spotlightX - currentX) * 0.1;
      currentY += (spotlightY - currentY) * 0.1;
      cursorSpotlight.style.left = currentX + 'px';
      cursorSpotlight.style.top = currentY + 'px';
      spotlightRAF = requestAnimationFrame(updateSpotlight);
    }
    updateSpotlight();
  }

  // ==========================================
  // NAVIGATION
  // ==========================================
  const navbar = document.getElementById('navbar');
  const navLinks = document.getElementById('navLinks');
  const navMobileToggle = document.getElementById('navMobileToggle');
  const navLinkItems = document.querySelectorAll('.nav-link');

  // Scroll behavior
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  }, { passive: true });

  // Mobile menu toggle
  if (navMobileToggle) {
    navMobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const isExpanded = navLinks.classList.contains('active');
      navMobileToggle.setAttribute('aria-expanded', isExpanded);
      navMobileToggle.innerHTML = isExpanded ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
  }

  // Close mobile menu on link click
  navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      navMobileToggle.setAttribute('aria-expanded', 'false');
      navMobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    const scrollPos = window.pageYOffset + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinkItems.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // ==========================================
  // TYPING EFFECT
  // ==========================================
  const typingText = document.getElementById('typingText');
  const typingPhrases = [
    'SOC L1 Analyst',
    'Blue Team Engineer',
    'Threat Hunter',
    'Detection Engineer',
    'DFIR Enthusiast',
    'Cybersecurity Researcher'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 100;

  function typeEffect() {
    if (!typingText) return;

    const currentPhrase = typingPhrases[phraseIndex];

    if (isDeleting) {
      typingText.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingDelay = 50;
    } else {
      typingText.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingDelay = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typingDelay = 2000;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % typingPhrases.length;
      typingDelay = 500;
    }

    setTimeout(typeEffect, typingDelay);
  }

  setTimeout(typeEffect, 1500);

  // ==========================================
  // PARTICLE SYSTEM
  // ==========================================
  const canvas = document.getElementById('particlesCanvas');

  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId = null;
    let isVisible = true;

    function resizeCanvas() {
      const parent = canvas.parentElement;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.5 + 0.1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity})`;
        ctx.fill();
      }
    }

    function initParticles() {
      particles = [];
      const particleCount = Math.min(Math.floor(canvas.width * canvas.height / 15000), 80);
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.08 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    function animateParticles() {
      if (!isVisible) {
        animationId = requestAnimationFrame(animateParticles);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      drawConnections();
      animationId = requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    // Pause when not visible
    const heroSection = document.getElementById('home');
    const observer = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
    }, { threshold: 0 });

    if (heroSection) observer.observe(heroSection);
  }

  // ==========================================
  // SCROLL REVEAL ANIMATIONS
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ==========================================
  // ANIMATED COUNTERS
  // ==========================================
  const counters = document.querySelectorAll('[data-count]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-count'));
        const duration = 2000;
        const start = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - start;
          const progress = Math.min(elapsed / duration, 1);
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(easeOut * target);

          entry.target.textContent = current;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            entry.target.textContent = target;
          }
        }

        requestAnimationFrame(updateCounter);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  // ==========================================
  // SKILL PROGRESS BARS
  // ==========================================
  const skillBars = document.querySelectorAll('.skill-progress');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.getAttribute('data-width');
        setTimeout(() => {
          entry.target.style.width = width + '%';
        }, 200);
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  skillBars.forEach(bar => skillObserver.observe(bar));

  // ==========================================
  // PROJECT FILTERING
  // ==========================================
  const projectFilterBtns = document.querySelectorAll('[data-filter]');
  const projectCards = document.querySelectorAll('.project-card');

  projectFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      projectFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');

        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ==========================================
  // REPORT FILTERING
  // ==========================================
  const reportFilterBtns = document.querySelectorAll('[data-filter-reports]');
  const reportCards = document.querySelectorAll('.report-card');

  reportFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      reportFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter-reports');

      reportCards.forEach(card => {
        const category = card.getAttribute('data-report-category');

        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          card.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ==========================================
  // RULES TABS
  // ==========================================
  const rulesTabs = document.querySelectorAll('.rules-tab');
  const rulesContents = document.querySelectorAll('.rules-content');

  rulesTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabId = tab.getAttribute('data-tab');

      rulesTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      rulesContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === 'tab-' + tabId) {
          content.classList.add('active');
        }
      });
    });
  });

  // ==========================================
  // PLAYBOOK ACCORDION
  // ==========================================
  const playbookItems = document.querySelectorAll('.playbook-item');

  playbookItems.forEach(item => {
    const header = item.querySelector('.playbook-header');

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all others
      playbookItems.forEach(other => {
        other.classList.remove('active');
      });

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // ==========================================
  // BLOG FILTERING & SEARCH
  // ==========================================
  const blogFilterBtns = document.querySelectorAll('[data-filter-blog]');
  const blogCards = document.querySelectorAll('.blog-card');
  const blogSearchInput = document.getElementById('blogSearch');

  function filterBlog() {
    const activeFilter = document.querySelector('[data-filter-blog].active');
    const category = activeFilter ? activeFilter.getAttribute('data-filter-blog') : 'all';
    const searchTerm = blogSearchInput ? blogSearchInput.value.toLowerCase() : '';

    blogCards.forEach(card => {
      const cardCategory = card.getAttribute('data-blog-category');
      const title = card.querySelector('.blog-title').textContent.toLowerCase();
      const excerpt = card.querySelector('.blog-excerpt').textContent.toLowerCase();

      const matchesCategory = category === 'all' || cardCategory === category;
      const matchesSearch = !searchTerm || title.includes(searchTerm) || excerpt.includes(searchTerm);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  blogFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      blogFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterBlog();
    });
  });

  if (blogSearchInput) {
    blogSearchInput.addEventListener('input', filterBlog);
  }

  // ==========================================
  // COPY EMAIL
  // ==========================================
  const copyEmailBtn = document.getElementById('copyEmail');

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = copyEmailBtn.getAttribute('data-email');

      navigator.clipboard.writeText(email).then(() => {
        copyEmailBtn.classList.add('copied');
        copyEmailBtn.innerHTML = '<i class="fas fa-check"></i> <span>Copied!</span>';

        setTimeout(() => {
          copyEmailBtn.classList.remove('copied');
          copyEmailBtn.innerHTML = '<i class="fas fa-copy"></i> <span>Copy</span>';
        }, 2000);
      }).catch(() => {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = email;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);

        copyEmailBtn.classList.add('copied');
        copyEmailBtn.innerHTML = '<i class="fas fa-check"></i> <span>Copied!</span>';

        setTimeout(() => {
          copyEmailBtn.classList.remove('copied');
          copyEmailBtn.innerHTML = '<i class="fas fa-copy"></i> <span>Copy</span>';
        }, 2000);
      });
    });
  }

  // ==========================================
  // BACK TO TOP
  // ==========================================
  const backToTop = document.getElementById('backToTop');
  const footerBackTop = document.getElementById('footerBackTop');

  function toggleBackToTop() {
    if (window.pageYOffset > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', toggleBackToTop, { passive: true });

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (backToTop) backToTop.addEventListener('click', scrollToTop);
  if (footerBackTop) footerBackTop.addEventListener('click', scrollToTop);

  // ==========================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  // ==========================================
  // CONTACT FORM
  // ==========================================
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      // Simulate form submission
      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
          contactForm.reset();
        }, 3000);
      }, 1500);
    });
  }

  // ==========================================
  // RESUME DOWNLOAD
  // ==========================================
  const downloadResume = document.getElementById('downloadResume');

  if (downloadResume) {
    downloadResume.addEventListener('click', (e) => {
      e.preventDefault();

      // Create a simple PDF-like experience
      const link = document.createElement('a');
      link.href = '#';
      link.download = 'Hamid_Security_Analyst_Resume.pdf';

      // Show notification
      const notification = document.createElement('div');
      notification.style.cssText = 'position:fixed;bottom:32px;left:50%;transform:translateX(-50%);background:#111827;border:1px solid rgba(59,130,246,0.3);color:#fff;padding:16px 24px;border-radius:12px;font-family:Inter,sans-serif;font-size:0.9375rem;z-index:10000;box-shadow:0 20px 40px rgba(0,0,0,0.4);display:flex;align-items:center;gap:12px;';
      notification.innerHTML = '<i class="fas fa-info-circle" style="color:#3b82f6;"></i> Resume download coming soon. Contact me directly!';
      document.body.appendChild(notification);

      setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.5s ease';
        setTimeout(() => notification.remove(), 500);
      }, 3000);
    });
  }

  // ==========================================
  // KEYBOARD NAVIGATION
  // ==========================================
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      navLinks.classList.remove('active');
      navMobileToggle.setAttribute('aria-expanded', 'false');
      navMobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });

  // ==========================================
  // PERFORMANCE: CLEANUP ON VISIBILITY CHANGE
  // ==========================================
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (spotlightRAF) cancelAnimationFrame(spotlightRAF);
    } else {
      if (cursorSpotlight && window.matchMedia('(pointer: fine)').matches) {
        updateSpotlight();
      }
    }
  });

})();
