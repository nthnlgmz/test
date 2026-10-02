export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: "https://engrnathanielgomez.vercel.app/sitemap.xml",
  };
}
