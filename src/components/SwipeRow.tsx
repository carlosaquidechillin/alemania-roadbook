"use client";

import { useRef, useState } from "react";
import { Icon } from "./Icon";

/**
 * Fila con dos gestos para eliminar:
 *  - Swipe de derecha a izquierda (arrastrar y soltar pasado el umbral).
 *  - Long-press (mantener pulsado) que revela "Eliminar / Cancelar".
 * Opcionalmente onTap para navegar (distingue toque de swipe).
 */
export function SwipeRow({
  onDelete,
  onTap,
  children,
  className = "",
}: {
  onDelete: () => void;
  onTap?: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  const [dx, setDx] = useState(0);
  const [armed, setArmed] = useState(false);
  const dxRef = useRef(0);
  const startX = useRef(0);
  const startY = useRef(0);
  const dragging = useRef(false);
  const moved = useRef(false);
  const longTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const THRESHOLD = -90;

  const clearLong = () => {
    if (longTimer.current) {
      clearTimeout(longTimer.current);
      longTimer.current = null;
    }
  };
  const setX = (v: number) => {
    dxRef.current = v;
    setDx(v);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
    startY.current = e.clientY;
    dragging.current = true;
    moved.current = false;
    longTimer.current = setTimeout(() => setArmed(true), 450);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const d = e.clientX - startX.current;
    const dy = e.clientY - startY.current;
    if (Math.abs(d) > 8 || Math.abs(dy) > 8) {
      moved.current = true;
      clearLong();
    }
    if (Math.abs(dy) > Math.abs(d)) {
      setX(0);
      return;
    }
    setX(d < 0 ? Math.max(d, -150) : 0);
  };
  const finish = () => {
    if (!dragging.current) return;
    dragging.current = false;
    clearLong();
    const del = dxRef.current <= THRESHOLD;
    const wasMoved = moved.current;
    setX(0);
    if (del) onDelete();
    else if (!wasMoved && !armed && onTap) onTap();
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`}>
      {/* Fondo "Eliminar" que se revela al deslizar */}
      <div className="absolute inset-0 flex items-center justify-end pr-5 bg-coral-500">
        <span className="inline-flex items-center gap-1.5 text-white font-bold text-sm">
          <Icon name="trash" className="w-4 h-4" /> Eliminar
        </span>
      </div>

      {/* Contenido deslizable */}
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={finish}
        onPointerLeave={finish}
        onPointerCancel={finish}
        onContextMenu={(e) => e.preventDefault()}
        style={{
          transform: `translateX(${dx}px)`,
          transition: dragging.current ? "none" : "transform .2s ease",
          touchAction: "pan-y",
        }}
        className="relative select-none bg-ink"
      >
        {children}
        {armed && (
          <div className="absolute top-2 right-2 flex gap-2 bg-black/70 rounded-full px-3 py-1.5">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setArmed(false);
                onDelete();
              }}
              className="text-coral-400 text-[12px] font-bold inline-flex items-center gap-1"
            >
              <Icon name="trash" className="w-3.5 h-3.5" /> Eliminar
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setArmed(false);
              }}
              className="text-slate-300 text-[12px]"
            >
              Cancelar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
