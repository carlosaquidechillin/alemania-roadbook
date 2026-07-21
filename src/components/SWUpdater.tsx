"use client";

import { useEffect } from "react";

/**
 * Cuando se despliega una versión nueva, el nuevo service worker toma el control
 * (skipWaiting + clientsClaim) y disparamos una recarga única para que el móvil
 * cargue el código actualizado sin tener que reinstalar la PWA.
 */
export function SWUpdater() {
  useEffect(() => {
    if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;

    let reloaded = false;
    const onChange = () => {
      if (reloaded) return;
      reloaded = true;
      window.location.reload();
    };
    navigator.serviceWorker.addEventListener("controllerchange", onChange);

    // Forzar comprobación de actualización al abrir la app
    navigator.serviceWorker.getRegistration().then((reg) => reg?.update()).catch(() => {});

    return () =>
      navigator.serviceWorker.removeEventListener("controllerchange", onChange);
  }, []);

  return null;
}
