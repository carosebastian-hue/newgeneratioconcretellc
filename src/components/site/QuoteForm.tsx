import { useState, type FormEvent } from "react";
import { Send, Phone, Mail } from "lucide-react";
import { CONTACT, useLang, type TKey } from "@/lib/i18n";

const serviceKeys: TKey[] = [
  "svc.res.t",
  "svc.stamp.t",
  "svc.drive.t",
  "svc.patio.t",
  "svc.found.t",
  "svc.comm.t",
];

const timelineKeys: TKey[] = ["form.tl.asap", "form.tl.1m", "form.tl.3m", "form.tl.plan"];

const field =
  "w-full rounded-sm border border-input bg-surface-strong px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary";

export function QuoteForm() {
  const { t } = useLang();
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = [
      `${t("form.name")}: ${f.get("name")}`,
      `${t("form.phone")}: ${f.get("phone")}`,
      `${t("form.email")}: ${f.get("email")}`,
      `${t("form.service")}: ${f.get("service")}`,
      `${t("form.timeline")}: ${f.get("timeline")}`,
      "",
      `${t("form.details")}:`,
      String(f.get("details") ?? ""),
    ].join("\n");

    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      `Estimate request — ${f.get("name")}`,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <section id="contact" className="border-t border-border bg-surface py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <h2 className="font-display text-4xl font-bold uppercase sm:text-5xl">
            {t("form.title")}
          </h2>
          <p className="mt-3 text-muted-foreground">{t("form.sub")}</p>
          <div className="mt-8 space-y-4">
            <a
              href={CONTACT.phoneHref}
              className="flex items-center gap-3 text-lg font-semibold transition-colors hover:text-primary"
            >
              <Phone className="h-5 w-5 text-primary" />
              {CONTACT.phoneDisplay}
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="flex items-center gap-3 break-all text-sm transition-colors hover:text-primary"
            >
              <Mail className="h-5 w-5 shrink-0 text-primary" />
              {CONTACT.email}
            </a>
          </div>
          <p className="mt-8 max-w-sm text-xs leading-relaxed text-muted-foreground">
            {t("form.note")}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid gap-4 rounded-sm border border-border bg-card p-6 sm:grid-cols-2 sm:p-8"
        >
          <label className="block text-sm">
            <span className="mb-2 block font-semibold uppercase tracking-wide text-muted-foreground">
              {t("form.name")}
            </span>
            <input name="name" required className={field} />
          </label>
          <label className="block text-sm">
            <span className="mb-2 block font-semibold uppercase tracking-wide text-muted-foreground">
              {t("form.phone")}
            </span>
            <input name="phone" type="tel" required className={field} />
          </label>
          <label className="block text-sm sm:col-span-2">
            <span className="mb-2 block font-semibold uppercase tracking-wide text-muted-foreground">
              {t("form.email")}
            </span>
            <input name="email" type="email" required className={field} />
          </label>
          <label className="block text-sm">
            <span className="mb-2 block font-semibold uppercase tracking-wide text-muted-foreground">
              {t("form.service")}
            </span>
            <select name="service" required defaultValue="" className={field}>
              <option value="" disabled>
                {t("form.select")}
              </option>
              {serviceKeys.map((k) => (
                <option key={k} value={t(k)}>
                  {t(k)}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm">
            <span className="mb-2 block font-semibold uppercase tracking-wide text-muted-foreground">
              {t("form.timeline")}
            </span>
            <select name="timeline" required defaultValue="" className={field}>
              <option value="" disabled>
                {t("form.select")}
              </option>
              {timelineKeys.map((k) => (
                <option key={k} value={t(k)}>
                  {t(k)}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm sm:col-span-2">
            <span className="mb-2 block font-semibold uppercase tracking-wide text-muted-foreground">
              {t("form.details")}
            </span>
            <textarea name="details" rows={5} required className={field} />
          </label>
          <button
            type="submit"
            className="group inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-primary-foreground transition-transform hover:-translate-y-0.5 sm:col-span-2"
          >
            {t("form.submit")}
            <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
          {sent && (
            <p className="text-xs text-primary sm:col-span-2" role="status">
              {t("form.note")}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
