import AnimatedSection from "@/components/AnimatedSection";
import SectionHeader from "@/components/SectionHeader";

const scrollToBooking = () => {
  document.getElementById("formular")?.scrollIntoView({ behavior: "smooth" });
};

const testimonials = [
  {
    quote: "Začal som pracovať v zahraničí a nevedel som čo s prvými úsporami. Ivan mi za dva týždne postavil plán, podľa ktorého investujem dodnes.",
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
    quote: "Ako podnikateľ potrebujem niekoho, kto rozumie biznisovým peniazom. Ivan presne vie, ako z firemného zisku spraviť osobný majetok.",
    name: "Ladislav Papik",
    role: "Konateľ PAPIK ENTERPRISE s.r.o.",
    image: "https://www.jsinvestor.sk/wp-content/uploads/2024/12/papik.webp",
  },
];

type TestimonialSectionProps = {
  ctaLabel?: string;
};

const TestimonialSection = ({ ctaLabel = "Získať Wealth Map" }: TestimonialSectionProps) => (
  <section id="recenzie" className="bg-footer-bg section-padding relative overflow-hidden scroll-mt-24">
    <div className="absolute inset-0 bg-dot-grid opacity-20" />
    <div className="section-container relative z-10">
      <AnimatedSection>
        <SectionHeader
          eyebrow={<span className="text-cream/80">Reálne skúsenosti</span>}
          headline={
            <>
              <span className="text-[#d4dfdb] font-bold">Čo hovoria ľudia,</span>{" "}
              <span className="text-cream">s ktorými spolupracujem</span>
            </>
          }
        />
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {testimonials.map((t, i) => (
          <AnimatedSection key={t.name} delay={i * 0.1}>
            <div className="card-glass h-full flex flex-col">
              <div className="mb-1 leading-none">
                <span
                  aria-hidden="true"
                  className="[font-family:var(--font-serif)] block text-primary h1 leading-[0.58]"
                >
                  “
                </span>
              </div>
              <p className="font-sans text-lead text-foreground mb-8 flex-1">
                {t.quote}
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border border-primary/20"
                  loading="lazy"
                />
                <div>
                  <p className="font-sans h6 text-foreground">
                    {t.name}
                  </p>
                  <p className="font-sans text-base text-muted-foreground">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection>
        <div className="text-center mt-10">
          <button
            onClick={scrollToBooking}
            className="btn-primary-light text-body"
          >
            {ctaLabel}
          </button>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default TestimonialSection;
