import AnimatedSection from "@/components/AnimatedSection";
import brandPattern from "@/assets/logo/js-brand-pattern.svg";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { HEROHERO_JOIN_URL } from "@/lib/cennikCta";

const forest = "#023c2e";
const forestMid = "#065f4a";
const forestEnd = "#0a5a47";

const bullets = [
  "Prvých 15 dní úplne zadarmo",
  "Absolútne žiadne záväzky",
  "Zrušenie kedykoľvek jedným klikom",
] as const;

const HeroHeroCennikSection = () => (
  <section
    id="cennik"
    className="relative scroll-mt-24 overflow-hidden px-5 md:px-8 pt-[72px] pb-10 md:pt-[100px] md:pb-12"
    style={{ backgroundColor: "#FFF9F5" }}
    aria-labelledby="cennik-heading"
  >
    <div className="absolute inset-0 bg-dot-grid opacity-[0.18] pointer-events-none" />
    <div className="pointer-events-none absolute left-[15%] top-0 h-[380px] w-[380px] -translate-y-1/3 rounded-full bg-primary/[0.05] blur-[100px]" />

    <div className="section-container relative z-10">
      <AnimatedSection>
        <header className="mx-auto mb-7 max-w-3xl scroll-mt-24 text-center md:mb-9">
          <h2
            id="cennik-heading"
            className="headline-landing-section text-balance leading-[1.1] text-foreground"
          >
            15 dní zadarmo, potom len 5 € mesačne
          </h2>
          <p className="mt-4 [font-family:var(--font-serif)] text-[1.375rem] font-normal text-foreground/60 md:text-[1.5rem]">
            Menej ako jeden obed v meste
          </p>
        </header>
      </AnimatedSection>

      <AnimatedSection delay={0.07}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-3xl overflow-hidden rounded-[1.75rem] shadow-[0_32px_80px_-20px_rgba(2,60,46,0.42)] lg:max-w-4xl"
          style={{
            background: `linear-gradient(160deg, ${forest} 0%, ${forestMid} 52%, ${forestEnd} 100%)`,
          }}
        >
          {/* Brand pattern */}
          <div
            className="pointer-events-none absolute right-0 top-0 h-full w-[60%] opacity-[0.08]"
            aria-hidden
            style={{
              WebkitMaskImage: `url(${brandPattern})`,
              maskImage: `url(${brandPattern})`,
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "right -5% top -15%",
              maskPosition: "right -5% top -15%",
              WebkitMaskSize: "contain",
              maskSize: "contain",
              backgroundColor: "rgba(255,255,255,1)",
            }}
          />
          <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10 px-8 py-10 md:px-12 md:py-12 lg:px-14">
            {/* Price */}
            <div className="mb-6 flex items-end justify-center gap-3 md:mb-8">
              <span className="[font-family:var(--font-serif)] text-[4rem] font-[900] leading-none text-white md:text-[4.5rem]">
                5 €
              </span>
              <span className="mb-2 font-sans text-[1.5rem] text-white">/mesačne</span>
            </div>

            {/* Bullets — centered container, left-aligned items */}
            <div className="mb-9 flex justify-center">
              <ul className="flex flex-col gap-5">
                {bullets.map((b) => (
                  <li key={b} className="flex items-center gap-4">
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#4ade80]/40 bg-[#4ade80]/20">
                      <Check className="h-4 w-4 text-[#6ee7a0]" strokeWidth={2.8} />
                    </span>
                    <span className="font-sans text-[1.1875rem] leading-snug text-white/95 md:text-[1.25rem] lg:text-[1.3125rem]">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="flex flex-col items-center gap-3">
              <a
                href={HEROHERO_JOIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 font-sans text-[1.125rem] font-semibold text-[#023c2e] shadow-[0_4px_20px_rgba(0,0,0,0.22)] transition-all duration-200 hover:bg-white/92 hover:shadow-[0_10px_32px_rgba(0,0,0,0.28)]"
                data-umami-event="click_herohero"
                data-umami-event-section="cennik"
              >
                Chcem sa pridať 🚀
              </a>
              <p className="font-sans text-[1.125rem] text-white/75 md:text-[1.1875rem] lg:text-[1.25rem]">Kedykoľvek môžeš zrušiť</p>
            </div>
          </div>
        </motion.div>
      </AnimatedSection>
    </div>
  </section>
);

export default HeroHeroCennikSection;
