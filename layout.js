import { Bricolage_Grotesque, Newsreader } from "next/font/google";
import "./globals.css";

const sans = Bricolage_Grotesque({ subsets: ["latin"], variable: "--sans" });
const serif = Newsreader({ subsets: ["latin"], variable: "--serif", style: ["normal", "italic"] });

export const metadata = {
  title: "Tidemark — tide times for people who walk the shore",
  description: "A dummy landing page built with Next.js.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
