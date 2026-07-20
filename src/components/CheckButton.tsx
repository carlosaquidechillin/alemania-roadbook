"use client";

import { Icon } from "./Icon";

export function CheckButton({
  checked,
  onToggle,
  size = "md",
}: {
  checked: boolean;
  onToggle: () => void;
  size?: "sm" | "md";
}) {
  const box = size === "sm" ? "w-7 h-7" : "w-9 h-9";
  const ic = size === "sm" ? "w-4 h-4" : "w-5 h-5";
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={checked}
      aria-label={checked ? "Marcar como pendiente" : "Marcar como hecho"}
      className={`shrink-0 ${box} rounded-full border-2 flex items-center justify-center transition-all ${
        checked
          ? "bg-coral-500 border-coral-500 text-white shadow-glow"
          : "bg-white/5 border-white/25 text-transparent hover:border-coral-400"
      }`}
    >
      <Icon name="check" className={ic} />
    </button>
  );
}
