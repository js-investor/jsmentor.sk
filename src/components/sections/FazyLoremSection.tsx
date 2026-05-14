import AnimatedSection from "@/components/AnimatedSection";
import {
  Building2,
  ChartNoAxesCombined,
  HandCoins,
  PiggyBank,
  SearchCheck,
  Wallet,
  type LucideIcon,
} from "lucide-react";

const items: { title: string; body: string; icon: LucideIcon }[] = [
  {
    title: "Lorem ipsum dolor",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    icon: PiggyBank,
  },
  {
    title: "Sit amet consectetur",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    icon: Wallet,
  },
  {
    title: "Adipiscing elit sed",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Do eiusmod tempor",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    icon: SearchCheck,
  },
  {
    title: "Incididunt ut labore",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    icon: Building2,
  },
  {
    title: "Et dolore magna",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    icon: HandCoins,
  },
];

const FazyLoremSection = () => (
  <section className="section-padding relative overflow-hidden" style={{ backgroundColor: "#F2EEE7" }}>
    <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" />
    <div className="section-container relative z-10">
      <AnimatedSection>
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="headline-serif">
            Lorem ipsum <span className="text-primary font-bold">dolor sit amet</span>
          </h2>
        </div>
      </AnimatedSection>

      <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 md:gap-x-10 md:gap-y-20 lg:gap-x-12 lg:gap-y-24">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <AnimatedSection key={item.title} delay={i * 0.05}>
              <div className="text-left">
                <Icon className="mb-5 h-9 w-9 md:h-10 md:w-10 text-primary" strokeWidth={1.5} aria-hidden />
                <p className="font-sans h6 text-foreground mb-2">
                  {item.title}
                </p>
                <p className="font-sans text-small text-muted-foreground">{item.body}</p>
              </div>
            </AnimatedSection>
          );
        })}
      </div>
    </div>
  </section>
);

export default FazyLoremSection;
