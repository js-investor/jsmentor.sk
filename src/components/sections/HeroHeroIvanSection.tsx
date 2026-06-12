import AnimatedSection from "@/components/AnimatedSection";

const HeroHeroIvanSection = () => (
  <section
    id="ivan"
    className="section-white relative scroll-mt-24 overflow-hidden px-5 md:px-8 pt-0 pb-[72px] md:pb-[96px]"
    style={{ backgroundColor: "#FFF9F5" }}
  >
    <div className="absolute inset-0 bg-dot-grid opacity-20 pointer-events-none" />

    <div className="relative z-10 mx-auto max-w-[980px]">
      <AnimatedSection>
        <div className="mx-auto w-full max-w-[775px] space-y-10 text-left md:w-[68%] md:space-y-8">
          <p className="font-sans text-[1.125rem] leading-relaxed text-foreground/90 md:text-body">
            Volám sa Ivan a už viac ako 8 rokov zdieľam obsah o peniazoch a raste na Instagrame. Nie som špekulant,
            som odborník{" "}
            <strong className="font-bold text-foreground">s licenciou v Národnej banke Slovenska</strong>
            {" "}a som absolventom{" "}
            <strong className="font-bold text-foreground">EFA (najväčší finančný titul v EÚ)</strong>.
          </p>

          <p className="headline-serif text-[2rem] text-balance leading-[1.15] text-foreground md:text-[2.125rem] lg:text-[2.5rem]">
            Keď mi Meta druhýkrát vypla jsInvestor, pochopil som jednu vec.
          </p>

          <p className="font-sans text-[1.25rem] font-bold leading-relaxed text-foreground md:text-[1.375rem]">
            Najcennejšie finančné know-how nemôže visieť len na Instagrame.
          </p>

          <p className="font-sans text-[1.125rem] leading-relaxed text-foreground/90 md:text-body">
            Nešlo o krypto signály. Nešlo o trading skupinu. Nešlo o rýchle zbohatnutie.
          </p>

          <p className="font-sans text-[1.125rem] leading-relaxed text-foreground/90 md:text-body">
            <strong className="font-bold text-foreground">Riešil som bežné témy,</strong>{" "}
            ktoré Slováci riešia každý deň: hypotéky, investovanie, fondy, ETF,
            nehnuteľnosti, rentu, poplatky a rozhodnutia, ktoré môžu človeka stáť tisíce eur.
          </p>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default HeroHeroIvanSection;
