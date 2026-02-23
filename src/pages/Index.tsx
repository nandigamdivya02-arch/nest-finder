import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PopularCities from "@/components/PopularCities";
import FeaturedHostels from "@/components/FeaturedHostels";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import MapSection from "@/components/MapSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <PopularCities />
      <FeaturedHostels />
      <WhyChooseUs />
      <MapSection />
      <Testimonials />
      <FAQSection />
      <Footer />
      {/* Spacer for mobile bottom nav */}
      <div className="h-16 md:hidden" />
    </div>
  );
};

export default Index;
