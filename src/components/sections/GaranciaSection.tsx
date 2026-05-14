import AnimatedSection from "@/components/AnimatedSection";
import CtaResponseNote from "@/components/CtaResponseNote";
import { CheckCircle2 } from "lucide-react";

const scrollToBooking = () => {
  document.getElementById("formular")?.scrollIntoView({ behavior: "smooth" });
};

const garancie = [
  {
    title: "Férová hra od prvého hovoru",
    body: "Po bezplatnom úvodnom hovore vám poviem narovinu: buď vám viem pomôcť, alebo nie. Žiadny nátlak na predaj produktov, ktoré vám nedávajú zmysel. Ak Wealth Map nie je pre vás, poviem vám to ako prvý.",
  },
  {
    title: "Nikdy na to nebudete sám",
    body: "Keď trh klesne a vy budete chcieť vedieť čo robiť, zavoláte mi. Nie som bežný poradca ani poisťovák, ktorý zmizne po podpise zmluvy. Som váš skutočný partner pri každom dôležitom rozhodnutí.",
  },
  {
    title: "Hotový plán do 7-14 dní",
    body: "Od úvodnej analýzy máte kompletnú Wealth Map do 7-14 dní. Presné kroky, jasný smer a žiadne zdĺhavé čakanie.",
  },
  {
    title: "100 % jasnosť",
    body: "Ak z mapy nebudete mať absolútnu jasnosť, prepracujem ju dovtedy, kým ju mať budete. Bez dodatočných nákladov.",
  },
  {
    title: "Matematika, nie pocity",
    body: "Každé rozhodnutie stojí na dátach. ROI kalkulačky, stresové scenáre, presné čísla. Žiadny „nákup, lebo ceny rastú.\" ani \"predaj, lebo mám strach.\"",
  },
  {
    title: "Férové a transparentné poplatky za správu majetku",
    body: "0,49 % ročne do 100 000 €. 0,35 % nad 100 000 €.",
  },
  {
    title: "Pod dohľadom NBS",
    body: "Každá investícia, každý fond sú striktne regulované Národnou bankou Slovenska. Vaše peniaze sú v bezpečí nielen vďaka stratégii, ale aj zákonu. Sú registrované na vaše meno.",
  },
];

const GaranciaSection = () => (
  <section
    id="garancia"
    className="section-padding relative overflow-hidden scroll-mt-24"
    style={{ backgroundColor: "#f7f1e8" }}
  >
    <div className="section-container">
      <AnimatedSection>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="headline-serif">
            Čo všetko od nás <span className="text-primary font-bold">môžete očakávať</span>
          </h2>
          <p className="mt-4 font-sans text-lead text-muted-foreground">
            Žiadne marketingové reči a prázdne sľuby. Nie ste môj ďalší klient v zozname.{" "}
            <strong>Ste partner, ktorému garantujem férovú hru</strong>, matematickú <strong>presnosť a podporu</strong>{" "}
            v každej krízovej situácii.
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <div className="mx-auto mt-10 max-w-4xl space-y-8">
          {garancie.map((item, index) => (
            <div key={item.title}>
              <h3 className="flex items-start gap-2.5 font-sans h6 text-foreground">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{item.title}</span>
              </h3>
              <p className="mt-2 font-sans text-lead text-foreground/85">{item.body}</p>
              {index < garancie.length - 1 ? <div className="mt-8 h-px w-full bg-primary/20" /> : null}
            </div>
          ))}

          <div className="pt-4 text-center">
            <button type="button" onClick={scrollToBooking} className="btn-primary text-body">
              Získať Wealth Map
            </button>
            <div>
              <CtaResponseNote />
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default GaranciaSection;
