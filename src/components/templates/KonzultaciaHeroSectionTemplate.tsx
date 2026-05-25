import KonzultaciaSiteHeader from "@/components/layout/KonzultaciaSiteHeader";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type HeaderItem = {
  label: string;
  href?: string;
  onClick?: () => void;
};

type HeroSectionTemplateProps = {
  headerItems: HeaderItem[];
  headerCtaLabel: string;
  headerCtaHref?: string;
  headerCtaOnClick?: () => void;
  headerSecondaryCtaLabel?: string;
  headerSecondaryCtaHref?: string;
  headerSecondaryCtaOnClick?: () => void;
  title: ReactNode;
  subtitle: ReactNode;
  description?: ReactNode;
  heroCtaLabel: string;
  heroCtaHref?: string;
  heroCtaOnClick?: () => void;
  heroSecondaryLinkLabel?: string;
  heroSecondaryLinkHref?: string;
  heroSecondaryLinkOnClick?: () => void;
  badges?: string[];
  videoSrc?: string;
  videoTitle?: string;
  /** Zarovnanie hero textu a CTA (predvolene ako na homepage). */
  heroLayout?: "center" | "left";
  /** Voliteľná trieda pre H1 (predvolene `headline-hero`). */
  heroHeadlineClassName?: string;
};

const HeroSectionTemplate = ({
  headerItems,
  headerCtaLabel,
  headerCtaHref,
  headerCtaOnClick,
  headerSecondaryCtaLabel,
  headerSecondaryCtaHref,
  headerSecondaryCtaOnClick,
  title,
  subtitle,
  description,
  heroCtaLabel,
  heroCtaHref,
  heroCtaOnClick,
  heroSecondaryLinkLabel,
  heroSecondaryLinkHref,
  heroSecondaryLinkOnClick,
  badges = [],
  videoSrc,
  videoTitle = "Hero video",
  heroLayout = "center",
  heroHeadlineClassName = "headline-hero",
}: HeroSectionTemplateProps) => {
  const heroAlignLeft = heroLayout === "left";

  return (
  <section className="relative overflow-hidden" style={{ backgroundColor: "#FFF9F5" }}>
    <div className="absolute inset-0 bg-dot-grid opacity-50" />
    <div className="absolute top-20 right-[20%] w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />
    <div className="absolute bottom-0 left-[10%] w-[300px] h-[300px] rounded-full bg-forest-glow/5 blur-[80px] pointer-events-none" />

    <KonzultaciaSiteHeader
      items={headerItems}
      ctaLabel={headerCtaLabel}
      ctaHref={headerCtaHref}
      ctaOnClick={headerCtaOnClick}
      secondaryCtaLabel={headerSecondaryCtaLabel}
      secondaryCtaHref={headerSecondaryCtaHref}
      secondaryCtaOnClick={headerSecondaryCtaOnClick}
    />

    <div className="relative z-10 px-5 md:px-10 lg:px-16 pb-[4rem] pt-[8rem] max-w-[1400px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={cn("max-w-[980px]", heroAlignLeft ? "mx-0 text-left" : "mx-auto text-center")}
      >
        <h1 className={cn(heroHeadlineClassName, "mb-6 md:mb-8")}>
          {title}
        </h1>
        <p className="text-lead font-sans text-muted-foreground mb-6">{subtitle}</p>
        {description ? (
          <p className="text-body font-sans text-foreground/70 mb-8">{description}</p>
        ) : null}

        <div
          className={cn(
            "flex flex-col sm:flex-row gap-4 mb-4",
            heroAlignLeft ? "items-start sm:items-center justify-start" : "items-center justify-center",
          )}
        >
          {heroCtaHref ? (
            <a href={heroCtaHref} className="btn-primary text-body">
              {heroCtaLabel}
            </a>
          ) : (
            <button type="button" onClick={heroCtaOnClick} className="btn-primary text-body">
              {heroCtaLabel}
            </button>
          )}
          {heroSecondaryLinkLabel ? (
            heroSecondaryLinkHref ? (
              <a
                href={heroSecondaryLinkHref}
                className="font-sans text-body font-normal text-foreground hover:text-foreground/75 transition-colors"
              >
                {heroSecondaryLinkLabel}
              </a>
            ) : (
              <button
                type="button"
                onClick={heroSecondaryLinkOnClick}
                className="font-sans text-body font-normal text-foreground hover:text-foreground/75 transition-colors"
              >
                {heroSecondaryLinkLabel}
              </button>
            )
          ) : null}
        </div>

        {badges.length > 0 ? (
          <div
            className={cn(
              "flex flex-wrap items-center gap-x-6 gap-y-2 text-small font-sans text-muted-foreground mb-10",
              heroAlignLeft ? "justify-start" : "justify-center",
            )}
          >
            {badges.map((badge) => (
              <span key={badge} className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-primary" />
                {badge}
              </span>
            ))}
          </div>
        ) : null}

        {videoSrc ? (
          <div
            className={cn(
              "w-full md:w-[85%] max-w-[969px] rounded-2xl overflow-hidden aspect-video bg-black shadow-[0_8px_32px_-4px_rgba(0,0,0,0.18),0_24px_64px_-12px_rgba(0,0,0,0.28),0_0_0_1px_rgba(0,0,0,0.1)]",
              heroAlignLeft ? "mr-auto" : "mx-auto",
            )}
          >
            <iframe
              src={videoSrc}
              title={videoTitle}
              allow="autoplay; fullscreen; picture-in-picture"
              className="block w-full h-full align-top"
            />
          </div>
        ) : null}
      </motion.div>
    </div>
  </section>
  );
};

export type { HeroSectionTemplateProps as KonzultaciaHeroSectionTemplateProps };
export default HeroSectionTemplate;
