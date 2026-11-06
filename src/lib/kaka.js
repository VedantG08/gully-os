import kb from "../data/knowledge.json";

const API = import.meta.env.VITE_KAKA_API;

export async function askKaka(messages) {
  if (!API) return { ok: false, reason: "offline" };
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 5000);
  try {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: messages.slice(-6).map((m) => ({ role: m.role, text: m.text.slice(0, 300) })) }),
      signal: ctrl.signal,
    });
    if (res.status === 429) return { ok: false, reason: "rate" };
    if (!res.ok) return { ok: false, reason: "down" };
    const data = await res.json();
    if (data?.fallback || !data?.reply) return { ok: false, reason: "down" };
    return { ok: true, reply: data.reply, actions: data.actions };
  } catch (err) {
    const timedOut = err?.name === "AbortError";
    return { ok: false, reason: timedOut ? "timeout" : "down" };
  } finally {
    clearTimeout(t);
  }
}

export function fallbackAnswer(text, chipId, reason) {
  const fb = kb.fallback;
  const q = text.toLowerCase();
  const hit = fb.chips.find((c) => c.id === chipId) ?? fb.chips.find((c) => c.keywords.some((k) => q.includes(k)));
  if (hit) return { reply: hit.reply, actions: hit.actions };

  const byReason = {
    timeout: fb.timeout,
    rate: fb.rate,
    offline: fb.offline,
    down: fb.down,
  };
  const reply = byReason[reason] || fb.default;
  return { reply, actions: [{ type: "scroll_to", zone: "projects" }] };
}
