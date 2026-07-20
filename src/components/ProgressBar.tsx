"use client";

export function ProgressBar({ percent }: { percent: number }) {
  return (
    <div className="w-full bg-white/15 h-1.5 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-aqua-400 to-coral-500"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
