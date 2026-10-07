/* ==========================================================================
   HARSHIT JANGID — BRIGHT & ORGANIZED PORTFOLIO INTERACTIVITY (SCRIPT.JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initColorfulParticles();
  initExpandControls();
  initNavigation();
  initLiveStatusCycler();
  initCopyEmail();
  initProjectModals();
});

/* --------------------------------------------------------------------------
   1. COLORFUL DAYLIGHT FLOATING PARTICLES CANVAS
   -------------------------------------------------------------------------- */
function initColorfulParticles() {
  const canvas = document.getElementById('constellation-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const palette = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'];
  const particles = [];
  const count = Math.min(45, Math.floor((width * height) / 30000));

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 2.2 + 1,
      color: palette[i % palette.length]
    });
  }

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = 0.35;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (dist < 125) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = '#6366f1';
          ctx.globalAlpha = (1 - dist / 125) * 0.12;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(render);
  }

  render();
}

/* --------------------------------------------------------------------------
   2. EXPAND ALL BUTTON & CLICK/TAP EXPANSION
   -------------------------------------------------------------------------- */
function initExpandControls() {
  const toggleBtn = document.getElementById('toggle-expand-all');
  let expandAll = false;

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      expandAll = !expandAll;
      document.body.classList.toggle('expand-all-mode', expandAll);
      toggleBtn.classList.toggle('active', expandAll);
      toggleBtn.setAttribute('aria-pressed', String(expandAll));
      const label = toggleBtn.querySelector('.utility-label');
      if (label) {
        label.textContent = expandAll ? 'Collapse All' : 'Expand All';
      }
    });
  }

  const interactiveItems = document.querySelectorAll(
    '.skill-card, .edu-item, .project-card, .cert-card, .bento-block'
  );

  interactiveItems.forEach((el) => {
    el.addEventListener('click', (e) => {
      if (e.target.closest('a, button')) return;
      el.classList.toggle('is-expanded');
    });
  });
}

/* --------------------------------------------------------------------------
   3. STICKY NAVBAR SMOOTH SCROLL & ACTIVE SECTION SPY
   -------------------------------------------------------------------------- */
function initNavigation() {
  const hamburger = document.getElementById('hamburger-btn');
  const navLinksContainer = document.getElementById('nav-links');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  if (hamburger && navLinksContainer) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinksContainer.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navLinksContainer) navLinksContainer.classList.remove('open');
      if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  function updateActiveNav() {
    const scrollPos = window.scrollY + 180;
    let currentId = 'home';

    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height + 120) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute('href').replace('#', '');
      link.classList.toggle('active', href === currentId);
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();
}

/* --------------------------------------------------------------------------
   4. PROFILE CARD LIVE STATUS CYCLER
   -------------------------------------------------------------------------- */
function initLiveStatusCycler() {
  const outEl = document.getElementById('terminal-live-output');
  if (!outEl) return;

  const messages = [
    '🚀 Exploring tech & building projects',
    '🐍 Completed Python & learning Backend',
    '⚡ Building fast with AI tools & prompts',
    '🏆 CS50x Scratch Snake project completed'
  ];

  let idx = 0;
  setInterval(() => {
    idx = (idx + 1) % messages.length;
    outEl.textContent = messages[idx];
  }, 3600);
}

/* --------------------------------------------------------------------------
   5. ONE-CLICK COPY EMAIL ADDRESS
   -------------------------------------------------------------------------- */
function initCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  const copyText = document.getElementById('copy-email-text');
  if (!copyBtn || !copyText) return;

  copyBtn.addEventListener('click', () => {
    const email = copyBtn.dataset.email || 'harshitjangid8221@gmail.com';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(showCopied).catch(fallbackCopy);
    } else {
      fallbackCopy();
    }

    function fallbackCopy() {
      const temp = document.createElement('textarea');
      temp.value = email;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand('copy');
      document.body.removeChild(temp);
      showCopied();
    }

    function showCopied() {
      copyText.textContent = '✓ Copied Email!';
      setTimeout(() => {
        copyText.textContent = '📋 Copy Email';
      }, 2200);
    }
  });
}

/* --------------------------------------------------------------------------
   6. INTERACTIVE PROJECT PREVIEW MODALS
   -------------------------------------------------------------------------- */
function initProjectModals() {
  const modal = document.getElementById('interactive-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBadge = document.getElementById('modal-badge');
  const modalBody = document.getElementById('modal-body');
  const closeBtn = document.getElementById('modal-close-btn');
  const triggers = document.querySelectorAll('.preview-trigger-btn');

  let snakeInterval = null;

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    if (snakeInterval) {
      clearInterval(snakeInterval);
      snakeInterval = null;
    }
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  triggers.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const type = btn.dataset.modal;
      if (!modal || !modalBody) return;

      if (snakeInterval) {
        clearInterval(snakeInterval);
        snakeInterval = null;
      }

      if (type === 'dayforge') {
        modalBadge.textContent = 'PROJECT 01 // INTERACTIVE DEMO';
        modalTitle.textContent = 'DayForge — Hourly Planner Simulator';
        renderDayForgeDemo(modalBody);
      } else if (type === 'snake') {
        modalBadge.textContent = 'PROJECT 02 // CS50x ARCADE';
        modalTitle.textContent = 'Snake Game — Playable Mini Arcade';
        snakeInterval = renderSnakeDemo(modalBody);
      } else if (type === 'bunnymilk') {
        modalBadge.textContent = 'PROJECT 03 // PARODY E-COMMERCE';
        modalTitle.textContent = 'BunnyMilk Co. — Storefront Concept';
        renderBunnyMilkDemo(modalBody);
      }

      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
    });
  });
}

function renderDayForgeDemo(container) {
  container.innerHTML = `
    <div class="sim-box">
      <p style="font-size:0.82rem;color:#334155;">
        Click any hour slot to toggle completion — simulating Harshit's <strong>DayForge</strong> planner:
      </p>
      <div class="df-row done">
        <span class="df-time">09:00 AM</span>
        <span class="df-task">B.Tech CSE Lecture @ JECRC</span>
        <span class="df-check">✅</span>
      </div>
      <div class="df-row done">
        <span class="df-time">11:00 AM</span>
        <span class="df-task">Python Practice &amp; Problem Solving</span>
        <span class="df-check">✅</span>
      </div>
      <div class="df-row">
        <span class="df-time">02:00 PM</span>
        <span class="df-task">Learn Backend Routing &amp; APIs</span>
        <span class="df-check">⬜</span>
      </div>
      <div class="df-row">
        <span class="df-time">05:00 PM</span>
        <span class="df-task">Build New Feature with AI Tools</span>
        <span class="df-check">⬜</span>
      </div>
      <div style="font-family:var(--font-mono);font-size:0.78rem;color:#4f46e5;font-weight:700;text-align:right;" id="df-score">
        Progress: 2 / 4 Completed (50%)
      </div>
    </div>
  `;

  const rows = container.querySelectorAll('.df-row');
  const score = container.querySelector('#df-score');

  rows.forEach((row) => {
    row.addEventListener('click', () => {
      row.classList.toggle('done');
      const check = row.querySelector('.df-check');
      check.textContent = row.classList.contains('done') ? '✅' : '⬜';
      const doneCount = container.querySelectorAll('.df-row.done').length;
      const pct = Math.round((doneCount / rows.length) * 100);
      score.textContent = `Progress: ${doneCount} / ${rows.length} Completed (${pct}%)`;
    });
  });
}

function renderSnakeDemo(container) {
  container.innerHTML = `
    <div class="snake-canvas-wrap">
      <p style="font-size:0.8rem;color:#334155;text-align:center;">
        Tribute to Harshit's <strong>CS50x Scratch Snake Project</strong>. Use Arrow Keys / WASD or buttons!
      </p>
      <canvas id="mini-snake-canvas" width="285" height="195"></canvas>
      <div style="font-family:var(--font-mono);font-size:0.8rem;color:#4f46e5;font-weight:700;" id="snake-score-display">
        Score: 0 | High Score: 0
      </div>
      <div class="snake-controls">
        <button type="button" class="snake-btn" data-dir="UP">↑ Up</button>
        <button type="button" class="snake-btn" data-dir="LEFT">← Left</button>
        <button type="button" class="snake-btn" data-dir="DOWN">↓ Down</button>
        <button type="button" class="snake-btn" data-dir="RIGHT">→ Right</button>
      </div>
    </div>
  `;

  const canvas = container.querySelector('#mini-snake-canvas');
  const ctx = canvas.getContext('2d');
  const scoreEl = container.querySelector('#snake-score-display');
  const grid = 15;
  const cols = canvas.width / grid;
  const rows = canvas.height / grid;

  let snake = [{ x: 5, y: 6 }, { x: 4, y: 6 }, { x: 3, y: 6 }];
  let dir = { x: 1, y: 0 };
  let food = { x: 11, y: 6 };
  let score = 0;
  let high = 0;

  function setDir(d) {
    if (d === 'UP' && dir.y === 0) dir = { x: 0, y: -1 };
    if (d === 'DOWN' && dir.y === 0) dir = { x: 0, y: 1 };
    if (d === 'LEFT' && dir.x === 0) dir = { x: -1, y: 0 };
    if (d === 'RIGHT' && dir.x === 0) dir = { x: 1, y: 0 };
  }

  container.querySelectorAll('.snake-btn').forEach((b) => {
    b.addEventListener('click', () => setDir(b.dataset.dir));
  });

  const keyHandler = (e) => {
    if (['ArrowUp', 'KeyW'].includes(e.code)) { e.preventDefault(); setDir('UP'); }
    if (['ArrowDown', 'KeyS'].includes(e.code)) { e.preventDefault(); setDir('DOWN'); }
    if (['ArrowLeft', 'KeyA'].includes(e.code)) { e.preventDefault(); setDir('LEFT'); }
    if (['ArrowRight', 'KeyD'].includes(e.code)) { e.preventDefault(); setDir('RIGHT'); }
  };
  window.addEventListener('keydown', keyHandler);

  return setInterval(() => {
    if (!document.body.contains(canvas)) {
      window.removeEventListener('keydown', keyHandler);
      return;
    }

    const head = {
      x: (snake[0].x + dir.x + cols) % cols,
      y: (snake[0].y + dir.y + rows) % rows
    };

    if (snake.some((s) => s.x === head.x && s.y === head.y)) {
      snake = [{ x: 5, y: 6 }, { x: 4, y: 6 }, { x: 3, y: 6 }];
      dir = { x: 1, y: 0 };
      score = 0;
    } else {
      snake.unshift(head);
      if (head.x === food.x && head.y === food.y) {
        score += 10;
        if (score > high) high = score;
        food = {
          x: Math.floor(Math.random() * cols),
          y: Math.floor(Math.random() * rows)
        };
      } else {
        snake.pop();
      }
    }

    scoreEl.textContent = `Score: ${score} | High Score: ${high}`;

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#ec4899';
    ctx.beginPath();
    ctx.arc(food.x * grid + grid / 2, food.y * grid + grid / 2, grid / 2 - 2, 0, Math.PI * 2);
    ctx.fill();

    snake.forEach((seg, idx) => {
      ctx.fillStyle = idx === 0 ? '#10b981' : '#34d399';
      ctx.fillRect(seg.x * grid + 1, seg.y * grid + 1, grid - 2, grid - 2);
    });
  }, 130);
}

function renderBunnyMilkDemo(container) {
  container.innerHTML = `
    <div class="sim-box">
      <div class="bunny-card-sim">
        <div style="font-size:2.1rem;margin-bottom:4px;">🐇🥛</div>
        <h4 style="font-family:var(--font-display);font-size:1.1rem;color:#0f172a;">
          BunnyMilk™ Reserve — Meadow Batch
        </h4>
        <p style="font-size:0.8rem;color:#be185d;margin:4px 0 10px;">
          “100% cruelty-free parody dairy for high-velocity hoppers.”
        </p>
        <div style="display:flex;justify-content:center;gap:6px;flex-wrap:wrap;margin-bottom:12px;">
          <span class="compact-pill pill-v-indigo">+42% Jump Height</span>
          <span class="compact-pill pill-v-pink">AI-Pasteurized</span>
          <span class="compact-pill pill-v-emerald">$99 / Pint</span>
        </div>
        <button type="button" class="preview-trigger-btn btn-pink" id="bunny-cart-btn">
          🛒 Add Parody Pint to Cart (0)
        </button>
      </div>
    </div>
  `;

  let count = 0;
  const btn = container.querySelector('#bunny-cart-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      count++;
      btn.textContent = `🛒 Added ${count} Parody Pint${count > 1 ? 's' : ''} — Rabbits Approve! 🥕`;
    });
  }
}
