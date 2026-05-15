import HeroSectionTemplate from "@/components/templates/HeroSectionTemplate";
import brandPatternDark from "@/assets/logo/js-brand-pattern-black.svg";
import ivanKnihaJsMentor from "@/assets/images/ivan-jasik-js-mentor-kniha.png";

const HomeDesignHeaderSection = () => {
  return (
    <HeroSectionTemplate
      headerCtaLabel="🚀 Vyskúšať na 14 dní ZADARMO"
      headerCtaHref="#formular"
      preheader={<>TVOJA CESTA K PRVÝM 100 000 € 🔥</>}
      title={
        <>
          <span className="text-primary">Získaj kontrolu</span>
          <br />
          nad svojimi peniazmi
        </>
      }
      subtitle={
        <>
          Pridaj sa do HeroHero komunity a nauč sa ako&nbsp;
          <strong className="font-bold text-foreground">vybudovať majetok bez stresu a chaosu.</strong>
        </>
      }
      trustBadges={[
        <>
          <span className="mb-2 text-2xl md:text-3xl">⭐⭐⭐⭐⭐</span>
          <span className="[font-family:var(--font-serif)] text-2xl font-black text-foreground">
            118 000+ ľudí
          </span>
          <span className="font-sans text-[1.0625rem] font-medium leading-snug text-muted-foreground md:text-small md:font-normal">
            ma sleduje na Instagrame
          </span>
        </>,
        <>
          <span className="mb-2 text-3xl md:text-4xl">🚀</span>
          <span className="[font-family:var(--font-serif)] text-2xl font-black text-foreground">
            14 dní ZADARMO
          </span>
          <span className="font-sans text-[1.0625rem] font-medium leading-snug text-muted-foreground md:text-small md:font-normal">
            na vyskúšanie
          </span>
        </>,
        <>
          <span className="mb-2 text-3xl md:text-4xl">🍌</span>
          <span className="[font-family:var(--font-serif)] text-2xl font-black text-foreground">
            Len 7 € mesačne
          </span>
          <span className="font-sans text-[1.0625rem] font-medium leading-snug text-muted-foreground md:text-small md:font-normal">
            (alebo 60 € ročne)
          </span>
        </>,
      ]}
      fullWidthBadge={
        <div className="relative isolate overflow-hidden rounded-2xl shadow-[inset_0_1px_0_rgba(255,249,245,0.12),0_12px_40px_-12px_rgba(28,22,18,0.55)]">
          {/* základný teplý přechod */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(145deg, #4c3c2d 0%, #6a5746 38%, #a58c75 72%, #876d55 100%)",
            }}
          />

          {/* vignette ako pri starej fotke */}
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{
              boxShadow:
                "inset 0 0 120px 40px rgba(28, 22, 18, 0.35), inset 0 0 48px 12px rgba(76, 60, 45, 0.25)",
            }}
          />

          {/* jemný „papier / grain“ */}
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-[0.14] mix-blend-soft-light"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")",
            }}
          />

          {/* ďalší teplý wash — „vyblednutá fotka“ */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[#c4a882]/15 mix-blend-multiply" />

          <div className="relative z-[1] flex min-h-[280px] flex-col gap-8 pb-0 pt-2 text-[#fdf8f2] sm:min-h-[300px] md:min-h-[320px] md:flex-row md:items-stretch md:gap-0 md:pb-0 md:pt-2">
            <div className="flex w-full flex-col items-start justify-center gap-3 px-4 pb-0 pt-8 text-left sm:px-6 md:min-h-0 md:min-w-0 md:flex-1 md:justify-center md:px-8 md:py-12 md:pr-5">
              <span className="text-2xl leading-none md:text-3xl" aria-hidden>
                📚
              </span>
              <h2 className="w-full [font-family:var(--font-serif)] text-2xl font-bold leading-[1.15] tracking-normal text-[#fdf8f2] md:text-3xl lg:text-4xl">
                Nauč sa pracovať s peniazmi
              </h2>
              <p className="w-full max-w-none font-sans text-[1.0625rem] leading-relaxed text-[#f0ebe3]/90 md:max-w-md md:text-body">
                Keď nebudeš spokojný, predplatné vieš kedykoľvek zrušiť.
              </p>
            </div>

            <div className="relative flex w-full min-h-0 flex-1 shrink-0 flex-col items-center justify-end overflow-hidden px-4 pb-0 pt-0 md:flex-none md:w-[42%] md:items-center md:justify-end md:self-stretch md:overflow-hidden md:px-5 md:pb-0 md:pt-6 lg:w-[38%]">
              <img
                src={brandPatternDark}
                alt=""
                aria-hidden
                className="pointer-events-none absolute right-0 top-0 z-0 h-auto max-h-[min(598px,100%)] w-auto max-w-[min(495px,100%)] origin-top-right select-none opacity-[0.1] md:max-h-[min(690px,100%)] md:max-w-[min(546px,100%)]"
              />
              <div className="relative z-[1] flex w-full justify-center leading-none md:w-auto">
                <div className="relative mx-auto md:mx-auto md:translate-x-0 lg:translate-x-0">
                  <img
                    src={ivanKnihaJsMentor}
                    alt="Ivan Jašík s knihou Psychológia peňazí"
                    className="relative z-[1] mx-auto block max-h-64 w-auto max-w-full object-contain object-bottom contrast-[1.05] saturate-[0.92] brightness-[0.97] sepia-[0.22] drop-shadow-[0_8px_22px_rgba(28,22,18,0.4)] sm:max-h-72 md:max-h-80"
                  />
                  <div className="pointer-events-none absolute bottom-2 left-1/2 z-[1] hidden h-16 w-12 -translate-x-1/2 rounded-full bg-gradient-to-tr from-white/10 to-transparent opacity-20 blur-md md:block" />
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      heroCtaLabel="🚀 Vyskúšať na 14 dní ZADARMO"
      heroCtaHref="#formular"
      videoSrc="https://player.vimeo.com/video/1145809910"
      videoTitle="JS Mentor hero video"
    />
  );
};

export default HomeDesignHeaderSection;
