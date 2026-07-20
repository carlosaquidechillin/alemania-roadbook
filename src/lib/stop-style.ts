import type { StopType } from "@/data/itinerary";
import type { IconName } from "@/components/Icon";

// Icono + etiqueta + clases del chip (sobre fondo oscuro) por tipo de parada.
export const stopStyle: Record<
  StopType,
  { icon: IconName; label: string; chip: string }
> = {
  visit: { icon: "visit", label: "Visita", chip: "bg-aqua-400/15 text-aqua-300" },
  drive: { icon: "drive", label: "Ruta", chip: "bg-white/10 text-slate-300" },
  sleep: { icon: "sleep", label: "Pernocta", chip: "bg-indigo-400/15 text-indigo-300" },
  swim: { icon: "swim", label: "Baño", chip: "bg-cyan-400/15 text-cyan-300" },
  eat: { icon: "eat", label: "Comer", chip: "bg-coral-500/20 text-coral-300" },
  parking: { icon: "parking", label: "Parking", chip: "bg-sky-400/15 text-sky-300" },
  transport: { icon: "transport", label: "Transporte", chip: "bg-violet-400/15 text-violet-300" },
  warning: { icon: "warning", label: "Aviso", chip: "bg-amber-400/15 text-amber-300" },
  walk: { icon: "walk", label: "Paseo", chip: "bg-lime-400/15 text-lime-300" },
  burger: { icon: "burger", label: "Burger", chip: "bg-coral-500/20 text-coral-300" },
  gas: { icon: "gas", label: "Gasolina", chip: "bg-white/10 text-slate-300" },
  meet: { icon: "meet", label: "Encuentro", chip: "bg-teal-400/15 text-teal-300" },
  relax: { icon: "relax", label: "Relax", chip: "bg-coral-500/20 text-coral-300" },
};
