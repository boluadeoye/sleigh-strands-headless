"use client";
import Image from 'next/image';
import Link from 'next/link';
import { Store } from 'lucide-react';

export default function ContactEditorial() {
  const whatsappUrl = `https://wa.me/2349056113019`;

  return (
    <section className="bg-white py-24 md:py-32 overflow-visible">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* YOUR LOGIC: items-stretch creates the height-track for the sticky child */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-stretch">
          
          {/* Left Column: The Sticky Rail */}
          <div className="w-full lg:w-1/2 relative">
            <div className="lg:sticky lg:top-32">
              <div className="relative aspect-[4/5] w-full rounded-[3rem] overflow-hidden shadow-2xl">
                <Image
                  src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1776312822/blog_assets/b0vljqvvivjhcsfzw7y8.jpg"
                  alt="Sleigh Strands Expert"
                  fill
                  className="object-cover object-top scale-105"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Right Column: The Content (Defines the height) */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-10">
            <div className="inline-flex items-center gap-3 border border-black/10 rounded-full px-5 py-2 self-start">
              <Store size={14} className="text-[#8B2632]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/60">Your best hair awaits</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-outfit font-bold text-[#0C0608] leading-[1.1] tracking-tighter">
              Shop our curated collection of elite textures, or consult with our experts for a personalized styling guide.
            </h2>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/shop"
                className="bg-[#3D1218] text-white px-10 py-5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-all flex items-center justify-center shadow-xl"
              >
                Shop from collection
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FDF8F0] border border-black/5 text-[#3D1218] px-10 py-5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white transition-all flex items-center justify-center"
              >
                Get an expert guide
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
