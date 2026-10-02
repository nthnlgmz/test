import { Unbounded, Archivo, Anton, Outfit } from "next/font/google";
import "./globals.css";

const unbounded = Unbounded({ subsets: ["latin"], weight: ["500", "700"], display: "swap", variable: "--font-unbounded" });
const archivo = Archivo({ subsets: ["latin"], weight: ["800"], display: "swap", variable: "--font-archivo" });
const anton = Anton({ subsets: ["latin"], weight: ["400"], display: "swap", variable: "--font-anton" });
const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500"], display: "swap", variable: "--font-outfit" });

const title = "Nathaniel Gomez | Mechatronics Engineer, Batangas";
const description = "Smart systems that solve everyday problems: ESP32 hardware, client websites, and PLC and process work.";
const url = "https://nthnlgmz.github.io/portfolio/";

export const metadata = {
  title,
  description: "Nathaniel Gomez is a mechatronics engineer in Batangas, Philippines. See his ESP32 hardware builds, client websites, and PLC and process experience.",
  authors: [{ name: "Nathaniel Gomez" }],
  robots: { index: true, follow: true, "max-image-preview": "large" },
  alternates: { canonical: url },
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%231a1716'/%3E%3Ccircle cx='32' cy='32' r='11' fill='%23a90000'/%3E%3C/svg%3E",
  },
  openGraph: { type: "website", siteName: "Nathaniel Gomez", title, description, url, locale: "en_PH" },
  twitter: { card: "summary", title, description },
};

export const viewport = { themeColor: "#1a1716", viewportFit: "cover" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${unbounded.variable} ${archivo.variable} ${anton.variable} ${outfit.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
