import { Phone, ShieldCheck, BadgeCheck, Hammer, ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import heroVideo from "@/assets/presentacion.mp4.asset.json";
import { CONTACT, useLang } from "@/lib/i18n";

export function Hero() {
  const { t } = useLang();

  return (
    <section id="top" className="relative overflow-hidden">
      <video
        src={heroVideo.url}
        poster={heroImg}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="Video of a concrete project by 856 New Generation Concrete"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-surface-strong via-surface-strong/90 to-surface-strong/30" />
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:py-36">
        <p className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
          {t("hero.eyebrow")}
        </p>
        <h1 className="max-w-3xl font-display text-5xl font-bold uppercase leading-[0.95] sm:text-6xl lg:text-7xl">
          {t("hero.title1")}{" "}
          <span className="text-primary">{t("hero.title2")}</span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {t("hero.sub")}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            {t("cta.quote")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href={CONTACT.phoneHref}
            className="inline-flex items-center gap-2 rounded-sm border border-border bg-surface/70 px-6 py-3.5 text-sm font-bold uppercase tracking-wide transition-colors hover:border-primary hover:text-primary"
          >
            <Phone className="h-4 w-4" />
            {CONTACT.phoneDisplay}
          </a>
        </div>

        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
          {[
            { icon: ShieldCheck, label: t("badge.licensed") },
            { icon: BadgeCheck, label: t("badge.free") },
            { icon: Hammer, label: t("badge.years") },
          ].map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-2 text-sm font-medium">
              <Icon className="h-5 w-5 text-primary" />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
