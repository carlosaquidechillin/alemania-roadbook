"use client";

import type { Stop } from "@/data/itinerary";
import type { Note } from "@/hooks/useNotes";
import { stopStyle } from "@/lib/stop-style";
import { CheckButton } from "./CheckButton";
import { NotesThread } from "./NotesThread";

export function StopCard({
  stop,
  checked,
  onToggle,
  notes,
  onAddNote,
  nick,
}: {
  stop: Stop;
  checked: boolean;
  onToggle: (id: string) => void;
  notes: Note[];
  onAddNote: (anchorId: string, body: string, nick: string) => void;
  nick: string;
}) {
  const style = stopStyle[stop.type];

  return (
    <div
      className={`bg-white rounded-xl border border-slate-100 shadow-sm p-4 transition ${
        checked ? "opacity-60" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <span
            className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${style.badge}`}
          >
            <span>{style.emoji}</span>
            {style.label}
          </span>
          <h4 className="font-bold text-slate-800 mt-1.5 leading-snug">
            {stop.title}
          </h4>
        </div>
        <CheckButton checked={checked} onToggle={() => onToggle(stop.id)} />
      </div>

      <p className="text-sm text-slate-600 leading-relaxed mt-2">{stop.desc}</p>

      <div className="mt-3 space-y-2 text-sm">
        {stop.order && (
          <p className="text-slate-600">
            <span className="font-semibold text-slate-700">🧭 Orden:</span>{" "}
            {stop.order}
          </p>
        )}

        {stop.cost && stop.cost.length > 0 && (
          <div className="text-slate-600">
            <span className="font-semibold text-slate-700">💶 Coste:</span>
            <ul className="mt-1 space-y-0.5">
              {stop.cost.map((c, i) => (
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

        {stop.clothing && (
          <p className="text-slate-600">
            <span className="font-semibold text-slate-700">👕 Ropa:</span>{" "}
            {stop.clothing}
          </p>
        )}

        {stop.transport && (
          <p className="text-slate-600">
            <span className="font-semibold text-slate-700">🚈 Cómo llegar:</span>{" "}
            {stop.transport}
          </p>
        )}

        {stop.parking && (
          <div className="bg-blue-50 border border-blue-100 rounded-lg px-3 py-2 text-slate-700">
            <p className="font-semibold text-blue-800 text-[13px]">
              🅿️ {stop.parking.name}
            </p>
            {stop.parking.note && (
              <p className="text-[12px] text-slate-500 mt-0.5">
                {stop.parking.note}
              </p>
            )}
            <div className="flex flex-wrap gap-3 mt-1.5">
              <a
                href={stop.parking.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] font-semibold text-blue-700 underline"
              >
                Ver en Maps
              </a>
              {stop.parking.park4night && (
                <a
                  href="https://park4night.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] font-semibold text-blue-700 underline"
                >
                  Park4Night
                </a>
              )}
            </div>
          </div>
        )}

        {stop.tips && stop.tips.length > 0 && (
          <ul className="space-y-1">
            {stop.tips.map((t, i) => (
              <li key={i} className="text-slate-600">
                <span className="font-semibold text-slate-700">💡</span> {t}
              </li>
            ))}
          </ul>
        )}
      </div>

      {stop.mapsUrl && (
        <a
          href={stop.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mt-3 text-sm font-semibold text-emerald-700"
        >
          📍 Abrir en Google Maps
        </a>
      )}

      <NotesThread
        anchorId={stop.id}
        notes={notes}
        onAdd={onAddNote}
        nick={nick}
      />
    </div>
  );
}
