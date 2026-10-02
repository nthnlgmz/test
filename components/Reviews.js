"use client";
import { useEffect, useRef, useState } from "react";

const empty = { name: "", role: "", msg: "", website: "" };

export default function Reviews({ initial = [] }) {
  const [list, setList] = useState(initial);
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [f, setF] = useState(empty);
  const nameRef = useRef(null);

  useEffect(() => {
    document.body.classList.toggle("form-open", open);
    if (open) { setNote(""); nameRef.current?.focus(); }
  }, [open]);

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
      if (data.approved) setList([...list, { name: f.name.trim(), role: f.role.trim(), msg: f.msg.trim() }]);
      setNote(data.approved ? "Thanks. Your review is now on the page." : "Thanks. Your review will appear once it’s approved.");
      setF(empty); setOpen(false);
    } catch (x) {
      setErr(x.message);
    }
    setBusy(false);
  }

  return (
    <>
      <div id="revlist">
        {list.map((r, i) => (
          <figure className="rev sm" key={r.id ?? i}>
            <blockquote><p>{"\u201C" + r.msg + "\u201D"}</p></blockquote>
            <figcaption>{r.name + (r.role ? ", " + r.role : "")}</figcaption>
          </figure>
        ))}
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
