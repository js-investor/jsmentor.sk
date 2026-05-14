import AnimatedSection from "@/components/AnimatedSection";
import CtaResponseNote from "@/components/CtaResponseNote";

const MapaVpraxiSection = () => (
  <section id="mapa-v-praxi" className="section-white section-padding relative overflow-hidden scroll-mt-24">
    <div className="absolute inset-0 bg-dot-grid opacity-20" />
    <div className="section-container relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8 lg:gap-12 items-center">
        <AnimatedSection>
          <div className="max-w-xl">
            <h2 className="headline-serif mb-5">Ako bude vyzerať vaša mapa v praxi?</h2>
            <p className="sub-headline !mt-0">
              Pozrite si reálny príklad vo videu, kde presne uvidíte, čo získate.
            </p>
            <div className="mt-7">
              <a href="#formular" className="btn-primary text-body">
                Získať Wealth Map
              </a>
              <div>
                <CtaResponseNote />
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.08}>
          <div className="w-full rounded-2xl overflow-hidden aspect-video bg-black shadow-[0_8px_32px_-4px_rgba(0,0,0,0.18),0_24px_64px_-12px_rgba(0,0,0,0.28),0_0_0_1px_rgba(0,0,0,0.1)]">
            <iframe
              src="https://player.vimeo.com/video/1175801732?autoplay=0&title=0&portrait=0&byline=0"
              title="Ako bude vyzerať vaša mapa v praxi"
              allow="autoplay; fullscreen; picture-in-picture"
              className="block w-full h-full align-top"
            />
          </div>
        </AnimatedSection>
      </div>
    </div>
  </section>
);

export default MapaVpraxiSection;
