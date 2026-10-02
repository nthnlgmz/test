"use client";
import { useEffect, useRef, useState } from "react";
import { ELEMENTS, COLORS, category } from "./elements";
import s from "./quiz.module.css";

const TOTAL = 6;
const TYPES = ["symbol", "name", "number"];
const nextAsk = () => TYPES[(Math.random() * TYPES.length) | 0];
const pick = () => {
  const pool = [...ELEMENTS];
  return Array.from({ length: TOTAL }, () => pool.splice((Math.random() * pool.length) | 0, 1)[0]);
};

function describe(el, ask) {
  if (ask === "symbol") return [`What is the SYMBOL for ${el.name}?`, `Atomic No. ${el.Z}`, "e.g., Na"];
  if (ask === "name") return [`What is the ELEMENT NAME of ${el.symbol}?`, `Atomic No. ${el.Z}`, "e.g., Sodium"];
  return [`What is the ATOMIC NUMBER (Z) of ${el.name} (${el.symbol})?`, "Type a number", "e.g., 11"];
}

export default function Quiz() {
  const [set, setSet] = useState([]);        // picked after mount, so server and browser HTML match
  const [shuffles, setShuffles] = useState(0);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState(null);
  const [value, setValue] = useState("");
  const inputRef = useRef(null);
  const modalRef = useRef(null);
  const timer = useRef(null);
  const shuffleSound = useRef(null);

  useEffect(() => { setSet(pick()); }, []);
  useEffect(() => () => clearTimeout(timer.current), []);

  // preload the shuffle sound (file lives in /public/shuffle.mp3)
  useEffect(() => {
    const a = new Audio("/shuffle.mp3");
    a.preload = "auto";
    shuffleSound.current = a;
    return () => { a.pause(); shuffleSound.current = null; };
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (open && q) (q.done ? modalRef : inputRef).current?.focus();
  }, [open, q?.cur, q?.done]);

  const playShuffle = () => {
    const a = shuffleSound.current;
    if (!a) return;
    a.currentTime = 0;               // restart so rapid clicks still play
    a.play().catch(() => {});        // ignore autoplay-block errors
  };

  const shuffle = () => { playShuffle(); setSet(pick()); setShuffles((n) => n + 1); };

  function start() {
    clearTimeout(timer.current);
    setQ({ order: set.map((_, i) => i), ptr: 0, score: 0, answered: 0, cur: { el: set[0], ask: nextAsk() }, fb: null, locked: false, done: false });
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
        setQ((p) => ({ ...p, cur: { el: set[p.order[p.ptr]], ask: nextAsk() }, fb: null, locked: false }));
        setValue("");
      }, 600);
    }
  }

  function skip() {
    if (!q || q.locked || q.done) return;
    const order = [...q.order, q.order[q.ptr]];   // send this question to the back of the line
    const ptr = q.ptr + 1;
    setQ({ ...q, order, ptr, cur: { el: set[order[ptr]], ask: nextAsk() }, fb: null });
    setValue("");
  }

  function onKey(e) {
    if (e.key === "Enter") { e.preventDefault(); check(); }
    if (e.key === "Escape") { e.preventDefault(); close(); }
  }

  const [text, helper, placeholder] = q
    ? q.done
      ? [`Quiz finished! Final score: ${q.score}/${TOTAL}`, "Close, then Shuffle 6 and Start quiz to try again.", ""]
      : describe(q.cur.el, q.cur.ask)
    : ["", "", ""];

  return (
    <>
      <main className={`${s.container} ${open ? s.quizOpen : ""}`}>
        <header className={s.header}>
          <div>
            <h1 className={s.title}>Periodic Table Quiz Trainer</h1>
            <p className={s.subtitle}>
              Shows 6 random elements. The quiz asks for the symbol, the element name, or the atomic number.
              Each card also shows the element’s category, with its own colour.
            </p>
          </div>
          <div className={s.controls}>
            <button className={s.btn} type="button" onClick={shuffle} title="Pick a new set of 6">Shuffle 6</button>
            <button className={`${s.btn} ${s.go}`} type="button" onClick={start} disabled={!set.length}>Start quiz</button>
          </div>
        </header>

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

      {open && q && (
        <div className={s.overlay}>
          <div className={s.modal} role="dialog" aria-modal="true" aria-labelledby="qt" tabIndex={-1} ref={modalRef} onKeyDown={onKey}>
            <div className={s.mh}>
              <h2 id="qt" className={s.mtitle}>Quiz time</h2>
              <button className={`${s.btn} ${s.small}`} type="button" onClick={close}>Close</button>
            </div>
            <div className={s.mb}>
              <div className={s.row}>
                <span className={s.pill}>{q.answered} / {TOTAL} answered</span>
                <span className={`${s.pill} ${s.lime}`}>Score: {q.score}</span>
              </div>
              <p className={s.question}>{text}</p>
              <p className={s.muted}>{helper}</p>
              {!q.done && (
                <>
                  <div className={s.field}>
                    <label className={s.sr} htmlFor="answer">Your answer</label>
                    <input
                      id="answer" ref={inputRef} className={s.input} type="text" value={value}
                      onChange={(e) => setValue(e.target.value)} placeholder={placeholder}
                      autoComplete="off" autoCapitalize="off" spellCheck={false}
                    />
                  </div>
                  <div className={s.actions}>
                    <button className={s.btn} type="button" onClick={skip} title="Move this question to the end">Skip</button>
                    <button className={`${s.btn} ${s.go}`} type="button" onClick={check}>Submit</button>
                  </div>
                </>
              )}
              {q.fb && <span className={`${s.pill} ${s.feedback} ${q.fb.ok ? s.good : s.bad}`} role="status">{q.fb.text}</span>}
            </div>
          </div>
        </div>
      )}
    </>
  );
        }
  
