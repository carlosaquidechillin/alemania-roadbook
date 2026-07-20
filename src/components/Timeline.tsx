"use client";

import Link from "next/link";
import { trip, HERO_IMAGE, type Day } from "@/data/itinerary";
import { useChecklist } from "@/hooks/useChecklist";
import { formatDayDate, todayDayIndex } from "@/lib/dates";
import { ProgressBar } from "./ProgressBar";
import { CheckButton } from "./CheckButton";
import { Icon } from "./Icon";

export function Timeline() {
  const { checks, setMany } = useChecklist();
  const total = trip.days.length;
  const today = todayDayIndex(total);

  const isDayDone = (d: Day) =>
    d.stops.length > 0 && d.stops.every((s) => checks[s.id]);

  const doneCount = trip.days.filter(isDayDone).length;
  const percent = total ? Math.round((doneCount / total) * 100) : 0;

  return (
    <main className="min-h-screen pb-28">
      {/* HERO */}
      <header className="relative h-72 w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_IMAGE}
          alt="Alpes de Berchtesgaden"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/20 to-ink" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-coral-400 mb-1">
            Verano 2026 · Camper
          </p>
          <div className="flex items-end justify-between gap-4">
            <h1 className="text-4xl font-extrabold leading-[0.95] text-white">
              Alemania
              <br />& Alpes
            </h1>
            <div className="text-right shrink-0">
              <div className="text-3xl font-extrabold text-white">
                {doneCount}
                <span className="text-lg text-slate-400">/{total}</span>
              </div>
              <div className="text-[11px] text-slate-400">días hechos</div>
            </div>
          </div>
          <p className="text-slate-300 text-sm mt-1">{trip.subtitle}</p>
          <div className="mt-3">
            <ProgressBar percent={percent} />
          </div>
        </div>
      </header>

      {/* TIMELINE */}
      <ol className="px-4 mt-6">
        {trip.days.map((day) => {
          const done = isDayDone(day);
          const isToday = today === day.n;
          const stopIds = day.stops.map((s) => s.id);
          return (
            <li key={day.id} className="relative pl-7 pb-6">
              {/* línea + punto */}
              <span className="absolute left-[9px] top-3 bottom-0 w-0.5 bg-white/10" />
              <span
                className={`absolute left-1 top-6 w-4 h-4 rounded-full border-2 transition ${
                  done
                    ? "bg-coral-500 border-coral-500"
                    : isToday
                    ? "bg-aqua-400 border-aqua-400"
                    : "bg-ink border-white/25"
                } ${isToday ? "ring-4 ring-aqua-400/25" : ""}`}
              />

              <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/5">
                <Link href={`/dia/${day.id}`} className="block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={day.cover}
                    alt={day.title}
                    loading="lazy"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/10" />

                  {/* top: fecha + HOY */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="glass text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                      Día {day.n} · {formatDayDate(day.n)}
                    </span>
                    {isToday && (
                      <span className="bg-aqua-400 text-ink text-[10px] font-extrabold px-2 py-1 rounded-full">
                        HOY
                      </span>
                    )}
                  </div>

                  {/* bottom: título */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h2 className="text-white text-2xl font-extrabold leading-tight">
                      {day.title}
                    </h2>
                    <p className="text-slate-200 text-sm mt-0.5">{day.summary}</p>
                    {day.drive && (
                      <p className="text-slate-300 text-[12px] mt-1.5 inline-flex items-center gap-1.5">
                        <Icon name="drive" className="w-4 h-4" /> {day.drive}
                      </p>
                    )}
                  </div>
                </Link>

                {/* check (fuera del Link para no navegar) */}
                <div className="absolute top-3 right-3">
                  <CheckButton checked={done} onToggle={() => setMany(stopIds, !done)} />
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </main>
  );
}
