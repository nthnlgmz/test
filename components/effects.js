"use client";
import { useEffect } from "react";

// Scroll progress bar, experience-timeline focus, reveal-on-scroll, sticky CTA.
export default function Effects() {
  useEffect(() => {
    const $ = (id) => document.getElementById(id);
    const steps = [...document.querySelectorAll(".step")];
    const dot = $("dot"), box = $("steps"), rail = $("rail"), pbar = $("pbar"), prog = $("progress");

    function progress() {
      const h = document.documentElement.scrollHeight - innerHeight;
      const p = h > 0 ? Math.min(1, Math.max(0, scrollY / h)) : 0;
      pbar.style.transform = "scaleX(" + p + ")";
      prog.setAttribute("aria-valuenow", Math.round(p * 100));
    }
    function update() {
      const mid = innerHeight / 2;
      let best = steps[0], d = 1e9;
      steps.forEach((s) => {
        const r = s.querySelector(".num").getBoundingClientRect();
        const c = Math.abs(r.top + r.height / 2 - mid);
        if (c < d) { d = c; best = s; }
      });
      steps.forEach((s) => s.classList.toggle("on", s === best));
      const b = box.getBoundingClientRect();
      dot.style.left = rail.getBoundingClientRect().left - 5 + "px";
      dot.style.opacity = b.top < mid && b.bottom > mid ? 1 : 0;
      progress();
    }
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
    document.fonts && document.fonts.ready.then(update);
    update();

    const cta = $("cta"), hero = $("home"), contact = $("contact");
    let hv = true, cv = false;
    const upd = () => cta.classList.toggle("show", !hv && !cv);
    const rv = [...document.querySelectorAll(
      "main .wrap>h2,main .intro,main .tag2,main .chips.tools,main .edu,main .plist article,main .rev,main .revcta,main .contact .btns,main .contact address,main .soc"
    )];
    rv.forEach((e) => e.classList.add("rv"));

    const heroIO = new IntersectionObserver((es) => { hv = es[0].intersectionRatio > 0.6; upd(); }, { threshold: [0, 0.6] });
    const contactIO = new IntersectionObserver((es) => { cv = es[0].isIntersecting; upd(); });
    const revealIO = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); revealIO.unobserve(e.target); } }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    heroIO.observe(hero);
    contactIO.observe(contact);
    rv.forEach((e) => revealIO.observe(e));

    return () => {
      removeEventListener("scroll", update);
      removeEventListener("resize", update);
      heroIO.disconnect(); contactIO.disconnect(); revealIO.disconnect();
    };
  }, []);

  return null;
}
