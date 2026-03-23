/* ================================================================
   main.js — Cherish Nwansi Portfolio
   ================================================================

   This file handles all interactive behaviour:
     1. Navigation — scroll shadow + mobile hamburger
     2. Typing effect in the hero
     3. Scroll-triggered fade-in animations
     4. Animated stat counters
     5. Skill bar fill animation
     6. SVG donut language chart + animated legend
     7. Project filter tabs
     8. Contact form success feedback

   You can edit each section independently — they are clearly
   separated by comment headings below.

================================================================ */


document.addEventListener('DOMContentLoaded', function () {


  /* ============================================================
     1. NAVIGATION
     ─ Adds a shadow to the navbar when the page is scrolled
     ─ Toggles the mobile menu open/closed on hamburger click
  ============================================================ */
  const navbar    = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  // Add scroll shadow
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  // Mobile hamburger
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // Close mobile menu when a nav link is clicked
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });


  /* ============================================================
     2. TYPING EFFECT
     ─ Reads comma-separated strings from data-items attribute
     ─ Types forward, pauses, erases, then moves to next string
     ─ Edit the strings inside data-items in index.html
  ============================================================ */
  const typedEl = document.getElementById('typed');
  if (typedEl) {
    const items   = typedEl.getAttribute('data-items').split(',').map(s => s.trim());
    let wi = 0, ci = 0, forward = true;

    const tick = () => {
      const word = items[wi];
      if (forward) {
        typedEl.textContent = word.slice(0, ++ci);
        if (ci === word.length) { forward = false; setTimeout(tick, 2200); return; }
      } else {
        typedEl.textContent = word.slice(0, --ci);
        if (ci === 0) { forward = true; wi = (wi + 1) % items.length; }
      }
      setTimeout(tick, forward ? 90 : 45);
    };
    tick();
  }


  /* ============================================================
     3. SCROLL FADE-IN ANIMATIONS
     ─ Any element with class .fade-in gets revealed when it
       enters the viewport
     ─ Add class="fade-in" to any HTML element to animate it
  ============================================================ */
  const fadeEls = document.querySelectorAll('.fade-in');
  const fadeObs = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay for siblings
        entry.target.style.transitionDelay = (i % 4) * 0.08 + 's';
        entry.target.classList.add('visible');
        fadeObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeEls.forEach(el => fadeObs.observe(el));


  /* ============================================================
     4. ANIMATED STAT COUNTERS
     ─ Elements with class .stat-num and data-target="N"
       count up to N when the strip scrolls into view
     ─ To change a number: update data-target in index.html
  ============================================================ */
  const statsStrip = document.getElementById('statsStrip');
  if (statsStrip) {
    const counterObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.stat-num').forEach(el => {
            const target = parseInt(el.dataset.target, 10);
            let current  = 0;
            const step   = target / 50;
            const timer  = setInterval(() => {
              current = Math.min(current + step, target);
              el.textContent = Math.floor(current);
              if (current >= target) clearInterval(timer);
            }, 35);
          });
          counterObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    counterObs.observe(statsStrip);
  }


  /* ============================================================
     5. SKILL BAR ANIMATION
     ─ .bar-fill elements have data-width="N" (0–100)
     ─ The bar grows to that width when scrolled into view
     ─ To change a percentage: update data-width in index.html
       and the label text in the matching .bar-header span
  ============================================================ */
  const skillBars = document.getElementById('skillBars');
  if (skillBars) {
    const barObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.bar-fill').forEach(bar => {
            bar.style.width = bar.dataset.width + '%';
          });
          barObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    barObs.observe(skillBars);
  }


  /* ============================================================
     6. DONUT LANGUAGE CHART
     ─ Data lives in the langs array below — edit pct values
       (they should sum to 100) and names/colours as you like
     ─ The chart SVG and legend are built dynamically by this code
  ============================================================ */

  // ── Language data ─────────────────────────────────────────
  // Edit name, pct (percentage), and color to match your repos
  const langs = [
    { name: 'Python',      pct: 32, color: '#3572A5' },
    { name: 'JavaScript',  pct: 24, color: '#C2185B' },
    { name: 'Java',        pct: 18, color: '#E91E8C' },
    { name: 'Kotlin',      pct: 14, color: '#A97BFF' },
    { name: 'Jupyter NB',  pct:  8, color: '#F8BBD9' },
    { name: 'Other',       pct:  4, color: '#FCE4EC' },
  ];
  // ──────────────────────────────────────────────────────────

  const donutSvg = document.getElementById('donutSvg');
  const legendEl = document.getElementById('legendItems');

  if (donutSvg) {
    const cx = 100, cy = 100, outer = 82, inner = 52;
    let accumulated = 0;

    langs.forEach(lang => {
      const startAngle = (accumulated / 100) * Math.PI * 2 - Math.PI / 2;
      const endAngle   = ((accumulated + lang.pct) / 100) * Math.PI * 2 - Math.PI / 2;
      accumulated += lang.pct;
      const largeArc  = lang.pct > 50 ? 1 : 0;

      // Outer arc points
      const x1 = cx + outer * Math.cos(startAngle);
      const y1 = cy + outer * Math.sin(startAngle);
      const x2 = cx + outer * Math.cos(endAngle);
      const y2 = cy + outer * Math.sin(endAngle);

      // Inner arc points
      const ix1 = cx + inner * Math.cos(startAngle);
      const iy1 = cy + inner * Math.sin(startAngle);
      const ix2 = cx + inner * Math.cos(endAngle);
      const iy2 = cy + inner * Math.sin(endAngle);

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d',
        `M${ix1},${iy1} A${inner},${inner} 0 ${largeArc} 1 ${ix2},${iy2} ` +
        `L${x2},${y2} A${outer},${outer} 0 ${largeArc} 0 ${x1},${y1} Z`
      );
      path.setAttribute('fill', lang.color);
      path.setAttribute('stroke', '#FFFAFD');
      path.setAttribute('stroke-width', '2');
      path.style.cursor = 'pointer';
      path.style.transition = 'opacity .2s';
      path.addEventListener('mouseenter', () => path.style.opacity = '.7');
      path.addEventListener('mouseleave', () => path.style.opacity = '1');
      donutSvg.appendChild(path);
    });
  }

  if (legendEl) {
    langs.forEach(lang => {
      const item = document.createElement('div');
      item.className = 'legend-item';
      item.innerHTML = `
        <div class="legend-dot" style="background:${lang.color}"></div>
        <span class="legend-name">${lang.name}</span>
        <div class="legend-bar-track">
          <div class="legend-bar-fill" data-w="${lang.pct}" style="background:${lang.color}"></div>
        </div>
        <span class="legend-pct">${lang.pct}%</span>
      `;
      legendEl.appendChild(item);
    });

    // Animate legend bars when scrolled into view
    const legendObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.legend-bar-fill').forEach(bar => {
            bar.style.width = bar.dataset.w + '%';
          });
          legendObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    legendObs.observe(legendEl);
  }


  /* ============================================================
     7. PROJECT FILTER TABS
     ─ Clicking a filter button shows only cards matching
       the button's data-filter attribute
     ─ Each project card has data-cat="python|fullstack|java|..."
     ─ data-filter="all" shows everything
     ─ To add a new category:
         1. Add a button: <button data-filter="newcat">Label</button>
         2. Add data-cat="newcat" to the matching project cards
  ============================================================ */
  const filterBtns    = document.querySelectorAll('.filter-btn');
  const projectCards  = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        if (filter === 'all' || card.dataset.cat === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });


  /* ============================================================
     8. CONTACT FORM
     ─ Shows a success message on submit
     ─ For a real backend: replace the body of the submit handler
       with a fetch() call to Formspree, EmailJS, or your server
       e.g. fetch('https://formspree.io/f/yourFormId', {...})
  ============================================================ */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const btn = document.getElementById('contactBtn');
      const original = btn.textContent;

      btn.textContent = '✓ Message Sent!';
      btn.style.background = '#2E7D32';
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
        btn.disabled = false;
        contactForm.reset();
      }, 3500);

      /*
        ── TO WIRE UP A REAL BACKEND ──────────────────────────
        Replace the lines above with something like:

        const data = new FormData(contactForm);
        fetch('https://formspree.io/f/YOUR_FORM_ID', {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        })
        .then(res => {
          if (res.ok) {
            btn.textContent = '✓ Sent!';
            contactForm.reset();
          } else {
            btn.textContent = 'Error — try again';
          }
        });
        ──────────────────────────────────────────────────────
      */
    });
  }


  /* ============================================================
     9. SCROLL-TO-TOP BUTTON
  ============================================================ */
  const scrollBtn = document.getElementById('scrollTopBtn');
  if (scrollBtn) {
    window.addEventListener('scroll', () => {
      scrollBtn.classList.toggle('visible', window.scrollY > 500);
    });
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


}); // end DOMContentLoaded
