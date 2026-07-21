import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// La anon key es publica por diseno (ya viaja en el bundle del cliente y RLS la
// controla). La fijamos aqui con los bytes correctos para no depender de que la
// variable de entorno este bien copiada en Vercel (una vez llego corrupta).
const url = "https://eqgmssouotloraludcpg.supabase.co";
const anon = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxZ21zc291b3Rsb3JhbHVkY3BnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ1NjI3NDIsImV4cCI6MjEwMDEzODc0Mn0.J_HrBHd6bkGa4CRRM8h0vbVYoUnnXG6PRdAiVNdqju0";

export const supabase: SupabaseClient | null =
  url && anon
    ? createClient(url, anon, { realtime: { params: { eventsPerSecond: 5 } } })
    : null;

export const isSupabaseEnabled = !!supabase;
