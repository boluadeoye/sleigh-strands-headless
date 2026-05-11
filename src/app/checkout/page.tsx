import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CheckoutClient from '@/components/checkout/CheckoutClient';

export default function CheckoutPage() {
  return (
    <div className="relative">
      <Navbar variant="solid" />
      <main className="min-h-screen bg-[#FDF8F0] pt-20 pb-20">
        <CheckoutClient />
      </main>
      <Footer />
    </div>
  );
}
