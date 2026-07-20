"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { resolveTripCode } from "@/lib/trip-code";

export interface Note {
  id: string;
  anchor_id: string;
  body: string;
  author_nick: string | null;
  created_at: string;
}

/**
 * Anotaciones compartidas por día o parada. Realtime con Supabase; fallback local.
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
      const { data } = await supabase!
        .from("notes")
        .select("*")
        .eq("trip_code", code)
        .order("created_at", { ascending: true });
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

  const add = useCallback(
    async (anchorId: string, body: string, nick: string) => {
      const code = codeRef.current;
      const text = body.trim();
      if (!text) return;

      if (supabase) {
        const { data } = await supabase
          .from("notes")
          .insert({
            trip_code: code,
            anchor_id: anchorId,
            body: text,
            author_nick: nick || null,
          })
          .select()
          .single();
        // El realtime insertará; si no llega (misma pestaña), lo añadimos aquí.
        if (data) {
          setNotes((prev) =>
            prev.some((x) => x.id === (data as Note).id)
              ? prev
              : [...prev, data as Note]
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
          author_nick: nick || null,
          created_at: new Date().toISOString(),
        };
        setNotes((prev) => {
          const next = [...prev, local];
          persistLocal(code, next);
          return next;
        });
      }
    },
    []
  );

  const byAnchor = useCallback(
    (anchorId: string) => notes.filter((n) => n.anchor_id === anchorId),
    [notes]
  );

  return { notes, add, byAnchor };
}
