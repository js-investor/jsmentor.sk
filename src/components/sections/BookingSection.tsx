import { Mail, Phone } from "lucide-react";
import { FormEvent, useState } from "react";
import type { ReactNode } from "react";
import CtaResponseNote from "@/components/CtaResponseNote";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import ivanBookingImage from "@/assets/images/jsinvestor-biznis-portret-ivan-interier-svetlo.jpg";

const MAKE_WEBHOOK_URL = import.meta.env.VITE_MAKE_WEBHOOK_URL;

type BookingSectionProps = {
  heading?: ReactNode;
  subheading?: ReactNode;
  bullets?: string[];
  variant?: "fullGreen" | "cardOnLight";
  /** `vy` len na homepage; /konzultacia a ostatné nechávajú predvolené `ty`. */
  addressing?: "ty" | "vy";
};

const BookingSection = ({
  heading = (
    <>
      <span className="text-[#d4dfdb] font-bold">Si pripravený</span>{" "}
      <span className="text-cream">
        budovať <br className="sm:hidden" />
        svoj majetok?
      </span>
    </>
  ),
  subheading = (
    <>
      Vyplň formulár a rezervuj si <strong>bezplatný online hovor.</strong> Trvá <strong>30–45 minút</strong> a prebieha cez Google Meet.
    </>
  ),
  bullets: _bullets = ["Bezplatný úvodný hovor", "Online 30 minút", "Bez záväzku a predaja"],
  variant = "fullGreen",
  addressing = "ty",
}: BookingSectionProps) => {
  const isCardOnLight = variant === "cardOnLight";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error" | "webhook_gone" | "network_error" | "config_error"
  >("idle");

  const labelClassName = "mb-1.5 block font-sans text-[0.8125rem] font-semibold leading-snug text-[#2f5f4f]";
  const inputClassName =
    "w-full rounded-lg border border-black/15 bg-white px-3 py-2.5 font-sans text-[0.9375rem] leading-snug text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20";
  const selectClassName =
    "w-full appearance-none rounded-lg border border-[#2f5f4f]/30 bg-white px-3 py-2.5 pr-10 font-sans text-[0.9375rem] leading-snug text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] outline-none transition hover:border-[#2f5f4f]/50 focus:border-primary focus:ring-2 focus:ring-primary/20";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus("idle");

    if (!MAKE_WEBHOOK_URL) {
      setSubmitStatus("config_error");
      return;
    }

    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("source", "konzultacia-form");
    formData.append("submittedAt", new Date().toISOString());
    const payload = new URLSearchParams();
    for (const [key, value] of formData.entries()) {
      payload.append(key, String(value));
    }
    const abortController = new AbortController();
    const timeout = window.setTimeout(() => abortController.abort(), 12000);

    try {
      const response = await fetch(MAKE_WEBHOOK_URL, {
        method: "POST",
        body: payload,
        signal: abortController.signal,
      });
      window.clearTimeout(timeout);

      if (response.status === 410) {
        setSubmitStatus("webhook_gone");
        return;
      }
      if (!response.ok) {
        setSubmitStatus("error");
        return;
      }

      setSubmitStatus("success");
      form.reset();
    } catch {
      window.clearTimeout(timeout);
      setSubmitStatus("network_error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formContent = (
    <form
      className="scroll-mt-28 space-y-3.5 text-left"
      data-formular-scroll-target
      onSubmit={handleSubmit}
    >
      <div>
        <label htmlFor="goal" className={labelClassName}>
          {addressing === "vy" ? "Aký je váš cieľ?" : "Aký je tvoj cieľ?"}
        </label>
        <div className="relative">
          <select id="goal" name="goal" required defaultValue="Chcem pravidelnú rentu" className={selectClassName}>
            <option>Chcem pravidelnú rentu</option>
            <option>Chcem budovať majetok, následne čerpať rentu</option>
            <option>Chcem si vytvoriť rezervy</option>
            <option>Mám iný cieľ</option>
          </select>
          <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#2f5f4f]/85">
            <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current">
              <path d="M5.25 7.75a.75.75 0 0 1 1.06 0L10 11.44l3.69-3.69a.75.75 0 1 1 1.06 1.06l-4.22 4.22a.75.75 0 0 1-1.06 0L5.25 8.81a.75.75 0 0 1 0-1.06Z" />
            </svg>
          </span>
        </div>
      </div>

      <div>
        <label htmlFor="experience" className={labelClassName}>
          {addressing === "vy" ? "Aké máte skúsenosti?" : "Aké máš skúsenosti?"}
        </label>
        <div className="relative">
          <select
            id="experience"
            name="experience"
            required
            defaultValue="Som nováčik. Chcem sa naučiť investovať."
            className={selectClassName}
          >
            <option>Som nováčik. Chcem sa naučiť investovať.</option>
            <option>Viem o tom veľa, ale ešte som nezačal.</option>
            <option>Som skúsený. Mám len pár otázok</option>
          </select>
          <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#2f5f4f]/85">
            <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current">
              <path d="M5.25 7.75a.75.75 0 0 1 1.06 0L10 11.44l3.69-3.69a.75.75 0 1 1 1.06 1.06l-4.22 4.22a.75.75 0 0 1-1.06 0L5.25 8.81a.75.75 0 0 1 0-1.06Z" />
            </svg>
          </span>
        </div>
      </div>

      <div>
        <label htmlFor="priority" className={labelClassName}>
          {addressing === "vy" ? "Čo chcete aktuálne najviac vyriešiť?" : "Čo chceš aktuálne najviac vyriešiť?"}
        </label>
        <div className="relative">
          <select id="priority" name="priority" required defaultValue="Chcem začať investovať" className={selectClassName}>
            <option>Chcem začať investovať</option>
            <option>Už investujem, ale chcem vedieť, či správne</option>
            <option>Mám peniaze v banke a neviem, čo s nimi</option>
            <option>Chcem si vytvoriť rentu / pasívny príjem</option>
            <option>Chcem skontrolovať poplatky a existujúce investície</option>
            <option>Chcem riešiť investičnú nehnuteľnosť</option>
            <option>Iné</option>
          </select>
          <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#2f5f4f]/85">
            <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current">
              <path d="M5.25 7.75a.75.75 0 0 1 1.06 0L10 11.44l3.69-3.69a.75.75 0 1 1 1.06 1.06l-4.22 4.22a.75.75 0 0 1-1.06 0L5.25 8.81a.75.75 0 0 1 0-1.06Z" />
            </svg>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className={labelClassName}>
            Meno
          </label>
          <input id="firstName" name="firstName" type="text" required placeholder="Meno" className={inputClassName} />
        </div>
        <div>
          <label htmlFor="lastName" className={labelClassName}>
            Priezvisko
          </label>
          <input id="lastName" name="lastName" type="text" required placeholder="Priezvisko" className={inputClassName} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="email" className={labelClassName}>
            Email
          </label>
          <input id="email" name="email" type="email" required placeholder="Email" className={inputClassName} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="phone" className={labelClassName}>
            Telefón
          </label>
          <input id="phone" name="phone" type="tel" required placeholder="Telefón" className={inputClassName} />
        </div>
      </div>

      <div className="pt-1">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full px-6 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Odosielam..." : "Odoslať formulár"}
        </button>
        <div className="mt-2">
          <CtaResponseNote layout="formFooter" addressing={addressing} />
        </div>
        {submitStatus === "success" ? (
          <p className="mt-3 font-sans text-sm text-primary">Ďakujem, formulár bol úspešne odoslaný. Ozvem sa ti do 48 hodín.</p>
        ) : null}
        {submitStatus === "webhook_gone" ? (
          <p className="mt-3 font-sans text-sm text-red-600">
            Formulár sa nepodarilo odoslať, pretože webhook už nie je aktívny (410 Gone). Prosím aktualizuj Make webhook URL.
          </p>
        ) : null}
        {submitStatus === "network_error" ? (
          <p className="mt-3 font-sans text-sm text-red-600">
            Formulár sa nepodarilo odoslať kvôli sieťovej/CORS chybe. Skús to prosím znovu alebo ma kontaktuj na WhatsAppe.
          </p>
        ) : null}
        {submitStatus === "error" ? (
          <p className="mt-3 font-sans text-sm text-red-600">
            Odoslanie sa nepodarilo. Skús to prosím znovu alebo ma kontaktuj na WhatsAppe.
          </p>
        ) : null}
        {submitStatus === "config_error" ? (
          <p className="mt-3 font-sans text-sm text-red-600">
            Formulár nie je nakonfigurovaný. Chýba Vercel premenná VITE_MAKE_WEBHOOK_URL.
          </p>
        ) : null}
      </div>
    </form>
  );

  const rightPanelBg = isCardOnLight ? "bg-[#e8e4df]" : "bg-[#e6e2dc]";
  const sectionOuter = isCardOnLight ? "section-white" : "bg-footer-bg";

  return (
    <section
      id="formular"
      data-booking-variant={variant}
      className={`${sectionOuter} scroll-mt-24 py-8 md:py-16 lg:py-20 px-5 md:px-8 relative overflow-hidden`}
    >
      <div className={`absolute inset-0 bg-dot-grid ${isCardOnLight ? "opacity-15" : "opacity-20"}`} />
      <div className="section-container relative z-10">
        <div className="relative z-10 mx-auto w-full max-w-6xl overflow-hidden rounded-2xl shadow-[0_16px_36px_-22px_rgba(0,0,0,0.35)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[min(520px,70vh)]">
            <div className="relative min-h-[480px] lg:min-h-full">
              <img
                src={ivanBookingImage}
                alt="Ivan Jašík"
                className="absolute inset-0 h-full w-full border-0 object-cover object-[center_18%] ring-0 lg:object-center"
                loading="lazy"
                decoding="async"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.28)_26%,transparent_52%)]"
                aria-hidden
              />
              <div className="absolute inset-0 flex flex-col items-start justify-end px-5 pb-7 sm:px-8 sm:pb-9 md:pb-10">
                <h2 className="headline-serif w-full max-w-2xl text-left text-white [&_span]:!text-white [&_strong]:!text-white">
                  {heading}
                </h2>
                <div className="mt-4 sm:mt-5 w-full max-w-2xl text-left font-sans text-[0.9rem] leading-relaxed text-white/90 sm:text-base md:text-[1.05rem] [&_strong]:font-semibold [&_strong]:!text-white">
                  {subheading}
                </div>
                <div className="mt-4 flex w-full max-w-2xl flex-wrap items-center gap-x-3 gap-y-2 text-white/85">
                  <span className="font-sans text-sm font-medium">
                    {addressing === "vy" ? "Alebo ma kontaktujte" : "Alebo ma kontaktuj"}
                  </span>
                  <a
                    href="https://wa.me/421902519328"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Kontaktovať cez WhatsApp"
                    className="inline-flex text-[#D4DFDB] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4DFDB]/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-sm"
                  >
                    <WhatsAppIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </a>
                  <a
                    href="tel:+421902519328"
                    aria-label="Zavolať na telefón"
                    className="inline-flex text-[#D4DFDB] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4DFDB]/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-sm"
                  >
                    <Phone className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.75} />
                  </a>
                  <a
                    href="mailto:info@jsinvestor.com"
                    aria-label="Poslať email"
                    className="inline-flex text-[#D4DFDB] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4DFDB]/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-sm"
                  >
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.75} />
                  </a>
                </div>
              </div>
            </div>

            <div
              className={`flex h-full min-h-0 w-full flex-col justify-center self-stretch ${rightPanelBg} px-6 py-8 sm:px-8 sm:py-9 md:px-10 md:py-10 lg:px-12 lg:py-11`}
            >
              <div className="flex w-full min-w-0 flex-1 flex-col lg:min-h-0">
                <div className="w-full flex-1 rounded-xl border border-black/10 bg-white/90 p-4 shadow-sm backdrop-blur-[2px] sm:p-5">
                  {formContent}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
