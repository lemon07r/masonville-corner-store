import "@styles/main.css";

// Mark JS as enabled
document.documentElement.dataset.js = "true";

// Defer non-critical work
if ("requestIdleCallback" in window) {
  requestIdleCallback(initNonCritical, { timeout: 2000 });
} else {
  setTimeout(initNonCritical, 1);
}

// Critical: Header scroll effect (minimize reflow)
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

// Critical: Intersection observer for animations
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
    .querySelectorAll<HTMLElement>("section.section")
    .forEach((section) => observer.observe(section));
}

// Non-critical features
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

  // Newsletter form handler
  const newsletter = document.querySelector<HTMLFormElement>(".newsletter");
  if (newsletter) {
    newsletter.addEventListener("submit", (event) => {
      event.preventDefault();
      const status = document.createElement("p");
      status.className = "newsletter__status";
      status.textContent = "Thanks! We'll be in touch with fry specials soon.";
      newsletter.replaceChildren(status);
    });
  }
}
