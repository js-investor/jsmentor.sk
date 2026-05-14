import AnimatedSection from "@/components/AnimatedSection";
import CtaResponseNote from "@/components/CtaResponseNote";
import brandPattern from "@/assets/logo/js-brand-pattern.svg";
import vysledokGrafAndrej from "@/assets/images/vysledok-graf-andrej.png";
import vysledokGrafBrano from "@/assets/images/vysledok-graf-brano.png";
import vysledokGrafKristian from "@/assets/images/vysledok-graf-kristian.png";
import vysledokGrafLukas from "@/assets/images/vysledok-graf-lukas.png";
import vysledokGrafPeter from "@/assets/images/vysledok-graf-peter.png";
import vysledokGrafSamuel from "@/assets/images/vysledok-graf-samuel.png";
import { useState } from "react";
import type { ReactNode } from "react";

const stories = [
  { name: "Samuel", role: "Štátny zamestnanec", meta: "Investuje pravidelne | 3 roky", amount: "18 427 €", percent: "(+50,02 %)", chartImage: vysledokGrafSamuel },
  { name: "Lukáš", role: "živnostník", meta: "Investuje pravidelne | 2 roky", amount: "1 905 €", percent: "(+35,96 %)", chartImage: vysledokGrafLukas },
  { name: "Braňo", role: "zamestnanie", meta: "Investuje pravidelne | 7 mesiacov", amount: "1 248 €", percent: "(+13,57 %)", chartImage: vysledokGrafBrano },
  { name: "Andrej", role: "podnikateľ", meta: "Investícia: 50 000 € | 2 roky", amount: "20 743 €", percent: "(+43,27 %)", chartImage: vysledokGrafAndrej },
  { name: "Kristián", role: "zamestnanie", meta: "Investuje mesačne 300 € | 4 roky", amount: "8 870 €", percent: "(+41,26 %)", chartImage: vysledokGrafKristian },
  { name: "Peter", role: "podnikateľ", meta: "Za 3 roky::postupne vložil 119 000 €", amount: "59 898 €", percent: "(+51,15 %)", chartImage: vysledokGrafPeter },
];

const disclaimerText =
  "Uvedené výsledky sú individuálne prípady klientov z obdobia 2021-2024, ktoré bolo charakteristické silným rastom globálnych akciových trhov. Nie sú reprezentatívnou vzorkou všetkých klientov a nezaručujú podobné výsledky v budúcnosti. Minulá výkonnosť nie je zárukou budúcich výnosov. Každý klient mal individuálny plán postavený na jeho rizikovom profile, horizonte a cieľoch.";

const renderMeta = (meta: string) => {
  const boldSplit = "::";
  const boldIdx = meta.indexOf(boldSplit);
  if (boldIdx !== -1) {
    const boldPart = meta.slice(0, boldIdx).trim();
    const rest = meta.slice(boldIdx + boldSplit.length).trim();
    return (
      <>
        <strong className="font-bold text-[#1a1a1a]">{boldPart}</strong> {rest}
      </>
    );
  }
  const parts = meta.split("|").map((part) => part.trim());
  if (parts.length < 2) return meta;
  const left = parts.slice(0, -1).join(" | ");
  const duration = parts[parts.length - 1];
  return (
    <>
      {left} | <strong className="font-bold text-[#1a1a1a]">{duration}</strong>
    </>
  );
};

type ResultsSectionTemplateProps = {
  title: ReactNode;
  subtitle: ReactNode;
  ctaLabel: string;
  showCtaResponseNote?: boolean;
  ctaHref?: string;
  onCtaClick?: () => void;
  sectionClassName?: string;
};

const ResultsSectionTemplate = ({
  title,
  subtitle,
  ctaLabel,
  showCtaResponseNote = false,
  ctaHref = "#formular",
  onCtaClick,
  sectionClassName = "relative overflow-hidden py-12 md:py-24 lg:py-28 scroll-mt-24",
}: ResultsSectionTemplateProps) => {
  const [mobileSlide, setMobileSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [touchCurrentX, setTouchCurrentX] = useState<number | null>(null);
  const [touchCurrentY, setTouchCurrentY] = useState<number | null>(null);

  const goToSlide = (index: number) => {
    setMobileSlide(Math.max(0, Math.min(index, stories.length - 1)));
  };

  const onTouchEnd = () => {
    if (touchStartX === null || touchStartY === null || touchCurrentX === null || touchCurrentY === null) {
      setTouchStartX(null);
      setTouchStartY(null);
      setTouchCurrentX(null);
      setTouchCurrentY(null);
      return;
    }

    const deltaX = touchStartX - touchCurrentX;
    const deltaY = Math.abs(touchStartY - touchCurrentY);
    const swipeThreshold = 36;
    if (Math.abs(deltaX) > deltaY && Math.abs(deltaX) > swipeThreshold) {
      if (deltaX > 0) goToSlide(mobileSlide + 1);
      if (deltaX < 0) goToSlide(mobileSlide - 1);
    }

    setTouchStartX(null);
    setTouchStartY(null);
    setTouchCurrentX(null);
    setTouchCurrentY(null);
  };

  return (
    <section id="vysledky" className={sectionClassName} style={{ backgroundColor: "#fff9f5" }}>
      <div className="mx-auto w-full max-w-[1140px] px-5 md:px-8 lg:px-10">
        <AnimatedSection>
          <div className="mx-auto max-w-3xl text-center mb-14 md:mb-16 lg:mb-[4.5rem]">
            <h2 className="[font-family:var(--font-serif)] h3 tracking-tight text-[#1a1a1a]">
              {title}
            </h2>
            <p className="mt-5 md:mt-6 font-sans text-lead leading-relaxed text-[#666]">{subtitle}</p>
          </div>
        </AnimatedSection>

        <div className="md:hidden">
          <div
            className="overflow-hidden"
            onTouchStart={(e) => {
              setTouchStartX(e.touches[0].clientX);
              setTouchStartY(e.touches[0].clientY);
              setTouchCurrentX(e.touches[0].clientX);
              setTouchCurrentY(e.touches[0].clientY);
            }}
            onTouchMove={(e) => {
              setTouchCurrentX(e.touches[0].clientX);
              setTouchCurrentY(e.touches[0].clientY);
            }}
            onTouchEnd={onTouchEnd}
            onTouchCancel={() => {
              setTouchStartX(null);
              setTouchStartY(null);
              setTouchCurrentX(null);
              setTouchCurrentY(null);
            }}
          >
            <div className="flex transition-transform duration-300 ease-out" style={{ transform: `translateX(-${mobileSlide * 100}%)` }}>
              {stories.map((story) => (
                <div key={story.name} className="w-full shrink-0 px-1.5">
                  <article className="flex flex-col h-full rounded-[14px] border border-[#e7e2da] bg-white px-4 py-4 shadow-[0_2px_14px_rgba(0,0,0,0.06)]">
                    <div className="flex items-start gap-3.5">
                      <div className="h-10 w-10 shrink-0 rounded-[10px] flex items-center justify-center shadow-sm bg-center bg-cover" style={{ backgroundImage: `url(${brandPattern})` }}>
                        <span className="font-sans text-base font-bold text-white">%</span>
                      </div>
                      <div className="min-w-0 pt-0.5">
                        <p className="[font-family:var(--font-serif)] h5 leading-none text-[#296A52]">{story.name}</p>
                        <p className="mt-2 font-sans text-body leading-snug text-[#666]">{story.role}</p>
                      </div>
                    </div>
                    <p className="mt-6 text-center font-sans text-base leading-relaxed text-[#1a1a1a]/75">{renderMeta(story.meta)}</p>
                    <div className="mt-5 text-center">
                      <p className="leading-tight inline-flex flex-wrap items-baseline justify-center [font-family:var(--font-serif)]">
                        <span className="inline-flex items-baseline gap-x-0.5">
                          <span className="h5 text-[#296A52]">Zisk:</span>
                          <span className="h5 text-[#1a1a1a] tracking-tight tabular-nums">{story.amount}</span>
                        </span>
                      </p>
                      <p className="mt-1.5 font-sans text-body font-medium text-[#4a4a4a] tabular-nums leading-snug">{story.percent}</p>
                    </div>
                    <div className="mt-6">
                      <img src={story.chartImage} alt={`Graf výsledku klienta ${story.name}`} className="block w-full h-[148px] rounded-[10px] object-cover" loading="lazy" decoding="async" />
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 flex items-center justify-center gap-2">
            {stories.map((story, index) => (
              <button
                key={`dot-${story.name}`}
                type="button"
                onClick={() => goToSlide(index)}
                aria-label={`Prejsť na kartu ${index + 1}`}
                className={`h-2.5 rounded-full transition-all duration-200 ${index === mobileSlide ? "w-6 bg-primary" : "w-2.5 bg-primary/25"}`}
              />
            ))}
          </div>
        </div>

        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {stories.map((story, i) => (
            <AnimatedSection key={story.name} delay={i * 0.06}>
              <article className="flex flex-col h-full rounded-[14px] border border-[#e7e2da] bg-white px-4 py-4 shadow-[0_2px_14px_rgba(0,0,0,0.06)]">
                <div className="flex items-start gap-3.5">
                  <div className="h-10 w-10 shrink-0 rounded-[10px] flex items-center justify-center shadow-sm bg-center bg-cover" style={{ backgroundImage: `url(${brandPattern})` }}>
                    <span className="font-sans text-base font-bold text-white">%</span>
                  </div>
                  <div className="min-w-0 pt-0.5">
                    <p className="[font-family:var(--font-serif)] h5 leading-none text-[#296A52]">{story.name}</p>
                    <p className="mt-2 font-sans text-base leading-snug text-[#666]">{story.role}</p>
                  </div>
                </div>
                <p className="mt-6 text-center font-sans text-body leading-relaxed text-[#1a1a1a]/75">{renderMeta(story.meta)}</p>
                <div className="mt-5 text-center">
                  <p className="leading-tight inline-flex flex-wrap items-baseline justify-center md:flex-nowrap">
                    <span className="inline-flex items-baseline gap-x-0.5 md:gap-x-1">
                      <span className="[font-family:var(--font-serif)] h5 text-[#296A52] shrink-0">Zisk:</span>
                      <span className="[font-family:var(--font-serif)] h5 text-[#1a1a1a] tracking-tight tabular-nums">{story.amount}</span>
                    </span>
                    <span className="ml-2 md:ml-2.5 font-sans text-body font-medium text-[#4a4a4a] tabular-nums leading-snug shrink-0">{story.percent}</span>
                  </p>
                </div>
                <div className="mt-6">
                  <img src={story.chartImage} alt={`Graf výsledku klienta ${story.name}`} className="block w-full h-[148px] rounded-[10px] object-cover" loading="lazy" decoding="async" />
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <div className="mx-auto mt-10 md:mt-12 max-w-5xl">
            <p className="text-center font-sans text-caption leading-relaxed text-[#666]">{disclaimerText}</p>
            <div className="mt-7 md:mt-8 text-center">
              {ctaHref ? (
                <a href={ctaHref} className="btn-primary text-body">
                  {ctaLabel}
                </a>
              ) : (
                <button type="button" onClick={onCtaClick} className="btn-primary text-body">
                  {ctaLabel}
                </button>
              )}
              {showCtaResponseNote ? (
                <div>
                  <CtaResponseNote />
                </div>
              ) : null}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export type { ResultsSectionTemplateProps };
export default ResultsSectionTemplate;
