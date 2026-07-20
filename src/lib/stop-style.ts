import type { StopType } from "@/data/itinerary";

export const stopStyle: Record<
  StopType,
  { emoji: string; label: string; badge: string }
> = {
  visit: { emoji: "📸", label: "Visita", badge: "bg-emerald-100 text-emerald-700" },
  drive: { emoji: "🛣️", label: "Ruta", badge: "bg-slate-100 text-slate-600" },
  sleep: { emoji: "🛏️", label: "Pernocta", badge: "bg-indigo-100 text-indigo-700" },
  swim: { emoji: "🏊", label: "Baño", badge: "bg-cyan-100 text-cyan-700" },
  eat: { emoji: "🍽️", label: "Comer", badge: "bg-orange-100 text-orange-700" },
  parking: { emoji: "🅿️", label: "Parking", badge: "bg-blue-100 text-blue-700" },
  transport: { emoji: "🚈", label: "Transporte", badge: "bg-violet-100 text-violet-700" },
  warning: { emoji: "⚠️", label: "Aviso", badge: "bg-amber-100 text-amber-800" },
  walk: { emoji: "🥾", label: "Paseo", badge: "bg-lime-100 text-lime-700" },
  burger: { emoji: "🍔", label: "Burger", badge: "bg-yellow-100 text-yellow-800" },
  gas: { emoji: "⛽", label: "Gasolina", badge: "bg-slate-100 text-slate-600" },
  meet: { emoji: "🤝", label: "Encuentro", badge: "bg-teal-100 text-teal-700" },
  relax: { emoji: "🍺", label: "Relax", badge: "bg-amber-100 text-amber-700" },
};
