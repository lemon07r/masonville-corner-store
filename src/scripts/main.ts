import "@styles/main.css";

document.documentElement.dataset.js = "true";

if ("requestIdleCallback" in window) {
  requestIdleCallback(initNonCritical, { timeout: 2000 });
} else {
  setTimeout(initNonCritical, 1);
}

// Header scroll effect
const header = document.querySelector<HTMLElement>(".site-header");
if (header) {
  let ticking = false;
  const toggleShadow = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        header.dataset.scrolled = window.scrollY > 8 ? "true" : "false";
        ticking = false;
      });
      ticking = true;
    }
  };
  toggleShadow();
  window.addEventListener("scroll", toggleShadow, { passive: true });
}

// Mobile menu toggle
const menuToggle = document.querySelector<HTMLButtonElement>(".site-header__toggle");
const nav = document.querySelector<HTMLElement>(".site-header__nav");
if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("is-open");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    });
  });
}

// Intersection observer for animations
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reduceMotion && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
  );

  document
    .querySelectorAll<HTMLElement>("section.section, .animate-grid")
    .forEach((section) => observer.observe(section));
}

function initNonCritical() {
  // Highlight current day in hours table
  const hoursRows = document.querySelectorAll<HTMLElement>(".hours-table__row");
  if (hoursRows.length > 0) {
    const today = new Intl.DateTimeFormat("en-CA", { weekday: "long" }).format(new Date());
    hoursRows.forEach((row) => {
      if (row.dataset.day === today) {
        row.dataset.current = "true";
      }
    });
  }

  // Quote form handler
  const quoteForm = document.querySelector<HTMLFormElement>(".quote-form");
  if (quoteForm) {
    quoteForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const status = document.createElement("p");
      status.className = "quote-form__status";
      status.textContent = "Thank you! We'll be in touch shortly with your free quote.";
      quoteForm.replaceChildren(status);
    });
  }
}
