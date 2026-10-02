import Image from 'next/image';
import Link from 'next/link';

export default function EditorialSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#3D1218]">
      
      {/* DESKTOP HERO BANNER */}
      <div className="hidden md:block relative w-full aspect-[21/9] max-h-[500px]">
        <Link href="/shop" className="block w-full h-full relative group">
          <Image
            src="https://res.cloudinary.com/dwbjb3svx/image/upload/f_auto,q_auto/v1790824586/blog_assets/vbw4ycdwk3318caul211.jpg"
            alt="Ember Sales Collection"
            fill
            className="object-cover object-center transition-transform duration-700 group-hover:scale-102"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
        </Link>
      </div>

      {/* MOBILE HERO BANNER */}
      <div className="block md:hidden relative w-full aspect-[3/4]">
        <Link href="/shop" className="block w-full h-full relative">
          <Image
            src="https://res.cloudinary.com/dwbjb3svx/image/upload/f_auto,q_auto/v1790824563/blog_assets/osvrtq2fyqwx89ilsm9q.jpg"
            alt="Ember Sales Mobile"
            fill
            className="object-cover object-top"
          />
        </Link>
      </div>

      {/* FLOATING ACTION STRIP */}
      <div className="py-5 px-6 bg-[#2B0B10] border-t border-[#D2A546]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left max-w-7xl mx-auto">
        <div>
          <span className="text-[#D2A546] text-[10px] font-bold uppercase tracking-[0.25em] block">
            LIMITED STOCK AVAILABLE
          </span>
          <h3 className="text-white font-sans font-bold text-sm sm:text-base uppercase tracking-tight">
            Ember Sales — Premium Luxury Strands From ₦37,000
          </h3>
        </div>
        <Link
          href="/shop"
          className="bg-[#D2A546] hover:bg-white text-[#3D1218] px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-lg shrink-0"
        >
          Shop Now ↗
        </Link>
      </div>
    </section>
  );
}
