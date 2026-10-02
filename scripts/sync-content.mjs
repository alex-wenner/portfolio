// Copies Researcher's draft content into the site, keeping the site's own Project type.
import { readFileSync, writeFileSync } from "node:fs";

const src = readFileSync(process.argv[2] ?? "/workspace/portfolio/content/projects.draft.ts", "utf8");
const body = src.slice(src.indexOf("export const projects"));
if (!body.startsWith("export const projects")) throw new Error("draft has no `export const projects`");
writeFileSync(
  new URL("../web/src/content/projects.ts", import.meta.url),
  `// Synced from /workspace/portfolio/content/projects.draft.ts (Researcher). Edit there, then run \`npm run sync:content\`.\nimport type { Project } from "./types";\n\n${body}`,
);
console.log("synced projects.ts");
