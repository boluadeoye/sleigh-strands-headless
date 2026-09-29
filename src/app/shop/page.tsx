import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ShopClient from '@/components/shop/ShopClient';

async function getShopData() {
  const ck = process.env.WC_CONSUMER_KEY;
  const cs = process.env.WC_CONSUMER_SECRET;
  const baseUrl = process.env.WC_SITE_URL || 'https://sleighstrands.com/admin';
  const auth = `consumer_key=${ck}&consumer_secret=${cs}`;

  try {
    const [productsRes, categoriesRes] = await Promise.all([
      fetch(`${baseUrl}/wp-json/wc/v3/products?${auth}&per_page=12&status=publish`, { cache: 'no-store' }),
      fetch(`${baseUrl}/wp-json/wc/v3/products/categories?${auth}&per_page=100`, { cache: 'no-store' })
    ]);

    const products = productsRes.ok ? await productsRes.json() : [];
    const categories = categoriesRes.ok ? await categoriesRes.json() : [];

    return { products, categories };
  } catch (error) {
    console.error("Shop Data Fetch Error:", error);
    return { products: [], categories: [] };
  }
}

export default async function ShopPage() {
  const { products, categories } = await getShopData();

  return (
    <main className="min-h-screen bg-[#FDF8F0]">
      <Navbar variant="solid" />

      {/* Hero Banner - Responsive Scaled */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden bg-[#4A1018]">
        <div className="absolute inset-0 opacity-70 blur-[2px] scale-105">
          <img
            src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1779784645/blog_assets/kqlt5ehf1fhox5pqd5dp.jpg"
            className="w-full h-full object-cover object-top"
            alt="Shop Header"
          />
        </div>
        <div className="absolute inset-0 bg-black/20" />
        <h1 className="relative z-10 text-white font-sans text-5xl md:text-7xl font-bold tracking-tighter uppercase whitespace-nowrap">
          Shop <span className="text-[#8B2632] font-sans italic">Now</span>
        </h1>
      </section>

      {/* Product Grid Ecosystem */}
      <ShopClient initialProducts={products} categories={categories} />

      <Footer />
    </main>
  );
}
