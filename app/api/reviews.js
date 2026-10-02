import { base, headers } from "../../../lib/reviews";

const json = (body, status = 200) => Response.json(body, { status });

export async function POST(req) {
  let b;
  try { b = await req.json(); } catch { return json({ error: "Bad request." }, 400); }

  if (b.website) return json({ approved: false }); // honeypot: bots fill this hidden field

  const name = String(b.name || "").trim().slice(0, 40);
  const role = String(b.role || "").trim().slice(0, 50);
  const msg = String(b.msg || "").trim().slice(0, 300);
  if (!name) return json({ error: "Add your name." }, 400);
  if (msg.length < 10) return json({ error: "Write at least a sentence." }, 400);

  try {
    const res = await fetch(`${base()}/rest/v1/reviews`, {
      method: "POST",
      headers: { ...headers(), Prefer: "return=representation" },
      body: JSON.stringify({ name, role: role || null, msg }),
    });
    if (!res.ok) throw new Error("insert failed");
    const [row] = await res.json();
    return json({ approved: !!row?.approved });
  } catch {
    return json({ error: "Could not save your review. Try again later." }, 500);
  }
}
