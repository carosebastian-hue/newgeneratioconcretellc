import { useEffect, useMemo, useState } from "react";
import { X, ZoomIn, ZoomOut, MapPin, Ruler, CalendarDays } from "lucide-react";
import driveway from "@/assets/gallery-driveway.jpg";
import stamped from "@/assets/gallery-stamped.jpg";
import foundation from "@/assets/gallery-foundation.jpg";
import wall from "@/assets/gallery-wall.jpg";
import commercial from "@/assets/gallery-commercial.jpg";
import pooldeck from "@/assets/gallery-pooldeck.jpg";
import sidewalk from "@/assets/gallery-sidewalk.jpg";
import walkway from "@/assets/gallery-walkway.jpg";
import { useLang, type TKey } from "@/lib/i18n";

type CatId = "driveways" | "stamped" | "foundations" | "walls" | "commercial";

type Project = {
  id: string;
  src: string;
  w: number;
  h: number;
  cat: CatId;
  title: { en: string; es: string };
  location: string;
  size: string;
  finish: { en: string; es: string };
  details: { en: string; es: string };
};

const projects: Project[] = [
  {
    id: "p1",
    src: driveway,
    w: 1024,
    h: 1280,
    cat: "driveways",
    title: { en: "Residential Driveway Replacement", es: "Reemplazo de entrada residencial" },
    location: "Vineland, NJ",
    size: "820 sq ft",
    finish: { en: "Broom finish, 4000 PSI", es: "Acabado escobillado, 4000 PSI" },
    details: {
      en: "Full tear-out of a cracked slab, new compacted base, fiber-reinforced pour with saw-cut control joints.",
      es: "Demolición total de la losa agrietada, nueva base compactada y vaciado reforzado con fibra y juntas cortadas.",
    },
  },
  {
    id: "p2",
    src: stamped,
    w: 1280,
    h: 960,
    cat: "stamped",
    title: { en: "Stamped Ashlar Slate Patio", es: "Patio estampado tipo pizarra" },
    location: "Cherry Hill, NJ",
    size: "480 sq ft",
    finish: { en: "Integral color + release, sealed", es: "Color integral y sellado" },
    details: {
      en: "Ashlar slate pattern with a soldier-course border, antiqued release and two coats of protective sealer.",
      es: "Patrón de pizarra con borde perimetral, envejecido y dos capas de sellador protector.",
    },
  },
  {
    id: "p3",
    src: foundation,
    w: 1280,
    h: 960,
    cat: "foundations",
    title: { en: "Structural Slab & Footings", es: "Losa estructural y zapatas" },
    location: "Bridgeton, NJ",
    size: "1,150 sq ft",
    finish: { en: "#4 rebar grid, 4500 PSI", es: "Malla de varilla #4, 4500 PSI" },
    details: {
      en: "Engineered footings with a rebar-tied monolithic slab, vapor barrier and machine-troweled finish.",
      es: "Zapatas diseñadas con losa monolítica amarrada con varilla, barrera de vapor y acabado con llana mecánica.",
    },
  },
  {
    id: "p4",
    src: wall,
    w: 1280,
    h: 1707,
    cat: "walls",
    title: { en: "Retaining Wall & Poured Steps", es: "Muro de contención y escalones" },
    location: "Glassboro, NJ",
    size: "38 linear ft",
    finish: { en: "Block wall, drainage backfill", es: "Muro de bloque, relleno drenante" },
    details: {
      en: "Terraced retaining wall with drainage stone and poured steps tied into the existing grade.",
      es: "Muro en terrazas con piedra de drenaje y escalones vaciados integrados al desnivel existente.",
    },
  },
  {
    id: "p5",
    src: commercial,
    w: 1280,
    h: 960,
    cat: "commercial",
    title: { en: "Warehouse Dock Apron", es: "Explanada de muelle de carga" },
    location: "Pennsauken, NJ",
    size: "6,200 sq ft",
    finish: { en: "Heavy-duty 5000 PSI, doweled", es: "Alta resistencia 5000 PSI, con pasadores" },
    details: {
      en: "Doweled panel layout rated for tractor-trailer traffic, poured in phases to keep the dock operating.",
      es: "Paneles con pasadores para tráfico de tráileres, vaciados por fases para no cerrar el muelle.",
    },
  },
  {
    id: "p6",
    src: pooldeck,
    w: 1280,
    h: 960,
    cat: "driveways",
    title: { en: "Textured Pool Deck", es: "Área de piscina texturizada" },
    location: "Millville, NJ",
    size: "740 sq ft",
    finish: { en: "Knockdown texture, slip-resistant", es: "Textura knockdown antideslizante" },
    details: {
      en: "Cool-tone overlay with a slip-resistant knockdown texture and expansion joints around the coping.",
      es: "Recubrimiento en tono claro con textura antideslizante y juntas de expansión alrededor del borde.",
    },
  },
  {
    id: "p7",
    src: sidewalk,
    w: 1024,
    h: 1280,
    cat: "commercial",
    title: { en: "Municipal Sidewalk & Curb", es: "Acera y bordillo municipal" },
    location: "Camden County, NJ",
    size: "310 linear ft",
    finish: { en: "ADA compliant, broom finish", es: "Cumple ADA, acabado escobillado" },
    details: {
      en: "Curb, gutter and sidewalk replacement with ADA-compliant ramps and detectable warning panels.",
      es: "Reemplazo de bordillo, cuneta y acera con rampas ADA y placas táctiles de advertencia.",
    },
  },
  {
    id: "p8",
    src: walkway,
    w: 1280,
    h: 960,
    cat: "stamped",
    title: { en: "Cobblestone Stamped Walkway", es: "Camino estampado tipo adoquín" },
    location: "Sewell, NJ",
    size: "210 sq ft",
    finish: { en: "Fan cobble stamp, charcoal accent", es: "Estampado abanico, acento carbón" },
    details: {
      en: "Curved front walk with a fan cobblestone stamp, charcoal antiquing and a matching poured landing.",
      es: "Camino curvo con estampado de adoquín en abanico, envejecido carbón y descanso vaciado a juego.",
    },
  },
];

const cats: { id: CatId | "all"; key: TKey }[] = [
  { id: "all", key: "gal.all" },
  { id: "driveways", key: "gal.driveways" },
  { id: "stamped", key: "gal.stamped" },
  { id: "foundations", key: "gal.foundations" },
  { id: "walls", key: "gal.walls" },
  { id: "commercial", key: "gal.commercial" },
];

export function Gallery() {
  const { t, lang } = useLang();
  const [active, setActive] = useState<CatId | "all">("all");
  const [open, setOpen] = useState<Project | null>(null);
  const [zoom, setZoom] = useState(false);

  const shown = useMemo(
    () => (active === "all" ? projects : projects.filter((p) => p.cat === active)),
    [active],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <section id="gallery" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="font-display text-4xl font-bold uppercase sm:text-5xl">
          {t("gal.title")}
        </h2>
        <p className="mt-3 max-w-xl text-muted-foreground">{t("gal.sub")}</p>

        <div className="mt-8 flex flex-wrap gap-2">
          {cats.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`rounded-sm border px-4 py-2 text-xs font-bold uppercase tracking-wide transition-colors ${
                active === c.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {t(c.key)}
            </button>
          ))}
        </div>

        <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {shown.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setZoom(false);
                setOpen(p);
              }}
              className="group relative block w-full break-inside-avoid overflow-hidden rounded-sm border border-border text-left"
            >
              <img
                src={p.src}
                alt={p.title[lang]}
                width={p.w}
                height={p.h}
                loading="lazy"
                className="w-full transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-surface-strong via-surface-strong/40 via-35% to-transparent transition-opacity" />
              <span className="absolute inset-x-0 bottom-0 p-5">
                <span className="block font-display text-lg font-bold uppercase leading-tight">
                  {p.title[lang]}
                </span>
                <span className="mt-1 block text-xs font-semibold uppercase tracking-wide text-primary">
                  {t("gal.view")}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={() => setOpen(null)}
        >
          <div
            className="relative grid max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-sm border border-border bg-card lg:grid-cols-[1.4fr_1fr]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[45vh] overflow-auto bg-surface-strong lg:max-h-[90vh]">
              <img
                src={open.src}
                alt={open.title[lang]}
                width={open.w}
                height={open.h}
                className={`w-full origin-top transition-transform duration-300 ${
                  zoom ? "scale-[1.8] cursor-zoom-out" : "cursor-zoom-in"
                }`}
                onClick={() => setZoom((z) => !z)}
              />
              <button
                onClick={() => setZoom((z) => !z)}
                aria-label={t("gal.zoom")}
                className="absolute bottom-3 left-3 rounded-sm bg-surface-strong/90 p-2 text-foreground"
              >
                {zoom ? <ZoomOut className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
              </button>
            </div>

            <div className="overflow-y-auto p-7">
              <h3 className="pr-8 font-display text-2xl font-bold uppercase leading-tight">
                {open.title[lang]}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {open.details[lang]}
              </p>
              <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                {t("gal.specs")}
              </p>
              <ul className="mt-3 space-y-3 text-sm">
                <li className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-primary" />
                  {open.location}
                </li>
                <li className="flex items-center gap-3">
                  <Ruler className="h-4 w-4 text-primary" />
                  {open.size}
                </li>
                <li className="flex items-center gap-3">
                  <CalendarDays className="h-4 w-4 text-primary" />
                  {open.finish[lang]}
                </li>
              </ul>
            </div>

            <button
              onClick={() => setOpen(null)}
              aria-label={t("gal.close")}
              className="absolute right-3 top-3 rounded-sm bg-surface-strong/90 p-2"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
