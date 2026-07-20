"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getNick,
  setNick as persistNick,
  resolveTripCode,
} from "@/lib/trip-code";
import { supabase, isSupabaseEnabled } from "@/lib/supabase";

const tabs: {
  href: string;
  label: string;
  icon: string;
  match: (p: string) => boolean;
}[] = [
  { href: "/", label: "Itinerario", icon: "📍", match: (p) => p === "/" || p.startsWith("/dia") },
  { href: "/rutas", label: "Rutas", icon: "🗺️", match: (p) => p.startsWith("/rutas") },
  { href: "/logistica", label: "Logística", icon: "🧾", match: (p) => p.startsWith("/logistica") },
];

export function BottomNav() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const [nick, setNickState] = useState("");

  useEffect(() => {
    setNickState(getNick());
  }, []);

  const onNick = (v: string) => {
    setNickState(v);
    persistNick(v);
  };

  async function doReset() {
    if (!confirm("¿Reiniciar toda la checklist del viaje?")) return;
    const code = resolveTripCode();
    try {
      localStorage.removeItem(`checks:${code}`);
    } catch {
      /* noop */
    }
    if (supabase) await supabase.from("checks").delete().eq("trip_code", code);
    location.reload();
  }

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      {open && (
        <div className="fixed bottom-[76px] inset-x-4 z-50 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 space-y-3">
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Tu nombre (para firmar notas)
            </label>
            <input
              value={nick}
              onChange={(e) => onNick(e.target.value)}
              placeholder="p. ej. Carlos"
              className="mt-1 w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Sincronización</span>
            <span
              className={`text-[11px] font-semibold px-2 py-1 rounded-full ${
                isSupabaseEnabled
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {isSupabaseEnabled ? "● En vivo" : "● Local"}
            </span>
          </div>
          <button
            type="button"
            onClick={doReset}
            className="w-full text-sm font-semibold text-red-600 border border-red-200 rounded-lg py-2 active:scale-95 transition"
          >
            🔄 Reiniciar checklist
          </button>
        </div>
      )}

      <nav className="fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-2 safe-bottom flex justify-around">
        {tabs.map((t) => {
          const active = t.match(pathname);
          return (
            <Link
              key={t.href}
              href={t.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 text-[11px] font-semibold transition ${
                active ? "text-emerald-600" : "text-slate-400"
              }`}
            >
              <span className="text-xl leading-none">{t.icon}</span>
              {t.label}
            </Link>
          );
        })}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className={`flex flex-col items-center gap-0.5 px-3 py-1 text-[11px] font-semibold transition ${
            open ? "text-emerald-600" : "text-slate-400"
          }`}
        >
          <span className="text-xl leading-none">⋯</span>
          Más
        </button>
      </nav>
    </>
  );
}
