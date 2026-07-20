import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Logística · Roadbook Alemania",
};

const maps = (q: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

function Section({
  emoji,
  title,
  children,
}: {
  emoji: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
      <h2 className="text-lg font-extrabold text-slate-800 flex items-center gap-2">
        <span>{emoji}</span>
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-sm text-slate-600 leading-relaxed">
        {children}
      </div>
    </section>
  );
}

export default function Logistica() {
  return (
    <main className="min-h-screen pb-24 bg-slate-50">
      <header className="bg-emerald-700 text-white px-5 pt-6 pb-8">
        <Link href="/" className="text-emerald-100 text-sm font-semibold">
          ← Volver al itinerario
        </Link>
        <h1 className="text-2xl font-extrabold mt-2">Logística del viaje</h1>
        <p className="text-emerald-100 text-sm mt-1">
          Todo lo que hay que pagar, llevar y tener en cuenta.
        </p>
      </header>

      <div className="px-4 -mt-4 space-y-4">
        <Section emoji="✅" title="Antes de salir (esta semana)">
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <b>Pegatina verde alemana (Umweltplakette)</b>: pedir online exprés ya, o
              comprar al llegar en un TÜV/DEKRA/gasolinera (ver abajo).
            </li>
            <li>
              <b>Viñeta austriaca</b> (10 días): comprar digital o en gasolinera antes de
              Salzburgo.
            </li>
            <li>Revisar niveles, ruedas y gas de la furgo. Vaciar aguas.</li>
            <li>Tarjeta sanitaria europea + seguro. Documentación de la furgo a mano.</li>
            <li>Descargar mapas offline de Google Maps de la zona (Baviera, Alpes).</li>
            <li>Sacar <b>efectivo</b>: en Alemania muchos parkings/panaderías no aceptan tarjeta.</li>
          </ul>
        </Section>

        <Section emoji="🎫" title="Viñetas y pegatinas">
          <div>
            <p className="font-semibold text-slate-700">
              🇦🇹 Viñeta Austria — para Salzburgo
            </p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>10 días = <b>12,80 €</b> (2026). El T6 California (&lt;3,5 t) usa la viñeta normal de coche.</li>
              <li>
                Cómprala <b>digital</b> en{" "}
                <a
                  className="text-emerald-700 underline"
                  href="https://shop.asfinag.at"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  shop.asfinag.at
                </a>{" "}
                y elige <b>validez inmediata</b> (el retraso de 18 días NO aplica a la de 10 días).
              </li>
              <li>Alternativa: pegatina física en la gasolinera antes de la frontera.</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-slate-700">
              🇩🇪 Pegatina verde Alemania (Umweltplakette)
            </p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Obligatoria para el centro de Múnich, Stuttgart, Friburgo… Multa <b>100 €</b>.</li>
              <li>Desde 2025 solo existe la <b>verde</b> (el T6 Euro 4+ la cumple).</li>
              <li>Precio real <b>5-10 €</b> en TÜV/DEKRA/gasolinera/taller (llevar permiso de circulación). Online 10-15 € con envío.</li>
              <li>Es permanente y va pegada al parabrisas.</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-slate-700">🇨🇭 Suiza — evitar</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>La viñeta suiza cuesta 40 € y solo es anual. En la vuelta, <b>cruzad por Bregenz (Austria)</b>, no por autopista suiza.</li>
            </ul>
          </div>
        </Section>

        <Section emoji="🚐" title="Conducir y pernoctar en camper">
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <b>Stellplatz</b> (áreas de autocaravanas) mejor que camping para noches de paso:
              baratas (10-15 € o gratis), con máquina, sin reserva.
            </li>
            <li>En agosto llegad <b>antes de las 16-17h</b>: se llenan.</li>
            <li>App <b>Park4Night</b> para encontrar sitio y valoraciones.</li>
            <li>
              <b>Autobahn</b>: en tramos sin límite, mira dos veces el retrovisor antes de
              adelantar (vienen coches a 200 km/h).
            </li>
            <li>Los campings famosos (Thalkirchen, Hopfensee) pueden estar llenos: reserva las bases de 2 noches si puedes.</li>
          </ul>
        </Section>

        <Section emoji="🎒" title="Qué meter en la furgo">
          <ul className="list-disc pl-5 space-y-1.5">
            <li>👕 <b>Ropa</b>: bañador y chanclas (muchos lagos), pero también sudadera y chubasquero (en los Alpes refresca de noche incluso en agosto).</li>
            <li>🥾 Calzado cómodo para adoquines y para la Partnachklamm (se moja).</li>
            <li>🔌 Adaptador no hace falta (enchufe europeo), pero sí regleta y power bank.</li>
            <li>💶 Efectivo en monedas y billetes.</li>
            <li>🧻 Papel, bolsas de basura, toallas de secado rápido.</li>
            <li>🪫 Cargador de coche y soporte de móvil para navegar.</li>
          </ul>
        </Section>

        <Section emoji="🍔" title="Tradición: la mejor smash burger">
          <p>
            Buscad la mejor smash burger que coincida en ruta (sin desviaros). Toca en las
            ciudades grandes. Abrid el buscador de Maps al llegar y mirad valoraciones frescas:
          </p>
          <div className="flex flex-wrap gap-2 mt-1">
            {["Stuttgart", "Núremberg", "Múnich", "Salzburgo", "Füssen"].map((city) => (
              <a
                key={city}
                href={maps(`smash burger ${city}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-100 text-yellow-800 text-sm font-semibold px-3 py-1.5 rounded-full"
              >
                🍔 {city}
              </a>
            ))}
          </div>
          <p className="text-[13px] text-slate-500">
            Consejo: en Múnich hay la mayor oferta. Anotad la ganadora en las notas del día 😉
          </p>
        </Section>

        <Section emoji="💰" title="Presupuesto orientativo (por persona)">
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Gasóleo (compartido entre 2 furgos): ~250-350 € cada uno.</li>
            <li>Pernoctas (mix stellplatz/camping): ~10-20 €/noche.</li>
            <li>Comidas (50% furgo / 50% restaurante): ~25-35 €/día.</li>
            <li>Entradas y barcos (Königssee, Porsche, Partnachklamm…): ~80-120 € en total.</li>
            <li>Viñetas/pegatinas: ~20-25 €.</li>
          </ul>
          <p className="text-[13px] text-slate-500">
            Estimación de estilo medio; ajustad según cuánto cocinéis en la furgo.
          </p>
        </Section>
      </div>

      <div className="px-4 mt-6">
        <Link
          href="/"
          className="block text-center bg-emerald-600 text-white font-bold py-3 rounded-xl"
        >
          ← Volver al itinerario
        </Link>
      </div>
    </main>
  );
}
