import AnimatedSection from "@/components/AnimatedSection";
import CtaResponseNote from "@/components/CtaResponseNote";
import type { ReactNode } from "react";

const testimonials = [
  {
    quote:
      "Začal som pracovať v zahraničí a nevedel som čo s prvými úsporami. Ivan mi za dva týždne postavil plán, podľa ktorého investujem dodnes.",
    name: "MuDr. Martin Vanečko",
    role: "Doktor pôsobiaci vo Švajčiarsku",
    image: "https://www.jsinvestor.sk/wp-content/uploads/2024/12/download-3.webp",
  },
  {
    quote: "Ivan je skutočný profesionál. Spolupracujeme už 4 roky. Nemusím riešiť financie. Viem, že sú v dobrých rukách.",
    name: "Šimon Latkoczy",
    role: "Slovenský hokejový reprezentant",
    image: "https://www.jsinvestor.sk/wp-content/uploads/2024/12/download-2.webp",
  },
  {
    quote:
      "Ako podnikateľ potrebujem niekoho, kto rozumie biznisovým peniazom. Ivan presne vie, ako z firemného zisku spraviť osobný majetok.",
    name: "Ladislav Papik",
    role: "Konateľ PAPIK ENTERPRISE s.r.o.",
    image: "https://www.jsinvestor.sk/wp-content/uploads/2024/12/papik.webp",
  },
];

type RecenzieKlientovSectionProps = {
  heading?: ReactNode;
  subheading?: ReactNode;
  ctaLabel?: string;
  ctaHref?: string;
};

const RecenzieKlientovSection = ({
  heading = <>Lorem ipsum dolor sit amet</>,
  subheading,
  ctaLabel = "Lorem ipsum",
  ctaHref = "#formular",
}: RecenzieKlientovSectionProps) => (
  <section id="recenzie" className="bg-footer-bg section-padding relative overflow-hidden scroll-mt-24">
    <div className="absolute inset-0 bg-dot-grid opacity-20" />
    <div className="section-container relative z-10">
      <AnimatedSection>
        <div className="mx-auto max-w-3xl text-center mb-10 md:mb-12">
          <h2 className="[font-family:var(--font-serif)] h3 leading-tight text-white">{heading}</h2>
          {subheading ? (
            <p className="mt-5 font-sans text-lead text-white/90">{subheading}</p>
          ) : null}
        </div>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {testimonials.map((t, i) => (
          <AnimatedSection key={t.name} delay={i * 0.1}>
            <div className="card-glass h-full flex flex-col">
              <div className="mb-1 leading-none">
                <span aria-hidden="true" className="[font-family:var(--font-serif)] block text-primary h1 leading-[0.58]">
                  “
                </span>
              </div>
              <p className="font-sans text-lead text-foreground mb-8 flex-1">{t.quote}</p>
              <div className="flex items-center gap-3">
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover border border-primary/20" loading="lazy" />
                <div>
                  <p className="font-sans h6 text-foreground">{t.name}</p>
                  <p className="font-sans text-base text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection>
        <div className="text-center mt-10">
          <a href={ctaHref} className="btn-primary-light text-body">
            {ctaLabel}
          </a>
          <div className="[&_p]:text-white/90 [&_svg]:text-white">
            <CtaResponseNote />
          </div>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default RecenzieKlientovSection;
