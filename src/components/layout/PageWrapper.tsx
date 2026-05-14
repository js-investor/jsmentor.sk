import FooterSection from "@/components/sections/FooterSection";
import type { ReactNode } from "react";

type PageWrapperProps = {
  children: ReactNode;
  showFooter?: boolean;
};

const PageWrapper = ({ children, showFooter = true }: PageWrapperProps) => (
  <main>
    {children}
    {showFooter ? <FooterSection /> : null}
  </main>
);

export default PageWrapper;
