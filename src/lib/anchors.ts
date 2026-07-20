import { trip } from "@/data/itinerary";

// Traduce un anchor_id de nota a una referencia legible + el día al que pertenece.
// "d10"            → Día del itinerario ("Día 10 · Königssee · Info del día")
// "d10-koenigssee" → Parada dentro del día  ("Día 10 · Königssee · St. Bartholomä")
export function anchorLabel(anchorId: string): {
  dayId: string;
  title: string;
} {
  const dayId = anchorId.split("-")[0];
  const day = trip.days.find((d) => d.id === dayId);
  if (!day) return { dayId, title: anchorId };

  const dayName = `Día ${day.n} · ${day.dest ?? day.title}`;
  if (anchorId === dayId) return { dayId, title: `${dayName} · Info del día` };

  const stop = day.stops.find((s) => s.id === anchorId);
  return { dayId, title: `${dayName} · ${stop ? stop.title : "Parada"}` };
}
