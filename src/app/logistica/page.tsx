import type { Metadata } from "next";
import { BottomNav } from "@/components/BottomNav";

export const metadata: Metadata = { title: "Logística · Roadbook Alemania" };

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
    <section className="rounded-2xl bg-white/5 p-5">
      <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
        <span>{emoji}</span>
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-sm text-slate-300 leading-relaxed">
        {children}
      </div>
    </section>
  );
}

export default function Logistica() {
  return (
    <main className="min-h-screen pb-28">
      <header className="px-5 pt-8 pb-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-coral-400">
          Todo lo práctico
        </p>
        <h1 className="text-3xl font-extrabold text-white mt-1">Logística del viaje</h1>
        <p className="text-slate-400 text-sm mt-1">
          Qué pagar, qué llevar y qué tener en cuenta.
        </p>
      </header>

      <div className="px-4 space-y-4">
        <Section emoji="✅" title="Antes de salir">
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <b className="text-white">Pegatina verde alemana (Umweltplakette)</b>:
              pídela online exprés ya, o cómprala al llegar en un TÜV/DEKRA/gasolinera.
            </li>
            <li>
              <b className="text-white">Viñeta austriaca</b> (10 días): digital o en
              gasolinera antes de Salzburgo.
            </li>
            <li>Revisar niveles, ruedas y gas de la furgo. Vaciar aguas.</li>
            <li>Tarjeta sanitaria europea + seguro. Documentación de la furgo a mano.</li>
            <li>Descargar mapas offline de Google Maps de Baviera y los Alpes.</li>
            <li>Sacar <b className="text-white">efectivo</b>: muchos parkings/panaderías no aceptan tarjeta.</li>
          </ul>
        </Section>

        <Section emoji="🎫" title="Viñetas y pegatinas">
          <div>
            <p className="font-semibold text-white">🇦🇹 Viñeta Austria — para Salzburgo</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>10 días = <b className="text-white">12,80 €</b> (2026). El T6 (&lt;3,5 t) usa la viñeta normal de coche.</li>
              <li>
                Digital en{" "}
                <a className="text-aqua-300 underline" href="https://shop.asfinag.at" target="_blank" rel="noopener noreferrer">
                  shop.asfinag.at
                </a>{" "}
                con <b className="text-white">validez inmediata</b> (el retraso de 18 días NO aplica a la de 10 días).
              </li>
              <li>Alternativa: pegatina en la gasolinera antes de la frontera.</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-white">🇩🇪 Pegatina verde (Umweltplakette)</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Obligatoria para Múnich, Stuttgart, Friburgo… Multa <b className="text-white">100 €</b>.</li>
              <li>Desde 2025 solo existe la <b className="text-white">verde</b> (el T6 Euro 4+ la cumple).</li>
              <li><b className="text-white">5-10 €</b> en TÜV/DEKRA/gasolinera/taller (lleva el permiso de circulación). Online 10-15 € con envío.</li>
              <li>Permanente, va pegada al parabrisas.</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-white">🇨🇭 Suiza — evitar</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Viñeta suiza = 40 € y solo anual. En la vuelta, <b className="text-white">cruzad por Bregenz (Austria)</b>.</li>
            </ul>
          </div>
        </Section>

        <Section emoji="🚐" title="Conducir y pernoctar en camper">
          <ul className="list-disc pl-5 space-y-1.5">
            <li><b className="text-white">Stellplatz</b> mejor que camping para noches de paso: baratos (10-15 € o gratis), con máquina, sin reserva.</li>
            <li>En agosto llegad <b className="text-white">antes de las 16-17h</b>: se llenan.</li>
            <li>App <b className="text-white">Park4Night</b> para encontrar sitio y valoraciones.</li>
            <li><b className="text-white">Autobahn</b>: en tramos sin límite, mira dos veces el retrovisor antes de adelantar.</li>
            <li>Reserva las bases de 2 noches (Múnich, Salzburgo, Füssen) si puedes.</li>
          </ul>
        </Section>

        <Section emoji="🚿" title="Duchas">
          <p>
            La mayoría de Stellplätze ofrecen agua, vaciado y electricidad, pero{" "}
            <b className="text-white">rara vez ducha</b>. Los campings sí (además de
            lavandería). Estrategia sencilla: 4-5 noches en Stellplatz + 1 noche de camping
            &quot;de reseteo&quot; cada 4-5 días (ducha larga, colada, llenar/vaciar depósitos)
            — encaja bien en la Selva Negra o el Lago Constanza.
          </p>
          <p>
            <b className="text-white">Piscinas municipales (Schwimmbad)</b>: 4-8 €, duchas
            calientes incluidas. Totalmente normal que las use gente de camper, no llama la
            atención.
          </p>
          <div>
            <p className="font-semibold text-white">Ducha exterior de la furgo — dónde sí</p>
            <p className="mt-1">
              Tras el baño en <b className="text-white">Walchensee</b>,{" "}
              <b className="text-white">Eibsee</b>, <b className="text-white">Alpsee</b>,{" "}
              <b className="text-white">Hintersee</b> y las Badestellen del{" "}
              <b className="text-white">Lago Constanza (Lindau)</b>: son lagos públicos con
              ambiente relajado, un aclarado rápido pasa desapercibido. Están marcados en sus
              paradas correspondientes del itinerario.
            </p>
          </div>
          <div>
            <p className="font-semibold text-white">Dónde NO</p>
            <p className="mt-1">
              Stellplätze urbanos (Stuttgart, Núremberg, Múnich), parking de castillos
              (Neuschwanstein/Hohenschwangau) y el Königssee en temporada alta: son zonas
              vigiladas o reguladas donde ducharse fuera sí llama la atención.
            </p>
          </div>
        </Section>

        <Section emoji="🎒" title="Qué meter en la furgo">
          <ul className="list-disc pl-5 space-y-1.5">
            <li>👕 <b className="text-white">Ropa</b>: bañador y chanclas, pero también sudadera y chubasquero (los Alpes refrescan de noche).</li>
            <li>🥾 Calzado cómodo para adoquines y para la Partnachklamm (se moja).</li>
            <li>🔌 Regleta y power bank (enchufe europeo, sin adaptador).</li>
            <li>💶 Efectivo en monedas y billetes.</li>
            <li>🧻 Papel, bolsas de basura, toallas de secado rápido.</li>
            <li>🪫 Cargador de coche y soporte de móvil.</li>
          </ul>
        </Section>

        <Section emoji="🍔" title="Tradición: la mejor smash burger">
          <p>Buscad la mejor smash burger que coincida en ruta (sin desviaros). Abrid el buscador de Maps al llegar y mirad valoraciones frescas:</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {["Stuttgart", "Núremberg", "Múnich", "Salzburgo", "Füssen"].map((city) => (
              <a
                key={city}
                href={maps(`smash burger ${city}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-coral-500/20 text-coral-300 text-sm font-semibold px-3 py-1.5 rounded-full"
              >
                🍔 {city}
              </a>
            ))}
          </div>
          <p className="text-[13px] text-slate-500">En Múnich hay la mayor oferta. Anotad la ganadora en las notas del día 😉</p>
        </Section>

        <Section emoji="💰" title="Presupuesto orientativo (por persona)">
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Gasóleo (compartido entre 2 furgos): ~250-350 € cada uno.</li>
            <li>Comidas (50% furgo / 50% restaurante): ~25-35 €/día.</li>
            <li>Entradas y barcos (Königssee, Porsche, Partnachklamm…): ~80-120 € total.</li>
            <li>Viñetas/pegatinas: ~20-25 €.</li>
          </ul>
          <div>
            <p className="font-semibold text-white mt-1">Pernoctas, por tipo</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Stellplatz básico: <b className="text-white">10-20 €</b>.</li>
              <li>Stellplatz urbano popular (Múnich, Núremberg, Salzburgo): <b className="text-white">15-30 €</b>.</li>
              <li>Camping completo (ducha/lavandería): <b className="text-white">30-50 €</b>.</li>
              <li>Electricidad (si no va incluida): <b className="text-white">+3-8 €</b>.</li>
            </ul>
            <p className="text-[13px] text-slate-500 mt-2">
              Para las 16 noches: escenario económico ~180-250 €, escenario cómodo
              (mezclando varios campings) ~300-450 €.
            </p>
          </div>
        </Section>
      </div>

      <BottomNav />
    </main>
  );
}
