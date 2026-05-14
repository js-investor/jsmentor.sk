import AnimatedSection from "@/components/AnimatedSection";
import CtaResponseNote from "@/components/CtaResponseNote";
import { CheckCircle2, XCircle } from "lucide-react";
import type { ReactNode } from "react";

const forYouItems: ReactNode[] = [
  <>
    Zarábate od 1 500 € mesačne. Svoje prebytky{" "}
    <strong className="font-bold text-foreground">chcete začať systematicky zhodnocovať.</strong>
  </>,
  <>
    Chcete{" "}
    <strong className="font-bold text-foreground">delegovať zodpovednosť na experta, získať kľudný spánok</strong> a
    nehrať sa po večeroch na amatérskeho tradera.
  </>,
  <>
    <strong className="font-bold text-foreground">Hľadáte dlhodobého partnera, na ktorého sa môžete obrátiť</strong> pri
    každej dôležitej finančnej či životnej zmene.
  </>,
  <>
    <strong className="font-bold text-foreground">Vážite si svoj čas</strong> viac, než aby ste ho strácali hľadaním a
    analýzou tých „správnych“ fondov.
  </>,
];

const notForYouItems: ReactNode[] = [
  <>
    <strong className="font-bold text-foreground">Hľadáte skratky a rýchle zbohatnutie.</strong> Ak očakávate
    garantované tipy, krypto-signály a zisky cez noc.
  </>,
  <>
    <strong className="font-bold text-foreground">Chcete investovaniu obetovať svoj voľný čas.</strong> Ak vás reálne
    baví tráviť víkendy študovaním grafov a čítaním finančných správ.
  </>,
  <>
    Beriete investovanie ako hru „pokus - omyl“.{" "}
    <strong className="font-bold text-foreground">Nemáte záujem o dlhodobú stratégiu</strong> a chcete len náhodne
    nakupovať fondy či akcie bez jasnej stratégie a cieľa.
  </>,
  <>
    Aktuálne <strong className="font-bold text-foreground">nemáte voľný cashflow</strong> a ešte len{" "}
    <strong className="font-bold text-foreground">riešite základnú stabilizáciu príjmu</strong> a zatiaľ si nedokážete
    tvoriť pravidelné rezervy.
  </>,
];

const PreKohoSection = () => (
  <section id="pre-koho" className="section-white section-padding relative overflow-hidden scroll-mt-24">
    <div className="absolute inset-0 bg-dot-grid opacity-20" />
    <div className="section-container relative z-10">
      <AnimatedSection>
        <div className="mx-auto max-w-4xl text-center mb-10 md:mb-12">
          <h2 className="headline-serif">
            Wealth Map <span className="text-primary font-bold">nie je pre každého.</span>
          </h2>
          <p className="sub-headline">
            Spolupracujeme s ľuďmi, pre ktorých je čas tá najdrahšia komodita a ich majetok si zaslúži
            profesionálneho sprievodcu.
          </p>
        </div>
      </AnimatedSection>

      <div className="mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6 items-stretch">
        <AnimatedSection>
          <article className="h-full rounded-2xl border border-primary/12 bg-[#f7f4ef] p-6 md:p-7">
            <h3 className="h5 mb-5 text-foreground leading-snug">
              <span className="[font-family:var(--font-serif)] font-bold">Wealth Map </span>
              <span className="[font-family:var(--font-serif)] font-bold text-primary">JE PRE VÁS</span>
              <span className="font-sans font-bold text-foreground/80">, ak:</span>
            </h3>
            <div className="space-y-4">
              {forYouItems.map((item, index) => (
                <p
                  key={index}
                  className="flex items-start gap-2.5 font-sans text-body text-foreground/85 leading-relaxed"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{item}</span>
                </p>
              ))}
            </div>
          </article>
        </AnimatedSection>

        <AnimatedSection delay={0.08}>
          <article className="h-full rounded-2xl border border-primary/12 bg-[#f7f4ef] p-6 md:p-7">
            <h3 className="h5 mb-5 text-foreground leading-snug">
              <span className="[font-family:var(--font-serif)] font-bold">Wealth Map </span>
              <span className="[font-family:var(--font-serif)] font-bold text-[#B64A4A]">NIE JE PRE VÁS</span>
              <span className="font-sans font-bold text-foreground/80">, ak:</span>
            </h3>
            <div className="space-y-4">
              {notForYouItems.map((item, index) => (
                <p
                  key={index}
                  className="flex items-start gap-2.5 font-sans text-body text-foreground/85 leading-relaxed"
                >
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#B64A4A]" />
                  <span>{item}</span>
                </p>
              ))}
            </div>
          </article>
        </AnimatedSection>
      </div>

      <AnimatedSection>
        <div className="mx-auto mt-10 max-w-4xl text-center">
          <p className="font-sans text-lead text-muted-foreground">
            Napríklad ako klient <strong className="text-foreground">Matej Slovík</strong> (Profesionálny grafický
            dizajnér):
          </p>
          <p className="mt-4 [font-family:var(--font-serif)] h4 text-foreground leading-relaxed">
            „S Ivanom investujem preto, lebo viem, že moje peniaze sú v bezpečí. A viem, že mu môžem kedykoľvek
            zavolať."
          </p>
          <div className="mt-8">
            <a href="#formular" className="btn-primary text-body">
              Získať Wealth Map
            </a>
            <div>
              <CtaResponseNote />
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default PreKohoSection;
