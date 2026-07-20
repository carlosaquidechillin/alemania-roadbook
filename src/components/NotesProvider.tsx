"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { useNotes, type Note } from "@/hooks/useNotes";
import { NotesSheet } from "./NotesSheet";

type Ctx = {
  notes: Note[];
  byAnchor: (anchorId: string) => Note[];
  add: (anchorId: string, body: string) => Promise<void>;
  openSheet: (anchorId: string, label: string) => void;
};

const NotesContext = createContext<Ctx | null>(null);

export function NotesProvider({ children }: { children: ReactNode }) {
  const { notes, add, byAnchor } = useNotes();
  const [target, setTarget] = useState<{ anchorId: string; label: string } | null>(
    null
  );

  const openSheet = useCallback((anchorId: string, label: string) => {
    setTarget({ anchorId, label });
  }, []);
  const close = useCallback(() => setTarget(null), []);

  return (
    <NotesContext.Provider value={{ notes, byAnchor, add, openSheet }}>
      {children}
      <NotesSheet
        target={target}
        notes={target ? byAnchor(target.anchorId) : []}
        onAdd={add}
        onClose={close}
      />
    </NotesContext.Provider>
  );
}

export function useNotesCtx(): Ctx {
  const c = useContext(NotesContext);
  if (!c) throw new Error("useNotesCtx debe usarse dentro de <NotesProvider>");
  return c;
}
