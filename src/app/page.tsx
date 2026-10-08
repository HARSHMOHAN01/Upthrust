import { getSiteData } from "@/lib/content";
import { Navbar } from "@/components/navigation/Navbar";
import { HeroSection } from "@/components/hero/HeroSection";
import { ServicesSection } from "@/components/services/ServicesSection";
import { TestimonialsSection } from "@/components/testimonials/TestimonialsSection";
import { FaqSection } from "@/components/faq/FaqSection";
import { ContactSection } from "@/components/forms/ContactSection";
import { Footer } from "@/components/footer/Footer";

export default async function HomePage() {
  const data = await getSiteData();

  return (
    <div className="relative min-h-screen bg-white text-zinc-900 flex flex-col">
      {/* Navigation Bar */}
      <Navbar ctaText={data.hero.ctaText} ctaLink={data.hero.ctaLink} />

      <main className="flex-1 w-full">
        {/* Hero Section with 3D Statue Bust and Blueprint Schematics */}
        <HeroSection hero={data.hero} trust={data.trustBanner} />

        {/* Services Showcase with 3D Curve Ribbon and Interactive Tabs */}
        <ServicesSection services={data.services} />

        {/* Client Testimonials */}
        <TestimonialsSection testimonials={data.testimonials} />

        {/* Interactive FAQ Accordion */}
        <FaqSection faqs={data.faqs} />

        {/* Contact Form with Field Validation, Persistence & GTM Event Tracking */}
        <ContactSection contact={data.contact} brand={data.brand} />
      </main>

      {/* Footer */}
      <Footer footer={data.footer} brand={data.brand} />
    </div>
  );
}
