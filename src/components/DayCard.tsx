"use client";

import { useState } from "react";
import type { Day } from "@/data/itinerary";
import type { Note } from "@/hooks/useNotes";
import { StopCard } from "./StopCard";
import { NotesThread } from "./NotesThread";

export function DayCard({
  day,
  checks,
  onToggle,
  notesFor,
  onAddNote,
  nick,
  defaultOpen = false,
}: {
  day: Day;
  checks: Record<string, boolean>;
  onToggle: (id: string) => void;
  notesFor: (anchorId: string) => Note[];
  onAddNote: (anchorId: string, body: string, nick: string) => void;
  nick: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const total = day.stops.length;
  const done = day.stops.filter((s) => checks[s.id]).length;
  const allDone = total > 0 && done === total;

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="relative w-full h-44 text-left"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={day.cover}
          alt={day.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              <span className="inline-block bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">
                Día {day.n} · {day.weekday}
              </span>
              <h2 className="text-white text-xl font-extrabold mt-1.5 leading-tight">
                {day.title}
              </h2>
              <p className="text-slate-200 text-sm mt-0.5 truncate">
                {day.summary}
              </p>
            </div>
            <div className="text-right shrink-0">
              <div
                className={`text-[11px] font-bold px-2 py-1 rounded-full ${
                  allDone
                    ? "bg-emerald-400 text-emerald-950"
                    : "bg-white/20 text-white"
                }`}
              >
                {done}/{total}
              </div>
              <span className="text-white/70 text-lg block mt-1">
                {open ? "▲" : "▼"}
              </span>
            </div>
          </div>
        </div>
      </button>

      <div className={`accordion-content ${open ? "accordion-open" : ""}`}>
        <div className="bg-slate-50 p-4 space-y-3">
          {day.drive && (
            <p className="text-[13px] text-slate-500 font-medium">
              🚐 Conducción: {day.drive} · <span className="text-slate-400">{day.phase}</span>
            </p>
          )}

          {day.stops.map((stop) => (
            <StopCard
              key={stop.id}
              stop={stop}
              checked={!!checks[stop.id]}
              onToggle={onToggle}
              notes={notesFor(stop.id)}
              onAddNote={onAddNote}
              nick={nick}
            />
          ))}

          <div className="bg-white rounded-xl border border-slate-100 p-4">
            <p className="text-[13px] font-semibold text-slate-700">
              📝 Notas del día
            </p>
            <NotesThread
              anchorId={day.id}
              notes={notesFor(day.id)}
              onAdd={onAddNote}
              nick={nick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
