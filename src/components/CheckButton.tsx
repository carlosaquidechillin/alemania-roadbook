"use client";

export function CheckButton({
  checked,
  onToggle,
}: {
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={checked}
      aria-label={checked ? "Marcar como pendiente" : "Marcar como hecho"}
      className={`shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
        checked
          ? "bg-emerald-500 border-emerald-500 text-white"
          : "bg-white border-slate-300 text-transparent hover:border-emerald-400"
      }`}
    >
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <path
          fillRule="evenodd"
          d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0l-3.5-3.5a1 1 0 111.4-1.4l2.8 2.8 6.8-6.8a1 1 0 011.4 0z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
}
