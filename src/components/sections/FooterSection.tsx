import brandLogo from "@/assets/images/js-mentor-logo.png";

const FooterSection = () => (
  <footer
    className="border-t border-black/[0.08] px-4 py-3 md:px-10"
    style={{ backgroundColor: "#FFF9F5" }}
  >
    <div className="mx-auto flex max-w-[980px] flex-col items-center gap-2 text-center text-xs leading-tight text-foreground/65 md:flex-row md:justify-between md:gap-6 md:text-left md:text-sm">
      <a href="/" className="inline-flex shrink-0 items-center">
        <img src={brandLogo} alt="JS Mentor" className="h-7 w-auto md:h-8" />
      </a>
      <div className="flex flex-col items-center gap-1 md:flex-row md:gap-3">
        <span className="font-sans tabular-nums">
          © 2026 Jashik s.r.o. Všetky práva vyhradené.
        </span>
        <span className="hidden text-foreground/35 select-none md:inline" aria-hidden>·</span>
        <a
          href="/gdpr"
          className="font-sans text-foreground/65 underline-offset-2 transition-colors hover:text-foreground hover:underline"
        >
          Ochrana osobných údajov (GDPR)
        </a>
      </div>
    </div>
  </footer>
);

export default FooterSection;
