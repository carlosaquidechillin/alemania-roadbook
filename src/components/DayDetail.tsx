"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { trip, type StopType } from "@/data/itinerary";
import { useChecklist } from "@/hooks/useChecklist";
import { useNotes } from "@/hooks/useNotes";
import { getNick } from "@/lib/trip-code";
import { formatDayDate } from "@/lib/dates";
import { StopCard } from "./StopCard";
import { NotesThread } from "./NotesThread";
import { CheckButton } from "./CheckButton";

const PLAN_TYPES = new Set<StopType>([
  "visit",
  "swim",
  "eat",
  "walk",
  "relax",
  "burger",
  "meet",
  "drive",
]);

export function DayDetail({ id }: { id: string }) {
  const day = trip.days.find((d) => d.id === id);
  const { checks, toggle, setMany } = useChecklist();
  const { add, byAnchor } = useNotes();
  const [nick, setNick] = useState("");
  const [tab, setTab] = useState<"plan" | "practica">("plan");

  useEffect(() => {
    setNick(getNick());
  }, []);

  if (!day) {
    return (
      <main className="min-h-screen grid place-items-center p-8 text-center">
        <div>
          <p className="text-slate-600">Día no encontrado.</p>
          <Link href="/" className="text-emerald-700 font-semibold underline">
            Volver al itinerario
          </Link>
        </div>
      </main>
    );
  }

  const stopIds = day.stops.map((s) => s.id);
  const done = day.stops.length > 0 && day.stops.every((s) => checks[s.id]);
  const planStops = day.stops.filter((s) => PLAN_TYPES.has(s.type));
  const practStops = day.stops.filter((s) => !PLAN_TYPES.has(s.type));
  const clothing = day.stops
    .map((s) => s.clothing)
    .filter((c): c is string => !!c);
  const costs = day.stops.flatMap((s) => s.cost ?? []);

  return (
    <main className="min-h-screen pb-28 bg-slate-50">
      {/* CABECERA */}
      <header className="relative h-56 w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={day.cover}
          alt={day.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />

        <Link
          href="/"
          className="absolute top-4 left-4 bg-white/90 text-slate-800 rounded-full w-10 h-10 flex items-center justify-center shadow-md text-lg font-bold"
          aria-label="Volver"
        >
          ←
        </Link>

        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            Día {day.n} · {formatDayDate(day.n)}
          </p>
          <div className="flex items-end justify-between gap-3 mt-1">
            <div className="min-w-0">
              <h1 className="text-2xl font-extrabold leading-tight">{day.title}</h1>
              <p className="text-slate-200 text-sm mt-0.5">{day.summary}</p>
              <p className="text-slate-300 text-[12px] mt-1">
                {day.phase}
                {day.drive ? ` · 🚐 ${day.drive}` : ""}
              </p>
            </div>
            <div className="flex flex-col items-center shrink-0">
              <CheckButton checked={done} onToggle={() => setMany(stopIds, !done)} />
              <span className="text-[10px] mt-1 opacity-90">
                {done ? "Hecho" : "Día"}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* PESTAÑAS */}
      <div className="sticky top-0 z-10 bg-slate-50/95 backdrop-blur border-b border-slate-200 flex">
        {[
          { key: "plan" as const, label: "Plan del día" },
          { key: "practica" as const, label: "Info práctica" },
        ].map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`flex-1 py-3 text-sm font-bold transition border-b-2 ${
              tab === t.key
                ? "text-emerald-700 border-emerald-600"
                : "text-slate-400 border-transparent"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="px-4 py-4 space-y-3">
        {tab === "plan" && (
          <>
            {planStops.map((stop) => (
              <StopCard
                key={stop.id}
                stop={stop}
                checked={!!checks[stop.id]}
                onToggle={toggle}
                notes={byAnchor(stop.id)}
                onAddNote={add}
                nick={nick}
              />
            ))}
          </>
        )}

        {tab === "practica" && (
          <>
            {/* Prepárate para mañana */}
            {day.headsUp && day.headsUp.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                <h3 className="font-extrabold text-amber-800 flex items-center gap-2">
                  🔔 Prepárate para mañana
                </h3>
                <ul className="mt-2 space-y-1.5">
                  {day.headsUp.map((h, i) => (
                    <li key={i} className="text-sm text-amber-900/90 flex gap-2">
                      <span>•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Dónde dormir / parking / avisos / transporte */}
            {practStops.map((stop) => (
              <StopCard
                key={stop.id}
                stop={stop}
                checked={!!checks[stop.id]}
                onToggle={toggle}
                notes={byAnchor(stop.id)}
                onAddNote={add}
                nick={nick}
              />
            ))}

            {/* Qué llevar (resumen) */}
            {clothing.length > 0 && (
              <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
                <h3 className="font-bold text-slate-800">👕 Qué llevar hoy</h3>
                <ul className="mt-2 space-y-1 text-sm text-slate-600">
                  {clothing.map((c, i) => (
                    <li key={i} className="flex gap-2">
                      <span>•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Costes (resumen) */}
            {costs.length > 0 && (
              <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
                <h3 className="font-bold text-slate-800">💶 Costes del día</h3>
                <ul className="mt-2 space-y-1 text-sm text-slate-600">
                  {costs.map((c, i) => (
                    <li key={i} className="flex justify-between gap-2">
                      <span>{c.label}</span>
                      <span className="font-medium text-slate-700 whitespace-nowrap">
                        {c.amount}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}

        {/* Notas del día (en ambas pestañas) */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
          <p className="text-[13px] font-semibold text-slate-700">📝 Notas del día</p>
          <NotesThread
            anchorId={day.id}
            notes={byAnchor(day.id)}
            onAdd={add}
            nick={nick}
          />
        </div>
      </div>
    </main>
  );
}
