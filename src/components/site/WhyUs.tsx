import { Gem, Receipt, Clock, Wrench } from "lucide-react";
import { useLang, type TKey } from "@/lib/i18n";

const items: { icon: typeof Gem; t: TKey; d: TKey }[] = [
  { icon: Gem, t: "why.q.t", d: "why.q.d" },
  { icon: Receipt, t: "why.t.t", d: "why.t.d" },
  { icon: Clock, t: "why.o.t", d: "why.o.d" },
  { icon: Wrench, t: "why.c.t", d: "why.c.d" },
];

export function WhyUs() {
  const { t } = useLang();
  return (
    <section id="why" className="relative py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-40" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="font-display text-4xl font-bold uppercase sm:text-5xl">
          {t("why.title")}
        </h2>
        <p className="mt-3 max-w-xl text-muted-foreground">{t("why.sub")}</p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, t: title, d }, i) => (
            <div
              key={title}
              className="rounded-sm border border-border bg-card/80 p-6 transition-transform hover:-translate-y-1"
            >
              <span className="font-display text-sm font-bold text-primary">
                0{i + 1}
              </span>
              <Icon className="mt-4 h-7 w-7 text-primary" />
              <h3 className="mt-4 font-display text-lg font-bold uppercase">{t(title)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(d)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
