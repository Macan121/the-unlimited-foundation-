const projects = [
  {
    slug: "tnfa",
    name: "The New Frontier Africa",
    kicker: "Leadership",
    summary: "Developing leaders for a stronger, more inclusive Africa.",
    imageClass: "slice-leadership",
    imageAlt: "A mentor speaking with young adults in a leadership discussion",
    detailTitle: "The New Frontier Africa Leadership Summit",
    detail:
      "The New Frontier Africa Leadership Summit is presented as a TUF initiative with its own dedicated website journey. TUF remains the foundation home while TNFA carries its programme identity.",
    points: [
      "Leadership-focused initiative under The Unlimited Foundation.",
      "Dedicated TNFA website link can be added when the approved URL is available.",
      "Registration and programme details should remain on the approved TNFA destination.",
    ],
  },
  {
    slug: "tech-academy",
    name: "TUF Tech Academy",
    kicker: "Technology",
    summary: "Building digital skills and opportunities for tomorrow.",
    imageClass: "slice-tech",
    imageAlt: "Students working on laptops in a learning environment",
    detailTitle: "TUF Tech Academy",
    detail:
      "TUF Tech Academy is the foundation's technology skills pathway. Public course details can be expanded as training offers, eligibility, dates, and participation routes are confirmed.",
    points: [
      "Technology training and digital skills focus.",
      "Programme availability and delivery model can be added when confirmed.",
      "Participant enquiries route through the TUF contact journey.",
    ],
  },
  {
    slug: "music-arts",
    name: "Music & Arts",
    kicker: "Music & Arts",
    summary: "Nurturing creative talent and cultural expression.",
    imageClass: "slice-arts",
    imageAlt: "A young musician practicing guitar in a creative setting",
    detailTitle: "Music & Arts",
    detail:
      "Music & Arts gives TUF room to support creative expression, cultural confidence, and practical artistic development through approved activities.",
    points: [
      "Creative expression and talent development.",
      "Activities can include approved music, arts, mentorship, or showcases.",
      "Participant images and stories should be published only with permission.",
    ],
  },
  {
    slug: "smiling-children",
    name: "Smiling Children Project",
    kicker: "Children & Community",
    summary: "Supporting brighter futures for children and communities.",
    imageClass: "slice-children",
    imageAlt: "Children smiling in a community setting",
    detailTitle: "Smiling Children Project",
    detail:
      "Smiling Children Project is TUF's child-focused community support initiative. The public site keeps the purpose visible while avoiding sensitive beneficiary details.",
    points: [
      "Child-focused support within the TUF family of initiatives.",
      "Public content should protect beneficiary dignity and privacy.",
      "Support needs can be added after TUF confirms the programme model.",
    ],
  },
];

const stories = [
  {
    category: "Graduates",
    title: "Graduates",
    summary: "Stories about learners completing a programme and moving into their next opportunity.",
  },
  {
    category: "Business Owners",
    title: "Business Owners",
    summary: "Narratives from entrepreneurs and community builders shaped by TUF support.",
  },
  {
    category: "Tech Innovators",
    title: "Tech Innovators",
    summary: "Technology pathways connected to training, practice, and practical outcomes.",
  },
  {
    category: "Skill Merchants",
    title: "Skill Merchants",
    summary: "A working story category ready for TUF's preferred public wording and examples.",
  },
];

const projectMount = document.querySelector("[data-projects]");
const storyMount = document.querySelector("[data-stories]");
const dialog = document.querySelector("[data-dialog]");
const dialogContent = document.querySelector("[data-dialog-content]");
const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector("#site-menu");
let lastFocusedElement = null;

function renderProjects() {
  projectMount.innerHTML = projects
    .map(
      (project) => `
        <article class="project-card">
          <div class="card-image image-slice ${project.imageClass}">
            <img src="assets/programme-montage.png" alt="${project.imageAlt}" loading="lazy" />
          </div>
          <div class="card-body">
            <p class="card-kicker">${project.kicker}</p>
            <h3>${project.name}</h3>
            <p>${project.summary}</p>
            <button class="card-button" type="button" data-project="${project.slug}">
              Learn more <span aria-hidden="true">-&gt;</span>
            </button>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderStories(category = "all") {
  const visible = category === "all" ? stories : stories.filter((story) => story.category === category);
  storyMount.innerHTML = visible.length
    ? visible
        .map(
          (story) => `
          <article class="story-card">
            <p class="pill">${story.category}</p>
            <h3>${story.title}</h3>
            <p>${story.summary}</p>
            <button class="card-button" type="button" data-story="${story.category}">
              Story pathway <span aria-hidden="true">-&gt;</span>
            </button>
          </article>
        `,
        )
        .join("")
    : `<article class="story-card empty-state">
        <h3>No stories in this category yet.</h3>
        <p>When TUF approves a public story for this pathway, it can appear here.</p>
      </article>`;
}

function showProject(slug) {
  const project = projects.find((item) => item.slug === slug);
  if (!project) return;

  lastFocusedElement = document.activeElement;
  dialogContent.innerHTML = `
    <div class="dialog-body">
      <p class="eyebrow">${project.kicker}</p>
      <h2>${project.detailTitle}</h2>
      <p>${project.detail}</p>
      <ul class="dialog-list">
        ${project.points.map((point) => `<li>${point}</li>`).join("")}
      </ul>
      <a class="button secondary" href="#contact">Enquire about this project</a>
    </div>
  `;
  dialog.showModal();
  document.body.classList.add("dialog-open");
}

function showStory(category) {
  const story = stories.find((item) => item.category === category);
  if (!story) return;

  lastFocusedElement = document.activeElement;
  dialogContent.innerHTML = `
    <div class="dialog-body">
      <p class="eyebrow">Success Stories</p>
      <h2>${story.title}</h2>
      <p>${story.summary}</p>
      <ul class="dialog-list">
        <li>Each story can connect to a related TUF initiative.</li>
        <li>Public attribution and media should be used only with permission.</li>
        <li>Outcome claims should stay specific and verifiable.</li>
      </ul>
      <a class="button secondary" href="#contact">Share a story with TUF</a>
    </div>
  `;
  dialog.showModal();
  document.body.classList.add("dialog-open");
}

function prepareEmail(form, subjectPrefix) {
  const status = form.querySelector(".form-status");
  const data = new FormData(form);
  const invalid = [...form.elements].some((element) => {
    if (!element.checkValidity || element.checkValidity()) return false;
    element.reportValidity();
    return true;
  });

  if (invalid) {
    status.textContent = "Please complete the required fields before preparing the enquiry.";
    return;
  }

  const lines = [...data.entries()]
    .filter(([, value]) => String(value).trim())
    .map(([key, value]) => `${key}: ${value}`);
  const subject = encodeURIComponent(`${subjectPrefix}: ${data.get("name")}`);
  const body = encodeURIComponent(lines.join("\n"));
  status.innerHTML = `Your enquiry is ready. <a href="mailto:?subject=${subject}&body=${body}">Open it in your email app</a>.`;
}

function closeMenu() {
  header.classList.remove("open");
  document.body.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
}

function openMenu() {
  header.classList.add("open");
  document.body.classList.add("menu-open");
  menuToggle.setAttribute("aria-expanded", "true");
  menu.querySelector("a")?.focus();
}

function setupRevealMotion() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealItems = document.querySelectorAll("[data-reveal]");
  if (reduced || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.16 },
  );
  revealItems.forEach((item) => observer.observe(item));
}

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 8);
}

function updateParallax() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const media = document.querySelector("[data-parallax] img");
  if (!media || reduced || window.innerWidth < 900) return;
  const rect = media.getBoundingClientRect();
  const progress = Math.max(-1, Math.min(1, (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight));
  const offset = Math.round(progress * -18);
  media.style.transform = `translateY(${offset}px) scale(1)`;
}

renderProjects();
renderStories();
setupRevealMotion();
updateHeader();

document.addEventListener("click", (event) => {
  const projectButton = event.target.closest("[data-project]");
  const storyButton = event.target.closest("[data-story]");
  const filterButton = event.target.closest("[data-filter]");

  if (projectButton) showProject(projectButton.dataset.project);
  if (storyButton) showStory(storyButton.dataset.story);

  if (filterButton) {
    document.querySelectorAll("[data-filter]").forEach((button) => button.classList.remove("active"));
    filterButton.classList.add("active");
    renderStories(filterButton.dataset.filter);
  }
});

document.querySelector("[data-close]").addEventListener("click", () => {
  dialog.close();
});

dialog.addEventListener("close", () => {
  document.body.classList.remove("dialog-open");
  lastFocusedElement?.focus?.();
});

menuToggle.addEventListener("click", () => {
  if (header.classList.contains("open")) {
    closeMenu();
  } else {
    openMenu();
  }
});

document.querySelectorAll(".site-nav a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (header.classList.contains("open")) {
    closeMenu();
    menuToggle.focus();
  }
  if (dialog.open) dialog.close();
});

document.querySelectorAll("[data-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    prepareEmail(form, "TUF enquiry");
  });
});

window.addEventListener(
  "scroll",
  () => {
    updateHeader();
    updateParallax();
  },
  { passive: true },
);

window.addEventListener("resize", updateParallax);
window.addEventListener("load", updateParallax);
