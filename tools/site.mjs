const arrow = '<svg class="icon" aria-hidden="true"><use href="#icon-arrow"></use></svg>';
const chevron = '<svg class="icon chevron" aria-hidden="true"><use href="#icon-chevron"></use></svg>';

export const routePaths = [
  "/", "/about/", "/projects/", "/projects/tnfa/", "/projects/tech-academy/",
  "/projects/tech-academy/students/", "/projects/tech-academy/women/",
  "/projects/tech-academy/older-adults/", "/projects/smiling-children/", "/contact/", "/partner/",
];

const projectMenu = (mobile = false) => `
  <div class="${mobile ? "mobile-project-links" : "project-dropdown"}" ${mobile ? "" : 'id="projects-menu" aria-label="Project navigation"'}>
    <a class="all-projects-link" href="/projects/">All Projects</a>
    <div class="menu-group">
      <a class="menu-project" href="/projects/tech-academy/">TUF Tech Academy ${arrow}</a>
      <a class="menu-programme" href="/projects/tech-academy/students/">Students in Tech</a>
      <a class="menu-programme" href="/projects/tech-academy/women/">Women in Tech</a>
      <a class="menu-programme" href="/projects/tech-academy/older-adults/">Older Adults in Tech</a>
    </div>
    <a class="menu-project" href="/projects/smiling-children/">Smiling Children Project ${arrow}</a>
  </div>`;

function header(active) {
  const current = (name) => active === name ? ' aria-current="page"' : "";
  return `<header class="site-header" data-header><div class="shell header-shell">
    <a class="brand" href="/" aria-label="The Unlimited Foundation home"><img src="/assets/tuf-logo-display.jpg" width="990" height="380" alt="The Unlimited Foundation — Empowering Generations" /></a>
    <nav class="desktop-nav" aria-label="Main navigation">
      <a href="/"${current("home")}>Home</a><a href="/about/"${current("about")}>About</a>
      <div class="project-menu" data-project-menu>
        <div class="project-trigger"><a href="/projects/"${current("projects")}>Projects</a><button type="button" aria-label="Open Projects menu" aria-expanded="false" aria-controls="projects-menu" data-project-toggle>${chevron}</button></div>
        ${projectMenu(false)}
      </div>
      <a href="/contact/"${current("contact")}>Contact</a>
      <a class="nav-cta" href="/partner/"${current("partner")}>Become a Partner ${arrow}</a>
    </nav>
    <details class="mobile-nav" data-mobile-menu><summary class="menu-toggle"><span class="menu-bars" aria-hidden="true"></span><span class="sr-only">Open navigation</span></summary>
      <nav aria-label="Mobile navigation"><a href="/"${current("home")}>Home</a><a href="/about/"${current("about")}>About</a>
        <details class="mobile-projects"><summary>Projects ${chevron}</summary>${projectMenu(true)}</details>
        <a href="/contact/"${current("contact")}>Contact</a><a class="nav-cta" href="/partner/"${current("partner")}>Become a Partner ${arrow}</a>
      </nav>
    </details>
  </div></header>`;
}

function footer() {
  return `<footer class="site-footer"><div class="shell footer-grid">
    <div class="footer-identity"><div class="footer-logo"><img src="/assets/tuf-logo-display.jpg" width="990" height="380" alt="The Unlimited Foundation" loading="lazy" /></div><p class="footer-tagline">Empowering Generations.</p><p>The foundation home for TNFA, TUF Tech Academy, and the Smiling Children Project.</p></div>
    <nav class="footer-column" aria-label="Footer quick links"><h2>Quick links</h2><a href="/">Home</a><a href="/about/">About</a><a href="/projects/">Projects</a><a href="/partner/">Become a Partner</a><a href="/contact/">Contact</a></nav>
    <nav class="footer-column" aria-label="Footer project links"><h2>Our projects</h2><a href="/projects/tnfa/">The New Frontier Africa</a><a href="/projects/tech-academy/">TUF Tech Academy</a><a href="/projects/smiling-children/">Smiling Children Project</a></nav>
    <div class="footer-column"><h2>Contact</h2><p>Use the contact page to prepare a message for TUF.</p><a class="footer-contact" href="/contact/">Prepare an enquiry</a></div>
  </div><div class="shell footer-bottom"><p>© <span data-year>2026</span> The Unlimited Foundation (TUF). All rights reserved.</p><a class="back-to-top" href="#main">Back to top <svg class="icon" aria-hidden="true"><use href="#icon-up"></use></svg></a></div></footer>`;
}

const sprite = `<svg class="svg-sprite" aria-hidden="true">
  <symbol id="icon-arrow" viewBox="0 0 20 20"><path d="M4 10h11M11 6l4 4-4 4" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" /></symbol>
  <symbol id="icon-chevron" viewBox="0 0 20 20"><path d="m5 7.5 5 5 5-5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" /></symbol>
  <symbol id="icon-up" viewBox="0 0 20 20"><path d="M10 15V4M6 8l4-4 4 4" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" /></symbol>
</svg>`;

const crumbs = (items) => `<div class="shell breadcrumb-shell"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a>${items.map((item) => `${item.href ? `<span aria-hidden="true">/</span><a href="${item.href}">${item.label}</a>` : `<span aria-hidden="true">/</span><span aria-current="page">${item.label}</span>`}`).join("")}</nav></div>`;
const cta = (href, label, kind = "primary") => `<a class="button ${kind}" href="${href}">${label} ${arrow}</a>`;

const projectCards = `<div class="project-grid">
  <article class="project-card"><a class="card-media" href="/projects/tnfa/"><img src="/assets/tnfa-project.jpg" width="1000" height="442" alt="Illustrative leadership discussion" loading="lazy" /><span class="image-note">Illustrative image</span></a><div class="card-body"><p class="card-kicker">Youth &amp; Leadership</p><h3>The New Frontier Africa</h3><p>TNFA is a TUF initiative with Leadership Simulation presented within Youth &amp; Leadership.</p><a class="text-link" href="/projects/tnfa/">View TNFA ${arrow}</a></div></article>
  <article class="project-card"><a class="card-media" href="/projects/tech-academy/"><img src="/assets/tech-project.jpg" width="1000" height="442" alt="Illustrative technology learning session" loading="lazy" /><span class="image-note">Illustrative image</span></a><div class="card-body"><p class="card-kicker">Technology</p><h3>TUF Tech Academy</h3><p>Students in Tech, Women in Tech, and Older Adults in Tech.</p><a class="text-link" href="/projects/tech-academy/">View the academy ${arrow}</a></div></article>
  <article class="project-card"><a class="card-media" href="/projects/smiling-children/"><img src="/assets/children-project.jpg" width="1000" height="438" alt="Illustrative scene of smiling children" loading="lazy" /><span class="image-note">Illustrative image</span></a><div class="card-body"><p class="card-kicker">Children</p><h3>Smiling Children Project</h3><p>A confirmed project of The Unlimited Foundation.</p><a class="text-link" href="/projects/smiling-children/">View the project ${arrow}</a></div></article>
</div>`;

function pageHero(eyebrow, title, intro, image = "") {
  return `<section class="page-hero"><div class="shell page-hero-grid"><div><p class="eyebrow">${eyebrow}</p><h1>${title}</h1><p class="lead">${intro}</p></div>${image ? `<img src="${image}" width="1000" height="442" alt="" role="presentation" />` : ""}</div></section>`;
}

const home = `<section class="hero" aria-labelledby="hero-title"><figure class="hero-media"><img src="/assets/hero-programme.jpg" width="1600" height="732" alt="Illustrative scene of young adults learning together" fetchpriority="high" /><figcaption>Illustrative concept image.</figcaption></figure><div class="hero-shade" aria-hidden="true"></div><div class="shell hero-content"><p class="eyebrow hero-eyebrow">The Unlimited Foundation</p><h1 id="hero-title">Empowering<br />Generations.</h1><p class="hero-text">TUF brings together three confirmed initiatives in youth leadership, technology learning, and support for children.</p><div class="hero-actions">${cta("/projects/", "Explore Our Projects")}${cta("/partner/", "Become a Partner", "ghost")}</div></div></section>
<section class="section intro-section"><div class="shell intro-grid"><div class="intro-copy"><p class="eyebrow">About TUF</p><h2>One foundation, three distinct projects.</h2><p class="lead">The Unlimited Foundation is the foundation home for The New Frontier Africa, TUF Tech Academy, and the Smiling Children Project.</p>${cta("/about/", "About the foundation", "dark")}</div><figure class="intro-media"><img src="/assets/foundation-intro.jpg" width="1200" height="520" alt="Illustrative scene of young adults in conversation" loading="lazy" /><figcaption>Illustrative concept image.</figcaption></figure></div></section>
<section class="section"><div class="shell"><div class="section-head"><div><p class="eyebrow">Our Projects</p><h2>Three initiatives, clearly connected.</h2></div><a class="text-link" href="/projects/">All projects ${arrow}</a></div>${projectCards}</div></section>
<section class="section tnfa-section"><div class="shell tnfa-grid"><div class="tnfa-copy"><p class="eyebrow">Featured TUF Initiative</p><h2>The New Frontier Africa</h2><p class="lead">Youth &amp; Leadership, with Leadership Simulation presented within that programme.</p>${cta("/projects/tnfa/", "Explore TNFA", "dark")}</div><div class="tnfa-mark"><img src="/assets/tnfa-logo.jpeg" width="1080" height="1080" alt="The New Frontier Africa" loading="lazy" /></div></div></section>
<section class="section partner-section"><div class="shell partner-grid"><div><p class="eyebrow">Partner with TUF</p><h2>Start a partnership conversation.</h2></div><div class="partner-copy"><p>Use the dedicated partnership page to choose the right next step.</p>${cta("/partner/", "Become a Partner")}</div></div></section>`;

const about = `${pageHero("About", "The Unlimited Foundation", "TUF brings together three confirmed projects under one foundation identity.")}
<section class="section"><div class="shell prose-grid"><div><p class="eyebrow">Who TUF is</p><h2>A foundation home for connected initiatives.</h2></div><div class="prose"><p>The Unlimited Foundation is the umbrella home for The New Frontier Africa, TUF Tech Academy, and the Smiling Children Project.</p><p>Each project keeps its own public purpose and programme structure while sharing the foundation identity, <strong>Empowering Generations.</strong></p></div></div></section>
<section class="section soft-section"><div class="shell"><div class="section-head"><div><p class="eyebrow">How the work connects</p><h2>Distinct projects, one foundation.</h2></div></div>${projectCards}</div></section>
<section class="section"><div class="shell action-band"><div><p class="eyebrow">Take part</p><h2>Choose the right conversation.</h2></div><div class="hero-actions">${cta("/partner/", "Explore partnership")}${cta("/contact/", "Contact TUF", "dark")}</div></div></section>`;

const projects = `${pageHero("Projects", "The projects of TUF", "Three confirmed projects sit within The Unlimited Foundation.")}
<section class="section"><div class="shell">${projectCards}</div></section>
<section class="section soft-section"><div class="shell prose-grid"><div><p class="eyebrow">Programme structure</p><h2>Clear routes to confirmed information.</h2></div><div class="prose"><p>TNFA presents Youth &amp; Leadership and its Leadership Simulation. TUF Tech Academy is organised across Students in Tech, Women in Tech, and Older Adults in Tech.</p><p>The Smiling Children Project is confirmed; its detailed public activities are still to come.</p></div></div></section>`;

const academy = `${crumbs([{href:"/projects/",label:"Projects"},{label:"TUF Tech Academy"}])}${pageHero("TUF Project", "TUF Tech Academy", "The technology project of The Unlimited Foundation, organised across three confirmed programme pathways.", "/assets/tech-project.jpg")}
<section class="section"><div class="shell"><div class="section-head"><div><p class="eyebrow">Programme pathways</p><h2>Three audiences within the academy.</h2></div></div><div class="pathway-grid"><a href="/projects/tech-academy/students/"><span>01</span><h3>Students in Tech</h3><p>A confirmed academy pathway for students.</p></a><a href="/projects/tech-academy/women/"><span>02</span><h3>Women in Tech</h3><p>A confirmed academy pathway for women.</p></a><a href="/projects/tech-academy/older-adults/"><span>03</span><h3>Older Adults in Tech</h3><p>A confirmed academy pathway for older adults.</p></a></div></div></section>
<section class="section soft-section"><div class="shell action-band"><div><p class="eyebrow">Next step</p><h2>Ask about TUF Tech Academy.</h2></div>${cta("/contact/?type=programme&project=tech-academy", "Prepare an academy enquiry")}</div></section>`;

function programmePage(slug, title, audience, number) {
  return `${crumbs([{href:"/projects/",label:"Projects"},{href:"/projects/tech-academy/",label:"TUF Tech Academy"},{label:title}])}${pageHero("TUF Tech Academy", title, `A confirmed TUF Tech Academy pathway for ${audience}.`)}
  <section class="section"><div class="shell prose-grid"><div><p class="eyebrow">Programme pathway ${number}</p><h2>A clear place for programme information.</h2></div><div class="prose"><p>${title} is the academy’s named pathway for ${audience}. No learning areas, delivery format, eligibility rules, dates, fees, or participation outcomes are currently published.</p><p>Use the programme enquiry route to ask TUF for current information.</p>${cta(`/contact/?type=programme&project=tech-academy&programme=${slug}`, "Prepare a programme enquiry")}</div></div></section>`;
}

const smiling = `${crumbs([{href:"/projects/",label:"Projects"},{label:"Smiling Children Project"}])}${pageHero("TUF Project", "Smiling Children Project", "One of The Unlimited Foundation’s three confirmed projects.", "/assets/children-project.jpg")}
<section class="section"><div class="shell prose-grid"><div><p class="eyebrow">Project information</p><h2>Programme details coming soon.</h2></div><div class="prose"><p>No detailed public activities, participation information, reports, or documentary photography are currently published.</p><div class="hero-actions">${cta("/contact/?type=programme&project=smiling-children", "Prepare a project enquiry")}${cta("/partner/", "Discuss partnership", "dark")}</div></div></div></section>`;

const tnfa = `${crumbs([{href:"/projects/",label:"Projects"},{label:"The New Frontier Africa"}])}${pageHero("A TUF Initiative", "The New Frontier Africa", "TNFA is one of The Unlimited Foundation’s three confirmed projects.")}
<section class="section"><div class="shell project-detail-grid"><div class="project-detail-copy"><p class="lead">TNFA’s confirmed public programme structure centres on Youth &amp; Leadership.</p><div class="hierarchy"><div class="hierarchy-item"><span>Programme</span><strong>Youth &amp; Leadership</strong></div><div class="hierarchy-item nested"><span>Presented within Youth &amp; Leadership</span><strong>Leadership Simulation</strong></div></div><div class="hero-actions">${cta("/contact/?type=programme&project=tnfa", "Prepare a TNFA enquiry")}<span data-tnfa-website-slot></span></div></div><aside class="project-side-card"><img src="/assets/tnfa-logo.jpeg" width="1080" height="1080" alt="The New Frontier Africa" /><div class="side-card-body"><h2>Part of TUF</h2><p>TNFA keeps its own programme identity within The Unlimited Foundation.</p></div></aside></div></section>`;

const contact = `${pageHero("Contact", "Contact The Unlimited Foundation", "Choose an enquiry category and prepare a message for TUF.")}
<section class="section soft-section"><div class="shell contact-grid"><div class="contact-copy"><h2>Prepare your enquiry.</h2><p>This website does not send or store form entries. It prepares an email draft in your email application. Review and send the draft yourself.</p></div><form class="form-card" data-form="contact" novalidate><label>Name<input name="name" autocomplete="name" required /></label><label>Email<input name="email" type="email" autocomplete="email" required /></label><label>Phone <span>optional</span><input name="phone" type="tel" autocomplete="tel" /></label><label>Enquiry type<select name="type" required><option>General</option><option>Programme</option><option>Volunteering</option><option>Partnership</option></select></label><label class="wide">Project <span>optional</span><select name="project"><option value="">Select a project</option><option>The New Frontier Africa</option><option>TUF Tech Academy</option><option>Smiling Children Project</option></select></label><label class="wide">Academy programme <span>optional</span><select name="programme"><option value="">Select an academy programme</option><option>Students in Tech</option><option>Women in Tech</option><option>Older Adults in Tech</option></select></label><label class="wide">Message<textarea name="message" rows="6" required></textarea></label><button class="button primary wide" type="submit">Open Email Draft ${arrow}</button><p class="form-help wide">Opening a draft does not send your enquiry. This page does not retain your entries.</p><p class="form-status wide" role="status" aria-live="polite"></p></form></div></section>`;

const partner = `${pageHero("Partner with TUF", "Start a partnership conversation", "Partnership enquiries can be directed to the foundation or to one of its confirmed projects.")}
<section class="section"><div class="shell prose-grid"><div><p class="eyebrow">The next step</p><h2>Begin with a clear enquiry.</h2></div><div class="prose"><p>Use the partnership enquiry route to describe the project or foundation-level conversation you would like to have.</p>${cta("/contact/?type=partnership", "Prepare a partnership enquiry")}</div></div></section>`;

const notFound = `${pageHero("404", "Page not found", "The page you requested is not available.")}<section class="section"><div class="shell action-band"><p>Use the main navigation or return to the homepage.</p>${cta("/", "Return home")}</div></section>`;

export const pages = [
  {path:"/",title:"The Unlimited Foundation | Empowering Generations",description:"The Unlimited Foundation brings together TNFA, TUF Tech Academy, and the Smiling Children Project.",active:"home",body:home},
  {path:"/about/",title:"About | The Unlimited Foundation",description:"Learn how The Unlimited Foundation connects its three confirmed projects.",active:"about",body:about},
  {path:"/projects/",title:"Projects | The Unlimited Foundation",description:"Explore TNFA, TUF Tech Academy, and the Smiling Children Project.",active:"projects",body:projects},
  {path:"/projects/tech-academy/",title:"TUF Tech Academy | The Unlimited Foundation",description:"Explore TUF Tech Academy and its three confirmed programme pathways.",active:"projects",body:academy},
  {path:"/projects/tech-academy/students/",title:"Students in Tech | TUF Tech Academy",description:"Students in Tech is a confirmed TUF Tech Academy pathway for students.",active:"projects",body:programmePage("students","Students in Tech","students","01")},
  {path:"/projects/tech-academy/women/",title:"Women in Tech | TUF Tech Academy",description:"Women in Tech is a confirmed TUF Tech Academy pathway for women.",active:"projects",body:programmePage("women","Women in Tech","women","02")},
  {path:"/projects/tech-academy/older-adults/",title:"Older Adults in Tech | TUF Tech Academy",description:"Older Adults in Tech is a confirmed TUF Tech Academy pathway for older adults.",active:"projects",body:programmePage("older-adults","Older Adults in Tech","older adults","03")},
  {path:"/projects/smiling-children/",title:"Smiling Children Project | The Unlimited Foundation",description:"The Smiling Children Project is one of TUF’s three confirmed projects.",active:"projects",body:smiling},
  {path:"/projects/tnfa/",title:"The New Frontier Africa | The Unlimited Foundation",description:"TNFA is a TUF initiative centred on Youth & Leadership and Leadership Simulation.",active:"projects",body:tnfa},
  {path:"/contact/",title:"Contact | The Unlimited Foundation",description:"Prepare a programme, partnership, volunteering, or general enquiry for TUF.",active:"contact",body:contact},
  {path:"/partner/",title:"Become a Partner | The Unlimited Foundation",description:"Start a partnership conversation with The Unlimited Foundation.",active:"partner",body:partner},
];

export function renderPage(page, settings = {}) {
  const canonical = settings.siteUrl ? `<link rel="canonical" href="${settings.siteUrl}${page.path}" />` : "";
  return `<!doctype html><html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /><title>${page.title}</title><meta name="description" content="${page.description}" />${canonical}<link rel="icon" href="/assets/favicon.svg" /><link rel="stylesheet" href="/styles.css" />${page.path === "/" ? '<link rel="preload" as="image" href="/assets/hero-programme.jpg" fetchpriority="high" />' : ""}</head><body>${sprite}<a class="skip-link" href="#main">Skip to content</a>${header(page.active)}<main id="main">${page.body}</main>${footer()}<script>window.TUF_SITE_CONFIG=${JSON.stringify({tnfaWebsiteUrl:settings.tnfaWebsiteUrl||"",contactEmail:settings.contactEmail||""})}</script><script src="/script.js" defer></script></body></html>`;
}

export function render404(settings = {}) {
  return renderPage({path:"/404.html",title:"Page not found | The Unlimited Foundation",description:"The requested TUF page was not found.",active:"",body:notFound},settings);
}

export const legacyRedirects = {
  "/projects/tnfa.html":"/projects/tnfa/",
  "/projects/tech-academy.html":"/projects/tech-academy/",
  "/projects/smiling-children.html":"/projects/smiling-children/",
};
