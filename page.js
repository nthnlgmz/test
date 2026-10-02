const features = [
  ["Walk windows", "Tells you when the beach is walkable, not just when the tide is low."],
  ["Cut-off warnings", "Get a heads-up before the causeway or rocks you crossed are cut off."],
  ["Works offline", "Tide tables download once, so it still works with no signal on the coast."],
];

const plans = [
  { name: "Free", price: "$0", note: "One saved beach", items: ["Today's tides", "Walk windows"] },
  { name: "Tidemark+", price: "$3/mo", note: "Unlimited beaches", items: ["Cut-off warnings", "Offline tables", "Widgets"] },
];

export default function Home() {
  return (
    <main>
      <header className="nav">
        <strong>Tidemark</strong>
        <nav>
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a className="btn small" href="#get">Get the app</a>
        </nav>
      </header>

      <section className="hero">
        <div>
          <h1>Know when the sea<br />gives you the shore.</h1>
          <p className="lead">
            Tidemark shows tides as a simple curve and marks the hours when the
            beach is safe to walk. No charts to decode.
          </p>
          <a className="btn" id="get" href="#">Download for iPhone</a>
          <a className="link" href="#features">See how it works</a>
        </div>

        <figure className="tide" aria-label="Sample tide curve for today">
          <svg viewBox="0 0 400 220" role="img">
            <path d="M0 150 C 60 40, 120 40, 200 120 S 340 200, 400 80 L400 220 L0 220Z" fill="var(--foam-deep)" />
            <path d="M0 150 C 60 40, 120 40, 200 120 S 340 200, 400 80" fill="none" stroke="var(--sea)" strokeWidth="3" />
            <line x1="262" y1="20" x2="262" y2="220" stroke="var(--buoy)" strokeWidth="2" strokeDasharray="4 5" />
            <circle cx="262" cy="166" r="7" fill="var(--buoy)" />
          </svg>
          <figcaption>
            <b>Next low tide 4:12 pm</b>
            <span>Safe to walk until 5:40 pm</span>
          </figcaption>
        </figure>
      </section>

      <section id="features" className="section">
        <h2>Built for the walk, not the spreadsheet</h2>
        <dl className="features">
          {features.map(([t, d]) => (
            <div key={t}>
              <dt>{t}</dt>
              <dd>{d}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="pricing" className="section">
        <h2>Pricing</h2>
        <div className="plans">
          {plans.map((p) => (
            <div key={p.name} className={`plan ${p.name !== "Free" ? "featured" : ""}`}>
              <h3>{p.name}</h3>
              <p className="price">{p.price}</p>
              <p className="note">{p.note}</p>
              <ul>{p.items.map((i) => <li key={i}>{i}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <p>Check your next walk before you leave the house.</p>
        <a className="btn" href="#get">Download Tidemark</a>
        <small>© 2026 Tidemark. Dummy content for demo purposes.</small>
      </footer>
    </main>
  );
}
