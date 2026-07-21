"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Cabecera con parallax: la imagen queda fija detrás y se va oscureciendo a medida
 * que se hace scroll, mientras el contenido pasa por encima. `children` es el bloque
 * de contenido superpuesto (títulos) que se ancla abajo de la zona de imagen.
 */
export function ParallaxHeader({
  image,
  alt,
  heightClass = "h-[60vh]",
  children,
}: {
  image: string;
  alt: string;
  heightClass?: string;
  children: ReactNode;
}) {
  const [y, setY] = useState(0);

  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dark = Math.min(0.92, 0.3 + (y / 380) * 0.62);

  return (
    <>
      {/* Imagen fija detrás */}
      <div className={`fixed top-0 inset-x-0 ${heightClass} z-0 overflow-hidden`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={alt}
          className="w-full h-full object-cover will-change-transform"
          style={{ transform: `translateY(${Math.min(y * 0.2, 120)}px) scale(1.12)` }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, rgba(10,14,18,1) 3%, rgba(10,14,18,0.45) 45%, rgba(10,14,18,${dark}) 100%)`,
          }}
        />
      </div>

      {/* Zona de contenido superpuesto (transparente, deja ver la imagen) */}
      <div className={`relative z-10 ${heightClass} flex flex-col justify-end pointer-events-none`}>
        <div className="pointer-events-auto">{children}</div>
      </div>
    </>
  );
}
