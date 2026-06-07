type HeroTrustStat = {
  value: string;
  label: string;
};

const STATS: HeroTrustStat[] = [
  { value: "118 000", label: "sledovateľov na IG" },
  { value: "8 ročné", label: "skúsenosti" },
  { value: "3 000 000 €", label: "v starostlivosti" },
];

const HeroTrustStatsBar = () => (
  <div className="hero-trust-stats" role="list">
    {STATS.map((stat) => (
      <div key={stat.label} className="hero-trust-stats-item" role="listitem">
        <span className="hero-trust-stats-value">{stat.value}</span>
        <span className="hero-trust-stats-label">{stat.label}</span>
      </div>
    ))}
  </div>
);

export default HeroTrustStatsBar;
