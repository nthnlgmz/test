"use client";
import { useEffect, useRef, useState } from "react";

const empty = { name: "", role: "", msg: "" };

export default function Reviews() {
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const [thanks, setThanks] = useState(false);
  const [err, setErr] = useState("");
  const [f, setF] = useState(empty);
  const listRef = useRef(null);
  const nameRef = useRef(null);

  useEffect(() => {
    try { setList(JSON.parse(localStorage.getItem("reviews") || "[]")); } catch {}
  }, []);

  useEffect(() => {
    document.body.classList.toggle("form-open", open);
    if (open) { setThanks(false); nameRef.current?.focus(); }
  }, [open]);

  const on = (k) => (e) => setF({ ...f, [k]: e.target.value });

  function submit(e) {
    e.preventDefault();
    const r = { name: f.name.trim(), role: f.role.trim(), msg: f.msg.trim() };
    if (!r.name) return setErr("Add your name.");
    if (r.msg.length < 10) return setErr("Write at least a sentence.");
    const next = [...list, r];
    setList(next);
    try { localStorage.setItem("reviews", JSON.stringify(next)); } catch {}
    setF(empty); setErr(""); setOpen(false); setThanks(true);
    setTimeout(() => {
      const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
      listRef.current?.lastElementChild?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
    }, 50);
  }

  return (
    <>
      <div id="revlist" ref={listRef}>
        {list.map((r, i) => (
          <figure className="rev sm" key={i}>
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
          <div className="frow">
            <button className="btn p" type="submit">Post review</button>
            <button className="btn" type="button" onClick={() => { setOpen(false); setErr(""); }}>Cancel</button>
          </div>
          <p className="ferr" id="ferr" role="alert">{err}</p>
        </form>
        <p className="thanks" id="thanks" aria-live="polite" hidden={!thanks}>Thanks. Your review is now on the page.</p>
      </div>
    </>
  );
    }
                                                                                                                                               
