import "@styles/main.css";

document.documentElement.dataset.js = "true";

const hoursRows = document.querySelectorAll<HTMLElement>(".hours-table__row");
const today = new Intl.DateTimeFormat("en-CA", { weekday: "long" }).format(new Date());

hoursRows.forEach((row) => {
  if (row.dataset.day === today) {
    row.dataset.current = "true";
  }
});

const header = document.querySelector<HTMLElement>(".site-header");
if (header) {
  const toggleShadow = () => {
    header.dataset.scrolled = window.scrollY > 8 ? "true" : "false";
  };
  toggleShadow();
  window.addEventListener("scroll", toggleShadow, { passive: true });
}

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
    { threshold: 0.25 }
  );

  document
    .querySelectorAll<HTMLElement>("section.section")
    .forEach((section) => observer.observe(section));
}

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
