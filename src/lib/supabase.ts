import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Cliente único (o null si aún no se ha configurado Supabase).
// Si es null, la app funciona en modo local (localStorage) sin sincronización.
export const supabase: SupabaseClient | null =
  url && anon ? createClient(url, anon, { realtime: { params: { eventsPerSecond: 5 } } }) : null;

export const isSupabaseEnabled = !!supabase;
