"use client";
import Image from 'next/image';
import Link from 'next/link';
import { Gem } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Editorial() {
  return (
    /* md:-mt-32 pulls the section to the shoulder-line, preserving the faces. z-10 maintains the layer. */
    <section className="relative w-full h-[280px] md:h-[400px] flex flex-col items-center justify-center overflow-hidden text-center px-6 md:-mt-32 z-10">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1777102536/blog_assets/qytdsgnpq4wfymvxtf6z.png"
          alt="What We Do"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 border border-white/30 rounded-full px-3 py-1 mb-4 backdrop-blur-sm bg-white/5"
        >
          <Gem size={12} className="text-white/80" />
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white">What We Do</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-white font-heading text-2xl md:text-4xl lg:text-5xl font-medium mb-3 leading-tight tracking-tight"
        >
          The Art of Extension. The search for perfection
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-white/80 font-sans text-[10px] md:text-xs max-w-xl mx-auto mb-6 leading-relaxed font-light"
        >
          A global pursuit of perfection. We partner exclusively with trusted heritage sources to bring you authentic body, movement, and shine.
        </motion.p>

        <Link href="/#collections">
          <button className="bg-[#3D1218] text-white px-8 py-3 rounded-xl text-[9px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-[#3D1218] transition-all shadow-xl">
            Shop From Collection
          </button>
        </Link>
      </div>
    </section>
  );
}