import { Phone, Mail, MapPin } from "lucide-react";
import { CONTACT, useLang, type TKey } from "@/lib/i18n";

const links: { id: string; key: TKey }[] = [
  { id: "services", key: "nav.services" },
  { id: "gallery", key: "nav.gallery" },
  { id: "why", key: "nav.why" },
  { id: "reviews", key: "nav.reviews" },
  { id: "contact", key: "nav.contact" },
];

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="bg-surface-strong py-16">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-4">
        <div>
          <p className="font-display text-xl font-bold uppercase">{CONTACT.name}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {t("foot.about")}
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-primary">
            {t("foot.contact")}
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={CONTACT.phoneHref} className="flex items-center gap-2 hover:text-primary">
                <Phone className="h-4 w-4 text-primary" />
                {CONTACT.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-start gap-2 break-all hover:text-primary"
              >
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {CONTACT.email}
              </a>
            </li>
            <li className="flex items-start gap-2 text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              {t("foot.areaTxt")}
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-primary">
            {t("foot.links")}
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {links.map((l) => (
              <li key={l.id}>
                <a href={`/#${l.id}`} className="text-muted-foreground hover:text-primary">
                  {t(l.key)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-primary">
            {t("foot.hours")}
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>{t("foot.hours1")}</li>
            <li>{t("foot.hours2")}</li>
            <li>{t("foot.hours3")}</li>
          </ul>
          <h3 className="mt-6 font-display text-sm font-bold uppercase tracking-[0.2em] text-primary">
            {t("foot.area")}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">South Jersey / NJ</p>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-border px-4 pt-6 text-xs text-muted-foreground sm:px-6">
        © {new Date().getFullYear()} {CONTACT.name}. {t("foot.rights")}
      </div>
    </footer>
  );
}
