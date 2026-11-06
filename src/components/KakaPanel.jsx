import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { askKaka, fallbackAnswer } from "../lib/kaka.js";
import { applyActions } from "../lib/actions.js";
import { useReducedMotion } from "../lib/motionPrefs.js";
import kakaAvatar from "../assets/kaka.webp";
import ChaiGlass from "./ChaiGlass.jsx";

export default function KakaPanel({ kb, open, setOpen, ui }) {
  const [msgs, setMsgs] = useState([{ role: "assistant", text: "Aao, chai piyo. Kya jaanna hai? Chips dabaa, ya About / Skills / Projects pe jao." }]);
  const [busy, setBusy] = useState(false);
  const [text, setText] = useState("");
  const inputRef = useRef(null), logRef = useRef(null), fabRef = useRef(null), panelRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    } else {
      fabRef.current?.focus();
    }

    const onKey = (e) => {
      if (!open) return;
      if (e.key === "Escape") {
        setOpen(false);
      } else if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);
  useEffect(() => { logRef.current?.scrollTo({ top: logRef.current.scrollHeight }); }, [msgs, busy]);

  async function send(raw, chipId) {
    const q = raw.trim().slice(0, 300);
    if (!q || busy) return;
    const next = [...msgs, { role: "user", text: q }];
    setMsgs(next); setText(""); setBusy(true);
    const res = await askKaka(next);
    const payload = res?.ok ? res : fallbackAnswer(q, chipId, res?.reason);
    const reply = typeof payload?.reply === "string" && payload.reply
      ? payload.reply
      : kb.fallback.default;
    setMsgs([...next, { role: "assistant", text: reply }]);
    setBusy(false);
    applyActions(payload?.actions, kb, ui);
  }

  const panelMotion = reduced
    ? { initial: false, animate: { opacity: 1 }, exit: { opacity: 1 } }
    : {
        initial: { opacity: 0, y: 28, scale: 0.92, rotate: -1.5 },
        animate: { opacity: 1, y: 0, scale: 1, rotate: 0 },
        exit: { opacity: 0, y: 16, scale: 0.96 },
        transition: { type: "spring", stiffness: 380, damping: 22 },
      };

  return (
    <AnimatePresence mode="wait">
      {!open ? (
        <div className="kaka-fab-wrap">
          <p className="kaka-hint" aria-hidden="true">
            Aao, chai piyo
          </p>
          <motion.button
            key="fab"
            ref={fabRef}
            className="kaka-fab"
            onClick={() => setOpen(true)}
            aria-label="Ask Kaka, the AI chai-wala. Hint: tap this button."
            initial={reduced ? false : { opacity: 0, y: 18, scale: 0.9, rotate: -8 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: -6 }}
            exit={reduced ? undefined : { opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 420, damping: 20 }}
          >
            <ChaiGlass className="chai-glass-icon" /> ASK KAKA
          </motion.button>
        </div>
      ) : (
        <motion.div
          key="panel"
          ref={panelRef}
          className="kaka kaka-shell"
          role="dialog"
          aria-modal="true"
          aria-label="Chat with Kaka"
          {...panelMotion}
        >
          <header>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <img src={kakaAvatar} alt="Kaka the chai-wala" width="32" height="32" loading="lazy" style={{ width: "32px", height: "32px", borderRadius: "50%", objectFit: "cover", border: "2px solid var(--ink)" }} />
              <span>Kaka's Tapri</span>
            </div>
            <button className="btn" onClick={() => setOpen(false)} aria-label="Close chat">✕</button>
          </header>
          <div className="log" ref={logRef} aria-live="polite">
            {msgs.map((m, i) => (
              <motion.p
                key={i}
                className={`msg ${m.role === "user" ? "me" : "kaka-m"}`}
                initial={reduced ? false : { opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 420, damping: 24 }}
              >
                {m.text}
              </motion.p>
            ))}
            {busy && (
              <p className="msg kaka-m typing-row">
                <span className="typing-dots" aria-hidden="true">
                  <i /><i /><i />
                </span>
                <span>Kaka chai chhaan raha hai…</span>
              </p>
            )}
          </div>
          <div className="chips">
            {kb.fallback.chips.map((c, i) => (
              <motion.button
                key={c.id}
                type="button"
                onClick={() => send(c.label, c.id)}
                initial={reduced ? false : { opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={reduced ? undefined : { y: -2, scale: 1.04 }}
                whileTap={reduced ? undefined : { scale: 0.96 }}
                transition={{ delay: reduced ? 0 : 0.06 * i, type: "spring", stiffness: 400, damping: 18 }}
              >
                {c.label}
              </motion.button>
            ))}
          </div>
          <form onSubmit={(e) => { e.preventDefault(); send(text); }}>
            <label className="sr" htmlFor="kq">Your question</label>
            <input id="kq" ref={inputRef} value={text} maxLength={300} onChange={(e) => setText(e.target.value)} placeholder="Ask in English, Hinglish or मराठी" />
            <button className="btn" type="submit" disabled={busy}>Send</button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
