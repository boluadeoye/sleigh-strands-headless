import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/shop/ProductCard';

async function getSearchResults(query: string) {
  const baseUrl = process.env.WC_SITE_URL || 'https://sleigh.staymedia.ng';
  const ck = process.env.WC_CONSUMER_KEY;
  const cs = process.env.WC_CONSUMER_SECRET;

  try {
    const res = await fetch(`${baseUrl}/wp-json/wc/v3/products?search=${query}&consumer_key=${ck}&consumer_secret=${cs}`, { cache: 'no-store' });
    return res.json();
  } catch (error) {
    return [];
  }
}

export default async function SearchPage(props: { searchParams: Promise<{ q: string }> }) {
  const searchParams = await props.searchParams;
  const query = searchParams.q || '';
  const products = await getSearchResults(query);

  return (
    <main className="min-h-screen bg-[#FDF8F0]">
      <Navbar variant="solid" />
      <section className="relative h-[30vh] flex items-center justify-center overflow-hidden bg-[#4A1018]">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 text-center">
          <span className="text-[#D2A546] text-[10px] font-bold uppercase tracking-[0.4em] block mb-4">Search Results</span>
          <h1 className="text-white font-sans text-4xl md:text-6xl font-bold tracking-tighter">
            &quot;{query}&quot;
          </h1>
        </div>
      </section>
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 py-20">
        {products.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
            {products.map((product: any) => <ProductCard key={product.id} product={product} />)}
          </div>
        ) : (
          <div className="text-center py-32">
            <h2 className="text-3xl font-sans text-[#8B2632] mb-4">No results found</h2>
            <p className="text-black/50">We couldn&apos;t find any products matching your search.</p>
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}
