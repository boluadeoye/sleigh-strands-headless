import { getWooProducts } from '@/lib/woocommerce';
import ProductCard from './shop/ProductCard';
import { Store } from 'lucide-react';

export default async function ProductGrid({ title, subtitle, category, id }: { title: string, subtitle: string, category?: string, id?: string }) {
  const products = await getWooProducts(category);
  if (!products || products.length === 0) return null;

  return (
    <section id={id} className="py-16 md:py-24 bg-[#FAF5F6] scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-4 md:px-12">
        <div className="text-center mb-12 md:mb-16 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 border border-[#8B2632]/20 bg-transparent px-4 py-1.5 rounded-full mb-4">
            <Store size={12} className="text-[#8B2632]" />
            <span className="text-[#8B2632] text-[9px] font-medium tracking-[0.2em]">
              {subtitle}
            </span>
          </div>
          <h2 className="text-[20px] md:text-[2.75rem] font-sans font-medium text-[#2A0A10] tracking-tight leading-[1.2] max-w-[90%] md:max-w-none mx-auto">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {products.map((product: any, index: number) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
