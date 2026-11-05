import { copyFileSync, mkdirSync, readFileSync } from "fs";
const src = "knowledge.json";
const kb = JSON.parse(readFileSync(src, "utf8"));
const ids = new Set(kb.projects.map((p) => p.id));
for (const c of kb.fallback.chips)
  for (const a of c.actions ?? [])
    if (a.type === "open_project" && !ids.has(a.id)) throw new Error(`Fallback chip "${c.id}" references unknown project "${a.id}"`);
mkdirSync("src/data", { recursive: true });
copyFileSync(src, "src/data/knowledge.json");
copyFileSync(src, "backend/kaka/knowledge.json");
console.log("knowledge.json validated and synced");
