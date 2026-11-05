import kb from "../data/knowledge.json";

const API = import.meta.env.VITE_KAKA_API;

export async function askKaka(messages) {
  if (!API) return null;
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 8000);
  try {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: messages.slice(-6).map((m) => ({ role: m.role, text: m.text.slice(0, 300) })) }),
      signal: ctrl.signal,
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.fallback || !data.reply ? null : data;
  } catch {
    return null;
  } finally {
    clearTimeout(t);
  }
}

export function fallbackAnswer(text, chipId) {
  const { chips, default: dflt } = kb.fallback;
  const q = text.toLowerCase();
  const hit = chips.find((c) => c.id === chipId) ?? chips.find((c) => c.keywords.some((k) => q.includes(k)));
  return hit ? { reply: hit.reply, actions: hit.actions } : { reply: dflt, actions: [{ type: "scroll_to", zone: "contact" }] };
}
