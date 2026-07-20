"use client";

import { useState } from "react";
import type { Note } from "@/hooks/useNotes";

export function NotesThread({
  anchorId,
  notes,
  onAdd,
  nick,
}: {
  anchorId: string;
  notes: Note[];
  onAdd: (anchorId: string, body: string, nick: string) => void;
  nick: string;
}) {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);

  const submit = () => {
    if (!text.trim()) return;
    onAdd(anchorId, text, nick);
    setText("");
  };

  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="text-[12px] font-semibold text-aqua-300 flex items-center gap-1.5"
      >
        Notas del grupo{notes.length ? ` · ${notes.length}` : ""}
        <span className="text-slate-500">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="mt-2 space-y-2">
          {notes.map((n) => (
            <div
              key={n.id}
              className="bg-white/5 border border-white/10 rounded-xl px-3 py-2"
            >
              <p className="text-sm text-slate-200 whitespace-pre-wrap">{n.body}</p>
              <p className="text-[10px] text-slate-500 mt-1">
                {n.author_nick ? `— ${n.author_nick} · ` : ""}
                {new Date(n.created_at).toLocaleString("es-ES", {
                  day: "2-digit",
                  month: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          ))}

          <div className="flex gap-2">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") submit();
              }}
              placeholder="Añadir una nota…"
              className="flex-1 text-sm bg-white/5 border border-white/15 text-white placeholder-slate-500 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-coral-400"
            />
            <button
              type="button"
              onClick={submit}
              className="bg-coral-500 text-white text-sm font-semibold px-3 rounded-lg active:scale-95 transition"
            >
              Enviar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
