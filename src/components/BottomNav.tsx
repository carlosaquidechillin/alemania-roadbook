"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { resolveTripCode } from "@/lib/trip-code";
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
        <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setOpen(false)} aria-hidden />
      )}

      {open && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md glass rounded-3xl p-4 space-y-2 text-white">
          <Link
            href="/notas"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3 active:scale-[0.99] transition"
          >
            <Icon name="comment" className="w-5 h-5 text-coral-400" />
            <span className="font-semibold text-sm">Todas las notas</span>
            <Icon name="external" className="w-4 h-4 ml-auto text-slate-400" />
          </Link>

          <div className="flex items-center justify-between px-1 pt-1">
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
            className="w-full text-sm font-semibold text-coral-400 border border-coral-500/40 rounded-2xl py-2.5 active:scale-95 transition"
          >
            Reiniciar checklist
          </button>

          <p className="text-[10px] text-slate-500 text-center pt-1">
            Fotos: Wikimedia Commons (CC)
          </p>
        </div>
      )}

      {/* Píldora flotante */}
      <nav className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 glass rounded-full shadow-2xl px-2 py-2 flex items-center gap-1">
        {tabs.map((t) => {
          const active = t.match(pathname);
          return active ? (
            <Link
              key={t.href}
              href={t.href}
              className="flex items-center gap-2 bg-coral-500 text-white rounded-full pl-3 pr-4 py-2.5 font-bold text-[13px] shadow-glow"
            >
              <Icon name={t.icon} className="w-5 h-5" />
              {t.label}
            </Link>
          ) : (
            <Link
              key={t.href}
              href={t.href}
              aria-label={t.label}
              className="w-11 h-11 flex items-center justify-center text-slate-300 rounded-full active:scale-90 transition"
            >
              <Icon name={t.icon} className="w-6 h-6" />
            </Link>
          );
        })}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label="Más"
          className={`w-11 h-11 flex items-center justify-center rounded-full active:scale-90 transition ${
            open ? "text-coral-400" : "text-slate-300"
          }`}
        >
          <Icon name="more" className="w-6 h-6" />
        </button>
      </nav>
    </>
  );
}
