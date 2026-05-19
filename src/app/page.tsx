import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import DoubleModel from '@/components/DoubleModel';
import Editorial from '@/components/Editorial';
import ProductGrid from '@/components/ProductGrid';
import Testimonials from '@/components/Testimonials';
import FAQValueGrid from '@/components/FAQValueGrid';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar variant="transparent" />
      <Hero />
      <TrustBar />
      
      {/* Standard Mode: Full view with shoulders */}
      <DoubleModel mode="standard" priority={true} />
      
      <ProductGrid 
        id="collections" 
        title="THE LAUNCH COLLECTION (HERO WIGS)" 
        subtitle="Launched 2026"
        category="hero-wigs"
      />

      {/* Compact Mode: Tight crop, no shoulders, sits flush with Editorial */}
      <DoubleModel mode="compact" priority={false} />
      <Editorial />
      
      <ProductGrid 
        title="Friday Hot Drops" 
        subtitle="Our Shop" 
        category="hot-drops"
      />

      <Testimonials />
      <FAQValueGrid />
      <FinalCTA />
      <Footer />
    </main>
  );
}
