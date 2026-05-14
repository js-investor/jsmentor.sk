import brandLogoWhite from "@/assets/images/js-investor-logo-biele.png";
import { Instagram, Youtube, Podcast, Linkedin } from "lucide-react";

const FooterSection = () => (
  <footer className="bg-footer-bg py-16 px-5 md:px-10 relative overflow-hidden">
    {/* Subtle grid overlay */}
    <div className="absolute inset-0 opacity-[0.03]" style={{
      backgroundImage: 'linear-gradient(hsl(152 60% 45% / 0.5) 1px, transparent 1px), linear-gradient(90deg, hsl(152 60% 45% / 0.5) 1px, transparent 1px)',
      backgroundSize: '60px 60px'
    }} />

    {/* Top glow line */}
    <div className="absolute top-0 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

    <div className="max-w-[1200px] mx-auto relative z-10">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8 mb-12">
        {/* Left */}
        <div>
          <div className="flex items-center mb-3">
            <a href="/" className="inline-flex">
              <img
                src={brandLogoWhite}
                alt="JS Investor logo"
                className="h-10 md:h-12 w-auto"
              />
            </a>
          </div>
          <p className="font-sans text-base text-cream/60">
            Sprievodca budovaním majetku pre ambicióznych ľudí.
          </p>
          <div className="mt-4 flex items-center gap-4">
            <a
              href="https://www.instagram.com/js.investor/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-cream hover:text-white transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://www.youtube.com/@Ivanjasik"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="text-cream hover:text-white transition-colors"
            >
              <Youtube className="w-5 h-5" />
            </a>
            <a
              href="https://open.spotify.com/show/3yLIJ0QOSFnJPkR4JT2ZJs"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Spotify"
              className="text-cream hover:text-white transition-colors"
            >
              <Podcast className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/ivan-ja%C5%A1%C3%ADk-7256801a2/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-cream hover:text-white transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 md:contents">
          {/* Center */}
          <div>
            <p className="font-sans font-semibold text-cream mb-3">Kontakt</p>
            <div className="space-y-1 font-sans text-base text-cream/70">
              <p>+421 902 519 328</p>
              <p>info@ivanjasik.sk</p>
              <p>Veľká okružná 17, 010 01 Žilina</p>
            </div>
          </div>

          {/* Right */}
          <div>
            <p className="font-sans font-semibold text-cream mb-3">Firemné údaje</p>
            <div className="space-y-1 font-sans text-base text-cream/70">
              <p>Jashik s.r.o.</p>
              <p>Registrácia NBS: 282999</p>
              <p>IČO: 54253969</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-cream/10 pt-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 font-sans text-caption text-cream/40 text-center">
          <p>© 2026 Jashik s.r.o. Všetky práva vyhradené.</p>
          <span className="hidden sm:inline text-cream/30">|</span>
          <a href="/gdpr" className="text-cream/60 hover:text-cream transition-colors">
            Ochrana osobných údajov (GDPR)
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default FooterSection;
