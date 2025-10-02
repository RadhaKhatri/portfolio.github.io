// script.js
document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const themeToggle = document.getElementById('theme-toggle');
  const modal = document.getElementById('welcome-modal');
  const closeWelcome = document.getElementById('close-welcome');
  const enterSite = document.getElementById('enter-site');
  const typedTextEl = document.getElementById('typed-text');

  /* -------------------------
     THEME: load & toggle
     ------------------------- */
  const THEME_KEY = 'rk_theme_pref';

  function applyTheme(theme) {
    if (theme === 'dark') {
      body.classList.add('dark');
      themeToggle.textContent = '☀️';
      themeToggle.setAttribute('aria-pressed', 'true');
    } else {
      body.classList.remove('dark');
      themeToggle.textContent = '🌙';
      themeToggle.setAttribute('aria-pressed', 'false');
    }
  }

  // detect saved theme, else respect prefers-color-scheme
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) {
    applyTheme(saved);
  } else {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }

  themeToggle.addEventListener('click', () => {
    const isDark = body.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
  });

  /* -------------------------
     WELCOME MODAL
     - shown on first visit or every visit (you can tweak)
     ------------------------- */
  function openModal() {
    modal.setAttribute('aria-hidden', 'false');
    // trap focus to close button for accessibility
    closeWelcome.focus();
  }
  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
  }

  // show modal on load (you can add logic to show it only once by using localStorage)
  openModal();

  closeWelcome.addEventListener('click', closeModal);
  enterSite.addEventListener('click', () => {
    closeModal();
    // focus the about heading for screen readers
    const aboutHeading = document.querySelector('#about h2');
    if (aboutHeading) aboutHeading.scrollIntoView({behavior: 'smooth'});
  });

  // close modal with Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
      closeModal();
    }
  });

  /* -------------------------
     TYPED / ANIMATION TEXT
     - cycles through descriptors
     ------------------------- */
  const descriptors = [
    "Cloud Engineer ☁️",
    "Web Developer 💻",
    "YouTuber & Educator 🎥",
    "Open Source Contributor 🌐",
    "Machine Learning Student 🤖",
    "Problem Solver 🧩"
  ];

  const TYPING_SPEED = 60;     // ms per char
  const DELETING_SPEED = 30;
  const PAUSE_AFTER = 1200;    // pause after typing a full phrase

  let idx = 0, charIndex = 0, deleting = false;

  function tick() {
    const current = descriptors[idx];
    if (!deleting) {
      charIndex++;
      typedTextEl.textContent = current.substring(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, PAUSE_AFTER);
        return;
      }
      setTimeout(tick, TYPING_SPEED + Math.random() * 80);
    } else {
      charIndex--;
      typedTextEl.textContent = current.substring(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        idx = (idx + 1) % descriptors.length;
        setTimeout(tick, 300);
        return;
      }
      setTimeout(tick, DELETING_SPEED);
    }
  }

  // start typing after a short delay so the page feels smooth
  setTimeout(tick, 700);

  /* -------------------------
     OPTIONAL: Reduce motion support
     ------------------------- */
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (mq.matches) {
    // disable cursor blinking and typing speed if user prefers reduced motion
    document.querySelectorAll('.cursor').forEach(c => c.style.animation = 'none');
  }

  /* -------------------------
     Smooth scroll for in-page nav
     ------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // close modal if it's open
      if (modal.getAttribute('aria-hidden') === 'false') closeModal();
    });
  });
});


function openProject(id) {
  document.getElementById(id).setAttribute("aria-hidden", "false");
}
function closeProject(id) {
  document.getElementById(id).setAttribute("aria-hidden", "true");
}

// Optional: close modal on background click
document.querySelectorAll(".modal").forEach(modal => {
  modal.addEventListener("click", function(e) {
    if (e.target === modal) {
      modal.setAttribute("aria-hidden", "true");
    }
  });
});
