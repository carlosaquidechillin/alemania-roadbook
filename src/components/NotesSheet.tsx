"use client";

import { useState } from "react";
import type { Note } from "@/hooks/useNotes";
import { Icon } from "./Icon";

export function NotesSheet({
  target,
  notes,
  onAdd,
  onClose,
}: {
  target: { anchorId: string; label: string } | null;
  notes: Note[];
  onAdd: (anchorId: string, body: string) => void;
  onClose: () => void;
}) {
  const [text, setText] = useState("");
  if (!target) return null;

  const submit = () => {
    if (!text.trim()) return;
    onAdd(target.anchorId, text);
    setText("");
  };

  const sorted = [...notes].sort((a, b) =>
    a.created_at.localeCompare(b.created_at)
  );

  return (
    <div className="fixed inset-0 z-[60] flex flex-col justify-end">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} aria-hidden />

      <div className="relative bg-ink border-t border-white/10 rounded-t-3xl max-h-[82vh] flex flex-col animate-[slideup_.25s_ease]">
        <style>{`@keyframes slideup{from{transform:translateY(100%)}to{transform:translateY(0)}}`}</style>

        {/* Cabecera */}
        <div className="pt-2.5 px-4 pb-3 border-b border-white/10">
          <div className="mx-auto w-10 h-1 rounded-full bg-white/20 mb-3" />
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-wider text-coral-400">
                Comentarios
              </p>
              <p className="text-sm text-slate-300 truncate">{target.label}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center"
              aria-label="Cerrar"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Lista */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5">
          {sorted.length === 0 && (
            <div className="text-center text-slate-500 py-10">
              <Icon name="comment" className="w-8 h-8 mx-auto mb-2 opacity-60" />
              <p className="text-sm">Sé el primero en comentar.</p>
            </div>
          )}
          {sorted.map((n) => (
            <div
              key={n.id}
              className="bg-white/5 border border-white/10 rounded-2xl px-3.5 py-2.5"
            >
              <p className="text-sm text-slate-100 whitespace-pre-wrap">{n.body}</p>
              <p className="text-[10px] text-slate-500 mt-1">
                {new Date(n.created_at).toLocaleString("es-ES", {
                  day: "2-digit",
                  month: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="border-t border-white/10 p-3 safe-bottom flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") submit();
            }}
            autoFocus
            placeholder="Añade un comentario…"
            className="flex-1 text-sm bg-white/5 border border-white/15 text-white placeholder-slate-500 rounded-full px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-coral-400"
          />
          <button
            type="button"
            onClick={submit}
            disabled={!text.trim()}
            className="bg-coral-500 disabled:opacity-40 text-white text-sm font-bold px-5 rounded-full active:scale-95 transition"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
