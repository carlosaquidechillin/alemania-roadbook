"use client";

import { useRouter } from "next/navigation";
import { useNotesCtx } from "@/components/NotesProvider";
import { anchorLabel } from "@/lib/anchors";
import { BottomNav } from "@/components/BottomNav";
import { Icon } from "@/components/Icon";
import { SwipeRow } from "@/components/SwipeRow";

export default function Notas() {
  const { notes, remove } = useNotesCtx();
  const router = useRouter();
  const sorted = [...notes].sort((a, b) =>
    b.created_at.localeCompare(a.created_at)
  );

  return (
    <main className="min-h-screen pb-32">
      <header className="px-5 pt-8 pb-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-coral-400">
          Del grupo
        </p>
        <h1 className="text-3xl font-extrabold text-white mt-1">Todas las notas</h1>
        <p className="text-slate-400 text-sm mt-1">
          {sorted.length
            ? `${sorted.length} comentario${sorted.length === 1 ? "" : "s"} · desliza para eliminar`
            : "Aún no hay comentarios."}
        </p>
      </header>

      <div className="px-4 space-y-3">
        {sorted.length === 0 && (
          <div className="rounded-2xl bg-white/5 p-8 text-center text-slate-500">
            <Icon name="comment" className="w-8 h-8 mx-auto mb-2 opacity-60" />
            <p className="text-sm">
              Deja notas desde cualquier día o parada con el botón de comentario.
            </p>
          </div>
        )}

        {sorted.map((n) => {
          const { dayId, title } = anchorLabel(n.anchor_id);
          return (
            <SwipeRow
              key={n.id}
              onDelete={() => remove(n.id)}
              onTap={() => router.push(`/dia/${dayId}`)}
            >
              <div className="bg-white/5 p-4">
                <div className="flex items-center gap-1.5 text-coral-300 text-[12px] font-semibold">
                  <Icon name="pin" className="w-3.5 h-3.5" />
                  <span className="truncate">{title}</span>
                </div>
                <p className="text-slate-100 mt-1.5 whitespace-pre-wrap">{n.body}</p>
                <p className="text-[11px] text-slate-500 mt-2">
                  {new Date(n.created_at).toLocaleString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </SwipeRow>
          );
        })}
      </div>

      <BottomNav />
    </main>
  );
}
