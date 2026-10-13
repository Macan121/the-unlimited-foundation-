import { cp, mkdir, rm } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const output = resolve(root, "dist");
const publishedAssets = [
  "favicon.svg",
  "children-project.jpg",
  "foundation-intro.jpg",
  "hero-programme.jpg",
  "tech-project.jpg",
  "tnfa-logo.jpeg",
  "tnfa-project.jpg",
  "tuf-logo-display.jpg",
];

await rm(output, { recursive: true, force: true });
await mkdir(resolve(output, "assets"), { recursive: true });
await mkdir(resolve(output, "projects"), { recursive: true });

for (const file of ["index.html", "styles.css", "script.js"]) {
  await cp(resolve(root, file), resolve(output, file));
}
for (const file of publishedAssets) {
  await cp(resolve(root, "assets", file), resolve(output, "assets", file));
}
await cp(resolve(root, "projects"), resolve(output, "projects"), { recursive: true });

console.log(`Built ${output}`);
