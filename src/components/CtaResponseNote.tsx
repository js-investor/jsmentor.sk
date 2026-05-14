import { Clock3 } from "lucide-react";

const CtaResponseNote = () => (
  <p className="mx-auto mt-3 grid w-fit max-w-[19rem] grid-cols-[auto,minmax(0,1fr)] items-start gap-x-2 text-left font-sans text-sm leading-relaxed text-muted-foreground md:max-w-[21rem]">
    <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
    <span>Po odoslaní vás kontaktujem do 48 hodín a dohodneme si bezplatný úvodný hovor.</span>
  </p>
);

export default CtaResponseNote;
