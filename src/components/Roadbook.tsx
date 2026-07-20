"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { trip } from "@/data/itinerary";
import { useChecklist } from "@/hooks/useChecklist";
import { useNotes } from "@/hooks/useNotes";
import { getNick, setNick as persistNick } from "@/lib/trip-code";
import { isSupabaseEnabled } from "@/lib/supabase";
import { DayCard } from "./DayCard";
import { ProgressBar } from "./ProgressBar";
import { RouteButtons } from "./RouteButtons";

export function Roadbook() {
  const { checks, toggle, reset } = useChecklist();
  const { add, byAnchor } = useNotes();
  const [nick, setNick] = useState("");

  useEffect(() => {
    setNick(getNick());
  }, []);

  const totalItems = useMemo(
    () => trip.days.reduce((acc, d) => acc + d.stops.length, 0),
    []
  );
  const doneItems = useMemo(
    () =>
      trip.days.reduce(
        (acc, d) => acc + d.stops.filter((s) => checks[s.id]).length,
        0
      ),
    [checks]
  );
  const percent = totalItems ? Math.round((doneItems / totalItems) * 100) : 0;

  const onNickChange = (v: string) => {
    setNick(v);
    persistNick(v);
  };

  return (
    <main className="min-h-screen pb-28">
      {/* HERO */}
      <header className="relative h-64 w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1600&auto=format&fit=crop"
          alt="Alpes"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-slate-900" />
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-1">
                Verano 2026 · Camper
              </p>
              <h1 className="text-3xl font-extrabold leading-tight">
                {trip.title}
              </h1>
              <p className="text-slate-200 text-sm mt-1">{trip.subtitle}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-extrabold text-emerald-400">
                {percent}%
              </div>
              <div className="text-[11px] opacity-80">Completado</div>
            </div>
          </div>
          <div className="mt-3">
            <ProgressBar percent={percent} />
          </div>
        </div>
      </header>

      {/* NICK + estado sync */}
      <div className="px-4 -mt-4 relative z-10">
        <div className="bg-white rounded-xl shadow-md border border-slate-100 p-3 flex items-center gap-2">
          <span className="text-lg">🧑‍🤝‍🧑</span>
          <input
            value={nick}
            onChange={(e) => onNickChange(e.target.value)}
            placeholder="Tu nombre (para firmar notas)"
            className="flex-1 text-sm focus:outline-none"
          />
          <span
            className={`text-[10px] font-semibold px-2 py-1 rounded-full ${
              isSupabaseEnabled
                ? "bg-emerald-100 text-emerald-700"
                : "bg-slate-100 text-slate-500"
            }`}
            title={
              isSupabaseEnabled
                ? "Sincronización en tiempo real activa"
                : "Modo local (configura Supabase para compartir)"
            }
          >
            {isSupabaseEnabled ? "● En vivo" : "● Local"}
          </span>
        </div>
      </div>

      {/* RUTA EN MAPS */}
      <section className="px-4 mt-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
          Ruta en Google Maps
        </h2>
        <RouteButtons legs={trip.legs} />
      </section>

      {/* DÍAS */}
      <section className="px-4 mt-6 space-y-5">
        {trip.days.map((day, i) => (
          <DayCard
            key={day.id}
            day={day}
            checks={checks}
            onToggle={toggle}
            notesFor={byAnchor}
            onAddNote={add}
            nick={nick}
            defaultOpen={i === 0}
          />
        ))}
      </section>

      {/* NAV INFERIOR */}
      <nav className="fixed bottom-0 inset-x-0 bg-white/90 backdrop-blur-md border-t border-slate-200 px-4 py-3 safe-bottom flex items-center justify-around">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex flex-col items-center text-slate-500 text-[11px] font-semibold"
        >
          <span className="text-lg">⬆️</span>
          Arriba
        </button>
        <Link
          href="/logistica"
          className="bg-emerald-600 text-white px-5 py-2 rounded-full font-bold shadow-lg flex items-center gap-2"
        >
          <span>🧾</span> Logística
        </Link>
        <button
          type="button"
          onClick={() => {
            if (confirm("¿Reiniciar toda la checklist del viaje?")) reset();
          }}
          className="flex flex-col items-center text-slate-500 text-[11px] font-semibold"
        >
          <span className="text-lg">🔄</span>
          Reiniciar
        </button>
      </nav>
    </main>
  );
}
