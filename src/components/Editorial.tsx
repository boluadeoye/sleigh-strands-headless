"use client";
import Image from 'next/image';
import Link from 'next/link';
import { Gem } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Editorial() {
  return (
    /* md:-mt-32 pulls the section to the shoulder-line, preserving the faces. z-10 maintains the layer. */
    <section className="relative w-full h-[320px] md:h-[450px] flex flex-col items-center justify-center overflow-hidden text-center px-6 md:-mt-32 z-10">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1779274175/blog_assets/lf3i5gvdzcnpdpzhbyfb.jpg"
          alt="Sleigh Strands Luxury Inspired Hair"
          fill
          className="object-cover object-[center_25%]"
        />
        <div className="absolute inset-0 bg-black/45" />
      </div>
      
      <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 border border-white/30 rounded-full px-3 py-1 mb-6 backdrop-blur-sm bg-white/5"
        >
          <Gem size={12} className="text-white/80" />
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white">What We Do</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-white font-sans text-2xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight tracking-tighter uppercase max-w-3xl"
        >
          LUXURY INSPIRED HAIR WITHOUT THE LUXURY PRICE
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-white/80 font-sans text-[10px] md:text-xs max-w-xl mx-auto mb-8 leading-relaxed font-light"
        >
          At Sleigh Strands, we make looking good feel easy.
          <br />
          We&apos;re not here to compete with human hair, we&apos;re here to offer a smarter alternative.
          <br /><br />
          Simple. Intentional. Effortless.
        </motion.p>

        <Link href="/#collections">
          <button className="bg-burgundy text-white px-10 py-3.5 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-burgundy transition-all shadow-2xl active:scale-95">
            Shop From Collection
          </button>
        </Link>
      </div>
    </section>
  );
}
