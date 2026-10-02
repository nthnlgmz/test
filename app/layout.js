import "./globals.css";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Unbounded:wght@500;700&family=Archivo:wght@800&family=Anton&family=Outfit:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
