"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

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
  const [done, setDone] = useState(null); // null | "live" | "pending"
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [f, setF] = useState(empty);
  const trackRef = useRef(null);
  const btnRef = useRef(null);
  const dialogRef = useRef(null);

  const slides = [first, ...list];
  const reduce = () => matchMedia("(prefers-reduced-motion:reduce)").matches;

  const openForm = () => { setDone(null); setErr(""); setOpen(true); };
  const close = () => { setOpen(false); setErr(""); };

  // While the form is open: lock the page behind it, close on Esc, restore focus after.
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    const onKey = (e) => { if (e.key === "Escape") close(); };
    addEventListener("keydown", onKey);
    return () => {
      html.style.overflow = "";
      document.body.style.overflow = "";
      removeEventListener("keydown", onKey);
      btnRef.current?.focus({ preventScroll: true });
    };
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
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Could not send your review. Please try again.");
      if (data.approved) {
        setList([...list, { name: f.name.trim(), role: f.role.trim(), msg: f.msg.trim() }]);
        setTimeout(() => trackRef.current?.scrollTo({ left: trackRef.current.scrollWidth, behavior: "auto" }), 50);
      }
      setDone(data.approved ? "live" : "pending");
      setF(empty);
    } catch (x) {
      setErr(x.message);
    }
    setBusy(false);
  }

  const modal = (
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="mh" tabIndex={-1} ref={dialogRef}>
      <button className="m-x" type="button" onClick={close} aria-label="Close">×</button>
      <div className="m-in">
        {done ? (
          <div className="m-done">
            <h2 id="mh">thanks.<span>{done === "live" ? "your review is live." : "it’ll appear once approved."}</span></h2>
            <p>{done === "live" ? "Your words are now in the slider." : "I read every review before it goes on the page."}</p>
            <button className="btn p" type="button" onClick={close}>Close</button>
          </div>
        ) : (
          <>
            <h2 id="mh">worked with me?<span>add your words here.</span></h2>
            <form id="revform" aria-label="Write a review" onSubmit={submit} noValidate>
              <label className="sr" htmlFor="rn">Your name</label>
              <input id="rn" placeholder="Your name" maxLength={40} autoComplete="name" value={f.name} onChange={on("name")} aria-describedby="ferr" />
              <label className="sr" htmlFor="rr">Role or company (optional)</label>
              <input id="rr" placeholder="Role or company (optional)" maxLength={50} autoComplete="organization-title" value={f.role} onChange={on("role")} />
              <label className="sr" htmlFor="rm">Your review</label>
              <textarea id="rm" placeholder="Write your review" maxLength={300} rows={4} value={f.msg} onChange={on("msg")} aria-describedby="ferr" />
              <input className="sr" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={f.website} onChange={on("website")} />
              <div className="frow">
                <button className="btn p" type="submit" disabled={busy}>{busy ? "Sending…" : "Post review"}</button>
                <button className="btn" type="button" onClick={close}>Cancel</button>
              </div>
              <p className="ferr" id="ferr" role="alert">{err}</p>
            </form>
          </>
        )}
      </div>
    </div>
  );

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
        <p id="revhead">worked with me?<br />add your words here.</p>
        <button className="btn p" id="revbtn" type="button" ref={btnRef} aria-haspopup="dialog" onClick={openForm}>
          Write a review →
        </button>
      </div>

      {open && createPortal(modal, document.body)}
    </>
  );
                                                                                                                    }
                                                                                                                    
