"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { resolveTripCode } from "@/lib/trip-code";

export interface Note {
  id: string;
  anchor_id: string;
  body: string;
  created_at: string;
}

/**
 * Notas compartidas por día o parada (sin autor). Realtime con Supabase; fallback local.
 */
export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const codeRef = useRef<string>("");

  const persistLocal = (code: string, list: Note[]) => {
    try {
      localStorage.setItem(`notes:${code}`, JSON.stringify(list));
    } catch {
      /* noop */
    }
  };

  useEffect(() => {
    const code = resolveTripCode();
    codeRef.current = code;

    try {
      const raw = localStorage.getItem(`notes:${code}`);
      if (raw) setNotes(JSON.parse(raw));
    } catch {
      /* noop */
    }

    if (!supabase) return;

    let channel: ReturnType<NonNullable<typeof supabase>["channel"]> | null = null;

    (async () => {
      const { data, error } = await supabase!
        .from("notes")
        .select("id, anchor_id, body, created_at")
        .eq("trip_code", code)
        .order("created_at", { ascending: true });
      if (error) console.error("[notes] fetch error:", error.message);
      if (data) {
        setNotes(data as Note[]);
        persistLocal(code, data as Note[]);
      }

      channel = supabase!
        .channel(`notes-${code}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "notes",
            filter: `trip_code=eq.${code}`,
          },
          (payload) => {
            setNotes((prev) => {
              let next = prev;
              if (payload.eventType === "INSERT") {
                const n = payload.new as Note;
                if (!prev.some((x) => x.id === n.id)) next = [...prev, n];
              } else if (payload.eventType === "DELETE") {
                const old = payload.old as { id: string };
                next = prev.filter((x) => x.id !== old.id);
              }
              persistLocal(code, next);
              return next;
            });
          }
        )
        .subscribe();
    })();

    return () => {
      if (channel && supabase) supabase.removeChannel(channel);
    };
  }, []);

  const add = useCallback(async (anchorId: string, body: string) => {
    const code = codeRef.current || resolveTripCode();
    const text = body.trim();
    if (!text) return;

    if (supabase) {
      const { data, error } = await supabase
        .from("notes")
        .insert({ trip_code: code, anchor_id: anchorId, body: text })
        .select("id, anchor_id, body, created_at");
      if (error) {
        console.error("[notes] insert error:", error.message);
        return;
      }
      const row = data?.[0] as Note | undefined;
      if (row) {
        setNotes((prev) =>
          prev.some((x) => x.id === row.id) ? prev : [...prev, row]
        );
      }
    } else {
      const local: Note = {
        id:
          typeof crypto !== "undefined" && "randomUUID" in crypto
            ? crypto.randomUUID()
            : String(Date.now()),
        anchor_id: anchorId,
        body: text,
        created_at: new Date().toISOString(),
      };
      setNotes((prev) => {
        const next = [...prev, local];
        persistLocal(code, next);
        return next;
      });
    }
  }, []);

  const remove = useCallback(async (id: string) => {
    const code = codeRef.current || resolveTripCode();
    setNotes((prev) => {
      const next = prev.filter((n) => n.id !== id);
      persistLocal(code, next);
      return next;
    });
    if (supabase) {
      const { error } = await supabase.from("notes").delete().eq("id", id);
      if (error) console.error("[notes] delete error:", error.message);
    }
  }, []);

  const byAnchor = useCallback(
    (anchorId: string) => notes.filter((n) => n.anchor_id === anchorId),
    [notes]
  );

  return { notes, add, remove, byAnchor };
}
