"use client";
import { useEffect, useRef, useState } from "react";
import { ELEMENTS, COLORS, category } from "./elements";
import s from "./quiz.module.css";

const COUNTS = [6, 12, 18, 24];
const KINDS = [["symbol", "Symbol"], ["name", "Name"], ["number", "Atomic number"]];

const shuffled = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0;
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const pick = (n) => shuffled(ELEMENTS).slice(0, n);
const nextAsk = (kinds) => kinds[(Math.random() * kinds.length) | 0];

function describe(el, ask) {
  if (ask === "symbol") return [`What is the SYMBOL for ${el.name}?`, `Atomic No. ${el.Z}`, "e.g., Na"];
  if (ask === "name") return [`What is the ELEMENT NAME of ${el.symbol}?`, `Atomic No. ${el.Z}`, "e.g., Sodium"];
  return [`What is the ATOMIC NUMBER (Z) of ${el.name} (${el.symbol})?`, "Type a number", "e.g., 11"];
}

export default function Quiz() {
  const [set, setSet] = useState([]);        // picked after mount, so server and browser HTML match
  const [count, setCount] = useState(6);
  const [kinds, setKinds] = useState(["symbol", "name", "number"]);
  const [shuffles, setShuffles] = useState(0);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState(null);
  const [value, setValue] = useState("");
  const inputRef = useRef(null);
  const modalRef = useRef(null);
  const timer = useRef(null);
  const controlsRef = useRef(null);
  const [showBar, setShowBar] = useState(false);   // true when the top Shuffle / Start buttons are off-screen

  useEffect(() => { setSet(pick(6)); }, []);

  useEffect(() => {
    const el = controlsRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setShowBar(!e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const dock = showBar && !open;
  useEffect(() => {
    if (!dock) return;
    document.body.style.paddingBottom = "84px";   // keeps the footer clear of the bar
    return () => { document.body.style.paddingBottom = ""; };
  }, [dock]);
  useEffect(() => () => clearTimeout(timer.current), []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (open && q) (q.done ? modalRef : inputRef).current?.focus();
  }, [open, q?.cur, q?.done]);

  const shuffle = (n = count) => { setSet(pick(n)); setShuffles((x) => x + 1); };
  const changeCount = (n) => { setCount(n); shuffle(n); };
  const toggleKind = (k) =>
    setKinds((prev) => (prev.includes(k) ? (prev.length > 1 ? prev.filter((x) => x !== k) : prev) : [...prev, k]));

  function start() {
    clearTimeout(timer.current);
    const order = shuffled(set.map((_, i) => i));   // questions come in a random order, not card order
    setQ({ order, total: order.length, ptr: 0, score: 0, answered: 0, cur: { el: set[order[0]], ask: nextAsk(kinds) }, fb: null, locked: false, done: false });
    setValue("");
    setOpen(true);
  }
  function close() { clearTimeout(timer.current); setOpen(false); }

  function check() {
    if (!q || q.locked || q.done) return;
    const { el, ask } = q.cur;
    const correct = ask === "symbol" ? el.symbol : ask === "name" ? el.name : String(el.Z);
    const ok = value.trim().toLowerCase() === correct.toLowerCase();
    const ptr = q.ptr + 1, last = ptr >= q.order.length;
    setQ({
      ...q, ptr, score: q.score + (ok ? 1 : 0), answered: q.answered + 1,
      fb: { ok, text: ok ? `✔ Correct! ${el.name} (${el.symbol})` : `✘ ${correct}` },
      locked: !last, done: last,
    });
    if (!last) {
      timer.current = setTimeout(() => {
        setQ((p) => ({ ...p, cur: { el: set[p.order[p.ptr]], ask: nextAsk(kinds) }, fb: null, locked: false }));
        setValue("");
      }, 600);
    }
  }

  function skip() {
    if (!q || q.locked || q.done) return;
    const order = [...q.order, q.order[q.ptr]];   // send this question to the back of the line
    const ptr = q.ptr + 1;
    setQ({ ...q, order, ptr, cur: { el: set[order[ptr]], ask: nextAsk(kinds) }, fb: null });
    setValue("");
  }

  function onKey(e) {
    if (e.key === "Enter") { e.preventDefault(); check(); }
    if (e.key === "Escape") { e.preventDefault(); close(); }
  }

  const [text, helper, placeholder] = q
    ? q.done
      ? [`Quiz finished! Final score: ${q.score}/${q.total}`, "Close, then Shuffle and Start quiz to try again.", ""]
      : describe(q.cur.el, q.cur.ask)
    : ["", "", ""];
  const pill = q?.fb && <span className={`${s.pill} ${q.fb.ok ? s.good : s.bad}`} role="status">{q.fb.text}</span>;

  return (
    <>
      <main className={`${s.container} ${open ? s.quizOpen : ""}`}>
        <header className={s.header}>
          <div>
            <h1 className={s.title}>Periodic Table Quiz Trainer</h1>
            <p className={s.subtitle}>
              Pick how many elements to study, shuffle them, then get quizzed on symbols, names, or atomic numbers.
              Each card shows the element’s category, with its own colour.
            </p>
          </div>
          <div className={s.controls} ref={controlsRef}>
            <button className={s.btn} type="button" onClick={() => shuffle()} title="Pick a new set">Shuffle</button>
            <button className={`${s.btn} ${s.go}`} type="button" onClick={start} disabled={!set.length}>Start quiz</button>
          </div>
        </header>

        <section className={s.settings} aria-label="Quiz settings">
          <fieldset className={s.group}>
            <legend className={s.legend}>Elements</legend>
            <div className={s.opts}>
              {COUNTS.map((n) => (
                <button key={n} type="button" className={`${s.opt} ${count === n ? s.on : ""}`} aria-pressed={count === n} onClick={() => changeCount(n)}>{n}</button>
              ))}
            </div>
          </fieldset>
          <fieldset className={s.group}>
            <legend className={s.legend}>Quiz me on</legend>
            <div className={s.opts}>
              {KINDS.map(([k, label]) => (
                <button key={k} type="button" className={`${s.opt} ${kinds.includes(k) ? s.on : ""}`} aria-pressed={kinds.includes(k)} onClick={() => toggleKind(k)}>{label}</button>
              ))}
            </div>
          </fieldset>
        </section>

        <div className={s.deck} aria-live="polite">
          {set.map((el, i) => {
            const cat = category(el);
            return (
              <article className={s.card} key={shuffles + el.symbol} style={{ "--c": COLORS[cat], "--i": i }}>
                <span className={s.num}>{el.Z}</span>
                <div className={s.symbol}>{el.symbol}</div>
                <div className={s.name}>{el.name}</div>
                <span className={s.cat}>{cat}</span>
              </article>
            );
          })}
        </div>
      </main>

      {dock && (
        <div className={s.dock} role="toolbar" aria-label="Quiz actions">
          <button className={s.btn} type="button" onClick={() => shuffle()}>Shuffle</button>
          <button className={`${s.btn} ${s.go}`} type="button" onClick={start} disabled={!set.length}>Start quiz</button>
        </div>
      )}

      {open && q && (
        <div className={s.overlay}>
          <div className={s.modal} role="dialog" aria-modal="true" aria-label="Quiz" tabIndex={-1} ref={modalRef} onKeyDown={onKey}>
            <div className={s.mh}>
              <div className={s.stats}>
                <span className={s.pill} aria-label={`${q.answered} of ${q.total} answered`}>{q.answered} / {q.total}</span>
                <span className={`${s.pill} ${s.lime}`}>Score: {q.score}</span>
              </div>
              <button className={`${s.btn} ${s.small}`} type="button" onClick={close}>Close</button>
            </div>
            <div className={s.mb}>
              <p className={s.question}>{text}</p>
              <div className={s.slot}>
                {q.done ? <>{pill}<p className={s.muted}>{helper}</p></> : pill || <p className={s.muted}>{helper}</p>}
              </div>
              {!q.done && (
                <>
                  <div className={s.field}>
                    <label className={s.sr} htmlFor="answer">Your answer</label>
                    <input
                      id="answer" ref={inputRef} className={s.input} type="text" value={value}
                      onChange={(e) => setValue(e.target.value)} placeholder={placeholder}
                      autoComplete="off" autoCapitalize="off" spellCheck={false} enterKeyHint="go"
                    />
                  </div>
                  <div className={s.actions}>
                    <button className={s.btn} type="button" onClick={skip} title="Move this question to the end">Skip</button>
                    <button className={`${s.btn} ${s.go}`} type="button" onClick={check}>Submit</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
              }
        
