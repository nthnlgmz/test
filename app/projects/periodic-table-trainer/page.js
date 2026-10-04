import Link from "next/link";
import { Bricolage_Grotesque } from "next/font/google";
import { ELEMENTS, COLORS, category } from "./elements";
import q from "./quiz.module.css";
import l from "./landing.module.css";

const font = Bricolage_Grotesque({ subsets: ["latin"], variable: "--qf", display: "swap" });
const path = "/projects/periodic-table-trainer";
const play = path + "/play";
const ogTitle = "Periodic Table Quiz Trainer — Learn Elements Fast";
const title = "Periodic Table Quiz Trainer — Learn Element Symbols, Names & Atomic Numbers";
const description =
  "Interactive periodic table trainer: practice element symbols, names, and atomic numbers with a smart skip-and-answer-later quiz. Cards also show each element’s category/metal type for learning.";

export const metadata = {
  title,
  description,
  keywords: ["Periodic Table", "Chemistry Quiz", "Learn Elements", "Atomic Number", "Element Symbols", "Element Names", "Educational Game"],
  alternates: { canonical: path },
  // Add the icons for this page:
  icons: {
    icon: '/projects/periodic-table-trainer/icon.png',
    apple: '/projects/periodic-table-trainer/apple-icon.png',
  },
  openGraph: { type: "website", siteName: "Nathaniel Gomez", title: ogTitle, description, url: path, locale: "en_PH" },
  twitter: { card: "summary_large_image", title: ogTitle, description },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Periodic Table Quiz Trainer",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  description: "Interactive periodic table trainer to learn element symbols, names, and atomic numbers. Cards include category/metal type.",
  author: { "@type": "Person", name: "Nathaniel Gomez", url: "https://engrnathanielgomez.vercel.app/" },
};

const preview = [26, 11, 79].map((z) => ELEMENTS[z - 1]); // Fe, Na, Au
const tilt = [-3, 2, -2];

const steps = [
  ["Pick and shuffle", "Choose 6, 12, 18, or 24 elements, and optionally a category like noble gases or halogens. Each card shows the symbol, name, atomic number, and category."],
  ["Choose your quiz", "Quiz yourself on symbols, names, atomic numbers, or any mix. Type your answer and see right away if it was correct."],
  ["Skip and come back", "Stuck on one? Skip it. It moves to the back of the line, so you still answer every question."],
];

const features = [
  ["118 elements", "The full table, from hydrogen to oganesson.", "#ffd93d"],
  ["Your set, your quiz", "Choose how many elements, which categories, and which kinds of questions. Shuffle without repeats until you have seen all 118.", "#b6f04c"],
  ["Colors that teach", "Every card is colored by its category, so you start to see how the table is organized.", "#4dd4f0"],
  ["Built for phones", "Big buttons and a full-screen quiz, so it works well on a small screen. No sign-up needed.", "#ff6b9d"],
];

const cats = ["alkali metal", "alkaline earth metal", "transition metal", "post-transition metal", "metalloid", "nonmetal", "halogen", "noble gas", "lanthanoid", "actinoid"];

export default function Landing() {
  return (
    <div className={`${font.variable} ${l.root}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className={l.nav}>
        <div className={l.navin}>
          <span className={l.brand}>Periodic Table Quiz Trainer</span>
          <Link className={`${l.btn} ${l.go} ${l.small}`} href={play}>Start practicing</Link>
        </div>
      </header>

      <main>
        <section className={`${l.wrap} ${l.hero}`} aria-labelledby="h-hero">
          <div>
            <span className={l.tag}>A web app for learning the periodic table</span>
            <h1 id="h-hero" className={l.headline}>Pick your elements. Then get quizzed on them.</h1>
            <p className={l.lead}>
              Choose how many elements to study, then quiz yourself on their symbols, names, or atomic numbers.
            </p>
            <div className={l.ctas}>
              <Link className={`${l.btn} ${l.go} ${l.big}`} href={play}>Start practicing →</Link>
              <a className={`${l.btn} ${l.big}`} href="#how">How it works</a>
            </div>
          </div>

          <div className={l.preview} aria-hidden="true">
            {preview.map((el, i) => {
              const cat = category(el);
              return (
                <article
                  key={el.symbol}
                  className={q.card}
                  style={{ "--c": COLORS[cat], "--i": i, "--r": `${tilt[i]}deg`, "--y": `${i === 1 ? 16 : 0}px` }}
                >
                  <span className={q.num}>{el.Z}</span>
                  <div className={q.symbol}>{el.symbol}</div>
                  <div className={q.name}>{el.name}</div>
                  <span className={q.cat}>{cat}</span>
                </article>
              );
            })}
          </div>
        </section>

        <section id="how" className={l.band} aria-labelledby="h-how">
          <div className={`${l.wrap} ${l.sec}`}>
            <h2 id="h-how" className={l.h2}>How it works</h2>
            <ol className={l.steps}>
              {steps.map(([t, d], i) => (
                <li className={l.step} key={t}>
                  <span className={l.n}>{i + 1}</span>
                  <h3 className={l.t}>{t}</h3>
                  <p>{d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={`${l.wrap} ${l.sec}`} aria-labelledby="h-feat">
          <h2 id="h-feat" className={l.h2}>What’s inside</h2>
          <ul className={l.feats}>
            {features.map(([t, d, c]) => (
              <li className={l.feat} key={t} style={{ "--c": c }}>
                <h3 className={l.t}>{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className={l.band} aria-labelledby="h-cat">
          <div className={`${l.wrap} ${l.sec}`}>
            <h2 id="h-cat" className={l.h2}>Every element, color-coded</h2>
            <ul className={l.chips}>
              {cats.map((c) => (
                <li className={l.chip} key={c} style={{ background: COLORS[c] }}>{c}</li>
              ))}
            </ul>
            <p className={l.note}>The card for each element shows its category in the same color, so patterns in the table start to stick.</p>
          </div>
        </section>

        <section className={`${l.wrap} ${l.ctawrap}`} aria-labelledby="h-go">
          <div className={l.cta}>
            <h2 id="h-go" className={l.h2}>Shuffle. Quiz. Repeat.</h2>
            <Link className={`${l.btn} ${l.go} ${l.big}`} href={play}>Start practicing →</Link>
          </div>
        </section>
      </main>

      <footer className={l.footer}>
        © 2025–{new Date().getFullYear()} • Vibe-coded by <Link className={l.link} href="/">Nath</Link> • <Link className={l.link} href="/#projects">← All projects</Link>
      </footer>
    </div>
  );
              }
            
