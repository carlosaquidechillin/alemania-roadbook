"use client";

import Link from "next/link";
import { trip, type Day } from "@/data/itinerary";
import { useChecklist } from "@/hooks/useChecklist";
import { formatDayDate, todayDayIndex } from "@/lib/dates";
import { ProgressBar } from "./ProgressBar";
import { CheckButton } from "./CheckButton";

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
      {/* HERO compacto */}
      <header className="relative h-52 w-full overflow-hidden">
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
              <h1 className="text-3xl font-extrabold leading-tight">{trip.title}</h1>
              <p className="text-slate-200 text-sm mt-1">{trip.subtitle}</p>
            </div>
            <div className="text-right shrink-0">
              <div className="text-2xl font-extrabold text-emerald-400">
                {doneCount}/{total}
              </div>
              <div className="text-[11px] opacity-80">días</div>
            </div>
          </div>
          <div className="mt-3">
            <ProgressBar percent={percent} />
          </div>
        </div>
      </header>

      {/* TIMELINE */}
      <ol className="px-4 mt-5">
        {trip.days.map((day) => {
          const done = isDayDone(day);
          const isToday = today === day.n;
          const stopIds = day.stops.map((s) => s.id);
          return (
            <li key={day.id} className="relative pl-9 pb-5">
              {/* línea vertical */}
              <span className="absolute left-[11px] top-2 bottom-0 w-0.5 bg-slate-200" />
              {/* punto */}
              <span
                className={`absolute left-1 top-6 w-5 h-5 rounded-full border-2 flex items-center justify-center transition ${
                  done
                    ? "bg-emerald-500 border-emerald-500"
                    : "bg-white border-slate-300"
                } ${isToday ? "ring-4 ring-emerald-200" : ""}`}
              />

              <div className="flex items-stretch bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <Link href={`/dia/${day.id}`} className="flex-1 flex gap-3 p-3 min-w-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={day.cover}
                    alt={day.title}
                    loading="lazy"
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
                        Día {day.n} · {formatDayDate(day.n)}
                      </span>
                      {isToday && (
                        <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-emerald-500 text-white">
                          HOY
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-slate-800 leading-snug truncate">
                      {day.title}
                    </h3>
                    <p className="text-[13px] text-slate-500 truncate">{day.summary}</p>
                    {day.drive && (
                      <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                        🚐 {day.drive}
                      </p>
                    )}
                  </div>
                </Link>
                <div className="flex items-center pr-3">
                  <CheckButton
                    checked={done}
                    onToggle={() => setMany(stopIds, !done)}
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </main>
  );
}
