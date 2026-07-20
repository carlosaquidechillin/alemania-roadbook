// Fechas del viaje derivadas del número de día (D1 = inicio del viaje).

export const TRIP_START = "2026-07-25"; // sábado

const WEEKDAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const MONTHS = [
  "ene", "feb", "mar", "abr", "may", "jun",
  "jul", "ago", "sep", "oct", "nov", "dic",
];

function startDate(): Date {
  const [y, m, d] = TRIP_START.split("-").map(Number);
  return new Date(y, m - 1, d);
}

/** Fecha (Date local) del día n del viaje. */
export function dateOfDay(n: number): Date {
  const d = startDate();
  d.setDate(d.getDate() + (n - 1));
  return d;
}

/** Etiqueta corta tipo "Sáb 25 jul". */
export function formatDayDate(n: number): string {
  const d = dateOfDay(n);
  return `${WEEKDAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]}`;
}

/**
 * Índice (n, 1-based) del día de hoy dentro del viaje, o null si hoy queda
 * fuera del rango del viaje. Se usa para resaltar "HOY" en el timeline.
 */
export function todayDayIndex(totalDays: number): number | null {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diff = Math.round((today.getTime() - startDate().getTime()) / 86400000);
  const n = diff + 1;
  return n >= 1 && n <= totalDays ? n : null;
}
