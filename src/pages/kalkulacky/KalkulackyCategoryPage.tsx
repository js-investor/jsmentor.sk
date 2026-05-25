import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import KalkulackyShell from "@/pages/kalkulacky/KalkulackyShell";
import brandPattern from "@/assets/logo/js-brand-pattern.svg";
import {
  KALKULACKY_CALCULATORS,
  KALKULACKY_KONZULTACIA_CARD,
} from "@/pages/kalkulacky/kalkulackyConfig";
import { cn } from "@/lib/utils";

const KalkulackyCategoryPage = () => {
  return (
    <KalkulackyShell>
      <div className="section-container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-8 md:mb-12 max-w-3xl text-center">
          <h1 className="headline-serif">
            <span className="text-primary">Vyber si kalkulačku</span> pre svoje finančné rozhodnutia
          </h1>
          <p className="mt-3 font-sans text-[15px] leading-relaxed text-muted-foreground md:text-base">
            Zisti, čo sa oplatí viac, nastav si jasný plán a urob ďalší krok s istotou.
          </p>
        </div>

        <ul className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3 list-none m-0 p-0">
          {KALKULACKY_CALCULATORS.map((item) => {
            const Icon = item.Icon;
            return (
              <li key={item.slug} className="h-full">
                <Link
                  to={`/kalkulacky/${item.slug}`}
                  className={cn(
                    "group relative flex h-full flex-col rounded-2xl border border-border/70 bg-card p-5 md:p-6",
                    "shadow-sm transition-[box-shadow,border-color,transform] duration-200",
                    "hover:border-primary/25 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2",
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center" aria-hidden>
                      <img
                        src={brandPattern}
                        alt=""
                        className="absolute inset-0 h-full w-full object-contain opacity-100 pointer-events-none hue-rotate-[260deg] saturate-150 brightness-75"
                      />
                      <Icon className="relative z-10 -translate-x-[1px] h-[1.125rem] w-[1.125rem] md:h-5 md:w-5 stroke-[2] text-white" />
                    </span>
                    <ChevronRight
                      className="h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary mt-1"
                      aria-hidden
                    />
                  </div>
                  <span className="mt-6 block [font-family:var(--font-serif)] text-[1.05rem] md:text-[1.12rem] font-bold text-foreground">
                    {item.title}
                  </span>
                  <span className="mt-2 block font-sans text-muted-foreground text-[14px] md:text-[15px] leading-relaxed">
                    {item.description}
                  </span>
                </Link>
              </li>
            );
          })}

          <li className="h-full">
            <a
              href={KALKULACKY_KONZULTACIA_CARD.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Otvoriť WhatsApp a poradiť sa s Ivanom"
              className={cn(
                "group relative flex h-full flex-col rounded-2xl border border-[#E2DCCF] p-5 md:p-6 min-h-[12rem]",
                    "bg-[#EEE8DD] shadow-sm transition-[box-shadow,border-color,background-color,transform] duration-200",
                    "hover:bg-[#F7F4EF] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2",
              )}
            >
              <div className="flex items-start">
                <span
                  className="relative inline-flex h-11 w-11 shrink-0 -translate-x-2.5 items-center justify-center md:-translate-x-3.5"
                  aria-hidden
                >
                  <img
                    src={brandPattern}
                    alt=""
                    className="absolute inset-0 h-full w-full object-contain opacity-100 pointer-events-none"
                    style={{ filter: "brightness(0) saturate(100%) invert(78%) sepia(22%) saturate(520%) hue-rotate(342deg) brightness(93%) contrast(90%)" }}
                  />
                  <WhatsAppIcon className="relative z-10 h-[1.125rem] w-[1.125rem] md:h-5 md:w-5 text-white" />
                </span>
              </div>
              <span className="mt-6 block [font-family:var(--font-serif)] text-[1.05rem] md:text-[1.12rem] font-bold text-foreground">
                {KALKULACKY_KONZULTACIA_CARD.title}
              </span>
              <span className="mt-2 block font-sans text-foreground/85 text-[14px] md:text-[15px] leading-relaxed">
                {KALKULACKY_KONZULTACIA_CARD.description}
              </span>
            </a>
          </li>
        </ul>
      </div>
    </KalkulackyShell>
  );
};

export default KalkulackyCategoryPage;
