import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ShopClient from '@/components/shop/ShopClient';
import { getWooProducts } from '@/lib/woocommerce';

async function getCategories() {
  const baseUrl = process.env.WC_SITE_URL || 'https://sleigh.staymedia.ng';
  const ck = process.env.WC_CONSUMER_KEY;
  const cs = process.env.WC_CONSUMER_SECRET;

  try {
    const res = await fetch(`${baseUrl}/wp-json/wc/v3/products/categories?consumer_key=${ck}&consumer_secret=${cs}`, {
      next: { revalidate: 3600 }
    });
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
  } catch (error) {
    console.error('Category Fetch Error:', error);
    return [];
  }
}

export default async function ShopPage() {
  const products = await getWooProducts();
  const categories = await getCategories();

  return (
    <main className="min-h-screen bg-[#FDF8F0]">
      <Navbar variant="solid" />
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden bg-[#4A1018]">
        <div className="absolute inset-0 opacity-70 blur-[2px] scale-105">
          <img
            src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1776180088/blog_assets/xqie8to9cmdxjiaom0tm.png"
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
        <div className="absolute inset-0 bg-black/20" />
        <h1 className="relative z-10 text-white font-sans text-6xl md:text-8xl font-bold tracking-tighter">
          SHOP <span className="text-[#8B2632] font-sans italic">NOW</span>
        </h1>
      </section>
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 py-20">
        <ShopClient initialProducts={products} categories={categories} />
      </section>
      <Footer />
    </main>
  );
}
