import Link from "next/link";
import { Bricolage_Grotesque } from "next/font/google";
import Quiz from "../Quiz";
import s from "../quiz.module.css";

const font = Bricolage_Grotesque({ subsets: ["latin"], variable: "--qf", display: "swap" });
const home = "/projects/periodic-table-trainer";

export const metadata = {
  title: "Play — Periodic Table Quiz Trainer",
  description: "Six random elements, then a short quiz on element symbols, names, and atomic numbers.",
  alternates: { canonical: home + "/play" },
};

// Android Chrome: shrink the page when the keyboard opens, so the quiz stays fully visible above it.
export const viewport = { interactiveWidget: "resizes-content" };

export default function Play() {
  return (
    <div className={`${font.variable} ${s.root}`}>
      <Quiz />
      <footer className={s.footer}>
        © 2025–{new Date().getFullYear()} • Vibe-coded by <Link className={s.link} href="/">Nath</Link> •{" "}
        <Link className={s.link} href={home}>← About this trainer</Link> • <Link className={s.link} href="/#projects">All projects</Link>
      </footer>
    </div>
  );
}
