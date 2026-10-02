import Link from "next/link";
import { Bricolage_Grotesque } from "next/font/google";
import Quiz from "./Quiz";
import s from "./quiz.module.css";

const font = Bricolage_Grotesque({ subsets: ["latin"], variable: "--qf", display: "swap" });
const path = "/projects/periodic-table-trainer";
const assets = "/projects/periodic-table-trainer"; // files live in /public/projects/periodic-table-trainer/
const ogTitle = "Periodic Table Quiz Trainer — Learn Elements Fast";
const ogImage = { url: `${assets}/og-image.png`, width: 1200, height: 630, alt: "Periodic Table Quiz Trainer — colorful element cards" };
const title = "Periodic Table Quiz Trainer — Learn Element Symbols, Names & Atomic Numbers";
const description =
  "Interactive periodic table trainer: practice element symbols, names, and atomic numbers with a smart skip-and-answer-later quiz. Cards also show each element’s category/metal type for learning.";
 
export const metadata = {
  title,
  description,
  keywords: ["Periodic Table", "Chemistry Quiz", "Learn Elements", "Atomic Number", "Element Symbols", "Element Names", "Educational Game"],
  alternates: { canonical: path },
  icons: {
    icon: [
      { url: `${assets}/favicon.ico`, sizes: "any" },
      { url: `${assets}/favicon-32.png`, sizes: "32x32", type: "image/png" },
      { url: `${assets}/icon-512.png`, sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: `${assets}/apple-icon.png`, sizes: "180x180", type: "image/png" }],
  },
  openGraph: { type: "website", siteName: "Nathaniel Gomez", title: ogTitle, description, url: path, locale: "en_PH", images: [ogImage] },
  twitter: { card: "summary_large_image", title: ogTitle, description, images: [ogImage.url] },
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

export default function Page() {
  return (
    <div className={`${font.variable} ${s.root}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Quiz />
      <footer className={s.footer}>
        © 2025–{new Date().getFullYear()} • Vibe-coded by <Link className={s.link} href="/">Nath</Link> • <Link className={s.link} href="/#projects">← All projects</Link>
      </footer>
    </div>
  );
}
