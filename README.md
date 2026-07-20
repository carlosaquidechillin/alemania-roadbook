# Roadbook Alemania 🚐

Guía de viaje colaborativa (PWA) para la ruta camper por el sur de Alemania.
Itinerario de 15 días con costes, ropa, parking, transporte y avisos; **checklist
compartida en tiempo real**, **notas del grupo** y funcionamiento **offline**.

Stack: **Next.js (App Router) + Tailwind + PWA (next-pwa) + Supabase (Postgres + Realtime)**.
Despliegue en **Vercel**. Acceso **sin usuarios** (código de viaje compartido).

---

## 1. Desarrollo local

```bash
npm install
npm run dev      # http://localhost:3000
```

Funciona sin Supabase (modo local con `localStorage`): verás la etiqueta "● Local".
Para activar la sincronización entre móviles, configura Supabase (paso 2).

## 2. Configurar Supabase (backend gratis)

1. Crea un proyecto en <https://supabase.com>.
2. **SQL Editor → New query** → pega el contenido de [`supabase/schema.sql`](supabase/schema.sql) → **Run**.
3. **Project Settings → API** → copia `Project URL` y la clave `anon public`.
4. Rellena `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
NEXT_PUBLIC_TRIP_CODE=alemania-2026     # código secreto compartido entre los 3
```

5. Reinicia `npm run dev`. La etiqueta debe pasar a "● En vivo".

## 3. Desplegar en Vercel

1. Sube el repo a GitHub (`git init`, commit, push).
2. En <https://vercel.com> → **Add New → Project** → importa el repo.
3. En **Environment Variables** añade las 3 variables `NEXT_PUBLIC_*` (mismos valores que `.env.local`).
4. **Deploy**. Vercel redespliega solo en cada push (podéis mejorar la app durante el viaje).

## 4. Instalar en el móvil (PWA)

1. Abrid `https://<vuestra-app>.vercel.app/?code=alemania-2026` en Chrome/Safari.
2. Menú del navegador → **Añadir a pantalla de inicio**.
3. Ya tenéis un icono como una app real. Tras la primera carga funciona **offline**
   (los enlaces a Maps sí necesitan datos).

> El parámetro `?code=` fija el mismo viaje para todos. Los tres amigos deben usar el mismo código.

---

## Estructura

```
src/
  app/            page.tsx (itinerario), logistica/page.tsx, layout.tsx
  components/     Roadbook, DayCard, StopCard, CheckButton, NotesThread, ProgressBar, RouteButtons
  data/           itinerary.ts  ← TODO el contenido del viaje
  hooks/          useChecklist.ts, useNotes.ts  (realtime + fallback local)
  lib/            supabase.ts, trip-code.ts, stop-style.ts
supabase/schema.sql
```

Para editar el itinerario, toca **`src/data/itinerary.ts`**.
