import AnimatedSection from "@/components/AnimatedSection";
import ivanPortrait from "@/assets/images/jsinvestor-ivan-obleku-cita-dokumenty-financie.jpg";

const facts = [
  "531+ klientov",
  "3M€+ v ETF portfóliách",
  "5.4M€+ v investičných nehnuteľnostiach",
  "115 000+ sledovateľov na Instagrame",
];

const KtoStojiZaJsInvestorSection = () => (
  <section className="bg-footer-bg section-padding relative overflow-hidden">
    <div className="absolute inset-0 bg-dot-grid opacity-20" />
    <div className="section-container relative z-10">
      <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[45fr_55fr] lg:gap-10">
        <AnimatedSection>
          <div className="h-full">
            <div className="overflow-hidden rounded-2xl shadow-[0_16px_40px_-24px_rgba(0,0,0,0.45)]">
              <img
                src={ivanPortrait}
                alt="Ivan Jasik portrét"
                className="h-[470px] w-full object-cover object-top md:h-[560px] lg:h-[610px]"
              />
            </div>
            <div className="mt-4 w-full text-center">
              <p className="[font-family:var(--font-serif)] h5 text-cream">Ivan Jašík</p>
              <p className="mt-1 font-sans text-body text-cream/85">Váš sprievodca budovaním majetku</p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.06}>
          <div className="flex h-full flex-col justify-center p-2 md:p-3">
            <p className="font-sans text-small font-semibold uppercase tracking-[0.08em] text-cream/80">Kto stojí za JS Investor</p>

            <h2 className="mt-3 headline-serif text-cream">
              Nie som poisťovák, bankový ani bežný poradca.
            </h2>

            <p className="mt-4 font-sans text-lead text-cream/85">
              <strong>Som správca majetku regulovaný NBS</strong>, ktorý posledných 8 rokov robí jednu vec: stavia
              ľuďom finančné stratégie, ktoré fungujú.
            </p>

            <ul className="mr-auto mt-5 grid max-w-[560px] grid-cols-1 gap-2 text-cream sm:grid-cols-2 sm:[grid-auto-rows:1fr]">
              {facts.map((fact) => (
                <li
                  key={fact}
                  className="flex h-full min-h-[46px] items-center justify-center rounded-full border border-[#f3ece3]/46 bg-white/5 px-3 py-1.5 text-center font-sans text-small font-semibold leading-snug text-cream/90 md:min-h-[50px] md:px-3.5"
                >
                  {fact}
                </li>
              ))}
            </ul>

            <h3 className="mt-6 [font-family:var(--font-serif)] h4 text-cream">
              Som tu pre vás vždy, keď to reálne potrebujete.
            </h3>

            <p className="mt-4 font-sans text-lead text-cream/85">
              Keď meníte prácu, plánujete kúpu bytu, mimoriadny vklad alebo sa na trhoch deje panika, môžete mi
              zavolať. Toto je moja práca. Byť váš sprievodca na nasledujúcich 20-30 rokov.
            </p>

            <a
              href="#formular"
              className="btn-primary-light mt-7 inline-flex self-start text-body"
            >
              Chcem spolupracovať s Ivanom
            </a>
          </div>
        </AnimatedSection>
      </div>
    </div>
  </section>
);

export default KtoStojiZaJsInvestorSection;
