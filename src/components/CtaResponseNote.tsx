import { Clock3 } from "lucide-react";
import { cn } from "@/lib/utils";

type CtaResponseNoteProps = {
  /** Pod booking formulárom: na celú šírku, text doľava. */
  layout?: "default" | "formFooter";
  /** `vy` len na homepage CTA; inde predvolene `ty`. */
  addressing?: "ty" | "vy";
};

const CtaResponseNote = ({ layout = "default", addressing = "ty" }: CtaResponseNoteProps) => (
  <p
    className={cn(
      "mt-3 flex w-auto max-w-none items-start gap-x-2 text-left font-sans text-sm font-normal leading-relaxed text-muted-foreground",
      layout === "formFooter" ? "justify-start" : "mx-auto justify-center",
    )}
  >
    <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
    <span className="whitespace-normal">
      {addressing === "vy"
        ? "Kontaktujem vás do 48 hodín a dohodneme si bezplatný hovor."
        : "Kontaktujem ťa do 48 hodín a dohodneme si bezplatný hovor."}
    </span>
  </p>
);

export default CtaResponseNote;
