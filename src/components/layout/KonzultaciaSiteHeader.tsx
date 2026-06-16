import brandLogo from "@/assets/images/js-mentor-logo.png";
import { Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type HeaderItem = {
  label: string;
  href?: string;
  onClick?: () => void;
};

type KonzultaciaSiteHeaderProps = {
  items?: HeaderItem[];
  ctaLabel?: string;
  ctaMobileLabel?: string;
  ctaHref?: string;
  ctaIcon?: ReactNode;
  ctaOnClick?: () => void;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  secondaryCtaOnClick?: () => void;
  logoOnly?: boolean;
};

const navLinkClass =
  "rounded-full px-3.5 py-2 font-sans text-sm font-medium text-foreground/75 transition-colors hover:bg-primary/[0.07] hover:text-primary lg:px-4 lg:text-[0.9375rem]";

const KonzultaciaSiteHeader = ({
  items = [],
  ctaLabel = "Chcem začať teraz",
  ctaMobileLabel,
  ctaHref,
  ctaIcon,
  ctaOnClick,
  secondaryCtaLabel,
  secondaryCtaHref,
  secondaryCtaOnClick,
  logoOnly = false,
}: KonzultaciaSiteHeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleItemClick = (item: HeaderItem) => {
    item.onClick?.();
    setMobileMenuOpen(false);
  };

  const ctaOpensNewTab = Boolean(ctaHref && /^https?:\/\//i.test(ctaHref));

  const ctaClassName = cn(
    "btn-primary btn-primary-site-header text-body shrink-0",
    ctaIcon && "inline-flex items-center gap-2"
  );

  const ctaButton = ctaHref ? (
    <a
      href={ctaHref}
      {...(ctaOpensNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={ctaClassName}
      onClick={() => setMobileMenuOpen(false)}
    >
      {ctaIcon}
      {ctaLabel}
    </a>
  ) : (
    <button type="button" onClick={ctaOnClick} className={ctaClassName}>
      {ctaIcon}
      {ctaLabel}
    </button>
  );

  const mobileLabel = ctaMobileLabel ? (
    <>
      <span className="sm:hidden">{ctaMobileLabel}</span>
      <span className="hidden sm:inline">{ctaLabel}</span>
    </>
  ) : ctaLabel;
  const ctaMobileButton = ctaHref ? (
    <a
      href={ctaHref}
      {...(ctaOpensNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={ctaClassName}
      onClick={() => setMobileMenuOpen(false)}
    >
      {ctaIcon}
      {mobileLabel}
    </a>
  ) : (
    <button type="button" onClick={ctaOnClick} className={ctaClassName}>
      {ctaIcon}
      {mobileLabel}
    </button>
  );

  const secondaryCtaClassName = "konzultacia-header-secondary-cta";

  const renderSecondaryCta = (className: string) => {
    if (!secondaryCtaLabel) return null;
    if (secondaryCtaHref) {
      return (
        <a href={secondaryCtaHref} className={className} onClick={() => setMobileMenuOpen(false)}>
          {secondaryCtaLabel}
        </a>
      );
    }
    return (
      <button type="button" onClick={secondaryCtaOnClick} className={className}>
        {secondaryCtaLabel}
      </button>
    );
  };

  const logo = (
    <a href="/konzultacia" className="flex shrink-0 items-center">
      <img
        src={brandLogo}
        alt="JS Mentor logo"
        className="h-7 w-auto shrink-0 object-contain md:h-9 lg:h-10"
      />
    </a>
  );

  if (logoOnly) {
    return (
      <header data-js-site-header className="konzultacia-header-shell">
        <div className="konzultacia-header-bar konzultacia-header-bar--logo-only">{logo}</div>
      </header>
    );
  }

  return (
    <header data-js-site-header className="konzultacia-header-shell">
      <div className="konzultacia-header-bar">
        {logo}

        <nav className="konzultacia-header-nav hidden min-w-0 xl:flex" aria-label="Navigácia stránky">
          {items.map((item) =>
            item.href ? (
              <a key={item.label} href={item.href} className={navLinkClass}>
                {item.label}
              </a>
            ) : (
              <button key={item.label} type="button" onClick={() => item.onClick?.()} className={navLinkClass}>
                {item.label}
              </button>
            )
          )}
        </nav>

        <div className="konzultacia-header-mobile-cta xl:hidden">{ctaMobileButton}</div>

        <div className="konzultacia-header-actions">
          <div className="hidden items-center gap-2.5 xl:flex">
            {renderSecondaryCta(secondaryCtaClassName)}
            {ctaButton}
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? "Zavrieť menu" : "Otvoriť menu"}
            aria-expanded={mobileMenuOpen}
            className="konzultacia-header-menu-toggle xl:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileMenuOpen ? (
          <div className="konzultacia-header-mobile-panel xl:hidden">
            <nav className="flex flex-col gap-0.5" aria-label="Mobilná navigácia">
              {items.map((item) =>
                item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="konzultacia-header-mobile-link"
                  >
                    {item.label}
                  </a>
                ) : (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => handleItemClick(item)}
                    className="konzultacia-header-mobile-link"
                  >
                    {item.label}
                  </button>
                )
              )}
            </nav>
            {secondaryCtaLabel ? (
              <div className="mt-2">{renderSecondaryCta("konzultacia-header-mobile-link font-semibold text-primary")}</div>
            ) : null}
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default KonzultaciaSiteHeader;
