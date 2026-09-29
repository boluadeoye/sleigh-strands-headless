"use client";
import Image from 'next/image';
import Link from 'next/link';
import { Smile, Star, User } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials: any[] = [];

export default function Testimonials() {
  return (
    <section className="relative py-12 md:py-24 overflow-hidden bg-[#4A0E0E]">
      {/* Vibrant Editorial Background Asset */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1777102506/blog_assets/u8ce8dr31khpsrnuufdl.png"
          alt="Background"
          fill
          priority
          className="object-cover object-top opacity-100"
        />
        {/* The "Studio Glow" Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#4A0E0E]/40 to-[#1A0505]/95" />
      </div>

      <div className="relative z-10 w-full">
        {/* Header Stack */}
        <div className="max-w-[1440px] mx-auto px-6 text-center mb-8 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md mb-4">
            <Smile size={14} className="text-white" />
            <span className="text-white text-[9px] font-bold uppercase tracking-[0.2em]">Testimonials</span>
          </div>

          <h2 className="text-white font-heading text-3xl md:text-5xl font-medium mb-3 tracking-tight drop-shadow-sm">
            SLEIGH BABE REVIEWS <span className="text-[#D2A546]">COMING SOON</span>
          </h2>

          <p className="text-white/80 font-sans text-xs md:text-base max-w-xl mx-auto leading-relaxed">
            We can't wait to hear what our Sleigh Babes think ✨
            <br />
            Customer reviews, unboxings, and transformations will be featured here soon 🤍
          </p>
        </div>

        {/* The "Frosted" Glassmorphism Strip */}
        <div className="w-full bg-white/10 backdrop-blur-2xl border-y border-white/20 py-8 md:py-12 shadow-2xl">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <div className="flex md:grid md:grid-cols-2 gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="min-w-[90vw] md:min-w-0 snap-center flex flex-row items-center gap-4 md:gap-6"
                >
                  {/* Persona Image */}
                  <div className="relative w-16 h-16 md:w-24 md:h-24 shrink-0 rounded-xl overflow-hidden border border-white/20 shadow-lg">
                    <Image src={t.image} alt={t.name} fill className="object-cover" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <User size={12} className="text-[#D2A546]" />
                      <span className="text-white font-bold text-xs md:text-sm drop-shadow-sm">{t.name}</span>
                      <div className="flex gap-0.5 ml-auto md:ml-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={10} fill="#D2A546" className="text-[#D2A546]" />
                        ))}
                      </div>
                    </div>
                    <h4 className="text-[#D2A546] font-heading text-[10px] font-bold uppercase tracking-widest mb-1.5">
                      {t.product}
                    </h4>
                    <p className="text-white/90 font-sans text-[11px] md:text-sm leading-snug italic font-light line-clamp-2 md:line-clamp-none">
                      &ldquo;{t.text}&rdquo;
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Figma Progress Bar */}
            <div className="relative w-full max-w-[200px] md:max-w-md mx-auto h-[2px] bg-white/20 mt-8 overflow-hidden rounded-full">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 left-0 h-full w-1/2 bg-[#D2A546]"
              />
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-8 md:mt-12">
          <p className="text-white/80 font-sans text-[11px] md:text-sm mb-6 tracking-wide">
            Become one of our very first Sleigh Babes and shop the launch collection ✨
          </p>
          <Link href="/shop">
            <button className="bg-[#D2A546] text-white px-8 py-3.5 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] shadow-2xl hover:bg-[#c1943d] transition-all">
              Shop From Collection
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
