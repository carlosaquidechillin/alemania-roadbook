"use client";

export function ProgressBar({ percent }: { percent: number }) {
  return (
    <div className="w-full">
      <div className="w-full bg-white/25 h-1.5 rounded-full overflow-hidden">
        <div
          className="bg-emerald-400 h-full rounded-full transition-all duration-700"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
