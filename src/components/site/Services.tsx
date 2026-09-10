import {
  Home,
  Sparkles,
  Route as RouteIcon,
  Waves,
  Layers,
  Building2,
} from "lucide-react";
import { useLang, type TKey } from "@/lib/i18n";

const services: { icon: typeof Home; t: TKey; d: TKey }[] = [
  { icon: Home, t: "svc.res.t", d: "svc.res.d" },
  { icon: Sparkles, t: "svc.stamp.t", d: "svc.stamp.d" },
  { icon: RouteIcon, t: "svc.drive.t", d: "svc.drive.d" },
  { icon: Waves, t: "svc.patio.t", d: "svc.patio.d" },
  { icon: Layers, t: "svc.found.t", d: "svc.found.d" },
  { icon: Building2, t: "svc.comm.t", d: "svc.comm.d" },
];

export function Services() {
  const { t } = useLang();
  return (
    <section id="services" className="border-y border-border bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="font-display text-4xl font-bold uppercase sm:text-5xl">
          {t("services.title")}
        </h2>
        <p className="mt-3 max-w-xl text-muted-foreground">{t("services.sub")}</p>

        <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, t: title, d }) => (
            <article
              key={title}
              className="group bg-card p-8 transition-colors hover:bg-accent"
            >
              <Icon className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
              <h3 className="mt-5 font-display text-xl font-bold uppercase">{t(title)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(d)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
