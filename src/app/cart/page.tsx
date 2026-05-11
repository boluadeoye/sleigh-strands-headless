import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartClient from '@/components/cart/CartClient';

export default function CartPage() {
  return (
    <main className="min-h-screen bg-[#FDF8F0]">
      <Navbar variant="solid" />
      
      <section className="py-12">
        <CartClient />
      </section>

      <Footer />
    </main>
  );
}
