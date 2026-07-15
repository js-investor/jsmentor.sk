type HeroTrustStat = {
  value: string;
  label: string;
};

const STATS: HeroTrustStat[] = [
  { value: "123 000+", label: "sledovateľov na IG" },
  { value: "8 rokov", label: "skúsenosti" },
  { value: "3,5 mil. €+", label: "v starostlivosti" },
];

const HeroTrustStatsBar = () => (
  <div className="flex flex-col gap-3">
    <div className="hero-trust-stats" role="list">
      {STATS.map((stat) => (
        <div key={stat.label} className="hero-trust-stats-item" role="listitem">
          <span className="hero-trust-stats-value">{stat.value}</span>
          <span className="hero-trust-stats-label">{stat.label}</span>
        </div>
      ))}
    </div>
    <div className="overflow-hidden rounded-2xl border border-border/70 px-4 py-5 text-center sm:py-6" style={{ backgroundColor: "#eee8dd" }}>
      <span className="[font-family:var(--font-serif)] text-[1.5rem] font-normal text-foreground/75 md:text-[1.875rem]">
        viac ako <strong className="[font-family:var(--font-serif)] font-bold text-foreground">900</strong> konzultácií o peniazoch
      </span>
    </div>
  </div>
);

export default HeroTrustStatsBar;
