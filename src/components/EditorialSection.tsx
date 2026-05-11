import Image from 'next/image';

export default function EditorialSection() {
  return (
    <section className="relative w-full h-[400px] md:h-[550px] overflow-hidden bg-[#0C0608]">
      <Image 
        src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1776180088/blog_assets/xqie8to9cmdxjiaom0tm.png?v=2" 
        alt="Editorial" fill className="object-cover" 
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <span className="text-white text-[9px] uppercase tracking-[0.4em] mb-4 opacity-80">What We Do</span>
        <h2 className="text-white font-sans italic text-3xl md:text-5xl max-w-3xl leading-tight mb-8">
          The Art of Extension. <br/> The search for perfection.
        </h2>
        <button className="bg-[#8B2632] text-white px-8 py-3.5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-[#8B2632] transition-all">
          Shop From Collection
        </button>
      </div>
    </section>
  );
}
