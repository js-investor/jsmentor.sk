import SiteHeader from "@/components/layout/SiteHeader";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type HeroSectionTemplateProps = {
  headerCtaLabel?: string;
  headerCtaHref?: string;
  headerCtaOnClick?: () => void;
  preheader?: ReactNode;
  title: ReactNode;
  subtitle: ReactNode;
  description?: ReactNode;
  trustBadges?: ReactNode[];
  fullWidthBadge?: ReactNode;
  heroCtaLabel?: string;
  heroCtaHref?: string;
  heroCtaOnClick?: () => void;
  badges?: string[];
  videoSrc?: string;
  videoTitle?: string;
};

const HeroSectionTemplate = ({
  headerCtaLabel,
  headerCtaHref,
  headerCtaOnClick,
  preheader,
  title,
  subtitle,
  description,
  trustBadges = [],
  fullWidthBadge,
  heroCtaLabel,
  heroCtaHref,
  heroCtaOnClick,
  badges = [],
  videoSrc,
  videoTitle = "Hero video",
}: HeroSectionTemplateProps) => (
  <>
    <SiteHeader ctaLabel={headerCtaLabel} ctaHref={headerCtaHref} ctaOnClick={headerCtaOnClick} />

    <section className="relative overflow-hidden" style={{ backgroundColor: "#FFF9F5" }}>
      <div className="absolute inset-0 bg-dot-grid opacity-50" />
      <div className="absolute top-20 right-[20%] w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-[10%] w-[300px] h-[300px] rounded-full bg-forest-glow/5 blur-[80px] pointer-events-none" />

    <div className="relative z-10 px-5 md:px-10 lg:px-0 pb-[4rem] pt-12 md:pt-16 lg:pt-20 max-w-[980px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-[980px] mx-auto text-center"
      >
        {preheader ? (
          <p className="inline-block bg-[#cdbca2] rounded-full px-4 py-1.5 text-small font-sans font-semibold uppercase tracking-[0.12em] text-black mb-8">
            {preheader}
          </p>
        ) : null}
        <div className="relative mb-8 md:mb-10">
          <div className="absolute -inset-x-12 -inset-y-6 bg-gradient-to-r from-primary/10 via-primary/25 to-primary/10 blur-3xl rounded-full animate-glow-pulse pointer-events-none" />
          <h1 className="headline-hero relative z-10">
            {title}
          </h1>
        </div>
        <p className="text-lead font-sans text-muted-foreground mb-10 md:mb-12">{subtitle}</p>
        {description ? (
          <p className="text-body font-sans text-foreground/70 mb-10 md:mb-12">{description}</p>
        ) : null}

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

        {(trustBadges.length > 0 || fullWidthBadge) ? (
          <div className="w-full md:w-[85%] max-w-[969px] mx-auto mb-10 md:mb-12 flex flex-col gap-3">
            {trustBadges.length > 0 ? (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {trustBadges.map((badge, index) => (
                  <div
                    key={index}
                    className="flex min-h-[9rem] flex-col items-center justify-center rounded-2xl border border-[#D5CCC2] bg-[#F1ECE6] px-4 py-5 text-center sm:min-h-[10rem]"
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

        {heroCtaLabel ? (
          <div className="flex justify-center mb-6">
            {heroCtaHref ? (
              <a href={heroCtaHref} className="btn-primary text-body">
                {heroCtaLabel}
              </a>
            ) : (
              <button type="button" onClick={heroCtaOnClick} className="btn-primary text-body">
                {heroCtaLabel}
              </button>
            )}
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

export type { HeroSectionTemplateProps };
export default HeroSectionTemplate;
