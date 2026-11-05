// Whitelist: the model can only trigger these, with these targets.
export const ZONES = ["about", "skills", "projects", "contact"];

export function applyActions(actions = [], kb, ui) {
  for (const a of actions.slice(0, 1)) {
    if (a?.type === "open_project" && kb.projects.some((p) => p.id === a.id)) ui.openProject(a.id);
    else if (a?.type === "scroll_to" && ZONES.includes(a.zone)) ui.scrollTo(a.zone);
  }
}
