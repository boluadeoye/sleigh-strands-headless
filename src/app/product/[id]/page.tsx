import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import Image from 'next/image';
import { getSingleProduct, getProductReviews } from '@/lib/woocommerce';
import { notFound } from 'next/navigation';
import AddToCart from '@/components/product/AddToCart';
import ProductGallery from '@/components/product/ProductGallery';
import ProductTabs from '@/components/product/ProductTabs';

export default async function ProductPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const [product, reviews] = await Promise.all([getSingleProduct(id), getProductReviews(id)]);
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
          <div className="relative">
            <ProductGallery images={product.images} name={product.name} productId={product.id} />
          </div>
          <div className="pt-4">
            <h1 className="text-4xl md:text-5xl font-sans font-bold text-black mb-3 tracking-tight uppercase">{product.name}</h1>
            <div className="text-[11px] uppercase tracking-[0.3em] text-[#8B2632] mb-10 font-bold">
              Categories: <span className="text-black/40 font-medium">{product.categories?.[0]?.name || 'Luxury Hair'}</span>
            </div>
            <div className="sleigh-editorial mb-12 max-w-md">
               <div dangerouslySetInnerHTML={{ __html: product.short_description || product.description }} />
            </div>
            <AddToCart product={product} />
          </div>
        </div>
        <ProductTabs product={product} reviews={reviews} />
      </div>
      <div className="relative w-full h-[180px] md:h-[450px] overflow-hidden">
        <Image src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1779274175/blog_assets/lf3i5gvdzcnpdpzhbyfb.jpg" alt="Editorial" fill className="object-cover object-[center_25%]" />
      </div>
      <ProductGrid title="FRIDAY SLEIGH DROPS" subtitle="Our Shop" category="friday-sleigh-drops" />
      <Footer />
    </main>
  );
}
