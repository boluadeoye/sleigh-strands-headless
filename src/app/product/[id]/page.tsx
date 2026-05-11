import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import { getSingleProduct } from '@/lib/woocommerce';
import { notFound } from 'next/navigation';
import AddToCart from '@/components/product/AddToCart';
import ReviewForm from '@/components/product/ReviewForm';
import WishlistButton from '@/components/product/WishlistButton';
import ProductGallery from '@/components/product/ProductGallery';

export default async function ProductPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const product = await getSingleProduct(id);
  
  if (!product) notFound();

  return (
    <main className="bg-[#FDF8F0] min-h-screen overflow-x-hidden">
      <Navbar variant="solid" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-12 pb-16">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-black/30 mb-12">
          <span className="text-[#8B2632] font-bold">Shop</span>
          <span>/</span>
          <span className="font-bold">Product Details</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-start mb-32">
          {/* DYNAMIC GALLERY */}
          <div className="relative">
            <ProductGallery images={product.images} name={product.name} />
            <WishlistButton productId={product.id} />
          </div>

          <div className="pt-4">
            <h1 className="text-4xl md:text-5xl font-sans font-bold text-black mb-3 tracking-tight">{product.name}</h1>
            <div className="text-[11px] uppercase tracking-[0.3em] text-[#8B2632] mb-10 font-bold">
              Categories: <span className="text-black/40 font-medium">{product.categories?.[0]?.name || 'Luxury Hair'}</span>
            </div>
            <div className="text-black/60 text-sm leading-relaxed mb-12 max-w-md font-light" dangerouslySetInnerHTML={{ __html: product.short_description || product.description }} />
            
            {/* ADD TO CART ENGINE (Now handles Price and Variations) */}
            <AddToCart product={product} />
          </div>
        </div>

        <div className="mb-16">
          <div className="flex gap-12 border-b border-black/5 mb-12 overflow-x-auto no-scrollbar">
            <button className="pb-6 border-b-2 border-[#8B2632] text-[11px] font-bold uppercase tracking-[0.2em] text-[#8B2632] whitespace-nowrap">About the product</button>
            <button className="pb-6 text-[11px] font-bold uppercase tracking-[0.2em] text-black/20 whitespace-nowrap">Reviews ({product.rating_count || 0})</button>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20">
            <div className="max-w-2xl">
              <h3 className="text-3xl font-sans font-bold text-black/80 mb-10 tracking-tight">Specifications</h3>
              <div className="grid gap-8">
                {[{ label: 'Weight', value: '0.3 kg' }, { label: 'Color', value: 'Black' }, { label: 'Brand', value: 'Hair' }].map((spec) => (
                  <div key={spec.label} className="flex items-center py-1">
                    <span className="w-32 text-[11px] font-bold uppercase tracking-[0.3em] text-[#8B2632]">{spec.label}</span>
                    <div className="h-8 w-[1px] bg-black/10 mx-6" />
                    <span className="text-sm text-black/60 font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <ReviewForm product={product} />
          </div>
        </div>
      </div>

      <ProductGrid title="Friday Hot Drops" subtitle="Our Shop" />
      <Footer />
    </main>
  );
}
