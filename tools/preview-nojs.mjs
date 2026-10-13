import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";

const root = path.resolve("dist");
const allowScripts = process.argv.includes("--allow-js");
const failImages = process.argv.includes("--fail-images");
const types = new Map([
  [".css", "text/css; charset=utf-8"], [".html", "text/html; charset=utf-8"],
  [".jpg", "image/jpeg"], [".jpeg", "image/jpeg"], [".svg", "image/svg+xml"],
]);

createServer(async (request, response) => {
  const requested = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  let target = path.resolve(root, `.${requested}`);
  if (!target.startsWith(root)) {
    response.writeHead(403).end("Forbidden");
    return;
  }
  try {
    if ((await stat(target)).isDirectory()) target = path.join(target, "index.html");
  } catch {
    target = path.join(root, "404.html");
    response.statusCode = 404;
  }
  if (failImages && [".jpg", ".jpeg", ".svg"].includes(path.extname(target))) {
    response.writeHead(404).end("Test image failure");
    return;
  }
  if (!allowScripts) response.setHeader("Content-Security-Policy", "script-src 'none'");
  response.setHeader("Content-Type", types.get(path.extname(target)) || "application/octet-stream");
  createReadStream(target).pipe(response);
}).listen(4175, "127.0.0.1", () => console.log(`Test preview: http://127.0.0.1:4175 (${allowScripts ? "JavaScript enabled" : "JavaScript blocked"}${failImages ? ", images blocked" : ""})`));
