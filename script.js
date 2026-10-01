const projects = [
  {
    slug: "tnfa",
    name: "The New Frontier Africa Leadership Summit",
    shortName: "TNFA",
    summary:
      "A leadership summit identified by the PRD as a TUF initiative with a dedicated website in development.",
    status: "Dedicated site link pending",
    audience: "Emerging leaders and programme participants",
    activities: [
      "Leadership-focused convening",
      "Participant registration through the approved TNFA destination",
      "Clear reciprocal link between TUF and TNFA",
    ],
    action: "View TNFA Relationship",
  },
  {
    slug: "tech-academy",
    name: "TUF Tech Academy",
    shortName: "Tech",
    summary:
      "A skills initiative reserved for approved technology training details, eligibility, and delivery model.",
    status: "Programme facts pending",
    audience: "Learners seeking practical technology skills",
    activities: [
      "Training offer to be confirmed",
      "Eligibility and cost to be approved",
      "Application route to be enabled when live",
    ],
    action: "View Programme Readiness",
  },
  {
    slug: "music-and-arts",
    name: "Music and Arts",
    shortName: "Arts",
    summary:
      "A creative initiative that will describe approved music, arts, mentorship, or performance activities.",
    status: "Activity details pending",
    audience: "Creative participants and community supporters",
    activities: [
      "Approved creative activities pending",
      "Media and participant permissions required",
      "Support needs to be confirmed before launch",
    ],
    action: "View Creative Scope",
  },
  {
    slug: "smiling-children",
    name: "Smiling Children Project",
    shortName: "SCP",
    summary:
      "A child-focused support initiative that should protect beneficiary privacy while explaining approved support needs.",
    status: "Safeguarding review required",
    audience: "Children, families, donors, and safeguarding reviewers",
    activities: [
      "Purpose and support model to be approved",
      "No sensitive beneficiary details exposed publicly",
      "Child-related content requires safeguarding review",
    ],
    action: "View Safeguarding Notes",
  },
];

const stories = [
  {
    category: "Graduates",
    title: "Graduate outcomes",
    summary:
      "Approved graduate stories will describe the starting point, TUF contribution, and outcome.",
    project: "Related project to be selected",
  },
  {
    category: "Business Owners",
    title: "Business owner progress",
    summary:
      "Business stories should include permission, attribution, and privately recorded evidence.",
    project: "Related project to be selected",
  },
  {
    category: "Tech Innovators",
    title: "Technology innovation stories",
    summary:
      "Tech innovator narratives will connect training or support to a verified public outcome.",
    project: "TUF Tech Academy",
  },
  {
    category: "Skill Merchants",
    title: "Skill Merchants",
    summary:
      "The category is preserved from the PRD while TUF confirms the preferred public wording.",
    project: "Category wording pending",
  },
];

const projectMount = document.querySelector("[data-projects]");
const storyMount = document.querySelector("[data-stories]");
const dialog = document.querySelector("[data-dialog]");
const dialogContent = document.querySelector("[data-dialog-content]");
const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector(".menu-toggle");

function renderProjects() {
  projectMount.innerHTML = projects
    .map(
      (project) => `
        <article class="project-card">
          <div>
            <div class="project-icon" aria-hidden="true">${project.shortName}</div>
            <h3>${project.name}</h3>
            <p>${project.summary}</p>
          </div>
          <div>
            <div class="card-meta">
              <span class="pill">${project.status}</span>
            </div>
            <button class="card-button" type="button" data-project="${project.slug}">
              ${project.action}
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
            <div class="card-meta">
              <span class="pill">${story.category}</span>
              <span class="pill">${story.project}</span>
            </div>
            <h3>${story.title}</h3>
            <p>${story.summary}</p>
            <button class="card-button" type="button" data-story="${story.category}">
              View Story Requirements
            </button>
          </article>
        `,
        )
        .join("")
    : `<article class="story-card empty-state">
        <h3>No approved stories in this category yet.</h3>
        <p>When TUF approves a story with consent and evidence, it can appear here.</p>
      </article>`;
}

function showProject(slug) {
  const project = projects.find((item) => item.slug === slug);
  if (!project) return;

  dialogContent.innerHTML = `
    <div class="dialog-body">
      <p class="eyebrow">Project Detail</p>
      <h2>${project.name}</h2>
      <p>${project.summary}</p>
      <ul class="dialog-list">
        <li><strong>Audience:</strong> ${project.audience}</li>
        ${project.activities.map((activity) => `<li>${activity}</li>`).join("")}
      </ul>
      <a class="button secondary" href="#contact">Enquire About This Project</a>
    </div>
  `;
  dialog.showModal();
  document.body.classList.add("dialog-open");
}

function showStory(category) {
  const story = stories.find((item) => item.category === category);
  if (!story) return;

  dialogContent.innerHTML = `
    <div class="dialog-body">
      <p class="eyebrow">Success Story</p>
      <h2>${story.title}</h2>
      <p>${story.summary}</p>
      <ul class="dialog-list">
        <li>Publication date, attribution, media permission, and evidence reference are required.</li>
        <li>The narrative should explain the starting point, TUF's contribution, and the outcome.</li>
        <li>Quantitative claims should have a privately recorded source.</li>
      </ul>
      <a class="button secondary" href="#contact">Share an Approved Story</a>
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
  status.innerHTML =
    `Your enquiry is ready. Add TUF's approved email address before launch, or ` +
    `<a href="mailto:?subject=${subject}&body=${body}">open this draft in your email app</a>.`;
}

renderProjects();
renderStories();

document.addEventListener("click", (event) => {
  const projectButton = event.target.closest("[data-project]");
  const storyButton = event.target.closest("[data-story]");
  const filterButton = event.target.closest("[data-filter]");
  const presetLink = event.target.closest("[data-preset]");

  if (projectButton) showProject(projectButton.dataset.project);
  if (storyButton) showStory(storyButton.dataset.story);

  if (filterButton) {
    document.querySelectorAll("[data-filter]").forEach((button) => button.classList.remove("active"));
    filterButton.classList.add("active");
    renderStories(filterButton.dataset.filter);
  }

  if (presetLink) {
    const select = document.querySelector('[data-form="contact"] select[name="type"]');
    select.value = presetLink.dataset.preset;
  }
});

document.querySelector("[data-close]").addEventListener("click", () => {
  dialog.close();
});

dialog.addEventListener("close", () => {
  document.body.classList.remove("dialog-open");
});

menuToggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".site-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll("[data-form]").forEach((form) => {
  const prefix = form.dataset.form === "partner" ? "Partnership enquiry" : "TUF enquiry";
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    prepareEmail(form, prefix);
  });
});
