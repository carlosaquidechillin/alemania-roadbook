// Resuelve el "código de viaje" compartido (sin usuarios).
// Prioridad: ?code=... en la URL (se guarda) > localStorage > variable de entorno.

const KEY = "trip_code";
const DEFAULT_CODE = process.env.NEXT_PUBLIC_TRIP_CODE || "alemania-2026";

export function resolveTripCode(): string {
  if (typeof window === "undefined") return DEFAULT_CODE;
  try {
    const fromUrl = new URLSearchParams(window.location.search).get("code");
    if (fromUrl) {
      window.localStorage.setItem(KEY, fromUrl);
      return fromUrl;
    }
    return window.localStorage.getItem(KEY) || DEFAULT_CODE;
  } catch {
    return DEFAULT_CODE;
  }
}
