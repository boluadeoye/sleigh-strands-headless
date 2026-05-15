import Image from 'next/image';

export default function Collections() {
  const products = [1, 2, 3, 4];
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-burgundy text-xs font-bold tracking-[0.3em] mb-2 block">Launched 2026</span>
            <h2 className="text-[20px] md:text-5xl font-sans text-black leading-[1.2] max-w-[90%] md:max-w-none">THE LAUNCH COLLECTION (HERO WIGS)</h2>
          </div>
          <button className="hidden md:block text-xs font-bold uppercase tracking-widest border-b border-black pb-1">View All</button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {products.map((i) => (
            <div key={i} className="group cursor-pointer">
              <div className="relative aspect-[3/4] mb-4 overflow-hidden bg-blush">
                <Image
                  src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1776170457/blog_assets/av9grfitavzjltpmsopn.png"
                  alt="Product" fill className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-4 h-4 border border-black rounded-full" />
                </button>
              </div>
              <h3 className="text-sm font-medium text-black uppercase tracking-wider">Signature Raw Cambodian</h3>
              <p className="text-burgundy font-bold mt-1">₦15,900</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
