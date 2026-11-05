import { useEffect, useRef, useState } from "react";
import { askKaka, fallbackAnswer } from "../lib/kaka.js";
import { applyActions } from "../lib/actions.js";

export default function KakaPanel({ kb, open, setOpen, ui }) {
  const [msgs, setMsgs] = useState([{ role: "assistant", text: "Aao, chai piyo. Kya jaanna hai?" }]);
  const [busy, setBusy] = useState(false);
  const [text, setText] = useState("");
  const inputRef = useRef(null), logRef = useRef(null), fabRef = useRef(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
    const onKey = (e) => { if (e.key === "Escape" && open) setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);
  useEffect(() => { logRef.current?.scrollTo({ top: logRef.current.scrollHeight }); }, [msgs, busy]);

  async function send(raw, chipId) {
    const q = raw.trim().slice(0, 300);
    if (!q || busy) return;
    const next = [...msgs, { role: "user", text: q }];
    setMsgs(next); setText(""); setBusy(true);
    const res = (await askKaka(next)) ?? fallbackAnswer(q, chipId);
    setMsgs([...next, { role: "assistant", text: res.reply }]);
    setBusy(false);
    applyActions(res.actions, kb, ui);
  }

  if (!open)
    return (
      <button ref={fabRef} className="kaka-fab" onClick={() => setOpen(true)} aria-label="Ask Kaka, the AI chai-wala">
        <span className="steam" aria-hidden="true">☕</span> ASK KAKA
      </button>
    );

  return (
    <div className="kaka" role="dialog" aria-label="Chat with Kaka">
      <header>Kaka's Tapri <button className="btn" onClick={() => setOpen(false)} aria-label="Close chat">✕</button></header>
      <div className="log" ref={logRef} aria-live="polite">
        {msgs.map((m, i) => <p key={i} className={`msg ${m.role === "user" ? "me" : "kaka-m"}`}>{m.text}</p>)}
        {busy && <p className="msg kaka-m">Kaka chai chhaan raha hai…</p>}
      </div>
      {msgs.length < 3 && (
        <div className="chips">
          {kb.fallback.chips.map((c) => <button key={c.id} onClick={() => send(c.label, c.id)}>{c.label}</button>)}
        </div>
      )}
      <form onSubmit={(e) => { e.preventDefault(); send(text); }}>
        <label className="sr" htmlFor="kq">Your question</label>
        <input id="kq" ref={inputRef} value={text} maxLength={300} onChange={(e) => setText(e.target.value)} placeholder="Ask in English, Hinglish or मराठी" />
        <button className="btn" disabled={busy}>Send</button>
      </form>
    </div>
  );
}
