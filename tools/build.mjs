import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { legacyRedirects, pages, render404, renderPage } from "./site.mjs";

const root = resolve(import.meta.dirname, "..");
const output = resolve(root, "dist");
const siteUrl = (process.env.TUF_SITE_URL || "").replace(/\/$/, "");
const settings = {
  siteUrl,
  tnfaWebsiteUrl: process.env.TUF_TNFA_URL || "",
  contactEmail: process.env.TUF_CONTACT_EMAIL || "",
};
const publishedAssets = [
  "favicon.svg", "children-project.jpg", "foundation-intro.jpg", "hero-programme.jpg",
  "tech-project.jpg", "tnfa-logo.jpeg", "tnfa-project.jpg", "tuf-logo-display.jpg",
];

function routeFile(base, route) {
  if (route === "/") return resolve(base, "index.html");
  return resolve(base, route.slice(1), "index.html");
}

await rm(output, { recursive: true, force: true });
await mkdir(resolve(output, "assets"), { recursive: true });
for (const file of ["styles.css", "script.js"]) await cp(resolve(root, file), resolve(output, file));
for (const file of publishedAssets) await cp(resolve(root, "assets", file), resolve(output, "assets", file));

for (const page of pages) {
  const file = routeFile(output, page.path);
  await mkdir(resolve(file, ".."), { recursive: true });
  await writeFile(file, renderPage(page, settings).replace(/[ \t]+$/gm, ""));
}
await writeFile(resolve(output, "404.html"), render404(settings).replace(/[ \t]+$/gm, ""));

for (const [oldPath, nextPath] of Object.entries(legacyRedirects)) {
  const file = resolve(output, oldPath.slice(1));
  await mkdir(resolve(file, ".."), { recursive: true });
  await writeFile(file, `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=${nextPath}"><title>Page moved</title>${siteUrl ? `<link rel="canonical" href="${siteUrl}${nextPath}">` : ""}</head><body><p>This page moved to <a href="${nextPath}">${nextPath}</a>.</p></body></html>`);
}

if (siteUrl) {
  const urls = pages.map((page) => `<url><loc>${siteUrl}${page.path}</loc></url>`).join("");
  await writeFile(resolve(output, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`);
  await writeFile(resolve(output, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`);
} else {
  await writeFile(resolve(output, "robots.txt"), "User-agent: *\nAllow: /\n");
  console.warn("TUF_SITE_URL is not set; canonical links and sitemap.xml were intentionally omitted.");
}

console.log(`Built ${pages.length} routes plus 404 and legacy redirects in ${output}`);
