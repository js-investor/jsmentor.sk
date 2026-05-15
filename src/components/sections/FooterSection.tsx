import brandLogo from "@/assets/images/js-mentor-logo.png";

const FooterSection = () => (
  <footer
    className="border-t border-black/[0.08] px-4 py-3 md:px-10"
    style={{ backgroundColor: "#FFF9F5" }}
  >
    <div className="mx-auto flex max-w-[980px] flex-nowrap items-center justify-center gap-4 overflow-x-auto whitespace-nowrap text-xs leading-tight text-foreground/65 md:justify-between md:gap-6 md:text-sm">
      <a href="/" className="inline-flex shrink-0 items-center">
        <img src={brandLogo} alt="JS Mentor" className="h-7 w-auto md:h-8" />
      </a>
      <div className="flex min-w-0 shrink items-center gap-2 md:gap-3">
        <span className="font-sans tabular-nums">
          © 2026 Jashik s.r.o. Všetky práva vyhradené.
        </span>
        <span className="text-foreground/35 select-none" aria-hidden>
          ·
        </span>
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
