import AnimatedSection from "@/components/AnimatedSection";
import brandPattern from "@/assets/logo/js-brand-pattern.svg";

const forest = "#023c2e";
const forestLight = "#065f4a";
const forestGradientEnd = "#0a5a47";

const HeroHeroCtaSection = () => (
  <section
    id="vyskusat-hero-hero"
    className="section-padding relative scroll-mt-24 overflow-hidden"
    style={{ backgroundColor: "#FFF9F5" }}
  >
    <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-[0.18]" />
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 h-[min(520px,80vw)] w-[min(720px,95vw)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40"
      style={{
        background: `radial-gradient(ellipse 70% 60% at 50% 50%, ${forestLight}33 0%, transparent 70%)`,
      }}
    />

    <div className="section-container relative z-10">
      <AnimatedSection>
        <div className="mx-auto max-w-4xl">
          <div
            className="relative overflow-hidden rounded-[1.75rem] px-6 py-14 text-center md:rounded-[2rem] md:px-12 md:py-20 lg:py-24"
            style={{
              background: `linear-gradient(165deg, ${forest} 0%, ${forestLight} 42%, ${forestGradientEnd} 100%)`,
            }}
          >
              <div
                className="pointer-events-none absolute inset-0 z-0"
                aria-hidden
                style={{
                  WebkitMaskImage: `url(${brandPattern})`,
                  maskImage: `url(${brandPattern})`,
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition: "right -6% top -18%",
                  maskPosition: "right -6% top -18%",
                  WebkitMaskSize: "min(48%, 400px)",
                  maskSize: "min(48%, 400px)",
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                }}
              />
              <div
                className="pointer-events-none absolute inset-0 opacity-45"
                style={{
                  background: `radial-gradient(ellipse 90% 70% at 50% -15%, ${forestLight} 0%, transparent 58%),
                    radial-gradient(ellipse 55% 45% at 100% 100%, rgba(52,211,153,0.14) 0%, transparent 55%)`,
                }}
              />
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                  backgroundSize: "48px 48px",
                }}
              />

              <div className="relative z-10 mx-auto max-w-2xl">
                <h2 className="headline-serif text-balance text-white">
                  Tak čo, ideme na to?
                </h2>

                <p className="mt-5 font-sans text-[1.25rem] font-medium leading-snug text-white/90 md:mt-6 md:text-[1.4375rem]">
                  Nemáš čo stratiť.
                </p>
                <p className="mt-2 font-sans text-[1.0625rem] leading-relaxed text-emerald-100/85 md:text-[1.1875rem]">
                  Máš 14 dní úplne zadarmo.
                </p>

                <div className="mt-10 md:mt-12">
                  <a
                    href="#formular"
                    className="btn-primary-light text-body inline-flex min-h-[3.25rem] px-8 py-4 text-[1.0625rem] md:min-h-[3.5rem] md:px-10 md:text-[1.125rem]"
                  >
                    🚀 Vyskúšať na 14 dní ZADARMO
                  </a>
                </div>
              </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default HeroHeroCtaSection;
