const siteSettings = Object.freeze({
  tnfaWebsiteUrl: "",
  contactEmail: "",
});

const header = document.querySelector("[data-header]");
const menu = document.querySelector("[data-menu]");
const contactForm = document.querySelector('[data-form="contact"]');
const mobileNavigation = window.matchMedia("(max-width: 1040px)");

function isConstrainedConnection() {
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  return Boolean(connection?.saveData || ["slow-2g", "2g"].includes(connection?.effectiveType));
}

function setupMotion() {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const items = [...document.querySelectorAll("[data-reveal]")];
  if (reducedMotion || isConstrainedConnection() || !("IntersectionObserver" in window)) return;

  items.forEach((item) => {
    if (item.getBoundingClientRect().top > window.innerHeight * 0.92) item.classList.add("can-reveal");
  });
  document.documentElement.classList.add("motion-ready");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8%", threshold: 0.06 },
  );

  items.filter((item) => item.classList.contains("can-reveal")).forEach((item) => observer.observe(item));

  const revealHashTarget = () => {
    const target = window.location.hash && document.querySelector(window.location.hash);
    target?.closest("[data-reveal]")?.classList.add("is-visible");
  };
  window.addEventListener("hashchange", revealHashTarget);
  revealHashTarget();
}

function closeMenu() {
  if (mobileNavigation.matches && menu?.open) menu.open = false;
}

function syncMenuBreakpoint(event) {
  if (!menu) return;
  menu.open = !event.matches;
}

function preselectPartnership() {
  const type = contactForm?.elements.namedItem("type");
  if (type) type.value = "Partnership";
}

function applyQueryPrefill() {
  if (!contactForm) return;
  const params = new URLSearchParams(window.location.search);
  const type = params.get("type");
  const project = params.get("project");
  const typeField = contactForm.elements.namedItem("type");
  const projectField = contactForm.elements.namedItem("project");
  const typeMap = { general: "General", programme: "Programme", volunteering: "Volunteering", partnership: "Partnership" };
  const projectMap = {
    tnfa: "The New Frontier Africa",
    "tech-academy": "TUF Tech Academy",
    "smiling-children": "Smiling Children Project",
  };
  if (typeField && typeMap[type]) typeField.value = typeMap[type];
  if (projectField && projectMap[project]) projectField.value = projectMap[project];
}

function installConfiguredLinks() {
  if (!siteSettings.tnfaWebsiteUrl) return;
  let url;
  try {
    url = new URL(siteSettings.tnfaWebsiteUrl);
    if (!/^https:$/.test(url.protocol)) return;
  } catch {
    return;
  }

  document.querySelectorAll("[data-tnfa-website-slot]").forEach((slot) => {
    const link = document.createElement("a");
    link.className = "button dark";
    link.href = url.href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Visit TNFA Website";
    slot.append(link);
  });
}

function prepareEmailDraft(form) {
  const status = form.querySelector(".form-status");
  if (!form.checkValidity()) {
    form.reportValidity();
    status.textContent = "Complete the required fields before opening an email draft.";
    return;
  }

  const data = new FormData(form);
  const lines = [...data.entries()]
    .filter(([, value]) => String(value).trim())
    .map(([key, value]) => `${key[0].toUpperCase()}${key.slice(1)}: ${String(value).trim()}`);
  const subject = `TUF ${data.get("type")} enquiry from ${data.get("name")}`;
  const recipient = siteSettings.contactEmail.trim();
  const draftUrl = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;

  status.textContent = recipient
    ? "An email draft was requested. Review and send it from your email application."
    : "An email draft was requested. Add the approved TUF recipient, then review and send it from your email application.";
  window.location.href = draftUrl;
}

document.querySelectorAll("[data-image]").forEach((image) => {
  image.addEventListener("error", () => image.closest("[data-image-container]")?.classList.add("image-failed"));
});

document.querySelectorAll("[data-partnership]").forEach((link) => link.addEventListener("click", preselectPartnership));
document.querySelectorAll(".site-nav a").forEach((link) => link.addEventListener("click", closeMenu));
mobileNavigation.addEventListener("change", syncMenuBreakpoint);

document.addEventListener("click", (event) => {
  if (menu?.open && !menu.contains(event.target)) closeMenu();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menu?.open) {
    closeMenu();
    menu.querySelector("summary")?.focus();
  }
});

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  prepareEmailDraft(contactForm);
});

document.querySelectorAll("[data-year]").forEach((item) => {
  item.textContent = String(new Date().getFullYear());
});

function updateHeader() {
  header?.classList.toggle("is-scrolled", window.scrollY > 8);
}

window.addEventListener("scroll", updateHeader, { passive: true });
syncMenuBreakpoint(mobileNavigation);
applyQueryPrefill();
installConfiguredLinks();
setupMotion();
updateHeader();
