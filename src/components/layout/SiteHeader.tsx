import brandLogo from "@/assets/images/js-mentor-logo.png";

type SiteHeaderProps = {
  ctaLabel?: string;
  ctaHref?: string;
  ctaTarget?: string;
  ctaOnClick?: () => void;
};

const SiteHeader = ({
  ctaLabel = "Chcem sa pridať ZADARMO 🚀",
  ctaHref,
  ctaTarget,
  ctaOnClick,
}: SiteHeaderProps) => {
  const ctaClassName = "btn-primary btn-primary-site-header text-body";

  const ctaButton = ctaHref ? (
    <a href={ctaHref} target={ctaTarget} rel={ctaTarget === "_blank" ? "noopener noreferrer" : undefined} className={ctaClassName}>
      {ctaLabel}
    </a>
  ) : (
    <button type="button" onClick={ctaOnClick} className={ctaClassName}>
      {ctaLabel}
    </button>
  );

  return (
    <header
      className="site-header border-b border-primary/10"
      style={{ backgroundColor: "rgba(255, 249, 245, 0.9)" }}
    >
      <div className="mx-auto flex max-w-[980px] flex-row items-center justify-between gap-2 px-4 py-3 md:gap-4 md:px-10 md:py-4 lg:px-0">
        <a href="/" className="flex min-w-0 shrink-0 items-center">
          <img
            src={brandLogo}
            alt="JS Mentor logo"
            className="h-7 w-auto max-w-none shrink-0 object-contain md:h-12 md:min-w-[153px]"
          />
        </a>

        {ctaButton}
      </div>
    </header>
  );
};

export default SiteHeader;
