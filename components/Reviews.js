"use client";
import { useEffect, useRef, useState } from "react";

const empty = { name: "", role: "", msg: "", website: "" };

const first = {
  name: "Rene Camacho",
  role: "Client",
  msg: "Professional, attentive to detail, and brought the vision to life. The site looks fantastic and runs smoothly, and it’s already attracting more visitors.",
};

export default function Reviews({ initial = [] }) {
  const [list, setList] = useState(initial);
  const [idx, setIdx] = useState(0);
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [f, setF] = useState(empty);
  const nameRef = useRef(null);
  const trackRef = useRef(null);

  const slides = [first, ...list];
  const reduce = () => matchMedia("(prefers-reduced-motion:reduce)").matches;

  useEffect(() => {
    document.body.classList.toggle("form-open", open);
    if (open) { setNote(""); nameRef.current?.focus(); }
  }, [open]);

  const go = (dir) => {
    const t = trackRef.current;
    if (t) t.scrollBy({ left: dir * t.clientWidth, behavior: reduce() ? "auto" : "smooth" });
  };
  const onScroll = (e) => {
    const t = e.currentTarget;
    setIdx(Math.round(t.scrollLeft / t.clientWidth));
  };

  const on = (k) => (e) => setF({ ...f, [k]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    if (!f.name.trim()) return setErr("Add your name.");
    if (f.msg.trim().length < 10) return setErr("Write at least a sentence.");
    setBusy(true); setErr("");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(f),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      if (data.approved) {
        setList([...list, { name: f.name.trim(), role: f.role.trim(), msg: f.msg.trim() }]);
        setTimeout(() => trackRef.current?.scrollTo({ left: trackRef.current.scrollWidth, behavior: reduce() ? "auto" : "smooth" }), 50);
      }
      setNote(data.approved ? "Thanks. Your review is now on the page." : "Thanks. Your review will appear once it’s approved.");
      setF(empty); setOpen(false);
    } catch (x) {
      setErr(x.message);
    }
    setBusy(false);
  }

  return (
    <>
      <div className="slider">
        <div className="track" ref={trackRef} onScroll={onScroll} tabIndex={0} role="region" aria-label="Client reviews">
          {slides.map((r, i) => (
            <figure className="rev" key={r.id ?? i} role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${slides.length}`}>
              <blockquote><p>{"\u201C" + r.msg + "\u201D"}</p></blockquote>
              <figcaption>{r.name + (r.role ? ", " + r.role : "")}</figcaption>
            </figure>
          ))}
        </div>
        {slides.length > 1 && (
          <div className="sl-ctl">
            <button type="button" onClick={() => go(-1)} disabled={idx <= 0} aria-label="Previous review">←</button>
            <span aria-live="polite">{idx + 1} / {slides.length}</span>
            <button type="button" onClick={() => go(1)} disabled={idx >= slides.length - 1} aria-label="Next review">→</button>
          </div>
        )}
      </div>

      <div className="revcta">
        {!open && <p id="revhead">worked with me?<br />add your words here.</p>}
        {!open && (
          <button className="btn p" id="revbtn" type="button" aria-expanded="false" aria-controls="revform" onClick={() => setOpen(true)}>
            Write a review →
          </button>
        )}
        <form id="revform" aria-label="Write a review" hidden={!open} onSubmit={submit} noValidate>
          <label className="sr" htmlFor="rn">Your name</label>
          <input id="rn" ref={nameRef} placeholder="Your name" maxLength={40} autoComplete="name" value={f.name} onChange={on("name")} aria-describedby="ferr" />
          <label className="sr" htmlFor="rr">Role or company (optional)</label>
          <input id="rr" placeholder="Role or company (optional)" maxLength={50} autoComplete="organization-title" value={f.role} onChange={on("role")} />
          <label className="sr" htmlFor="rm">Your review</label>
          <textarea id="rm" placeholder="Write your review" maxLength={300} rows={4} value={f.msg} onChange={on("msg")} aria-describedby="ferr" />
          <input className="sr" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={f.website} onChange={on("website")} />
          <div className="frow">
            <button className="btn p" type="submit" disabled={busy}>{busy ? "Posting…" : "Post review"}</button>
            <button className="btn" type="button" onClick={() => { setOpen(false); setErr(""); }}>Cancel</button>
          </div>
          <p className="ferr" id="ferr" role="alert">{err}</p>
        </form>
        <p className="thanks" id="thanks" aria-live="polite" hidden={!note}>{note}</p>
      </div>
    </>
  );
}
