import Footer from "@/src/components/section/Footer";
import Header from "@/src/components/section/Header";
import { ScrollProgress } from "@/src/components/section/ScrollProgress";
import { CustomCursor } from "@/src/components/section/CustomCursor";
import { SmoothScroll } from "@/src/components/section/SmoothScroll";

export default function GeneralLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SmoothScroll />
      <CustomCursor />
      <ScrollProgress />
      <Header />
      {children}
      <Footer />
    </>
  );
}