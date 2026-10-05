import Link from "next/link";
import Effects from "../components/Effects";
import Reviews from "../components/Reviews";
import { getReviews } from "../lib/reviews";

export const revalidate = 60;

const CALL = "https://calendly.com/engr-nathanielgomez/30min";
const EMAIL = "nthnlgmz08@gmail.com";
const ext = { target: "_blank", rel: "noopener noreferrer" };

const tools = ["C++", "Arduino", "ESP32", "PLC", "HTML", "CSS", "JavaScript", "Process control", "Occupational safety"];

const projects = [
  { title: "Fundy's Spread", desc: "A product website for a gourmet cheese palaman brand, with flavors, shop links and booth schedules.", chips: ["Next.js", "Supabase"], href: "https://fundys-spread.vercel.app/", go: "Visit site ↗", label: "Fundy's Spread: visit site (opens in new tab)" },
  { title: "Anilao Diving & Photography", desc: "A diving website for a client, live and drawing more visitors.", chips: ["PHP", "Tailwind", "JS", "SQL"], href: "https://www.anilaodivingandphotography.com/", go: "Visit site ↗", label: "Anilao Diving & Photography: visit site (opens in new tab)" },
  { title: "Periodic Table Quiz Trainer", desc: "An interactive quiz app that helps learners memorize the periodic table.", chips: ["Next.js"], href: "/projects/periodic-table-trainer", internal: true, go: "Try it →", label: "Periodic Table Quiz Trainer: try it" },
];

const jobs = [
  { n: "01", title: "PLC Operator", org: "Golden Bay Grain Terminal Corporation", from: ["2026-02", "Feb 2026"], to: ["2026-09", "Sep 2026"] },
  { n: "02", title: "Process Specialist", org: "Monde Nissin Corporation (Malvar Plant)", from: ["2024-11", "Nov 2024"], to: ["2025-08", "Aug 2025"] },
];

const socials = [
  ["LinkedIn", "https://www.linkedin.com/in/nthnlgmz"],
  ["GitHub", "https://github.com/nthnlgmz"],
  ["Facebook", "https://www.facebook.com/share/1BPn3HZHZ2/"],
];

const person = {
  "@type": "Person",
  name: "Nathaniel Gomez",
  jobTitle: "Mechatronics Engineer",
  url: "https://engrnathanielgomez.vercel.app/",
  email: "mailto:" + EMAIL,
  address: { "@type": "PostalAddress", addressRegion: "Batangas", addressCountry: "PH" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Batangas State University, The National Engineering University" },
  knowsAbout: ["Mechatronics", "ESP32", "Arduino", "PLC", "Web development", "Process control", "Occupational safety"],
  sameAs: socials.map((s) => s[1]),
};

const jsonLd = { "@context": "https://schema.org", "@type": "ProfilePage", mainEntity: person };

function ProjectBody({ p }) {
  return (
    <>
      <h3>{p.title}</h3>
      <p>{p.desc}</p>
      <ul className="chips" aria-label="Built with">
        {p.chips.map((c) => <li className="chip" key={c}>{c}</li>)}
      </ul>
      {p.go && <div className="go">{p.go}</div>}
    </>
  );
}

export default async function Home() {
  const reviews = await getReviews();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Effects />
      <a className="skip" href="#main">Skip to main content</a>
      <div className="progress" id="progress" role="progressbar" aria-label="Page scroll progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={0}>
        <span id="pbar"></span>
      </div>

      <header className="dark" id="home" aria-labelledby="h-hero">
        <div className="wrap hero">
          <div className="bar"><div><b>01</b> / PORTFOLIO</div><div>Mechatronics Engineer</div></div>
          <div className="ghost" aria-hidden="true">ENG</div>
          <div>
            <h1 id="h-hero">i build smart systems<span>that solve everyday problems.</span></h1>
            <p className="name">Nathaniel Gomez <i>· BOSH SO2 · Batangas, Philippines</i></p>
            <div className="btns">
              <a className="btn p" href={CALL} {...ext} aria-label="Let’s talk: book a call (opens in new tab)">Let’s talk →</a>
              <a className="btn" href={"mailto:" + EMAIL} aria-label="Send Nathaniel an email">Send email</a>
              <a className="btn" href="https://drive.google.com/file/d/18kB2OIFIKPfCXd14O782XRYXWOsaj-Er/view?usp=drivesdk" {...ext} aria-label="View resume (opens in new tab)">View resume</a>
            </div>
          </div>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        <section className="light" id="about" aria-labelledby="h-about">
          <div className="wrap">
            <div className="bar"><div><b>02</b> / ABOUT</div><div>Hardware &amp; Software</div></div>
            <h2 id="h-about">hardware meets software.<span>ideas become prototypes.</span></h2>
            <div className="intro">
              <p>Mechatronics Engineering graduate building practical solutions where hardware and software meet.</p>
              <p>I enjoy Arduino and ESP32, web development, and turning ideas into working prototypes.</p>
            </div>
            <p className="tag2" id="h-tools">Tools</p>
            <ul className="chips tools" aria-labelledby="h-tools">
              {tools.map((t) => <li className="chip" key={t}>{t}</li>)}
            </ul>
            <div className="edu">
              <p className="tag">Education</p>
              <h3>BS in mechatronics engineering</h3>
              <p className="lead">Batangas State University, The National Engineering University (Alangilan).</p>
              <p className="more"><time dateTime="2020-08">Aug 2020</time> to <time dateTime="2024-07">Jul 2024</time>.</p>
            </div>
            <div className="edu">
              <p className="tag">Certification</p>
              <h3>BOSH SO2</h3>
              <p className="lead">Mastery Consultancy-OPC.</p>
              <p className="more"><a href="https://drive.google.com/file/d/1DbCnfKrJVt66ICPHRnO7-xwJ9t8LbV9i/view?usp=drivesdk" {...ext} aria-label="View BOSH SO2 credential (opens in new tab)">View credential ↗</a></p>
            </div>
          </div>
        </section>

        <section className="dark" id="projects" aria-labelledby="h-projects">
          <div className="wrap">
            <div className="bar"><div><b>03</b> / PROJECTS</div><div>Web &amp; Hardware</div></div>
            <div className="ghost" aria-hidden="true" style={{ top: "6%" }}>PRO</div>
            <h2 id="h-projects" style={{ marginTop: "8vh", position: "relative", zIndex: 1 }}>work that runs.<span>on screens and on benches.</span></h2>
            <div className="plist">
              {projects.map((p) =>
                p.href ? (
                  <article key={p.title}>
                    {p.internal ? (
                      <Link className="proj" href={p.href} aria-label={p.label}><ProjectBody p={p} /></Link>
                    ) : (
                      <a className="proj" href={p.href} {...ext} aria-label={p.label}><ProjectBody p={p} /></a>
                    )}
                  </article>
                ) : (
                  <article className="proj" key={p.title}><ProjectBody p={p} /></article>
                )
              )}
            </div>
          </div>
        </section>

        <section className="light" id="experience" aria-labelledby="h-exp">
          <div className="wrap">
            <div className="bar"><div><b>04</b> / EXPERIENCE</div><div>Industrial &amp; Process</div></div>
            <h2 id="h-exp">where i’ve worked.<span>on real plants, real lines.</span></h2>
            <div className="steps" id="steps">
              <div className="rail" id="rail" aria-hidden="true"></div>
              <div className="dot" id="dot" aria-hidden="true"></div>
              <ol role="list" aria-label="Work experience, most recent first">
                {jobs.map((j) => (
                  <li className="step" key={j.n}>
                    <div className="num" aria-hidden="true">{j.n}</div>
                    <div>
                      <h3>{j.title}</h3>
                      <p className="lead">{j.org}</p>
                      <p className="more">
                        <time dateTime={j.from[0]}>{j.from[1]}</time>
                        {" to "}
                        {j.to ? <><time dateTime={j.to[0]}>{j.to[1]}</time>.</> : "present."}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="dark" id="reviews" aria-labelledby="h-rev">
          <div className="wrap">
            <div className="bar"><div><b>05</b> / REVIEWS</div><div>Client Words</div></div>
            <div className="ghost" aria-hidden="true" style={{ top: "8%" }}>REV</div>
            <h2 id="h-rev" style={{ marginTop: "8vh", position: "relative", zIndex: 1 }}>don’t take my word.<span>take theirs.</span></h2>
            <Reviews initial={reviews} />
          </div>
        </section>

        <section className="light contact" id="contact" aria-labelledby="h-contact">
          <div className="wrap">
            <div className="bar"><div><b>06</b> / CONTACT</div><div>Available for projects</div></div>
            <h2 id="h-contact" style={{ marginTop: "6vh" }}>got a problem worth solving?<span>let’s build it.</span></h2>
            <div className="btns" style={{ margin: "0 0 30px" }}>
              <a className="btn p" href={CALL} {...ext} aria-label="Book a 30-minute call (opens in new tab)">Book a 30-min call →</a>
            </div>
            <address><a className="mail" href={"mailto:" + EMAIL}>{EMAIL}</a></address>
            <nav aria-label="Social profiles">
              <ul className="soc">
                {socials.map(([name, href]) => (
                  <li key={name}><a href={href} {...ext} aria-label={name + " profile (opens in new tab)"}>{name}</a></li>
                ))}
              </ul>
            </nav>
          </div>
        </section>
      </main>

      <footer className="light nofx">
        <div className="wrap">
          <nav aria-label="Footer">
            <ul className="fnav">
              {[["home", "Top"], ["about", "About"], ["projects", "Projects"], ["experience", "Experience"], ["reviews", "Reviews"], ["contact", "Contact"]].map(([id, label]) => (
                <li key={id}><a href={"#" + id}>{label}</a></li>
              ))}
            </ul>
          </nav>
          <p>© 2026 Nathaniel Gomez. All rights reserved.</p>
        </div>
      </footer>

      <a className="btn p fab sticky-cta" id="cta" href={CALL} {...ext} aria-label="Let’s talk: book a call (opens in new tab)">Let’s talk →</a>
    </>
  );
  }

                
