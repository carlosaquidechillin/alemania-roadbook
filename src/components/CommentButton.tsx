"use client";

import { useNotesCtx } from "./NotesProvider";
import { anchorLabel } from "@/lib/anchors";
import { Icon } from "./Icon";

export function CommentButton({ anchorId }: { anchorId: string }) {
  const { byAnchor, openSheet } = useNotesCtx();
  const count = byAnchor(anchorId).length;

  return (
    <button
      type="button"
      onClick={() => openSheet(anchorId, anchorLabel(anchorId).title)}
      className="inline-flex items-center gap-1.5 text-slate-400 active:scale-95 transition"
    >
      <Icon name="comment" className="w-5 h-5" />
      <span className="text-[12px] font-semibold">
        {count > 0 ? count : "Comentar"}
      </span>
    </button>
  );
}
