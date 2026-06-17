import SiteHeader from "@/components/layout/SiteHeader";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type HeroSectionTemplateProps = {
  headerCtaLabel?: string;
  headerCtaHref?: string;
  headerCtaTarget?: string;
  headerCtaOnClick?: () => void;
  preheader?: ReactNode;
  title: ReactNode;
  subtitle: ReactNode;
  description?: ReactNode;
  trustBadges?: ReactNode[];
  /** Jednotný panel so štatistikami namiesto troch samostatných kariet. */
  trustStatsPanel?: ReactNode;
  fullWidthBadge?: ReactNode;
  heroCtaLabel?: string;
  heroCtaHref?: string;
  heroCtaTarget?: string;
  heroCtaOnClick?: () => void;
  badges?: string[];
  videoSrc?: string;
  videoTitle?: string;
  /** Skryje horný „pill“ pod `md` (užší hero na mobile). */
  hidePreheaderBelowMd?: boolean;
  /** Skryje lead / podnadpis pod `md`. */
  hideSubtitleBelowMd?: boolean;
  /** Voliteľné triedy podnadpisu (napr. `hero-subheadline`). */
  subtitleClassName?: string;
  /** Voliteľné triedy horného pillu (preheader). */
  preheaderClassName?: string;
  /** Voliteľné triedy popisu pod podnadpisom (napr. `hero-description`). */
  descriptionClassName?: string;
  /** Menšie spodné odsadenie, keď hero priamo nadväzuje ďalšia sekcia rovnakej farby. */
  compactBottom?: boolean;
};

const HeroSectionTemplate = ({
  headerCtaLabel,
  headerCtaHref,
  headerCtaTarget,
  headerCtaOnClick,
  preheader,
  title,
  subtitle,
  description,
  trustBadges = [],
  trustStatsPanel,
  fullWidthBadge,
  heroCtaLabel,
  heroCtaHref,
  heroCtaTarget,
  heroCtaOnClick,
  badges = [],
  videoSrc,
  videoTitle = "Hero video",
  hidePreheaderBelowMd = false,
  hideSubtitleBelowMd = false,
  subtitleClassName,
  preheaderClassName,
  descriptionClassName,
  compactBottom = false,
}: HeroSectionTemplateProps) => {
  const heroCta = heroCtaLabel ? (
    <div className="flex justify-center mb-10 md:mb-12">
      {heroCtaHref ? (
        <a href={heroCtaHref} target={heroCtaTarget} rel={heroCtaTarget === "_blank" ? "noopener noreferrer" : undefined} className="btn-primary text-body" data-umami-event="click_herohero" data-umami-event-section="hero">
          {heroCtaLabel}
        </a>
      ) : (
        <button type="button" onClick={heroCtaOnClick} className="btn-primary text-body">
          {heroCtaLabel}
        </button>
      )}
    </div>
  ) : null;

  return (
  <>
    <SiteHeader ctaLabel={headerCtaLabel} ctaHref={headerCtaHref} ctaTarget={headerCtaTarget} ctaOnClick={headerCtaOnClick} />

    <section className="relative overflow-hidden" style={{ backgroundColor: "#FFF9F5" }}>
      <div className="absolute inset-0 bg-dot-grid opacity-50" />
      <div className="absolute top-20 right-[20%] w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-[10%] w-[300px] h-[300px] rounded-full bg-forest-glow/5 blur-[80px] pointer-events-none" />

    <div
      className={cn(
        "relative z-10 mx-auto max-w-[980px] px-5 pt-12 md:px-10 md:pt-16 lg:px-0 lg:pt-20",
        compactBottom ? "pb-8 md:pb-10" : "pb-[4rem]",
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-[980px] mx-auto text-center"
      >
        {preheader ? (
          <p
            className={cn(
              preheaderClassName ??
                "rounded-full bg-[#8A7057] px-4 py-1.5 text-small font-sans font-semibold uppercase tracking-[0.12em] text-white",
              "mb-8",
              hidePreheaderBelowMd ? "hidden md:inline-block" : "inline-block",
            )}
          >
            {preheader}
          </p>
        ) : null}
        <div
          className={`relative ${
            hideSubtitleBelowMd
              ? "mb-10 md:mb-10"
              : "mb-8 md:mb-10"
          }`}
        >
          <h1 className="headline-hero relative z-10">
            {title}
          </h1>
        </div>
        <p
          className={cn(
            subtitleClassName ??
              "text-lead font-sans font-normal text-muted-foreground max-md:text-pretty",
            "mb-8 md:mb-10",
            hideSubtitleBelowMd && "hidden md:block",
          )}
        >
          {subtitle}
        </p>
        {description ? (
          <p
            className={cn(
              descriptionClassName ??
                "text-body font-sans font-normal text-foreground/70",
              heroCtaLabel ? "mb-6 md:mb-8" : "mb-10 md:mb-12",
            )}
          >
            {description}
          </p>
        ) : null}

        {heroCta}

        {videoSrc ? (
          <div className="w-full md:w-[85%] max-w-[969px] mx-auto rounded-2xl overflow-hidden aspect-video bg-black shadow-[0_8px_32px_-4px_rgba(0,0,0,0.18),0_24px_64px_-12px_rgba(0,0,0,0.28),0_0_0_1px_rgba(0,0,0,0.1)] mb-10 md:mb-12">
            <iframe
              src={videoSrc}
              title={videoTitle}
              allow="autoplay; fullscreen; picture-in-picture"
              className="block w-full h-full align-top"
            />
          </div>
        ) : null}

        {(trustStatsPanel || trustBadges.length > 0 || fullWidthBadge) ? (
          <div
            className={cn(
              "mx-auto flex w-full max-w-[969px] flex-col gap-2 md:w-[85%] md:gap-3",
              compactBottom ? "mb-4 md:mb-6" : "mb-10 md:mb-12",
            )}
          >
            {trustStatsPanel ? (
              trustStatsPanel
            ) : trustBadges.length > 0 ? (
              <div className="grid grid-cols-1 gap-2 sm:gap-3 sm:grid-cols-3">
                {trustBadges.map((badge, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center rounded-2xl border border-white/15 px-3 py-3.5 text-center text-white shadow-[0_10px_32px_-12px_rgba(2,60,46,0.45)] sm:min-h-[11.5rem] md:min-h-[10rem] md:px-4 md:py-5"
                    style={{
                      background:
                        "linear-gradient(145deg, #023c2e 0%, #065f4a 48%, #0a5a47 100%)",
                    }}
                  >
                    {badge}
                  </div>
                ))}
              </div>
            ) : null}

            {fullWidthBadge ? (
              <div className="overflow-hidden rounded-2xl shadow-[0_10px_36px_-14px_rgba(28,22,18,0.28)]">
                {fullWidthBadge}
              </div>
            ) : null}
          </div>
        ) : null}

        {badges.length > 0 ? (
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-small font-sans text-muted-foreground">
            {badges.map((badge, index) => (
              <span key={badge} className="flex items-center gap-3">
                {index > 0 ? <span aria-hidden="true" className="text-muted-foreground/40">•</span> : null}
                <span>{badge}</span>
              </span>
            ))}
          </div>
        ) : null}
      </motion.div>
    </div>
    </section>
  </>
  );
};

export type { HeroSectionTemplateProps };
export default HeroSectionTemplate;
