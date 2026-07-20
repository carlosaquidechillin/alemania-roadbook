// Contenido estático del roadbook. Todo bundleado => disponible offline.
// Precios verificados/aproximados a 2026; confirmar cerca de la salida.

export type StopType =
  | "visit"
  | "drive"
  | "sleep"
  | "swim"
  | "eat"
  | "parking"
  | "transport"
  | "warning"
  | "walk"
  | "burger"
  | "gas"
  | "meet"
  | "relax";

export interface Cost {
  label: string;
  amount: string;
}

export interface ParkingInfo {
  name: string;
  mapsUrl: string;
  park4night?: boolean; // sugerir buscar alternativas en Park4Night
  note?: string;
}

export interface Stop {
  id: string;
  type: StopType;
  title: string;
  desc: string;
  order?: string; // qué ver y en qué orden
  cost?: Cost[];
  clothing?: string;
  parking?: ParkingInfo;
  transport?: string;
  mapsUrl?: string;
  tips?: string[];
}

export interface Day {
  id: string;
  n: number;
  weekday: string;
  phase: string;
  title: string;
  summary: string;
  cover: string;
  drive?: string;
  /** Consideraciones con antelación / prepárate para mañana (reservas, horarios, madrugar). */
  headsUp?: string[];
  stops: Stop[];
}

export interface RouteLeg {
  label: string;
  emoji: string;
  mapsUrl: string;
}

export interface Trip {
  title: string;
  subtitle: string;
  days: Day[];
  legs: RouteLeg[];
}

// Helpers
const img = (id: string) =>
  `https://images.unsplash.com/${id}?q=80&w=1600&auto=format&fit=crop`;
const maps = (q: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
const dir = (waypoints: string[]) =>
  `https://www.google.com/maps/dir/${waypoints.map((w) => encodeURIComponent(w)).join("/")}`;

export const trip: Trip = {
  title: "Alemania & Alpes",
  subtitle: "Ruta camper por el Sur · 15 días",
  legs: [
    {
      label: "Tramo 1 · Ida",
      emoji: "🛣️",
      mapsUrl: dir([
        "Madrid",
        "Cestas, Francia",
        "Mulhouse, Francia",
        "Eguisheim, Francia",
        "Estrasburgo, Francia",
      ]),
    },
    {
      label: "Tramo 2 · Selva Negra + Baviera",
      emoji: "🌲",
      mapsUrl: dir([
        "Estrasburgo",
        "Gengenbach",
        "Triberg",
        "Porsche Museum, Stuttgart",
        "Rothenburg ob der Tauber",
        "Bamberg",
        "Núremberg",
        "Múnich",
      ]),
    },
    {
      label: "Tramo 3 · Alpes",
      emoji: "🏔️",
      mapsUrl: dir([
        "Múnich",
        "Salzburgo, Austria",
        "Königssee",
        "Ramsau bei Berchtesgaden",
        "Walchensee",
        "Garmisch-Partenkirchen",
        "Eibsee",
        "Neuschwanstein",
      ]),
    },
    {
      label: "Tramo 4 · Vuelta",
      emoji: "🏠",
      mapsUrl: dir([
        "Neuschwanstein",
        "Lindau",
        "Besançon, Francia",
        "San Sebastián",
        "Madrid",
      ]),
    },
  ],
  days: [
    // ---------------------------------------------------------------- D1
    {
      id: "d1",
      n: 1,
      weekday: "Sábado",
      phase: "Ida · Cruzar Francia",
      title: "La gran evasión",
      summary: "Madrid ➔ Frontera francesa",
      cover: img("photo-1469854523086-cc02fe5d8800"),
      drive: "~6-7 h (salida mediodía)",
      stops: [
        {
          id: "d1-salida",
          type: "drive",
          title: "Salida de Madrid",
          desc: "Salís sábado a mediodía. Objetivo del día: pisar Francia y dormir cerca de Burdeos. Sin prisa pero sin pausa.",
          tips: [
            "Repostad barato en España antes de cruzar (el gasóleo francés suele ser más caro).",
            "Llevad efectivo en euros: en Alemania muchos parkings y panaderías no aceptan tarjeta.",
          ],
        },
        {
          id: "d1-cestas",
          type: "meet",
          title: "Encuentro con los de Asturias",
          desc: "Punto de reunión con la otra furgo (vienen desde Asturias): Área de Servicio de Cestas (A63), justo antes de Burdeos. Enorme y muy frecuentada por españoles.",
          mapsUrl: maps("Aire de Cestas A63 France"),
          tips: ["Coordinad hora por WhatsApp; si llegáis a horas distintas, mejor quedar en la pernocta."],
        },
        {
          id: "d1-pernocta",
          type: "sleep",
          title: "Pernocta: Gastes / Libourne",
          desc: "Evitad dormir en áreas de autopista cerca de Burdeos (hay robos). Salid a un pueblo tranquilo.",
          clothing: "Noche templada; con sábana o saco fino basta.",
          parking: {
            name: "Aire camping-car de Gastes (junto al lago de Biscarrosse)",
            mapsUrl: maps("Aire camping car Gastes lac"),
            park4night: true,
            note: "Alternativa: Libourne. Buscad la mejor opción del día en Park4Night.",
          },
        },
      ],
    },
    // ---------------------------------------------------------------- D2
    {
      id: "d2",
      n: 2,
      weekday: "Domingo",
      phase: "Ida · Cruzar Francia",
      title: "Maratón de asfalto",
      summary: "Burdeos ➔ Mulhouse",
      cover: img("photo-1502602898657-3e91760cbb34"),
      drive: "~8-9 h (día más largo)",
      headsUp: [
        "Mañana (Alsacia): en Estrasburgo usad el P+R Elsau — aparcáis la furgo y el ticket incluye el tranvía al centro para todos los ocupantes.",
      ],
      stops: [
        {
          id: "d2-ruta",
          type: "drive",
          title: "Cruzar Francia de oeste a este",
          desc: "El día más pesado de coche: Burdeos → Clermont-Ferrand → Mulhouse. Turnaos al volante y parad a estirar las piernas.",
          tips: ["Revisad Waze: según tráfico puede compensar la vía por Tours o por Lyon."],
        },
        {
          id: "d2-pernocta",
          type: "sleep",
          title: "Pernocta: Mulhouse",
          desc: "Dormir pegados a la frontera para entrar en Alsacia frescos al día siguiente.",
          parking: {
            name: "Aire de camping-car de Mulhouse (Rue des Cigognes)",
            mapsUrl: maps("Aire camping car Mulhouse Rue des Cigognes"),
            park4night: true,
            note: "Básica pero segura. Alternativa: alrededores de Colmar.",
          },
        },
      ],
    },
    // ---------------------------------------------------------------- D3
    {
      id: "d3",
      n: 3,
      weekday: "Lunes",
      phase: "Ida · Alsacia",
      title: "Cuento de hadas",
      summary: "Alsacia: Eguisheim, Colmar y Estrasburgo",
      cover: img("photo-1523290821866-3df14545f228"),
      drive: "~1,5 h repartido",
      headsUp: [
        "Mañana entráis en Alemania: llevad ya la pegatina verde (Umweltplakette) puesta o comprada para poder pisar zonas de bajas emisiones (Stuttgart, Múnich).",
        "El Museo Porsche (día 5) cierra los LUNES; en esta ruta cae en miércoles, así que sin problema.",
      ],
      stops: [
        {
          id: "d3-eguisheim",
          type: "visit",
          title: "Eguisheim",
          desc: "Considerado uno de los pueblos más bonitos de Francia. Trazado circular, callejuelas con casas de entramado y flores por todas partes. Se ve en 1 h.",
          order: "Aparcar fuera → plaza central → dar la vuelta al círculo exterior de murallas.",
          cost: [{ label: "Parking", amount: "~2-3 €" }],
          clothing: "Calzado cómodo para adoquines.",
          mapsUrl: maps("Eguisheim France"),
        },
        {
          id: "d3-colmar",
          type: "eat",
          title: "Colmar · La Petite Venise",
          desc: "'La pequeña Venecia': canales y casas de colores. Parada para comer.",
          order: "Barrio Petite Venise → mercado cubierto (Marché Couvert) → Quai de la Poissonnerie.",
          cost: [{ label: "Comida (Tarte Flambée)", amount: "~12-16 €/persona" }],
          tips: ["Probad la Tarte Flambée (Flammkuchen) alsaciana."],
          mapsUrl: maps("La Petite Venise Colmar"),
        },
        {
          id: "d3-estrasburgo",
          type: "visit",
          title: "Estrasburgo · Catedral y Petite France",
          desc: "La puerta a la Selva Negra. El barrio de La Petite France es puro escenario de cuento; la catedral gótica es espectacular (subid a la plataforma si hay tiempo).",
          order: "Catedral → barrio Petite France → canales al atardecer.",
          transport: "Deja la furgo en el P+R Elsau: aparcas barato y el ticket incluye el tranvía de ida y vuelta al centro para todos los ocupantes.",
          cost: [{ label: "P+R Elsau (parking + tranvía)", amount: "~5-6 €" }],
          mapsUrl: maps("Cathédrale Strasbourg"),
        },
        {
          id: "d3-pernocta",
          type: "sleep",
          title: "Pernocta: Estrasburgo",
          desc: "Camping de Strasbourg (Montagne Verte) con tranvía directo al centro. Si está lleno, el propio P+R Elsau permite pernocta de tránsito (ruidoso pero legal y barato).",
          parking: {
            name: "Camping de Strasbourg (Montagne Verte)",
            mapsUrl: maps("Camping de Strasbourg Montagne Verte"),
            park4night: true,
            note: "Este conviene mirarlo la víspera. Alternativa: P+R Elsau.",
          },
        },
      ],
    },
    // ---------------------------------------------------------------- D4
    {
      id: "d4",
      n: 4,
      weekday: "Martes",
      phase: "Selva Negra + Motor",
      title: "Selva Negra",
      summary: "Cascadas y relojes de cuco ➔ Stuttgart",
      cover: img("photo-1516298098367-26eb4b84d432"),
      drive: "~3 h repartido",
      headsUp: [
        "Mañana, Museo Porsche: abre a las 9:00 y la taquilla cierra a las 17:30. Llegad pronto para dedicarle 3-4 h.",
        "No metáis la furgo al centro de Stuttgart (tráfico y cuestas): dejadla en Cannstatter Wasen y subid en S-Bahn.",
      ],
      stops: [
        {
          id: "d4-frontera",
          type: "warning",
          title: "Entráis en Alemania",
          desc: "¡Bienvenidos! A partir de aquí necesitáis la pegatina verde (Umweltplakette) para entrar en zonas de bajas emisiones (Stuttgart, Múnich…). Ver sección Logística.",
          tips: ["En la Autobahn sin límite, mirad DOS veces el retrovisor antes de adelantar: vienen coches a 200 km/h."],
        },
        {
          id: "d4-gengenbach",
          type: "visit",
          title: "Gengenbach",
          desc: "Pueblo de cuento absoluto (se usó como escenario de 'Charlie y la Fábrica de Chocolate'). Casco antiguo de entramado, muy tranquilo.",
          order: "Aparcar a la entrada → plaza del mercado → puerta Kinzigtor.",
          clothing: "Calzado cómodo.",
          mapsUrl: maps("Gengenbach Altstadt"),
        },
        {
          id: "d4-triberg",
          type: "visit",
          title: "Triberg · Cascadas y cucos",
          desc: "Las cascadas más altas de Alemania accesibles a pie y los relojes de cuco más grandes del mundo. Turístico pero resultón. Si os cansa, alternativa escénica: la carretera B500 (Schwarzwaldhochstraße) y el Mummelsee.",
          order: "Parking a la entrada → recorrido de las cascadas (subida suave) → tiendas de cucos.",
          cost: [
            { label: "Entrada cascadas", amount: "~7-8 €/adulto" },
            { label: "Parking", amount: "~3-4 €" },
          ],
          clothing: "Calzado con algo de agarre (el sendero se moja).",
          mapsUrl: maps("Triberg Wasserfälle"),
        },
        {
          id: "d4-pernocta",
          type: "sleep",
          title: "Pernocta: Stuttgart (Cannstatter Wasen)",
          desc: "Explanada gigante de la feria, muy cerca del centro. Sin lujos pero casi siempre hay sitio y estáis en la ciudad.",
          parking: {
            name: "Stellplatz Cannstatter Wasen",
            mapsUrl: maps("Wohnmobil Stellplatz Cannstatter Wasen Stuttgart"),
            park4night: true,
            note: "Desde aquí podéis ir al museo en transporte público sin mover la furgo.",
          },
        },
      ],
    },
    // ---------------------------------------------------------------- D5
    {
      id: "d5",
      n: 5,
      weekday: "Miércoles",
      phase: "Selva Negra + Motor",
      title: "Ingeniería y medievo",
      summary: "Museo Porsche ➔ Rothenburg",
      cover: img("photo-1535970793482-07de93762dc4"),
      drive: "~1,5 h (Stuttgart ➔ Rothenburg)",
      headsUp: [
        "Rothenburg es mucho más mágico de noche, cuando se van los autobuses turísticos: aprovechad el paseo nocturno hoy.",
      ],
      stops: [
        {
          id: "d5-porsche",
          type: "visit",
          title: "Museo Porsche",
          desc: "El templo del motor: arquitectura brutal y una colección impresionante. Dedicadle 3-4 h. (Bonus para fanáticos: el Museo Mercedes-Benz también está en Stuttgart y con la entrada de uno tenéis 25% de descuento en el otro.)",
          order: "Llegad a la apertura (9:00) para evitar grupos.",
          cost: [
            { label: "Entrada adulto", amount: "~12 € (reducida ~6 €)" },
          ],
          transport: "Desde Cannstatter Wasen, S-Bahn hasta la parada Neuwirtshaus/Porscheplatz (justo en la puerta). Evita mover la furgo por el tráfico y las cuestas de Stuttgart.",
          tips: [
            "⚠️ CIERRA LOS LUNES. En esta ruta cae en miércoles, perfecto.",
            "Horario: 9:00–18:00 (taquilla hasta 17:30).",
          ],
          mapsUrl: maps("Porsche Museum Stuttgart"),
        },
        {
          id: "d5-rothenburg-noche",
          type: "visit",
          title: "Rothenburg ob der Tauber (de noche)",
          desc: "La joya de la Ruta Romántica: el pueblo medieval mejor conservado de Alemania. Murallas transitables, casas de colores, adoquines. De noche, cuando se van los autobuses, es mágico.",
          order: "Plönlein (el rincón más fotografiado) → Marktplatz → paseo por la muralla.",
          clothing: "Sudadera: al anochecer refresca aunque sea verano.",
          mapsUrl: maps("Plönlein Rothenburg ob der Tauber"),
        },
        {
          id: "d5-pernocta",
          type: "sleep",
          title: "Pernocta: Rothenburg (Parkplatz P2)",
          desc: "Parking mixto con zona reservada para autocaravanas, baños públicos y máquina de pago. Muy céntrico: perfecto para el paseo nocturno sin reservar.",
          parking: {
            name: "Parkplatz P2, Rothenburg",
            mapsUrl: maps("Parkplatz P2 Rothenburg ob der Tauber"),
            park4night: true,
            note: "Alternativa: Camping Tauberromantik.",
          },
        },
      ],
    },
    // ---------------------------------------------------------------- D6
    {
      id: "d6",
      n: 6,
      weekday: "Jueves",
      phase: "Franconia + Baviera",
      title: "El peso de la historia",
      summary: "Rothenburg ➔ Bamberg ➔ Núremberg",
      cover: img("photo-1589881738899-878f9c1c2c1e"),
      drive: "~2,5 h repartido",
      stops: [
        {
          id: "d6-rothenburg-manana",
          type: "visit",
          title: "Mañana en Rothenburg",
          desc: "Desayuno tranquilo y subid a la muralla con la luz de la mañana. Comprad una 'Schneeball' (bola de nieve), el dulce típico.",
          clothing: "Calzado cómodo para la muralla.",
          mapsUrl: maps("Rothenburg ob der Tauber Stadtmauer"),
        },
        {
          id: "d6-bamberg",
          type: "visit",
          title: "Bamberg (por defecto)",
          desc: "Uno de los cascos más bonitos de Alemania (UNESCO): el Altes Rathaus plantado sobre una isla en el río, la 'Pequeña Venecia' de casas de pescadores y la catedral. Cuna de la cerveza ahumada (Rauchbier).",
          order: "Altes Rathaus → Klein Venedig → catedral → una Rauchbier en Schlenkerla.",
          cost: [{ label: "Rauchbier (Schlenkerla)", amount: "~4-5 €" }],
          tips: [
            "🃏 COMODÍN: si ese día vais cansados, saltad Bamberg y meted Regensburg mañana de camino a Múnich (queda casi de paso).",
          ],
          mapsUrl: maps("Altes Rathaus Bamberg"),
        },
        {
          id: "d6-nuremberg",
          type: "visit",
          title: "Núremberg · Casco antiguo",
          desc: "Murallas, castillo imperial en lo alto y casco antiguo peatonal precioso. Paseo de tarde.",
          order: "Kaiserburg (castillo imperial) → Hauptmarkt → casa de Durero.",
          mapsUrl: maps("Kaiserburg Nürnberg"),
        },
        {
          id: "d6-pernocta",
          type: "sleep",
          title: "Pernocta: Volkspark Marienberg",
          desc: "Parking público tranquilo bajo los árboles donde se toleran muchas autocaravanas. Sin servicios pero con mucha sombra.",
          parking: {
            name: "Volkspark Marienberg, Núremberg",
            mapsUrl: maps("Volkspark Marienberg Nürnberg Wohnmobil"),
            park4night: true,
          },
        },
      ],
    },
    // ---------------------------------------------------------------- D7
    {
      id: "d7",
      n: 7,
      weekday: "Viernes",
      phase: "Franconia + Baviera",
      title: "Rumbo a la capital bávara",
      summary: "Núremberg ➔ Múnich",
      cover: img("photo-1595867865312-7c0b57a1fd90"),
      drive: "~1,5-2 h (Núremberg ➔ Múnich)",
      headsUp: [
        "Múnich tiene zona de bajas emisiones: aseguraos de llevar la pegatina verde antes de acercaros al centro.",
        "Llegad al camping/Stellplatz de Múnich pronto (en agosto se llenan).",
      ],
      stops: [
        {
          id: "d7-zeppelin",
          type: "visit",
          title: "Campo Zeppelín (opcional)",
          desc: "Para amantes de la historia del s. XX: la arquitectura megalómana del régimen nazi y el centro de documentación. Impresionante y escalofriante.",
          cost: [{ label: "Centro de documentación", amount: "~6 €" }],
          mapsUrl: maps("Zeppelinfeld Nürnberg"),
        },
        {
          id: "d7-regensburg",
          type: "visit",
          title: "Regensburg (alternativa a Bamberg)",
          desc: "Si NO hicisteis Bamberg, parad aquí de camino: la mayor ciudad medieval intacta de Alemania sobre el Danubio. Puente de piedra del s. XII y la Wurstkuchl, la salchichería más antigua del mundo.",
          order: "Puente de piedra (Steinerne Brücke) → catedral → comer en la Wurstkuchl.",
          cost: [{ label: "Salchichas en la Wurstkuchl", amount: "~10 €" }],
          mapsUrl: maps("Steinerne Brücke Regensburg"),
        },
        {
          id: "d7-warning-munich",
          type: "warning",
          title: "Pegatina verde para Múnich",
          desc: "Múnich tiene zona de bajas emisiones (Umweltzone). Necesitáis la pegatina verde para entrar al centro; multa 100 € si no. Ver Logística.",
        },
        {
          id: "d7-pernocta",
          type: "sleep",
          title: "Pernocta: Múnich (Camp base, noche 1)",
          desc: "Camping Thalkirchen: el mítico, junto al río Isar y el zoo, con metro al centro. No es lujoso pero es 'el sitio'. En agosto llega pronto (antes de 16-17h).",
          parking: {
            name: "Camping Thalkirchen (München)",
            mapsUrl: maps("Camping Thalkirchen München"),
            park4night: true,
            note: "Alternativa: Stellplatz del Allianz Arena (feo pero seguro, con metro) los días sin partido.",
          },
        },
      ],
    },
    // ---------------------------------------------------------------- D8
    {
      id: "d8",
      n: 8,
      weekday: "Sábado",
      phase: "Franconia + Baviera",
      title: "Múnich vibes",
      summary: "Día completo SIN conducir",
      cover: img("photo-1517942464319-21453dd8d824"),
      drive: "Día de descanso (metro/bici)",
      headsUp: [
        "Mañana pisáis autopista austriaca (Salzburgo): comprad HOY la viñeta de 10 días (12,80 €) en shop.asfinag.at con validez inmediata, o en una gasolinera antes de la frontera.",
      ],
      stops: [
        {
          id: "d8-transporte",
          type: "transport",
          title: "Al centro sin la furgo",
          desc: "Dejad la furgo en el camping y coged el metro (U3 desde Thalkirchen) o la bici hasta Marienplatz. Día de disfrutar sin conducir.",
          cost: [{ label: "Metro (billete día / grupo)", amount: "~9 € individual · ~17 € grupo hasta 5" }],
          transport: "U3 Thalkirchen → Marienplatz (~15 min).",
        },
        {
          id: "d8-centro",
          type: "visit",
          title: "Marienplatz y Viktualienmarkt",
          desc: "El corazón de Múnich: el carillón (Glockenspiel) del ayuntamiento nuevo y el mercado gourmet de Viktualienmarkt para picar.",
          order: "Glockenspiel (suena 11:00 y 12:00) → Viktualienmarkt → Frauenkirche.",
          mapsUrl: maps("Marienplatz München"),
        },
        {
          id: "d8-eisbach",
          type: "visit",
          title: "Ola del Eisbach + Jardín Inglés",
          desc: "Surfistas surfeando una ola fija en pleno centro, en el Jardín Inglés. Hipnótico. El parque es enorme y perfecto para tumbarse.",
          mapsUrl: maps("Eisbachwelle München"),
        },
        {
          id: "d8-isar",
          type: "swim",
          title: "Baño en el Isar",
          desc: "El plan local por excelencia en verano: tirarse al río Isar y dejarse llevar por la corriente. Divertido y social.",
          clothing: "Bañador y chanclas. El agua baja fresca y con fuerza: cuidado con la corriente.",
          tips: ["Zonas populares: Flaucher (¡cerca del camping Thalkirchen!)."],
          mapsUrl: maps("Flaucher Isar München"),
        },
        {
          id: "d8-biergarten",
          type: "eat",
          title: "Biergarten Torre China / Hofbräuhaus",
          desc: "Cerrad el día con codillo, Pretzel y una cerveza de litro (Maß) en el Biergarten de la Torre China del Jardín Inglés, o en el turístico Hofbräuhaus.",
          cost: [{ label: "Maß (1 L de cerveza)", amount: "~10-12 €" }],
          mapsUrl: maps("Chinesischer Turm Biergarten München"),
        },
        {
          id: "d8-pernocta",
          type: "sleep",
          title: "Pernocta: Múnich (noche 2)",
          desc: "Repetís campo base. Descanso merecido.",
          parking: {
            name: "Camping Thalkirchen",
            mapsUrl: maps("Camping Thalkirchen München"),
          },
        },
      ],
    },
    // ---------------------------------------------------------------- D9
    {
      id: "d9",
      n: 9,
      weekday: "Domingo",
      phase: "Alpes y lagos",
      title: "Sonrisas y lágrimas",
      summary: "Múnich ➔ Salzburgo (Austria)",
      cover: img("photo-1516550893923-42d28e5677af"),
      drive: "~1,5-2 h",
      headsUp: [
        "Mañana MADRUGAD para el Königssee: coged uno de los primeros barcos (~8:00-9:00) para evitar colas y masificación.",
        "Llegad pronto al sitio de pernocta de Berchtesgaden.",
      ],
      stops: [
        {
          id: "d9-vineta",
          type: "warning",
          title: "Viñeta austriaca",
          desc: "Para llegar a Salzburgo pisaréis autopista austriaca. Comprad la viñeta de 10 días (12,80 € en 2026): digital en shop.asfinag.at con validez inmediata, o pegatina en gasolinera antes de la frontera. Ver Logística.",
        },
        {
          id: "d9-chiemsee",
          type: "swim",
          title: "Lago Chiemsee (opcional)",
          desc: "A medio camino, buen sitio para estirar las piernas o darse un baño en el 'mar bávaro'.",
          clothing: "Bañador si apetece chapuzón.",
          mapsUrl: maps("Chiemsee Prien"),
        },
        {
          id: "d9-salzburgo",
          type: "visit",
          title: "Salzburgo",
          desc: "La ciudad de Mozart y de 'Sonrisas y lágrimas'. Fortaleza blanca dominando la ciudad, calles señoriales y jardines de Mirabell.",
          order: "Getreidegasse (calle comercial histórica) → jardines de Mirabell → subida a la fortaleza Hohensalzburg (funicular) para las vistas.",
          cost: [{ label: "Funicular + fortaleza", amount: "~14-16 €" }],
          clothing: "Calzado cómodo; para la fortaleza, algo de abrigo si sube el viento.",
          mapsUrl: maps("Festung Hohensalzburg"),
        },
        {
          id: "d9-pernocta",
          type: "sleep",
          title: "Pernocta: Salzburgo / Berchtesgaden",
          desc: "Área automática en Salzburgo, o avanzad ya hacia Berchtesgaden para tener el Königssee al lado mañana.",
          parking: {
            name: "Stellplatz Salzburg (Carl-Zuckmayer-Str.) o zona Berchtesgaden",
            mapsUrl: maps("Reisemobil Stellplatz Salzburg"),
            park4night: true,
            note: "Si está lleno, buscad una granja 'Landvergnügen' en las afueras.",
          },
        },
      ],
    },
    // ---------------------------------------------------------------- D10
    {
      id: "d10",
      n: 10,
      weekday: "Lunes",
      phase: "Alpes y lagos",
      title: "El fiordo alpino",
      summary: "Königssee, Ramsau y Hintersee",
      cover: img("photo-1550587060-1d37c2c6174f"),
      drive: "Casi sin conducir (todo a 20-30 min)",
      stops: [
        {
          id: "d10-koenigssee",
          type: "visit",
          title: "Königssee + Obersee",
          desc: "El lago más espectacular de Alemania, encajonado entre paredes verticales (recuerda a Noruega). Barco eléctrico silencioso hasta la iglesia de St. Bartholomä y, al fondo, el Obersee.",
          order: "Llegad temprano (antes de 9:30) → barco hasta Salet → caminata corta al Obersee (agua como un espejo) → vuelta parando en St. Bartholomä.",
          cost: [
            { label: "Barco ida/vuelta a Salet (Obersee)", amount: "~29,80 € adulto" },
            { label: "Solo hasta St. Bartholomä (i/v)", amount: "~21-22 €" },
            { label: "Parking Schönau", amount: "~5-6 €" },
          ],
          clothing: "Chaqueta ligera (en el agua refresca) y calzado cómodo. Bañador opcional: en el Obersee hay rincones para mojarse, el agua está helada.",
          tips: ["Es el plan estrella del día: madrugad para evitar colas del barco."],
          mapsUrl: maps("Königssee Schönau am Königssee"),
        },
        {
          id: "d10-ramsau",
          type: "visit",
          title: "Ramsau · Iglesia de St. Sebastian",
          desc: "LA postal icónica de Baviera: la iglesita de Ramsau con el arroyo Ramsauer Ache y el macizo del Watzmann de fondo. A 15-20 min del Königssee.",
          order: "Foto desde el puentecito de madera detrás de la iglesia.",
          mapsUrl: maps("Kirche St. Sebastian Ramsau bei Berchtesgaden"),
        },
        {
          id: "d10-hintersee",
          type: "walk",
          title: "Hintersee y Zauberwald",
          desc: "Un lago pequeño y de ensueño con el 'bosque mágico' (Zauberwald). Paseo llano y fácil bordeando el agua, ideal para desconectar.",
          clothing: "Calzado cómodo; repelente de mosquitos al atardecer.",
          mapsUrl: maps("Hintersee Ramsau bei Berchtesgaden"),
        },
        {
          id: "d10-pernocta",
          type: "sleep",
          title: "Pernocta: Berchtesgaden",
          desc: "Zona tranquila para dormir cerca de todo lo del día.",
          parking: {
            name: "Stellplatz / camping zona Berchtesgaden",
            mapsUrl: maps("Wohnmobil Stellplatz Berchtesgaden"),
            park4night: true,
          },
        },
      ],
    },
    // ---------------------------------------------------------------- D11
    {
      id: "d11",
      n: 11,
      weekday: "Martes",
      phase: "Alpes y lagos",
      title: "Lagos turquesa",
      summary: "Walchensee + Geroldsee ➔ Eibsee",
      cover: img("photo-1576510229880-49b27868d89d"),
      drive: "~3 h repartido (ruta escénica)",
      headsUp: [
        "Mañana id TEMPRANO a Neuschwanstein y al Marienbrücke: se masifica muchísimo a media mañana.",
        "Comprobad en hohenschwangau.de que el puente Marienbrücke esté abierto ese día (cierran por viento/obras).",
        "Recordad: solo veréis el castillo por fuera (sin reserva de interior).",
      ],
      stops: [
        {
          id: "d11-walchensee",
          type: "swim",
          title: "Walchensee",
          desc: "El mejor lago turquesa para bañarse de la ruta, de camino al oeste por la Alpenstraße. Aguas azul intenso rodeadas de montañas.",
          order: "Parad en la orilla de Urfeld o Walchensee (pueblo) → baño y picnic.",
          cost: [{ label: "Parking orilla", amount: "~3-5 €" }],
          clothing: "Bañador, toalla y chanclas. El agua es fría pero deliciosa en agosto.",
          mapsUrl: maps("Walchensee Baden Urfeld"),
        },
        {
          id: "d11-geroldsee",
          type: "visit",
          title: "Geroldsee (Wagenbrüchsee)",
          desc: "Parada foto rápida: pequeño lago con el reflejo perfecto del macizo del Karwendel. Cerca de Krün/Gerold.",
          clothing: "Nada especial; 20 min de parada.",
          mapsUrl: maps("Geroldsee Wagenbrüchsee Krün"),
        },
        {
          id: "d11-eibsee",
          type: "swim",
          title: "Eibsee",
          desc: "El 'Caribe bávaro': aguas turquesas cristalinas al pie del Zugspitze (la montaña más alta de Alemania). De los mejores baños del viaje.",
          order: "Parking del Eibsee → sendero circular fácil (~7 km) o directamente a bañarse en una de sus calas.",
          cost: [
            { label: "Parking Eibsee", amount: "~9-10 €/día" },
            { label: "Barca/paddle surf (opcional)", amount: "~15-20 €/h" },
          ],
          clothing: "Bañador. Alquilad una barca de remos o paddle surf si apetece.",
          tips: ["Opción cara pero brutal: subir al Zugspitze en teleférico desde el Eibsee (~66 €)."],
          mapsUrl: maps("Eibsee Grainau"),
        },
        {
          id: "d11-pernocta",
          type: "sleep",
          title: "Pernocta: Garmisch / Grainau",
          desc: "Dormid cerca de Garmisch para tener la Partnachklamm a primera hora mañana.",
          parking: {
            name: "Stellplatz zona Garmisch-Partenkirchen / Grainau",
            mapsUrl: maps("Wohnmobil Stellplatz Garmisch-Partenkirchen"),
            park4night: true,
          },
        },
      ],
    },
    // ---------------------------------------------------------------- D12
    {
      id: "d12",
      n: 12,
      weekday: "Miércoles",
      phase: "Alpes y lagos",
      title: "Disney en la vida real",
      summary: "Partnachklamm ➔ Neuschwanstein",
      cover: img("photo-1533052664743-2754913b0c1c"),
      drive: "~1 h (Garmisch ➔ Füssen)",
      headsUp: [
        "Mañana empieza la vuelta: cruzad por Bregenz (Austria), NO por autopista suiza (su viñeta cuesta 40 € y solo es anual).",
      ],
      stops: [
        {
          id: "d12-partnachklamm",
          type: "walk",
          title: "Partnachklamm",
          desc: "Garganta espectacular: el río Partnach ha excavado un desfiladero de 700 m con paredes de hasta 80 m, cascadas y túneles tallados en la roca. Se recorre por un sendero pegado a la pared.",
          order: "Aparcar en el Skistadion (estadio olímpico) → ~20-25 min de paseo llano hasta la entrada → ~20-30 min por la garganta → volver.",
          cost: [
            { label: "Entrada garganta", amount: "~7 € adulto" },
            { label: "Parking Skistadion", amount: "~5-6 €" },
          ],
          clothing: "Chubasquero o capa fina (dentro se moja y refresca) y calzado con agarre.",
          tips: ["🃏 Si el día 11 quedó muy lleno, la Partnachklamm es el plan 'prescindible': podéis cambiarla por una mañana tranquila."],
          mapsUrl: maps("Partnachklamm Garmisch-Partenkirchen"),
        },
        {
          id: "d12-neuschwanstein",
          type: "visit",
          title: "Neuschwanstein (exterior) + Marienbrücke",
          desc: "El castillo del 'Rey Loco' Luis II, el que inspiró a Disney. Vais a verlo por fuera (sin reserva de interior). La foto icónica es desde el puente Marienbrücke.",
          order: "Aparcar en Hohenschwangau → subir andando (~40 min) o en bus/coche de caballos → Marienbrücke para la foto.",
          cost: [
            { label: "Parking Hohenschwangau", amount: "~10 €/día" },
            { label: "Bus lanzadera de subida (opcional)", amount: "~3-4 €" },
          ],
          clothing: "Calzado cómodo para la subida; sudadera arriba.",
          tips: [
            "Id TEMPRANO: se masifica muchísimo y la Marienbrücke se llena.",
            "Comprobad en hohenschwangau.de si la Marienbrücke está abierta ese día (cierran por viento/obras).",
          ],
          mapsUrl: maps("Marienbrücke Neuschwanstein"),
        },
        {
          id: "d12-alpsee",
          type: "swim",
          title: "Alpsee",
          desc: "El lago cristalino que está JUSTO debajo de los castillos. Aguas limpísimas y praderas para tumbarse: mejor baño que el Forggensee y sin moverte de la zona.",
          clothing: "Bañador y toalla.",
          mapsUrl: maps("Alpsee Hohenschwangau"),
        },
        {
          id: "d12-lechfall",
          type: "visit",
          title: "Lechfall (Füssen)",
          desc: "Parada de 10 min al borde de Füssen: una cascada y garganta de agua turquesa con un puente para la foto.",
          mapsUrl: maps("Lechfall Füssen"),
        },
        {
          id: "d12-pernocta",
          type: "sleep",
          title: "Pernocta: Füssen",
          desc: "Área grande con supermercados cerca. Suele haber rotación; llegad por la tarde.",
          parking: {
            name: "Wohnmobilplatz Füssen (Abt-Hafner-Straße)",
            mapsUrl: maps("Wohnmobilplatz Füssen Abt-Hafner-Straße"),
            park4night: true,
            note: "Alternativa relax: Camping Hopfensee (con spa/piscina) si queréis un día de lujo.",
          },
        },
      ],
    },
    // ---------------------------------------------------------------- D13
    {
      id: "d13",
      n: 13,
      weekday: "Jueves",
      phase: "El retorno",
      title: "El gran lago",
      summary: "Lindau ➔ Francia",
      cover: img("photo-1656334381540-f222d65b1222"),
      drive: "Día largo (empieza la vuelta)",
      stops: [
        {
          id: "d13-lindau",
          type: "visit",
          title: "Lindau",
          desc: "Isla-ciudad en el Lago Constanza (Bodensee). La entrada al puerto con el león de Baviera y el faro es preciosa. Paseo y despedida de Alemania.",
          order: "Paseo del puerto (león + faro) → casco antiguo → café con vistas.",
          mapsUrl: maps("Lindau Hafen Löwe Leuchtturm"),
        },
        {
          id: "d13-suiza-warning",
          type: "warning",
          title: "Cruzad por Bregenz, NO por Suiza",
          desc: "Para volver, cruzad por Bregenz (Austria) en lugar de meteros en autopista suiza: la viñeta suiza cuesta 40 € y solo es anual. Con la viñeta austriaca que ya tenéis os basta.",
        },
        {
          id: "d13-pernocta",
          type: "sleep",
          title: "Pernocta: Besançon / Beaune",
          desc: "Parada técnica a medio camino en Francia.",
          parking: {
            name: "Aire de camping-car (Besançon o Beaune)",
            mapsUrl: maps("Aire camping car Besançon"),
            park4night: true,
          },
        },
      ],
    },
    // ---------------------------------------------------------------- D14
    {
      id: "d14",
      n: 14,
      weekday: "Viernes",
      phase: "El retorno",
      title: "La despedida",
      summary: "Francia ➔ País Vasco",
      cover: img("photo-1569388330292-7a6a841d89bd"),
      drive: "~6 h (~600 km)",
      stops: [
        {
          id: "d14-ruta",
          type: "drive",
          title: "Cruzar Francia hacia el suroeste",
          desc: "Día de kilómetros hacia la frontera. Turnaos y parad a comer con calma.",
          tips: ["Si vais con tiempo, la zona de los Volcanes de Auvernia es una parada bonita para estirar las piernas."],
        },
        {
          id: "d14-cena",
          type: "eat",
          title: "Cena de homenaje",
          desc: "Cerrad el viaje a lo grande: unos pintxos en Donosti o una sidrería en la frontera.",
          mapsUrl: maps("Parte Vieja Donostia San Sebastián"),
        },
        {
          id: "d14-pernocta",
          type: "sleep",
          title: "Pernocta: Behobia / San Juan de Luz",
          desc: "Área de autocaravanas antes del tramo final a Madrid.",
          parking: {
            name: "Área de Behobia / San Juan de Luz",
            mapsUrl: maps("Área autocaravanas Behobia"),
            park4night: true,
          },
        },
      ],
    },
    // ---------------------------------------------------------------- D15
    {
      id: "d15",
      n: 15,
      weekday: "Sábado",
      phase: "El retorno",
      title: "Home sweet home",
      summary: "País Vasco ➔ Madrid",
      cover: img("photo-1473163928189-364b2c4e1133"),
      drive: "~4-5 h",
      stops: [
        {
          id: "d15-final",
          type: "drive",
          title: "Tramo final a Madrid",
          desc: "Últimas horas de furgo (vía Burgos). Despedida de los amigos asturianos, que se desvían al oeste. Llegada a Madrid.",
          tips: ["Descargar, limpiar la furgo y… ¡a presumir del viajazo! 🚐💨"],
        },
      ],
    },
  ],
};
