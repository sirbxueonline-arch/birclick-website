import Navbar from "@/components/Navbar";
import FadeIn from "@/components/FadeIn";
import FloatingContact from "@/components/FloatingContact";
import HeroSection from "@/components/sections/HeroSection";
import StatsSection from "@/components/sections/StatsSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ForWorkersSection from "@/components/sections/ForWorkersSection";
import FAQSection from "@/components/sections/FAQSection";
import WaitlistSection from "@/components/sections/WaitlistSection";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />

      <FadeIn>
        <StatsSection />
      </FadeIn>

      <FadeIn delay={100}>
        <HowItWorksSection />
      </FadeIn>

      <FadeIn delay={100}>
        <ServicesSection />
      </FadeIn>

      <FadeIn delay={100}>
        <ForWorkersSection />
      </FadeIn>

      <FadeIn delay={100}>
        <FAQSection />
      </FadeIn>

      <WaitlistSection />
      <Footer />

      {/* Floating Instagram contact button */}
      <FloatingContact />
      <BackToTop />
    </main>
  );
}
