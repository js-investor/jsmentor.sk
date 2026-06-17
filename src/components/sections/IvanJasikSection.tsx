import AnimatedSection from "@/components/AnimatedSection";
import oMneIvanJasik from "@/assets/images/o-mne-ivan-jasik.png";

const IvanJasikSection = () => (
  <section
    className="overflow-hidden px-5 py-[72px] md:px-8 md:py-[96px]"
    style={{ backgroundColor: "#111111" }}
  >
    <div className="section-container">
      <div className="mx-auto flex max-w-3xl flex-col gap-10 md:gap-14">

        {/* Text */}
        <AnimatedSection>
          <div className="flex flex-col gap-6">
            <h2 className="[font-family:var(--font-serif)] text-[2.25rem] font-bold leading-[1.15] text-white md:text-[3rem]">
              Kto je Ivan Jašík?
            </h2>

            <p className="font-sans text-[1.25rem] leading-relaxed text-white/75 md:text-[1.375rem]">
              Nie som tu na to, aby som ti predával sen o rýchlom zbohatnutí.
              Keď mi Meta druhýkrát vypla finančný profil jsInvestor, uvedomil som si jednu vec: najdôležitejšie finančné témy nemôžu stáť len na Instagrame.
            </p>

            <p className="font-sans text-[1.25rem] leading-relaxed text-white/75 md:text-[1.375rem]">
              <strong className="font-semibold text-white">Volám sa Ivan Jašík.</strong> Viac ako 8 rokov pomáham ľuďom rozumne investovať a budovať majetok. Som pod dohľadom{" "}
              <strong className="font-semibold text-white">Národnej banky Slovenska</strong>{" "}
              a starám sa o viac ako{" "}
              <strong className="font-semibold text-white">3,5 milióna eur</strong>{" "}
              klientskych aktív.
            </p>

            <p className="font-sans text-[1.25rem] leading-relaxed text-white/75 md:text-[1.375rem]">
              Vytváram ľuďom investičné plány na mieru: od ETF portfólií, cez investičné nehnuteľnosti, až po základný systém osobných financií.
            </p>

            <p className="font-sans text-[1.25rem] leading-relaxed text-white/75 md:text-[1.375rem]">
              Viac ako 8 rokov vzdelávam verejnosť a chcem pokračovať. Preto vzniká táto komunita.{" "}
              <strong className="font-semibold text-white">Komunita, kde budeme otvorene hovoriť o peniazoch, problémoch ale aj možnostiach.</strong>
            </p>
          </div>
        </AnimatedSection>

        {/* Image */}
        <AnimatedSection delay={0.08}>
          <div>
            <img
              src={oMneIvanJasik}
              alt="Ivan Jašík"
              className="block h-auto w-full"
              loading="lazy"
              decoding="async"
            />
          </div>
        </AnimatedSection>

      </div>
    </div>
  </section>
);

export default IvanJasikSection;
