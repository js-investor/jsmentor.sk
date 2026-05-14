type StatsStripItem = {
  value: string;
  label: string;
};

type StatsStripTemplateProps = {
  items: StatsStripItem[];
  sectionClassName?: string;
  containerClassName?: string;
  valueClassName?: string;
  labelClassName?: string;
  dividerClassName?: string;
};

const StatsStripTemplate = ({
  items,
  sectionClassName = "bg-[#29614A] text-cream min-h-[230px]",
  containerClassName = "max-w-[1400px] mx-auto h-full px-5 md:px-10 lg:px-16 py-14 md:py-16",
  valueClassName = "[font-family:var(--font-serif)] h1 text-cream leading-none",
  labelClassName = "font-sans text-lead text-cream/70 mt-2 leading-snug",
  dividerClassName = "md:border-l md:border-cream/30",
}: StatsStripTemplateProps) => (
  <section className={sectionClassName}>
    <div className={containerClassName}>
      <div className="grid grid-cols-2 md:grid-cols-4 h-full gap-4 md:gap-0">
        {items.map((item, index) => (
          <div
            key={`${item.value}-${item.label}`}
            className={`rounded-xl md:rounded-none flex flex-col justify-center items-center text-center px-4 py-3 md:px-8 md:py-0 ${
              index > 0 ? dividerClassName : ""
            }`}
          >
            <p className={valueClassName}>{item.value}</p>
            <p className={labelClassName}>{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export type { StatsStripItem, StatsStripTemplateProps };
export default StatsStripTemplate;
