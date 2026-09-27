import { useState } from "react";
import { Phone, Menu, X, Facebook, Instagram, Youtube } from "lucide-react";
import { CONTACT, SOCIAL, useLang, type TKey } from "@/lib/i18n";
import logo from "@/assets/logo.png.asset.json";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.5a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

const socials = [
  { href: SOCIAL.facebook, label: "Facebook", Icon: Facebook, color: "#1877F2" },
  { href: SOCIAL.instagram, label: "Instagram", Icon: Instagram, color: "#E1306C" },
  { href: SOCIAL.youtube, label: "YouTube", Icon: Youtube, color: "#FF0000" },
  { href: SOCIAL.tiktok, label: "TikTok", Icon: TikTokIcon, color: "#FFFFFF" },
];

const links: { id: string; key: TKey; page?: boolean }[] = [
  { id: "services", key: "nav.services" },
  { id: "gallery", key: "nav.gallery" },
  { id: "why", key: "nav.why" },
  { id: "reviews", key: "nav.reviews" },
  { id: "contact", key: "nav.contact" },
  { id: "trabaja-con-nosotros", key: "nav.work", page: true },
];

export function Header() {
  const { t, lang, setLang } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-surface-strong/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href="/" className="flex flex-shrink-0 items-center gap-3">
          <img
            src={logo.url}
            alt="856 New Generation Concrete LLC"
            className="h-10 w-10 object-contain"
          />
          <span className="leading-tight">
            <span className="block font-display text-base font-bold uppercase tracking-wide sm:text-lg">
              New Generation
            </span>
            <span className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground sm:text-[11px]">
              Concrete LLC
            </span>
          </span>
        </a>

        <div className="hidden flex-1 items-center justify-center gap-1 sm:flex">
          {socials.map(({ href, label, Icon, color }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm p-2 transition-transform hover:scale-110"
              style={{ color }}
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>

        <div className="flex flex-shrink-0 items-center gap-2 lg:gap-4">
          <nav className="hidden items-center gap-7 lg:flex">
            {links.map((l) => (
              <a
                key={l.id}
                href={l.page ? `/${l.id}` : `/#${l.id}`}
                className="text-sm font-medium uppercase tracking-wide text-muted-foreground transition-colors hover:text-primary"
              >
                {t(l.key)}
              </a>
            ))}
          </nav>

          <div className="flex overflow-hidden rounded-sm border border-border">
            {(["en", "es"] as const).map((code) => (
              <button
                key={code}
                onClick={() => setLang(code)}
                aria-pressed={lang === code}
                className={`px-2.5 py-1.5 text-xs font-bold uppercase transition-colors ${
                  lang === code
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {code}
              </button>
            ))}
          </div>

          <a
            href={CONTACT.phoneHref}
            className="hidden items-center gap-2 rounded-sm border border-primary/60 px-3 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/10 sm:inline-flex"
          >
            <Phone className="h-4 w-4" />
            {t("cta.call")}
          </a>
          <a
            href="/#contact"
            className="hidden rounded-sm bg-primary px-4 py-2 text-sm font-bold uppercase tracking-wide text-primary-foreground transition-transform hover:-translate-y-0.5 md:inline-block"
          >
            {t("cta.quote")}
          </a>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="rounded-sm border border-border p-2 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-surface px-4 py-3 lg:hidden">
          {links.map((l) => (
            <a
              key={l.id}
              href={l.page ? `/${l.id}` : `/#${l.id}`}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm font-medium uppercase tracking-wide text-muted-foreground hover:text-primary"
            >
              {t(l.key)}
            </a>
          ))}
          <a
            href="/#contact"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-sm bg-primary px-4 py-2 text-center text-sm font-bold uppercase text-primary-foreground"
          >
            {t("cta.quote")}
          </a>
          <div className="mt-3 flex items-center justify-center gap-1 border-t border-border pt-3 sm:hidden">
            {socials.map(({ href, label, Icon, color }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm p-2 transition-transform hover:scale-110"
                style={{ color }}
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
