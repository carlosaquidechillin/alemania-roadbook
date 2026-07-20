"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { resolveTripCode } from "@/lib/trip-code";

type Checks = Record<string, boolean>;

/**
 * Checklist compartida. Con Supabase configurado, se sincroniza en tiempo real
 * entre todos los que usen el mismo código de viaje. Sin Supabase, funciona en
 * local (localStorage) para no bloquear el desarrollo ni el uso offline en solitario.
 */
export function useChecklist() {
  const [checks, setChecks] = useState<Checks>({});
  const [ready, setReady] = useState(false);
  const codeRef = useRef<string>("");
  const checksRef = useRef<Checks>({});

  useEffect(() => {
    checksRef.current = checks;
  }, [checks]);

  useEffect(() => {
    const code = resolveTripCode();
    codeRef.current = code;
    const lsKey = `checks:${code}`;

    // 1) Carga instantánea desde localStorage (offline-first)
    try {
      const raw = localStorage.getItem(lsKey);
      if (raw) setChecks(JSON.parse(raw));
    } catch {
      /* noop */
    }

    if (!supabase) {
      setReady(true);
      return;
    }

    let channel: ReturnType<NonNullable<typeof supabase>["channel"]> | null = null;

    (async () => {
      const { data } = await supabase!
        .from("checks")
        .select("item_id, checked")
        .eq("trip_code", code);
      if (data) {
        const map: Checks = {};
        data.forEach((r: { item_id: string; checked: boolean }) => {
          map[r.item_id] = r.checked;
        });
        setChecks(map);
        try {
          localStorage.setItem(lsKey, JSON.stringify(map));
        } catch {
          /* noop */
        }
      }
      setReady(true);

      channel = supabase!
        .channel(`checks-${code}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "checks",
            filter: `trip_code=eq.${code}`,
          },
          (payload) => {
            const row = (payload.new ?? payload.old) as {
              item_id?: string;
              checked?: boolean;
            };
            if (!row?.item_id) return;
            setChecks((prev) => {
              const next = { ...prev };
              if (payload.eventType === "DELETE") delete next[row.item_id!];
              else next[row.item_id!] = !!row.checked;
              try {
                localStorage.setItem(lsKey, JSON.stringify(next));
              } catch {
                /* noop */
              }
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

  const toggle = useCallback(async (itemId: string) => {
    const code = codeRef.current;
    const lsKey = `checks:${code}`;
    const newVal = !checksRef.current[itemId];

    setChecks((prev) => {
      const next = { ...prev, [itemId]: newVal };
      try {
        localStorage.setItem(lsKey, JSON.stringify(next));
      } catch {
        /* noop */
      }
      return next;
    });

    if (supabase) {
      await supabase.from("checks").upsert(
        {
          trip_code: code,
          item_id: itemId,
          checked: newVal,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "trip_code,item_id" }
      );
    }
  }, []);

  // Marca/desmarca varios items a la vez (p. ej. todas las paradas de un día).
  const setMany = useCallback(async (itemIds: string[], value: boolean) => {
    const code = codeRef.current;
    const lsKey = `checks:${code}`;

    setChecks((prev) => {
      const next = { ...prev };
      for (const id of itemIds) next[id] = value;
      try {
        localStorage.setItem(lsKey, JSON.stringify(next));
      } catch {
        /* noop */
      }
      return next;
    });

    if (supabase && itemIds.length) {
      const now = new Date().toISOString();
      const rows = itemIds.map((item_id) => ({
        trip_code: code,
        item_id,
        checked: value,
        updated_at: now,
      }));
      await supabase.from("checks").upsert(rows, { onConflict: "trip_code,item_id" });
    }
  }, []);

  const reset = useCallback(async () => {
    const code = codeRef.current;
    const lsKey = `checks:${code}`;
    setChecks({});
    try {
      localStorage.removeItem(lsKey);
    } catch {
      /* noop */
    }
    if (supabase) await supabase.from("checks").delete().eq("trip_code", code);
  }, []);

  return { checks, toggle, setMany, reset, ready };
}
