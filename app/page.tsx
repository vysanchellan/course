import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/landing/hero";
import { Problem } from "@/components/landing/problem";
import { Contents } from "@/components/landing/contents";
import { Stack } from "@/components/landing/stack";
import { FAQSection } from "@/components/landing/faq-section";
import { BuySection } from "@/components/landing/buy-section";

export default function HomePage() {
  return (
    <>
      <Navbar variant="marketing" />
      <Hero />
      <Problem />
      <Contents />
      <Stack />
      <FAQSection />
      <BuySection />
      <Footer />
    </>
  );
}
