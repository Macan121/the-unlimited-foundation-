import { access, readFile, readdir } from "node:fs/promises";
import { dirname, extname, resolve } from "node:path";
import { routePaths } from "./site.mjs";

const root = resolve(import.meta.dirname, "..");
const output = resolve(root, "dist");
const failures = [];

async function walk(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = resolve(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else files.push(path);
  }
  return files;
}

function localTarget(fromFile, value) {
  const path = value.split(/[?#]/)[0];
  if (path.startsWith("/")) {
    if (extname(path)) return resolve(output, path.slice(1));
    return path === "/" ? resolve(output, "index.html") : resolve(output, path.slice(1), "index.html");
  }
  return resolve(dirname(fromFile), path);
}

const htmlFiles = (await walk(output)).filter((file) => extname(file) === ".html");
const banned = [/music\s*&(?:amp;)?\s*arts/i, /four (?:projects|areas)/i, /-&gt;/i, /->/];

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  const redirect = /Page moved/.test(html);
  for (const pattern of banned) if (pattern.test(html)) failures.push(`${file}: banned public content ${pattern}`);
  if (!/<title>[^<]+<\/title>/.test(html)) failures.push(`${file}: missing title`);
  if (!/<meta name="description" content="[^"]+"/.test(html) && !redirect) failures.push(`${file}: missing meta description`);
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  for (const id of new Set(ids)) if (ids.filter((candidate) => candidate === id).length > 1) failures.push(`${file}: duplicate id ${id}`);

  for (const match of html.matchAll(/<(?:a|img|link|script)\b[^>]*?\s(?:href|src)="([^"]+)"/g)) {
    const target = match[1];
    if (/^(?:#|https?:|mailto:|tel:|data:)/.test(target) || !target.split(/[?#]/)[0]) continue;
    try { await access(localTarget(file, target)); } catch { failures.push(`${file}: missing local target ${target}`); }
  }
  for (const match of html.matchAll(/<img\b([^>]*)>/g)) {
    if (!/\balt="[^"]*"/.test(match[1])) failures.push(`${file}: image missing alt`);
    if (!/\bwidth="\d+"/.test(match[1]) || !/\bheight="\d+"/.test(match[1])) failures.push(`${file}: image missing dimensions`);
  }

  if (!redirect) {
    const header = html.match(/<header\b[\s\S]*?<\/header>/)?.[0] || "";
    const tnfaMenuLinks = header.match(/href="\/projects\/tnfa\/"/g)?.length || 0;
    if (tnfaMenuLinks !== 2) failures.push(`${file}: TNFA must appear once in each Projects menu and nowhere else in the header`);
    const desktopMenu = header.match(/class="project-dropdown"[\s\S]*?<\/div>/)?.[0] || "";
    const mobileMenu = header.match(/class="mobile-project-links"[\s\S]*?<\/div>/)?.[0] || "";
    for (const [name, menu] of [["desktop", desktopMenu], ["mobile", mobileMenu]]) {
      if (!menu.includes('href="/projects/tnfa/"')) failures.push(`${file}: ${name} Projects menu missing TNFA`);
      if (menu.indexOf('href="/projects/tnfa/"') > menu.indexOf('href="/projects/"')) failures.push(`${file}: TNFA is not first in the ${name} Projects menu`);
    }
    if (/About TUF|Our Projects/.test(header)) failures.push(`${file}: old header label remains`);
    for (const label of ["Home", "About", "Projects", "Contact", "Become a Partner"]) if (!header.includes(label)) failures.push(`${file}: header missing ${label}`);
    for (const label of ["The New Frontier Africa", "All Projects", "TUF Tech Academy", "Students in Tech", "Women in Tech", "Older Adults in Tech", "Smiling Children Project"]) if (!header.includes(label)) failures.push(`${file}: project navigation missing ${label}`);
    for (const contactHref of ["mailto:theunlimitedfoundationsl@gmail.com", "tel:+232880563", "tel:+23278003621"]) if (!html.includes(`href="${contactHref}"`)) failures.push(`${file}: footer missing ${contactHref}`);
  }
}

const tnfaHtml = await readFile(resolve(output, "projects", "tnfa", "index.html"), "utf8");
if (!tnfaHtml.includes('href="https://tnfa.vercel.app"')) failures.push("TNFA page missing dedicated website link");
const contactHtml = await readFile(resolve(output, "contact", "index.html"), "utf8");
if (!contactHtml.includes('"contactEmail":"theunlimitedfoundationsl@gmail.com"')) failures.push("contact form is missing the default recipient");

for (const route of routePaths) {
  const file = route === "/" ? resolve(output, "index.html") : resolve(output, route.slice(1), "index.html");
  try { await access(file); } catch { failures.push(`missing route ${route}`); }
}
for (const required of ["404.html", "robots.txt"]) {
  try { await access(resolve(output, required)); } catch { failures.push(`missing ${required}`); }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Checked ${htmlFiles.length} HTML files and ${routePaths.length} routes: navigation, links, metadata, images, 404, and public-content assertions passed.`);
}
