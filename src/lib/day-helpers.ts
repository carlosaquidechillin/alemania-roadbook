import type { Day } from "@/data/itinerary";

/** Extrae la ubicación de pernocta de un día a partir de su parada type:"sleep". */
export function sleepLabel(day: Day): string | null {
  const sleep = day.stops.find((s) => s.type === "sleep");
  if (!sleep) return null;
  return sleep.title.replace(/^Pernocta:\s*/i, "");
}
