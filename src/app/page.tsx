import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Services from '@/components/Services';
import ProjectsGallery from '@/components/ProjectsGallery';
import Process from '@/components/Process';
import QuotationCalculator from '@/components/QuotationCalculator';
import ContactLocation from '@/components/ContactLocation';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import MobileBottomBar from '@/components/MobileBottomBar';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <Services />
        <ProjectsGallery />
        <Process />
        <QuotationCalculator />
        <ContactLocation />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <MobileBottomBar />
    </>
  );
}
