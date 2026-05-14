import StatsStripTemplate from "@/components/templates/StatsStripTemplate";

const stats = [
  { value: "8+", label: "rokov skúseností" },
  { value: "531+", label: "klientov" },
  { value: "3M+ €", label: "v správe portfólií" },
  { value: "115k+", label: "sledovateľov na Instagrame" },
];

const StatsBarSection = () => (
  <StatsStripTemplate items={stats} />
);

export default StatsBarSection;
