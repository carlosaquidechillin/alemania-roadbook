import type { Metadata } from "next";
import { trip } from "@/data/itinerary";
import { BottomNav } from "@/components/BottomNav";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = { title: "Rutas · Roadbook Alemania" };

export default function Rutas() {
  return (
    <main className="min-h-screen pb-28">
      <header className="px-5 pt-8 pb-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-coral-400">
          Google Maps
        </p>
        <h1 className="text-3xl font-extrabold text-white mt-1">Rutas del viaje</h1>
        <p className="text-slate-400 text-sm mt-1">
          Los 4 tramos, listos para abrir en el navegador.
        </p>
      </header>

      <div className="px-4 space-y-3">
        {trip.legs.map((leg) => (
          <a
            key={leg.label}
            href={leg.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 active:scale-[0.99] transition"
          >
            <span className="text-3xl">{leg.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-white">{leg.label}</p>
              <p className="text-[13px] text-slate-400">Abrir en Google Maps</p>
            </div>
            <Icon name="external" className="w-5 h-5 text-coral-400" />
          </a>
        ))}
        <p className="text-[12px] text-slate-500 px-1 pt-1">
          Google Maps limita ~10 paradas por ruta; por eso el viaje va en 4 tramos.
        </p>
      </div>

      <BottomNav />
    </main>
  );
}
