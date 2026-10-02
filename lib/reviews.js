// Server-only helpers. Never import this file from a "use client" component.
export const base = () => process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;

export const headers = () => {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" };
};

export async function getReviews() {
  try {
    const res = await fetch(
      `${base()}/rest/v1/reviews?select=id,name,role,msg&approved=eq.true&order=created_at.asc`,
      { headers: headers(), next: { revalidate: 60 } }
    );
    return res.ok ? await res.json() : [];
  } catch {
    return [];
  }
}
