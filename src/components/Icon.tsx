import type { ReactNode } from "react";

// Set de iconos con estilo "stroke" (línea fina redondeada, à la Hugeicons).
// 24x24, sin relleno, color heredado (currentColor).

const paths: Record<string, ReactNode> = {
  // --- Navegación ---
  route: (
    <>
      <circle cx="6" cy="6.5" r="2.3" />
      <circle cx="18" cy="17.5" r="2.3" />
      <path d="M6 8.8V13a3 3 0 0 0 3 3h6.7" />
    </>
  ),
  map: (
    <>
      <path d="M9 4 3.6 6.2v13.4L9 17.4l6 2.2 5.4-2.2V4L15 6.2 9 4Z" />
      <path d="M9 4v13.4M15 6.2v13.4" />
    </>
  ),
  clipboard: (
    <>
      <rect x="5" y="5" width="14" height="16.5" rx="3" />
      <path d="M9 5V4a1.6 1.6 0 0 1 1.6-1.6h2.8A1.6 1.6 0 0 1 15 4v1" />
      <path d="M8.5 11h7M8.5 15h5" />
    </>
  ),
  more: (
    <g fill="currentColor" stroke="none">
      <circle cx="5.5" cy="12" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="18.5" cy="12" r="1.5" />
    </g>
  ),

  // --- UI ---
  back: (
    <>
      <path d="M19 12H5" />
      <path d="M11 6l-6 6 6 6" />
    </>
  ),
  external: (
    <>
      <path d="M8 8h8v8" />
      <path d="M8 16 16 8" />
    </>
  ),
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  pin: (
    <>
      <path d="M12 21s7-5.8 7-11a7 7 0 0 0-14 0c0 5.2 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="5" width="16" height="16" rx="3" />
      <path d="M4 10h16M8 3v4M16 3v4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4.5l3 2" />
    </>
  ),
  shirt: (
    <path d="M8.5 4 5 6 3 9.2l3 2v9.3h12v-9.3l3-2L16.9 4l-1.4 2.3a3.2 3.2 0 0 1-5.4 0L8.5 4Z" />
  ),
  euro: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M15.5 9.2a3.8 3.8 0 1 0 0 5.6" />
      <path d="M7.5 11h5M7.5 13.2h4" />
    </>
  ),
  bulb: (
    <>
      <path d="M12 3a6 6 0 0 0-3.8 10.6c.7.6 1 1.1 1.1 2.4h5.4c.1-1.3.4-1.8 1.1-2.4A6 6 0 0 0 12 3Z" />
      <path d="M9.5 18.5h5M10.5 21h3" />
    </>
  ),
  bell: (
    <>
      <path d="M6 10a6 6 0 0 1 12 0c0 4 1.5 5 2 6H4c.5-1 2-2 2-6Z" />
      <path d="M10 20a2 2 0 0 0 4 0" />
    </>
  ),
  comment: (
    <>
      <path d="M21 11.5a8 8 0 0 1-8 8 8.4 8.4 0 0 1-3.6-.8L3 21l1.4-4.2A8 8 0 0 1 3 11.5a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8Z" />
      <path d="M8.5 10.5h7M8.5 13.5h4" />
    </>
  ),
  trash: (
    <>
      <path d="M4 7h16" />
      <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7" />
      <path d="M6.5 7l1 12.5A1.5 1.5 0 0 0 9 21h6a1.5 1.5 0 0 0 1.5-1.5L17.5 7" />
      <path d="M10 11v6M14 11v6" />
    </>
  ),

  // --- Tipos de parada ---
  visit: (
    <>
      <path d="M4 8.5A2.5 2.5 0 0 1 6.5 6h.9l.9-1.5A1 1 0 0 1 9.1 4h5.8a1 1 0 0 1 .8.5L16.6 6h.9A2.5 2.5 0 0 1 20 8.5v8A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5Z" />
      <circle cx="12" cy="12.3" r="3.2" />
    </>
  ),
  drive: (
    <>
      <path d="M5 13l1.6-4.6A2 2 0 0 1 8.5 7h7a2 2 0 0 1 1.9 1.4L19 13" />
      <path d="M4 13h16v4.5H4z" />
      <circle cx="7.5" cy="17.5" r="1.4" />
      <circle cx="16.5" cy="17.5" r="1.4" />
    </>
  ),
  sleep: (
    <>
      <path d="M3 8v11" />
      <path d="M21 19v-4a3 3 0 0 0-3-3H3" />
      <path d="M7 12v-1.6A1.4 1.4 0 0 1 8.4 9h3.2A1.4 1.4 0 0 1 13 10.4V12" />
      <path d="M3 15.5h18" />
    </>
  ),
  swim: (
    <>
      <path d="M2 8.5c2 0 2 1.3 4 1.3s2-1.3 4-1.3 2 1.3 4 1.3 2-1.3 4-1.3 2 1.3 4 1.3" />
      <path d="M2 13c2 0 2 1.3 4 1.3S8 13 10 13s2 1.3 4 1.3S16 13 18 13s2 1.3 4 1.3" />
      <path d="M2 17.5c2 0 2 1.3 4 1.3s2-1.3 4-1.3 2 1.3 4 1.3 2-1.3 4-1.3 2 1.3 4 1.3" />
    </>
  ),
  eat: (
    <>
      <path d="M7 3v18" />
      <path d="M4.5 3v4a2.5 2.5 0 0 0 5 0V3" />
      <path d="M17 3c-1.7 1.2-2.4 3.3-2.4 6.2 0 1.9 1 2.4 2.4 2.4V21" />
    </>
  ),
  parking: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <path d="M9.5 16.5V7.5h3.2a2.6 2.6 0 0 1 0 5.2H9.5" />
    </>
  ),
  transport: (
    <>
      <rect x="6" y="3.5" width="12" height="13" rx="3.2" />
      <path d="M6 10.5h12" />
      <circle cx="9.5" cy="13.4" r="1" />
      <circle cx="14.5" cy="13.4" r="1" />
      <path d="M8 16.5 6 20M16 16.5 18 20" />
    </>
  ),
  warning: (
    <>
      <path d="M10.3 4.4 2.7 18a2 2 0 0 0 1.7 3h15.2a2 2 0 0 0 1.7-3L13.7 4.4a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9.5v4M12 16.8v.2" />
    </>
  ),
  walk: (
    <>
      <path d="M3 20 10 7l4 6" />
      <path d="M2.5 20h19" />
      <path d="M12.8 20 17 11.5 21.5 20" />
    </>
  ),
  burger: (
    <>
      <path d="M4 9.5a8 8 0 0 1 16 0Z" />
      <path d="M3.5 13h17" />
      <path d="M4 16h16a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4Z" />
    </>
  ),
  gas: (
    <>
      <rect x="4" y="4" width="9" height="16" rx="2.2" />
      <path d="M4 10.5h9" />
      <path d="M13 8h2.3a2 2 0 0 1 2 2v6a1.5 1.5 0 0 0 3 0V10l-2.2-2.4" />
    </>
  ),
  meet: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
      <path d="M15.8 5.3a3 3 0 0 1 0 5.4" />
      <path d="M16.8 14.6a5.5 5.5 0 0 1 3.7 5.4" />
    </>
  ),
  relax: (
    <>
      <path d="M5 8.5h11v4.5a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4Z" />
      <path d="M16 9.5h2.4a2 2 0 0 1 0 4H16" />
      <path d="M8 3.5v2M11 3.5v2" />
    </>
  ),
};

export type IconName = keyof typeof paths;

export function Icon({
  name,
  className = "w-5 h-5",
}: {
  name: IconName | string;
  className?: string;
}) {
  const content = paths[name] ?? paths.pin;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {content}
    </svg>
  );
}
