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

// Public Web3Forms access key (safe to expose; it only allows sending to the
// email it was created for). Get one at https://web3forms.com.
// While empty, the form falls back to opening the visitor's email app.
const WEB3FORMS_KEY: string = "b797828a-c327-4b74-9e93-1b83a477d805";

type Status = "idle" | "sending" | "sent" | "error";

export function QuoteForm() {
  const { t } = useLang();
  const [status, setStatus] = useState<Status>("idle");
  const direct = WEB3FORMS_KEY !== "";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const subject = `Estimate request — ${f.get("name")}`;

    if (!direct) {
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
        subject,
      )}&body=${encodeURIComponent(body)}`;
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject,
          from_name: "New Generation Concrete website",
          replyto: f.get("email"),
          Name: f.get("name"),
          Phone: f.get("phone"),
          Email: f.get("email"),
          Service: f.get("service"),
          Timeline: f.get("timeline"),
          Details: f.get("details"),
          botcheck: f.get("botcheck") ?? "",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) throw new Error("send failed");
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
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
            {t(direct ? "form.noteDirect" : "form.note")}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid gap-4 rounded-sm border border-border bg-card p-6 sm:grid-cols-2 sm:p-8"
        >
          <input
            type="checkbox"
            name="botcheck"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />
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
            disabled={status === "sending"}
            className="group inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60 sm:col-span-2"
          >
            {status === "sending" ? t("form.sending") : t("form.submit")}
            <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
          {status === "sent" && (
            <p className="text-sm font-semibold text-primary sm:col-span-2" role="status">
              {t(direct ? "form.success" : "form.note")}
            </p>
          )}
          {status === "error" && (
            <p className="text-sm font-semibold text-destructive sm:col-span-2" role="alert">
              {t("form.error")}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
