const THEME_KEY = "rk_portfolio_theme";

const projectDetails = {
  billing: {
    title: "Siddhant Medical Shop Billing System",
    summary:
      "Designed a desktop billing system to improve retail medical operations with inventory controls, vendor management, and invoice workflow automation.",
    stack: "Python | PyQt6 | MySQL"
  },
  question: {
    title: "Smart Question Paper Generator",
    summary:
      "Built an automated question-paper generation workflow from Excel-based question banks with configurable unit-wise selection and structured formatted output.",
    stack: "Python | PyQt6 | MySQL | Excel VBA"
  },
  svmms: {
    title: "SVMMS - Smart Vehicle Maintenance Management System",
    summary:
      "Built a full-stack maintenance system to automate workshop operations including bookings, job cards, billing, and real-time service updates.",
    stack: "React.js | Vite | Tailwind CSS | Node.js | Express.js | PostgreSQL | JWT | AWS"
  },
  evaahan: {
    title: "EVaahan - Electric Vehicle Buying and Selling Platform",
    summary:
      "Developed a web platform that offers EV listings, comparison tools, and direct buyer-seller communication to support EV adoption, especially in rural regions.",
    stack: "HTML | CSS | Bootstrap | PHP | MySQL | AWS"
  },
  forecast: {
    title: "FBI Time Series Forecasting",
    summary:
      "Created a time-series analysis and forecasting workflow to evaluate crime trends and communicate insights through clean visualizations.",
    stack: "Python | Pandas | NumPy | Matplotlib"
  },
  motor: {
    title: "Electric Motor Life Monitoring",
    summary:
      "Explored predictive maintenance by using operational and sensor data for anomaly detection and failure-risk estimation.",
    stack: "Python | ML | IoT Sensors"
  }
};

function applyTheme(theme) {
  const isDark = theme === "dark";
  document.body.classList.toggle("dark", isDark);

  const toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.setAttribute("aria-pressed", String(isDark));
    toggle.textContent = isDark ? "Light" : "Dark";
  }
}

function setupThemeToggle() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(savedTheme || (prefersDark ? "dark" : "light"));

  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;

  toggle.addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("dark") ? "light" : "dark";
    applyTheme(nextTheme);
    localStorage.setItem(THEME_KEY, nextTheme);
  });
}

function setupMobileNav() {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("primary-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function setupActiveNav() {
  const links = Array.from(document.querySelectorAll(".primary-nav a"));
  const map = new Map(
    links
      .map((link) => {
        const section = document.querySelector(link.getAttribute("href"));
        return section ? [section.id, link] : null;
      })
      .filter(Boolean)
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = map.get(entry.target.id);
        if (!link) return;
        if (entry.isIntersecting) {
          links.forEach((item) => item.classList.remove("active"));
          link.classList.add("active");
        }
      });
    },
    {
      rootMargin: "-40% 0px -45% 0px",
      threshold: 0.1
    }
  );

  for (const id of map.keys()) {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  }
}

function setupRevealAnimation() {
  const targets = document.querySelectorAll("[data-reveal]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reducedMotion) {
    targets.forEach((el) => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  targets.forEach((target) => observer.observe(target));
}

function setupTypedRole() {
  const target = document.getElementById("typed-role");
  if (!target) return;

  const roles = [
    "Cloud Engineering Fundamentals",
    "Web Application Development",
    "Student Mentoring and Tech Education",
    "Open Source Community Leadership"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let removing = false;

  const tick = () => {
    const current = roles[roleIndex];
    if (!removing) {
      charIndex += 1;
      target.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        removing = true;
        setTimeout(tick, 1100);
        return;
      }
      setTimeout(tick, 48);
      return;
    }

    charIndex -= 1;
    target.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      removing = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(tick, 300);
      return;
    }
    setTimeout(tick, 28);
  };

  tick();
}

function setupProjectDialog() {
  const dialog = document.getElementById("project-dialog");
  const closeButton = document.getElementById("close-dialog");
  if (!dialog || !closeButton) return;

  const title = document.getElementById("project-title");
  const summary = document.getElementById("project-summary");
  const stack = document.getElementById("project-stack");

  document.querySelectorAll("[data-project]").forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.getAttribute("data-project");
      const project = projectDetails[key];
      if (!project) return;

      title.textContent = project.title;
      summary.textContent = project.summary;
      stack.textContent = project.stack;

      dialog.showModal();
      closeButton.focus();
    });
  });

  closeButton.addEventListener("click", () => dialog.close());

  dialog.addEventListener("click", (event) => {
    const rect = dialog.getBoundingClientRect();
    const clickedOutside =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;

    if (clickedOutside) dialog.close();
  });
}

function setCurrentYear() {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
}

document.addEventListener("DOMContentLoaded", () => {
  setupThemeToggle();
  setupMobileNav();
  setupSmoothScroll();
  setupActiveNav();
  setupRevealAnimation();
  setupTypedRole();
  setupProjectDialog();
  setCurrentYear();
});
