"use client";

import Link from "next/link";
import { useState } from "react";
import { trip, type StopType } from "@/data/itinerary";
import { useChecklist } from "@/hooks/useChecklist";
import { formatDayDate } from "@/lib/dates";
import { StopCard } from "./StopCard";
import { CommentButton } from "./CommentButton";
import { CheckButton } from "./CheckButton";
import { Icon } from "./Icon";

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
  const [tab, setTab] = useState<"plan" | "practica">("plan");

  if (!day) {
    return (
      <main className="min-h-screen grid place-items-center p-8 text-center">
        <div>
          <p className="text-slate-300">Día no encontrado.</p>
          <Link href="/" className="text-coral-400 font-semibold underline">
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
    <main className="min-h-screen pb-28">
      {/* CABECERA */}
      <header className="relative h-[58vh] min-h-[22rem] w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={day.cover}
          alt={day.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-transparent" />

        <Link
          href="/"
          className="fixed top-4 left-4 z-50 glass text-white rounded-full w-11 h-11 flex items-center justify-center shadow-lg"
          aria-label="Volver"
        >
          <Icon name="back" className="w-5 h-5" />
        </Link>

        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-coral-400">
            Día {day.n} · {formatDayDate(day.n)}
          </p>
          <div className="flex items-end justify-between gap-3 mt-1">
            <div className="min-w-0">
              <h1 className="text-4xl font-extrabold leading-none text-white">
                {day.dest ?? day.title}
              </h1>
              <p className="text-coral-300 text-sm font-semibold mt-1.5">{day.title}</p>
              <p className="text-slate-400 text-[12px] mt-1 inline-flex items-center gap-1.5">
                {day.phase}
                {day.drive ? (
                  <>
                    {" · "}
                    <Icon name="drive" className="w-4 h-4" /> {day.drive}
                  </>
                ) : null}
              </p>
            </div>
            <div className="flex flex-col items-center shrink-0">
              <CheckButton checked={done} onToggle={() => setMany(stopIds, !done)} />
              <span className="text-[10px] mt-1 text-slate-300">
                {done ? "Hecho" : "Día"}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* PESTAÑAS */}
      <div className="sticky top-0 z-10 bg-ink/90 backdrop-blur border-b border-white/10 flex">
        {[
          { key: "plan" as const, label: "Plan del día" },
          { key: "practica" as const, label: "Info práctica" },
        ].map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`flex-1 py-3.5 text-sm font-bold transition border-b-2 ${
              tab === t.key
                ? "text-coral-400 border-coral-500"
                : "text-slate-500 border-transparent"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="px-4 py-4 space-y-3">
        {tab === "plan" &&
          planStops.map((stop) => (
            <StopCard
              key={stop.id}
              stop={stop}
              checked={!!checks[stop.id]}
              onToggle={toggle}
            />
          ))}

        {tab === "practica" && (
          <>
            {day.headsUp && day.headsUp.length > 0 && (
              <div className="rounded-2xl border border-coral-500/30 bg-coral-500/10 p-4">
                <h3 className="font-extrabold text-coral-300 flex items-center gap-2">
                  <Icon name="bell" className="w-5 h-5" /> Prepárate para mañana
                </h3>
                <ul className="mt-2 space-y-1.5">
                  {day.headsUp.map((h, i) => (
                    <li key={i} className="text-sm text-coral-100/90 flex gap-2">
                      <span className="text-coral-400">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {practStops.map((stop) => (
              <StopCard
                key={stop.id}
                stop={stop}
                checked={!!checks[stop.id]}
                onToggle={toggle}
              />
            ))}

            {clothing.length > 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <Icon name="shirt" className="w-5 h-5 text-aqua-300" /> Qué llevar hoy
                </h3>
                <ul className="mt-2 space-y-1 text-sm text-slate-300">
                  {clothing.map((c, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-slate-500">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {costs.length > 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <Icon name="euro" className="w-5 h-5 text-aqua-300" /> Costes del día
                </h3>
                <ul className="mt-2 space-y-1 text-sm text-slate-300">
                  {costs.map((c, i) => (
                    <li key={i} className="flex justify-between gap-2">
                      <span>{c.label}</span>
                      <span className="font-medium text-white whitespace-nowrap">
                        {c.amount}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}

        {/* Notas del día */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 flex items-center justify-between">
          <div>
            <p className="text-[13px] font-semibold text-white">Notas del día</p>
            <p className="text-[12px] text-slate-400">Comentarios generales de la jornada</p>
          </div>
          <CommentButton anchorId={day.id} />
        </div>
      </div>
    </main>
  );
}
