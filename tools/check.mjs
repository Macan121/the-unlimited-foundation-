import { access, readFile, readdir } from "node:fs/promises";
import { dirname, extname, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const htmlFiles = [resolve(root, "index.html")];

for (const name of await readdir(resolve(root, "projects"))) {
  if (extname(name) === ".html") htmlFiles.push(resolve(root, "projects", name));
}

const failures = [];
const banned = [
  /music\s*&(?:amp;)?\s*arts/i,
  /approved wording is pending/i,
  /can be added when confirmed/i,
  /public profiles can be added/i,
  /a working story category/i,
  /the approved url can be supplied/i,
  /-&gt;/i,
  /->/,
];

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  for (const pattern of banned) {
    if (pattern.test(html)) failures.push(`${file}: banned public copy matches ${pattern}`);
  }

  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  for (const id of new Set(ids)) {
    if (ids.filter((candidate) => candidate === id).length > 1) failures.push(`${file}: duplicate id ${id}`);
  }

  for (const match of html.matchAll(/<(?:a|img|link|script)\b[^>]*?\s(?:href|src)="([^"]+)"/g)) {
    const target = match[1];
    if (/^(?:#|https?:|mailto:|tel:|data:)/.test(target)) continue;
    const path = target.split(/[?#]/)[0];
    try { await access(resolve(dirname(file), path)); } catch { failures.push(`${file}: missing local target ${target}`); }
  }

  for (const match of html.matchAll(/<img\b([^>]*)>/g)) {
    const attributes = match[1];
    if (!/\balt="[^"]*"/.test(attributes)) failures.push(`${file}: image missing alt`);
    if (!/\bwidth="\d+"/.test(attributes) || !/\bheight="\d+"/.test(attributes)) failures.push(`${file}: image missing explicit dimensions`);
  }
}

const index = await readFile(resolve(root, "index.html"), "utf8");
const projectCards = (index.match(/class="project-card"/g) || []).length;
if (projectCards !== 3) failures.push(`index.html: expected 3 project cards, found ${projectCards}`);
if (/id="(?:stories|people)"/.test(index)) failures.push("index.html: unpublished stories or people section remains");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Checked ${htmlFiles.length} HTML files: all local targets, image metadata, IDs, and public-content assertions passed.`);
}
