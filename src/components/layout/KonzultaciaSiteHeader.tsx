import brandLogo from "@/assets/images/js-investor-logo.png";
import { Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type HeaderItem = {
  label: string;
  href?: string;
  onClick?: () => void;
};

type SiteHeaderProps = {
  items?: HeaderItem[];
  ctaLabel?: string;
  ctaHref?: string;
  /** Voliteľná ikona vľavo od textu CTA (napr. WhatsApp). */
  ctaIcon?: ReactNode;
  ctaOnClick?: () => void;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  secondaryCtaOnClick?: () => void;
  /** Len logo (domovský odkaz), bez navigácie, CTA a mobilného menu. */
  logoOnly?: boolean;
};

const defaultItems: HeaderItem[] = [
  { label: "Lorem" },
  { label: "Ipsum" },
  { label: "Dolor" },
  { label: "Sit" },
  { label: "Amet" },
];

const navLinkClass =
  "whitespace-nowrap font-sans text-sm lg:text-[0.9375rem] font-medium text-foreground/75 hover:text-primary transition-colors";

const SiteHeader = ({
  items = defaultItems,
  ctaLabel = "Lorem ipsum",
  ctaHref,
  ctaIcon,
  ctaOnClick,
  secondaryCtaLabel,
  secondaryCtaHref,
  secondaryCtaOnClick,
  logoOnly = false,
}: SiteHeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleItemClick = (item: HeaderItem) => {
    item.onClick?.();
    setMobileMenuOpen(false);
  };

  const ctaOpensNewTab = Boolean(ctaHref && /^https?:\/\//i.test(ctaHref));

  const ctaButton = ctaHref ? (
    <a
      href={ctaHref}
      {...(ctaOpensNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "btn-pill menu-cta-pill whitespace-nowrap justify-self-center xl:justify-self-auto",
        ctaIcon && "gap-2"
      )}
    >
      {ctaIcon}
      {ctaLabel}
    </a>
  ) : (
    <button
      type="button"
      onClick={ctaOnClick}
      className="btn-pill menu-cta-pill whitespace-nowrap justify-self-center xl:justify-self-auto"
    >
      {ctaLabel}
    </button>
  );

  const secondaryCtaButton = secondaryCtaLabel ? (
    secondaryCtaHref ? (
      <a
        href={secondaryCtaHref}
        className="hidden md:inline-flex h-10 px-4 rounded-full border border-primary/20 bg-white/40 font-sans text-sm font-semibold text-primary hover:bg-primary/5 transition-colors whitespace-nowrap"
      >
        {secondaryCtaLabel}
      </a>
    ) : (
      <button
        type="button"
        onClick={secondaryCtaOnClick}
        className="hidden md:inline-flex h-10 px-4 rounded-full border border-primary/20 bg-white/40 font-sans text-sm font-semibold text-primary hover:bg-primary/5 transition-colors whitespace-nowrap"
      >
        {secondaryCtaLabel}
      </button>
    )
  ) : null;

  const logo = (
    <a href="/" className="flex items-center shrink-0">
      <img
        src={brandLogo}
        alt="JS Investor logo"
        className="h-8 md:h-10 w-auto max-w-none min-w-[96px] md:min-w-[128px] shrink-0 object-contain"
      />
    </a>
  );

  if (logoOnly) {
    return (
      <header data-js-site-header className="site-header-shell">
        <div className="site-header-bar site-header-bar--logo-only">{logo}</div>
      </header>
    );
  }

  return (
    <header data-js-site-header className="site-header-shell">
      <div className="site-header-bar site-header-bar--full">
        {logo}

        <nav className="hidden xl:flex items-center justify-center gap-6 2xl:gap-8 min-w-0">
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

        <div className="xl:hidden justify-self-center">{ctaButton}</div>

        <div className="hidden xl:flex items-center gap-2.5 justify-self-end shrink-0">
          {secondaryCtaButton}
          {ctaButton}
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label={mobileMenuOpen ? "Zavrieť menu" : "Otvoriť menu"}
          aria-expanded={mobileMenuOpen}
          className="site-header-menu-toggle"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {mobileMenuOpen ? (
          <div className="site-header-mobile-panel xl:hidden">
            <div className="flex flex-col">
              {items.map((item) =>
                item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center px-4 py-3 rounded-xl font-sans text-base font-medium text-foreground hover:bg-primary/5 transition-colors"
                  >
                    {item.label}
                  </a>
                ) : (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => handleItemClick(item)}
                    className="w-full text-center px-4 py-3 rounded-xl font-sans text-base font-medium text-foreground hover:bg-primary/5 transition-colors"
                  >
                    {item.label}
                  </button>
                )
              )}
            </div>
            {secondaryCtaLabel ? (
              secondaryCtaHref ? (
                <a
                  href={secondaryCtaHref}
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-2 block w-full text-center rounded-xl border border-primary/20 px-4 py-3 font-sans text-base font-semibold text-primary hover:bg-primary/5"
                >
                  {secondaryCtaLabel}
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    secondaryCtaOnClick?.();
                    setMobileMenuOpen(false);
                  }}
                  className="mt-2 block w-full rounded-xl border border-primary/20 px-4 py-3 font-sans text-base font-semibold text-primary hover:bg-primary/5"
                >
                  {secondaryCtaLabel}
                </button>
              )
            ) : null}
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default SiteHeader;
