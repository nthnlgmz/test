export default function sitemap() {
  const site = "https://engrnathanielgomez.vercel.app";
  return [
    { url: site + "/", lastModified: new Date() },
    { url: site + "/projects/periodic-table-trainer", lastModified: new Date() },
  ];
}
