const siteSettings = Object.freeze({
  tnfaWebsiteUrl: window.TUF_SITE_CONFIG?.tnfaWebsiteUrl || "",
  contactEmail: window.TUF_SITE_CONFIG?.contactEmail || "",
});

const header = document.querySelector("[data-header]");
const projectMenu = document.querySelector("[data-project-menu]");
const projectToggle = document.querySelector("[data-project-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const contactForm = document.querySelector('[data-form="contact"]');

function closeProjectMenu({ restoreFocus = false } = {}) {
  projectMenu?.classList.remove("is-open");
  projectToggle?.setAttribute("aria-expanded", "false");
  if (restoreFocus) projectToggle?.focus();
}

function toggleProjectMenu() {
  const willOpen = !projectMenu?.classList.contains("is-open");
  projectMenu?.classList.toggle("is-open", willOpen);
  projectToggle?.setAttribute("aria-expanded", String(willOpen));
}

projectToggle?.addEventListener("click", toggleProjectMenu);
projectMenu?.querySelectorAll(".project-dropdown a").forEach((link) => link.addEventListener("click", () => closeProjectMenu()));
mobileMenu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => { mobileMenu.open = false; }));

document.addEventListener("click", (event) => {
  if (projectMenu && !projectMenu.contains(event.target)) closeProjectMenu();
  if (mobileMenu?.open && !mobileMenu.contains(event.target)) mobileMenu.open = false;
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (projectMenu?.classList.contains("is-open")) {
    closeProjectMenu({ restoreFocus: true });
    return;
  }
  if (mobileMenu?.open) {
    mobileMenu.open = false;
    mobileMenu.querySelector("summary")?.focus();
  }
});

function applyQueryPrefill() {
  if (!contactForm) return;
  const params = new URLSearchParams(window.location.search);
  const typeMap = { general: "General", programme: "Programme", volunteering: "Volunteering", partnership: "Partnership" };
  const projectMap = { tnfa: "The New Frontier Africa", "tech-academy": "TUF Tech Academy", "smiling-children": "Smiling Children Project" };
  const programmeMap = { students: "Students in Tech", women: "Women in Tech", "older-adults": "Older Adults in Tech" };
  const typeField = contactForm.elements.namedItem("type");
  const projectField = contactForm.elements.namedItem("project");
  const programmeField = contactForm.elements.namedItem("programme");
  if (typeField && typeMap[params.get("type")]) typeField.value = typeMap[params.get("type")];
  if (projectField && projectMap[params.get("project")]) projectField.value = projectMap[params.get("project")];
  if (programmeField && programmeMap[params.get("programme")]) programmeField.value = programmeMap[params.get("programme")];
}

function installConfiguredLinks() {
  if (!siteSettings.tnfaWebsiteUrl) return;
  let url;
  try {
    url = new URL(siteSettings.tnfaWebsiteUrl);
    if (url.protocol !== "https:") return;
  } catch { return; }
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
  const lines = [...data.entries()].filter(([, value]) => String(value).trim()).map(([key, value]) => `${key[0].toUpperCase()}${key.slice(1)}: ${String(value).trim()}`);
  const subject = `TUF ${data.get("type")} enquiry from ${data.get("name")}`;
  const recipient = siteSettings.contactEmail.trim();
  status.textContent = recipient ? "An email draft was requested. Review and send it from your email application." : "An email draft was requested. Add the recipient, then review and send it from your email application.";
  window.location.href = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}

contactForm?.addEventListener("submit", (event) => { event.preventDefault(); prepareEmailDraft(contactForm); });
document.querySelectorAll("[data-year]").forEach((item) => { item.textContent = String(new Date().getFullYear()); });
document.querySelectorAll("img").forEach((image) => image.addEventListener("error", () => {
  image.hidden = true;
  image.parentElement?.classList.add("image-failed");
}));

function updateHeader() { header?.classList.toggle("is-scrolled", window.scrollY > 8); }
window.addEventListener("scroll", updateHeader, { passive: true });

applyQueryPrefill();
installConfiguredLinks();
updateHeader();
