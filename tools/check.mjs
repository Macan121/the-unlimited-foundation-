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
    if (/TNFA|New Frontier/i.test(header)) failures.push(`${file}: TNFA appears in the header`);
    if (/About TUF|Our Projects/.test(header)) failures.push(`${file}: old header label remains`);
    for (const label of ["Home", "About", "Projects", "Contact", "Become a Partner"]) if (!header.includes(label)) failures.push(`${file}: header missing ${label}`);
    for (const label of ["All Projects", "TUF Tech Academy", "Students in Tech", "Women in Tech", "Older Adults in Tech", "Smiling Children Project"]) if (!header.includes(label)) failures.push(`${file}: project navigation missing ${label}`);
  }
}

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
