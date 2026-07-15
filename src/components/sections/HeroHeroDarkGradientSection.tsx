import AnimatedSection from "@/components/AnimatedSection";
import imgInvestovat from "@/assets/images/Ako by som zacal investovat.webp";
import imgByt from "@/assets/images/Investicny byt.webp";
import imgHypoteka from "@/assets/images/Mimoriadna splátka hypotéky.webp";
import { scrollToAnchorId } from "@/lib/scrollToFormular";
import { CENNIK_SECTION_HREF, CENNIK_SECTION_ID } from "@/lib/cennikCta";

/** Radiálny prechod — tmavší stred, rýchlejší prechod do čiernej. */
const sectionBackground =
  "radial-gradient(ellipse 88% 78% at 50% 38%, #121212 0%, #080808 42%, #030303 72%, #000000 100%)";

const showcaseItems = [
  {
    title: "Ako by som začal investovať v roku 2026, keby som dnes začínal od nuly",
    duration: "16 minút",
    img: imgInvestovat,
    tiltClass: "-rotate-[2.5deg]",
  },
  {
    title: "Kúpil som investičný byt. Toto sú riziká, o ktorých sa nahlas nehovorí.",
    duration: "21 minút",
    img: imgByt,
    tiltClass: "rotate-[2.5deg]",
  },
  {
    title: "Mimoriadna splátka hypotéky: kedy dáva zmysel a kedy je to drahá chyba",
    duration: "12 minút",
    img: imgHypoteka,
    tiltClass: "-rotate-[2.5deg]",
  },
];

const videoTitleClass =
  "mx-auto mb-6 max-w-xl font-sans text-[1.3125rem] font-semibold leading-snug text-white md:mb-7 md:text-[1.5rem] lg:text-[1.625rem]";

const durationBadgeClass =
  "mt-4 inline-flex rounded-md border border-white/10 bg-[#2A2A2A] px-5 py-1.5 font-sans text-sm font-medium text-white/80 md:px-6 md:py-2 md:text-base";

const HeroHeroDarkGradientSection = () => (
  <section
    id="ukazky-videi"
    className="hero-section-pad relative scroll-mt-24 overflow-hidden px-5 md:px-8 pt-[72px] pb-[72px] md:pt-[96px] md:pb-[96px]"
    style={{ background: sectionBackground }}
  >
    <div className="absolute inset-0 bg-dot-grid opacity-10 pointer-events-none" />

    <div className="section-container relative z-10">
      <AnimatedSection>
        <h2 className="headline-landing-section mx-auto max-w-4xl text-balance text-center leading-[1.12] text-white">
          <span aria-hidden>🍿</span> Toto nájdeš v komunite už dnes:
        </h2>
      </AnimatedSection>

      <div className="mx-auto mt-14 flex w-full max-w-xl flex-col gap-16 md:mt-16 md:max-w-2xl md:gap-20 lg:mt-20 lg:max-w-3xl lg:gap-28">
        {showcaseItems.map((item, index) => (
          <AnimatedSection key={item.title} delay={0.05 * index}>
            <article
              className={`mx-auto flex w-full max-w-[min(100%,420px)] flex-col items-center text-center md:max-w-[540px] lg:max-w-[640px] ${item.tiltClass}`}
            >
              <h3 className={videoTitleClass}>{item.title}</h3>

              <button
                type="button"
                onClick={() => scrollToAnchorId(CENNIK_SECTION_ID)}
                className="relative block w-full cursor-pointer rounded-xl border-0 bg-transparent p-0 text-left shadow-[0_12px_40px_-16px_rgba(0,0,0,0.55)] transition-transform duration-300 hover:scale-[1.03]"
                data-umami-event="click_video_cennik"
                data-umami-event-section="ukazky-play"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="block w-full h-auto rounded-xl"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-xl">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg md:h-20 md:w-20">
                    <svg className="ml-1 h-7 w-7 text-[#023c2e] md:h-8 md:w-8" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5.14v14l11-7-11-7z" />
                    </svg>
                  </div>
                </div>
              </button>

              <span className={durationBadgeClass}>{item.duration}</span>
            </article>
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection delay={0.2}>
        <div className="mt-14 w-full text-center md:mt-16 lg:mt-20">
          <a
            href={CENNIK_SECTION_HREF}
            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 font-sans text-body font-semibold text-[#023c2e] shadow-sm transition-colors hover:bg-white/90"
            data-umami-event="click_cennik"
            data-umami-event-section="ukazky-cta"
          >
            Chcem si to pozrieť 👀
          </a>
          <p className="mt-4 w-full font-sans font-[500] text-[1.0625rem] leading-relaxed text-white/70 md:text-[1.25rem]">
            15 dní zadarmo. Potom <strong className="[font-family:var(--font-serif)] font-[900] text-white">5 €</strong> mesačne. Zrušíš kedykoľvek.
          </p>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default HeroHeroDarkGradientSection;
