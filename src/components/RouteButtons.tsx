import type { RouteLeg } from "@/data/itinerary";

export function RouteButtons({ legs }: { legs: RouteLeg[] }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {legs.map((leg) => (
        <a
          key={leg.label}
          href={leg.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 bg-white rounded-xl shadow-sm border border-slate-100 px-2 py-3 text-center active:scale-95 transition"
        >
          <span className="text-xl">{leg.emoji}</span>
          <span className="text-[11px] font-semibold text-slate-600 leading-tight">
            {leg.label}
          </span>
        </a>
      ))}
    </div>
  );
}
