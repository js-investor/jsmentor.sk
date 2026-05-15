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
          Pridaj sa do HeroHero komunity a nauč sa ako
          <br />
          <strong>vybudovať majetok bez stresu a chaosu.</strong>
        </>
      }
      trustBadges={[
        <>
          <span className="text-2xl mb-2">⭐⭐⭐⭐⭐</span>
          <span className="[font-family:var(--font-serif)] font-black text-xl md:text-2xl text-foreground">118 000+ ľudí</span>
          <span className="text-small text-muted-foreground">ma sleduje na Instagrame</span>
        </>,
        <>
          <span className="text-3xl mb-2">🚀</span>
          <span className="[font-family:var(--font-serif)] font-black text-xl md:text-2xl text-foreground">14 dní ZADARMO</span>
          <span className="text-small text-muted-foreground">na vyskúšanie</span>
        </>,
        <>
          <span className="text-3xl mb-2">🍌</span>
          <span className="[font-family:var(--font-serif)] font-black text-xl md:text-2xl text-foreground">Len 7 € mesačne</span>
          <span className="text-small text-muted-foreground">(alebo 60 € ročne)</span>
        </>,
      ]}
      fullWidthBadge={
        <div className="relative isolate overflow-hidden rounded-2xl border border-[#3d3128]/50 shadow-[inset_0_1px_0_rgba(255,249,245,0.12),0_12px_40px_-12px_rgba(28,22,18,0.55)]">
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

          <div className="relative z-[1] flex flex-col gap-1 pb-0 text-[#fdf8f2] md:flex-row md:items-stretch md:gap-0 md:pt-2 md:pb-0">
            <div className="flex flex-col items-start justify-start gap-2 px-6 pt-5 pb-0 text-left md:flex-1 md:min-w-0 md:justify-center md:px-8 md:py-0 md:pr-5">
              <span className="text-2xl leading-none md:text-3xl" aria-hidden>
                📚
              </span>
              <h2 className="[font-family:var(--font-serif)] text-2xl font-bold leading-[1.15] tracking-normal text-[#fdf8f2] md:text-3xl lg:text-4xl">
                Vzdelávaj sa v peniazoch
              </h2>
              <p className="max-w-md font-sans text-small leading-relaxed text-[#f0ebe3]/90 md:text-body">
                Keď nebudeš spokojný, predplatné vieš{" "}
                <br />
                zrušiť kedykoľvek.
              </p>
            </div>

            <div className="relative mt-auto flex w-full shrink-0 flex-col justify-end overflow-hidden px-4 pt-2 pb-0 md:mt-0 md:w-[42%] lg:w-[38%] md:self-stretch md:px-5 md:pb-0 md:pt-6">
              <img
                src={brandPatternDark}
                alt=""
                aria-hidden
                className="pointer-events-none absolute right-0 top-0 z-0 h-auto max-h-[min(598px,100%)] w-auto max-w-[min(495px,100%)] origin-top-right select-none opacity-[0.1] md:max-h-[min(690px,100%)] md:max-w-[min(546px,100%)]"
              />
              <div className="relative z-[1] flex w-full justify-center">
                <div className="relative -translate-x-1 sm:-translate-x-2 md:-translate-x-2 lg:-translate-x-3">
                  <img
                    src={ivanKnihaJsMentor}
                    alt="Ivan Jašík s knihou Psychológia peňazí"
                    className="relative z-[1] block max-h-[220px] w-auto max-w-full object-contain object-bottom contrast-[1.05] saturate-[0.92] brightness-[0.97] sepia-[0.22] drop-shadow-[0_8px_22px_rgba(28,22,18,0.4)] sm:max-h-[248px] md:max-h-[275px]"
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
