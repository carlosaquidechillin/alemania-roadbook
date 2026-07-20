"use client";

import type { Stop } from "@/data/itinerary";
import type { Note } from "@/hooks/useNotes";
import { stopStyle } from "@/lib/stop-style";
import { Icon } from "./Icon";
import { CheckButton } from "./CheckButton";
import { NotesThread } from "./NotesThread";

function Row({
  icon,
  label,
  children,
}: {
  icon: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-2.5 text-sm">
      <Icon name={icon} className="w-4 h-4 mt-0.5 shrink-0 text-slate-400" />
      <p className="text-slate-300 leading-relaxed">
        <span className="font-semibold text-slate-100">{label} </span>
        {children}
      </p>
    </div>
  );
}

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
      className={`rounded-2xl border border-white/10 bg-white/5 p-4 transition ${
        checked ? "opacity-50" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${style.chip}`}
        >
          <Icon name={style.icon} className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            {style.label}
          </p>
          <h4 className="font-bold text-white leading-snug">{stop.title}</h4>
        </div>
        <CheckButton checked={checked} onToggle={() => onToggle(stop.id)} size="sm" />
      </div>

      <p className="text-sm text-slate-300 leading-relaxed mt-2.5">{stop.desc}</p>

      <div className="mt-3 space-y-2">
        {stop.order && <Row icon="route" label="Orden:">{stop.order}</Row>}

        {stop.cost && stop.cost.length > 0 && (
          <div className="flex gap-2.5 text-sm">
            <Icon name="euro" className="w-4 h-4 mt-0.5 shrink-0 text-slate-400" />
            <div className="flex-1">
              <span className="font-semibold text-slate-100">Coste</span>
              <ul className="mt-1 space-y-0.5">
                {stop.cost.map((c, i) => (
                  <li key={i} className="flex justify-between gap-2 text-slate-300">
                    <span>{c.label}</span>
                    <span className="font-medium text-white whitespace-nowrap">
                      {c.amount}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {stop.clothing && <Row icon="shirt" label="Ropa:">{stop.clothing}</Row>}
        {stop.transport && (
          <Row icon="transport" label="Cómo llegar:">{stop.transport}</Row>
        )}

        {stop.parking && (
          <div className="rounded-xl border border-aqua-400/20 bg-aqua-400/5 px-3 py-2.5">
            <div className="flex items-center gap-2">
              <Icon name="parking" className="w-4 h-4 text-aqua-300" />
              <p className="font-semibold text-aqua-200 text-[13px]">
                {stop.parking.name}
              </p>
            </div>
            {stop.parking.note && (
              <p className="text-[12px] text-slate-400 mt-1">{stop.parking.note}</p>
            )}
            <div className="flex flex-wrap gap-3 mt-2">
              <a
                href={stop.parking.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] font-semibold text-aqua-300 inline-flex items-center gap-1"
              >
                <Icon name="pin" className="w-3.5 h-3.5" /> Ver en Maps
              </a>
              {stop.parking.park4night && (
                <a
                  href="https://park4night.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] font-semibold text-aqua-300 inline-flex items-center gap-1"
                >
                  <Icon name="external" className="w-3.5 h-3.5" /> Park4Night
                </a>
              )}
            </div>
          </div>
        )}

        {stop.tips && stop.tips.length > 0 && (
          <div className="space-y-1.5">
            {stop.tips.map((t, i) => (
              <div key={i} className="flex gap-2.5 text-sm">
                <Icon name="bulb" className="w-4 h-4 mt-0.5 shrink-0 text-coral-300" />
                <p className="text-slate-300">{t}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {stop.mapsUrl && (
        <a
          href={stop.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mt-3 text-sm font-semibold text-coral-400"
        >
          <Icon name="pin" className="w-4 h-4" /> Abrir en Google Maps
        </a>
      )}

      <NotesThread anchorId={stop.id} notes={notes} onAdd={onAddNote} nick={nick} />
    </div>
  );
}
