import { Star, Quote } from "lucide-react";
import { useLang, type TKey } from "@/lib/i18n";

const reviews: { q: TKey; n: TKey }[] = [
  { q: "rev.1", n: "rev.1n" },
  { q: "rev.2", n: "rev.2n" },
  { q: "rev.3", n: "rev.3n" },
];

export function Testimonials() {
  const { t } = useLang();
  return (
    <section id="reviews" className="border-y border-border bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="font-display text-4xl font-bold uppercase sm:text-5xl">
          {t("rev.title")}
        </h2>
        <p className="mt-3 max-w-xl text-muted-foreground">{t("rev.sub")}</p>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {reviews.map(({ q, n }) => (
            <figure
              key={q}
              className="relative rounded-sm border border-border bg-card p-7"
            >
              <Quote className="absolute right-5 top-5 h-8 w-8 text-primary/20" />
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <blockquote className="mt-4 text-sm leading-relaxed text-foreground/90">
                “{t(q)}”
              </blockquote>
              <figcaption className="mt-5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {t(n)}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
