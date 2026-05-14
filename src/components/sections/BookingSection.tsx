import { Mail, Phone } from "lucide-react";
import { FormEvent, useState } from "react";
import type { ReactNode } from "react";
import CtaResponseNote from "@/components/CtaResponseNote";
import ivanBookingImage from "@/assets/images/jsinvestor-biznis-portret-ivan-interier-svetlo.jpg";

const MAKE_WEBHOOK_URL = import.meta.env.VITE_MAKE_WEBHOOK_URL;

type BookingSectionProps = {
  heading?: ReactNode;
  subheading?: ReactNode;
  bullets?: string[];
  variant?: "fullGreen" | "cardOnLight";
};

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
    <path
      fill="currentColor"
      d="M20.52 3.48A11.9 11.9 0 0 0 12.05 0C5.45 0 .1 5.34.1 11.92c0 2.1.55 4.16 1.6 5.98L0 24l6.28-1.64a11.9 11.9 0 0 0 5.76 1.47h.01c6.6 0 11.95-5.34 11.95-11.92a11.86 11.86 0 0 0-3.48-8.43Zm-8.47 18.33h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.22-3.73.97 1-3.63-.24-.37a9.87 9.87 0 0 1-1.52-5.26c0-5.46 4.45-9.9 9.91-9.9 2.65 0 5.13 1.03 6.99 2.89a9.83 9.83 0 0 1 2.91 7c0 5.46-4.45 9.9-9.9 9.9Zm5.43-7.42c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.95 1.15-.17.2-.35.22-.64.07-.3-.15-1.27-.47-2.41-1.5-.89-.8-1.49-1.79-1.66-2.09-.17-.3-.02-.45.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.49s1.08 2.89 1.23 3.09c.15.2 2.12 3.24 5.14 4.55.72.31 1.28.49 1.72.63.73.23 1.4.2 1.93.12.59-.09 1.75-.72 1.99-1.41.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35Z"
    />
  </svg>
);

const BookingSection = ({
  heading = (
    <>
      <span className="text-[#d4dfdb] font-bold">Pripravený na</span> <span className="text-cream">úvodný hovor?</span>
    </>
  ),
  subheading = (
    <>
      Vyber si termín ktorý ti sedí. <strong className="text-cream">Hovor je bezplatný, trvá 30–45 minút,</strong> a prebieha
      online cez Google Meet.
    </>
  ),
  bullets: _bullets = ["Bezplatný úvodný hovor", "Online 30 minút", "Bez záväzku a predaja"],
  variant = "fullGreen",
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
    <form className="space-y-3.5 text-left" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="goal" className={labelClassName}>
          Aký je tvoj cieľ?
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
          Aké máš skúsenosti?
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
          Čo chceš aktuálne najviac vyriešiť?
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
          <CtaResponseNote />
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
    <section className={`${sectionOuter} section-padding relative overflow-hidden`}>
      <div className={`absolute inset-0 bg-dot-grid ${isCardOnLight ? "opacity-15" : "opacity-20"}`} />
      <div className="section-container relative z-10">
        <div
          id="formular"
          className="relative z-10 mx-auto w-full max-w-6xl scroll-mt-24 overflow-hidden rounded-2xl border border-white/15 shadow-[0_16px_36px_-22px_rgba(0,0,0,0.35)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[min(520px,70vh)]">
            <div className="relative min-h-[280px] sm:min-h-[320px] lg:min-h-full">
              <img
                src={ivanBookingImage}
                alt="Ivan Jašík"
                className="absolute inset-0 h-full w-full object-cover object-[center_18%] lg:object-center"
                loading="lazy"
                decoding="async"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.28)_26%,transparent_52%)]"
                aria-hidden
              />
              <div className="absolute inset-0 flex flex-col items-center justify-end px-5 pb-7 sm:px-8 sm:pb-9 md:pb-10">
                <h2 className="w-full max-w-2xl text-center font-serif text-[1.95rem] font-extrabold leading-[1.12] tracking-tight text-white sm:text-[2.35rem] md:text-[2.65rem] lg:text-[2.95rem] [&_span]:!text-white [&_strong]:!text-white">
                  {heading}
                </h2>
              </div>
            </div>

            <div
              className={`flex h-full min-h-0 w-full flex-col justify-center self-stretch ${rightPanelBg} px-6 py-8 sm:px-8 sm:py-9 md:px-10 md:py-10 lg:px-12 lg:py-11`}
            >
              <div className="flex w-full min-w-0 flex-1 flex-col lg:min-h-0">
                <p className="sub-headline !mt-0 w-full max-w-none text-left !text-foreground/80 [&_strong]:!text-foreground">
                  {subheading}
                </p>

                <div className="mt-4 flex w-full flex-wrap items-center gap-2.5 text-foreground/75">
                  <span className="font-sans text-sm font-medium">Kontaktujte ma:</span>
                  <a
                    href="https://wa.me/421902519328"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Kontaktovať cez WhatsApp"
                    className="inline-flex text-primary transition-colors hover:text-primary/80"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                  </a>
                  <a
                    href="tel:+421902519328"
                    aria-label="Zavolať na telefón"
                    className="inline-flex text-primary transition-colors hover:text-primary/80"
                  >
                    <Phone className="h-5 w-5" />
                  </a>
                  <a
                    href="mailto:info@jsinvestor.com"
                    aria-label="Poslať email"
                    className="inline-flex text-primary transition-colors hover:text-primary/80"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                </div>

                <div className="mt-4 w-full flex-1 rounded-xl border border-black/10 bg-white/90 p-4 shadow-sm backdrop-blur-[2px] sm:p-5">
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
