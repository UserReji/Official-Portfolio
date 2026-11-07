export type SupabaseConfig = {
  url: string;
  key: string;
};

export function getSupabaseConfig(): SupabaseConfig | null {
  const url =
    process.env.SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    null;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SECRET_KEY ||
    null;
  if (!url || !key) return null;
  return { url: url.replace(/\/$/, ""), key };
}

export function isSupabaseConfigured(): boolean {
  return getSupabaseConfig() !== null;
}

export async function supabaseFetch(
  path: string,
  init: RequestInit = {}
): Promise<Response | null> {
  const cfg = getSupabaseConfig();
  if (!cfg) return null;

  const headers = new Headers(init.headers);
  headers.set("apikey", cfg.key);
  headers.set("Authorization", `Bearer ${cfg.key}`);
  if (init.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  // Prefer representation responses for inserts/updates
  if (init.method && init.method !== "GET" && !headers.has("Prefer")) {
    headers.set("Prefer", "return=representation");
  }

  return fetch(`${cfg.url}${path}`, { ...init, headers });
}
