import AnimatedSection from "@/components/AnimatedSection";
import CtaResponseNote from "@/components/CtaResponseNote";

const scrollToBooking = () => {
  document.getElementById("formular")?.scrollIntoView({ behavior: "smooth" });
};

type VideoSectionProps = {
  ctaLabel?: string;
};

const VideoSection = ({ ctaLabel = "Získať Wealth Map" }: VideoSectionProps) => (
  <section id="co-dostanes" className="section-cream section-padding relative overflow-hidden scroll-mt-24">
    <div className="absolute inset-0 bg-dot-grid opacity-20" />
    <div className="section-container relative z-10">
      <AnimatedSection>
        <div className="text-center max-w-5xl mx-auto mb-12 md:mb-16">
          <p className="eyebrow">Čo presne dostaneš</p>
          <h2 className="headline-serif">
            Takto vyzerá <span className="text-primary font-bold">tvoj osobný finančný plán.</span>
          </h2>
          <p className="sub-headline">
            Pripravil som krátke video, kde ti ukážem ako pracujem. Čo dostane každý človek, po úvodnom
            hovore. <strong>Presné kroky od A po Z.</strong>
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <div className="relative max-w-4xl mx-auto mb-12 md:mb-16">
          <div className="relative rounded-[20px] overflow-hidden aspect-video ring-1 ring-primary/20 bg-black">
            <iframe
              src="https://player.vimeo.com/video/1183644074?autoplay=0&title=0&portrait=0&byline=0"
              title="Vimeo video"
              allow="autoplay; fullscreen; picture-in-picture"
              className="block w-full h-full align-top"
            />
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <div className="text-center max-w-2xl mx-auto">
          <p className="[font-family:var(--font-serif)] h3 leading-tight text-foreground mb-6 md:mb-8">
            Chceš vedieť, ako <span className="text-primary font-bold">vyzeral tvoj plán</span>
          </p>
          <button type="button" onClick={scrollToBooking} className="btn-primary text-body">
            {ctaLabel}
          </button>
          <div>
            <CtaResponseNote />
          </div>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default VideoSection;
