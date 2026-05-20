"use client";
import Image from 'next/image';
import Link from 'next/link';
import { Store } from 'lucide-react';

export default function FinalCTA() {
  const instagramLink = "https://www.instagram.com/sleigh_strands/";

  return (
    <section className="bg-white py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-stretch gap-12 lg:gap-20">

          {/* Left: Image Block - Updated with Double Model Asset & Top Anchoring */}
          <div className="w-full md:w-[45%]">
            <div className="relative aspect-[1/1.25] w-full rounded-[4rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.12)] border border-black/5">
              <Image
                src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1779270387/blog_assets/t4dv8k0d6cu8lwzmd7ex.jpg"
                alt="Sleigh Strands Elite Textures"
                fill
                priority
                className="object-cover object-[center_20%]"
              />
            </div>
          </div>

          {/* Right: Content Block */}
          <div className="w-full md:w-[55%] flex flex-col justify-center items-start py-4">
            <div className="inline-flex items-center gap-3 border border-[#D4A5A9]/40 rounded-full px-5 py-2 mb-6 bg-white shadow-sm">
              <Store size={14} className="text-[#D4A5A9]" strokeWidth={2} />
              <span className="text-[#D4A5A9] text-[10px] font-bold uppercase tracking-[0.4em] leading-none">
                Your Best Hair Awaits
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-[3.5rem] font-sans font-medium text-ink leading-[1.1] tracking-tight mb-10 max-w-xl">
              Shop our curated collection of elite textures, or consult with our experts for a personalized styling guide.
            </h2>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-auto">
              <Link href="/shop" className="bg-burgundy text-white px-10 py-4.5 rounded-2xl text-[11px] font-bold uppercase tracking-[0.2em] text-center hover:bg-ink transition-all shadow-xl active:scale-95">
                Shop From Collection
              </Link>
              <a
                href={instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#F5E6E8] text-burgundy px-10 py-4.5 rounded-2xl text-[11px] font-bold uppercase tracking-[0.2em] text-center hover:bg-[#EDD3D7] transition-all active:scale-95"
              >
                Get An Expert Guide
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
