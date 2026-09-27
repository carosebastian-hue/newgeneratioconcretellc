import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, ArrowLeft } from "lucide-react";
import { LanguageProvider, CONTACT, useLang } from "@/lib/i18n";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import trabajos from "@/assets/trabajos.mp4.asset.json";

const title = "Trabaja con nosotros | 856 NEW GENERATION CONCRETE LLC";
const description =
  "Watch a real concrete project by 856 New Generation Concrete LLC in South Jersey. Free estimates — (856) 326-0465.";

export const Route = createFileRoute("/trabaja-con-nosotros")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Content() {
  const { t } = useLang();
  return (
    <main className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
      <div>
        <p className="mb-4 inline-block border-l-2 border-primary pl-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
          {t("work.eyebrow")}
        </p>
        <h1 className="font-display text-5xl font-bold uppercase leading-[0.95] sm:text-6xl">
          {t("work.title")}
        </h1>
        <p className="mt-6 max-w-lg text-lg text-muted-foreground">{t("work.text")}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={CONTACT.phoneHref} className="inline-flex items-center gap-2 rounded-sm border border-primary/60 px-5 py-3 font-semibold text-primary hover:bg-primary/10">
            <Phone className="h-4 w-4" /> {t("cta.call")}
          </a>
          <a href="/#contact" className="rounded-sm bg-primary px-5 py-3 font-bold uppercase tracking-wide text-primary-foreground hover:-translate-y-0.5 transition-transform">
            {t("cta.quote")}
          </a>
        </div>
        <Link to="/" className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> {t("work.back")}
        </Link>
      </div>
      <div className="mx-auto w-full max-w-sm overflow-hidden rounded-md border border-border bg-surface-strong shadow-2xl">
        <video src={trabajos.url} controls playsInline preload="metadata" className="aspect-[9/16] w-full object-cover" />
      </div>
    </main>
  );
}

function Page() {
  return (
    <LanguageProvider>
      <Header />
      <Content />
      <Footer />
    </LanguageProvider>
  );
}
