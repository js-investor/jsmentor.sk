import AnimatedSection from "@/components/AnimatedSection";
import CtaResponseNote from "@/components/CtaResponseNote";
import brandPattern from "@/assets/logo/js-brand-pattern.svg";
import { Clock3, Percent, PiggyBank, Wallet } from "lucide-react";
import type { ReactNode } from "react";

type ProblemItem = {
  icon: ReactNode;
  title: ReactNode;
  body: ReactNode;
};

type ProblemSectionTemplateProps = {
  heading?: ReactNode;
  subheading?: ReactNode;
  items?: ProblemItem[];
  closingText?: ReactNode;
  ctaLabel?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
};

const defaultItems: ProblemItem[] = [
  {
    icon: <PiggyBank className="h-5 w-5 -translate-x-0.5 text-accent" />,
    title: <>Lorem ipsum dolor sit amet.</>,
    body: <>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</>,
  },
  {
    icon: <Percent className="h-5 w-5 -translate-x-0.5 text-accent" />,
    title: <>Consectetur adipiscing elit sed.</>,
    body: <>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</>,
  },
  {
    icon: <Clock3 className="h-5 w-5 -translate-x-0.5 text-accent" />,
    title: <>Do eiusmod tempor incididunt.</>,
    body: <>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</>,
  },
  {
    icon: <Wallet className="h-5 w-5 -translate-x-0.5 text-accent" />,
    title: <>Ut labore et dolore magna.</>,
    body: <>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</>,
  },
];

const ProblemSectionTemplate = ({
  heading = <>Lorem ipsum dolor sit amet?</>,
  subheading = <>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</>,
  items = defaultItems,
  closingText = (
    <>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      <br />
      <strong>Vestibulum ante ipsum primis in faucibus.</strong>
    </>
  ),
  ctaLabel = "Lorem ipsum",
  ctaHref = "#formular",
  onCtaClick,
}: ProblemSectionTemplateProps) => (
  <section id="problem" className="section-cream section-padding relative overflow-hidden scroll-mt-24">
    <div className="absolute inset-0 bg-dot-grid opacity-20" />
    <div className="section-container relative z-10">
      <AnimatedSection>
        <div className="mx-auto max-w-3xl text-center mb-10 md:mb-12">
          <h2 className="headline-serif">{heading}</h2>
          {subheading ? (
            <p className="sub-headline mt-4">{subheading}</p>
          ) : null}
        </div>
      </AnimatedSection>

      <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-7 md:gap-8">
        {items.map((item, index) => (
          <AnimatedSection key={index} delay={index * 0.05}>
            <article className="w-full rounded-2xl border border-primary/12 bg-[#faf8f4] p-5 md:p-6 transition-colors duration-300 hover:bg-[#fcfbf8]">
              <div
                className="mb-3 inline-flex h-9 w-9 items-center justify-center"
                style={{
                  WebkitMaskImage: `url(${brandPattern})`,
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  WebkitMaskSize: "contain",
                  maskImage: `url(${brandPattern})`,
                  maskRepeat: "no-repeat",
                  maskPosition: "center",
                  maskSize: "contain",
                }}
              >
                {item.icon}
              </div>
              <h3 className="font-serif h5 text-foreground leading-snug">{item.title}</h3>
              <p className="mt-2 font-sans text-body text-muted-foreground leading-relaxed">{item.body}</p>
            </article>
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection>
        <div className="mx-auto mt-10 max-w-3xl text-center">
          <p className="font-sans text-lead text-muted-foreground leading-relaxed">{closingText}</p>
          <div className="mt-7">
            {ctaHref ? (
              <a href={ctaHref} className="btn-primary text-body">
                {ctaLabel}
              </a>
            ) : (
              <button type="button" onClick={onCtaClick} className="btn-primary text-body">
                {ctaLabel}
              </button>
            )}
            <div>
              <CtaResponseNote />
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export type { ProblemSectionTemplateProps, ProblemItem };
export default ProblemSectionTemplate;
