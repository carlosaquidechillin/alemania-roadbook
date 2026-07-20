import type { Metadata } from "next";
import { trip } from "@/data/itinerary";
import { BottomNav } from "@/components/BottomNav";

export const metadata: Metadata = { title: "Rutas · Roadbook Alemania" };

export default function Rutas() {
  return (
    <main className="min-h-screen pb-28 bg-slate-50">
      <header className="bg-emerald-700 text-white px-5 pt-6 pb-8">
        <h1 className="text-2xl font-extrabold">Rutas en Google Maps</h1>
        <p className="text-emerald-100 text-sm mt-1">
          Los 4 tramos del viaje, listos para abrir en el navegador.
        </p>
      </header>

      <div className="px-4 -mt-4 space-y-3">
        {trip.legs.map((leg) => (
          <a
            key={leg.label}
            href={leg.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-white rounded-2xl shadow-sm border border-slate-100 p-4 active:scale-[0.99] transition"
          >
            <span className="text-3xl">{leg.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-slate-800">{leg.label}</p>
              <p className="text-[13px] text-slate-500">Abrir ruta en Google Maps</p>
            </div>
            <span className="text-emerald-600 text-xl">↗</span>
          </a>
        ))}
        <p className="text-[12px] text-slate-400 px-1 pt-1">
          Google Maps limita ~10 paradas por ruta; por eso el viaje va dividido en 4 tramos.
        </p>
      </div>

      <BottomNav />
    </main>
  );
}
