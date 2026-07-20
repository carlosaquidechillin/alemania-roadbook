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
import { Icon, type IconName } from "./Icon";

const tabs: {
  href: string;
  label: string;
  icon: IconName;
  match: (p: string) => boolean;
}[] = [
  { href: "/", label: "Itinerario", icon: "route", match: (p) => p === "/" || p.startsWith("/dia") },
  { href: "/rutas", label: "Rutas", icon: "map", match: (p) => p.startsWith("/rutas") },
  { href: "/logistica", label: "Logística", icon: "clipboard", match: (p) => p.startsWith("/logistica") },
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
        <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setOpen(false)} aria-hidden />
      )}

      {open && (
        <div className="fixed bottom-[84px] inset-x-4 z-50 glass rounded-2xl p-4 space-y-3 text-white">
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Tu nombre (para firmar notas)
            </label>
            <input
              value={nick}
              onChange={(e) => onNick(e.target.value)}
              placeholder="p. ej. Carlos"
              className="mt-1 w-full text-sm bg-white/5 border border-white/15 text-white placeholder-slate-500 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-coral-400"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-300">Sincronización</span>
            <span
              className={`text-[11px] font-semibold px-2 py-1 rounded-full ${
                isSupabaseEnabled
                  ? "bg-aqua-400/15 text-aqua-300"
                  : "bg-white/10 text-slate-400"
              }`}
            >
              {isSupabaseEnabled ? "● En vivo" : "● Local"}
            </span>
          </div>
          <button
            type="button"
            onClick={doReset}
            className="w-full text-sm font-semibold text-coral-400 border border-coral-500/40 rounded-lg py-2 active:scale-95 transition"
          >
            Reiniciar checklist
          </button>
          <p className="text-[10px] text-slate-500 text-center pt-1">
            Fotos: Wikimedia Commons (CC)
          </p>
        </div>
      )}

      <nav className="fixed bottom-0 inset-x-0 z-50 glass border-t border-white/10 px-3 pt-2 safe-bottom flex justify-around">
        {tabs.map((t) => {
          const active = t.match(pathname);
          return (
            <Link
              key={t.href}
              href={t.href}
              className={`flex flex-col items-center gap-1 px-3 py-1 text-[11px] font-semibold transition ${
                active ? "text-coral-400" : "text-slate-400"
              }`}
            >
              <Icon name={t.icon} className="w-6 h-6" />
              {t.label}
            </Link>
          );
        })}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className={`flex flex-col items-center gap-1 px-3 py-1 text-[11px] font-semibold transition ${
            open ? "text-coral-400" : "text-slate-400"
          }`}
        >
          <Icon name="more" className="w-6 h-6" />
          Más
        </button>
      </nav>
    </>
  );
}
