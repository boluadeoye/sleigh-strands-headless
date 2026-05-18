"use client";
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative w-full h-[70vh] md:h-[75vh] max-h-[750px] min-h-[500px] bg-[#4A1018] overflow-hidden">
      
      {/* BACKGROUND LAYER */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute inset-0 z-0"
      >
        {/* 1. POSTER IMAGES (Instant Load - Prevents Black Flash) */}
        <div className="hidden md:block absolute inset-0">
          <Image
            src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1777646135/blog_assets/tmod9vs49dv3hc8ptpu0.png"
            alt="Sleigh Strands Hero"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="block md:hidden absolute inset-0">
          <Image
            src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1777645864/blog_assets/aevb7xleszxtuelrvqok.png"
            alt="Sleigh Strands Hero"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* 2. YOUTUBE CINEMATIC LAYER (Fades in after 2.5s) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 2 }}
          className="absolute top-1/2 left-1/2 w-[150vw] h-[266.66vw] md:w-[100vw] md:h-[177.77vw] -translate-x-1/2 -translate-y-1/2 scale-[1.2] md:scale-[1.3] pointer-events-none"
        >
          <iframe
            src="https://www.youtube.com/embed/x1umCKMaJxg?autoplay=1&mute=1&controls=0&loop=1&playlist=x1umCKMaJxg&modestbranding=1&playsinline=1&rel=0&showinfo=0&disablekb=1&fs=0&iv_load_policy=3"
            allow="autoplay; encrypted-media"
            className="w-full h-full opacity-80"
            tabIndex={-1}
          />
        </motion.div>

        {/* 3. EDITORIAL GRADIENT OVERLAYS (Ensures text readability over video) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#3D1218] via-[#3D1218]/80 to-transparent z-10 hidden md:block" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#3D1218]/90 via-[#3D1218]/50 to-[#3D1218]/90 z-10 block md:hidden" />
      </motion.div>

      {/* CONTENT LAYER */}
      <div className="relative z-20 h-full max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col justify-center items-start pt-12 md:pt-32">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.215, 0.61, 0.355, 1] }}
          className="text-white font-sans text-[34px] md:text-[64px] font-medium tracking-tight leading-[1.2] md:leading-[1.1] mb-6"
        >
          Effortless Glamour,<br />
          Rooted in Quality
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1, ease: [0.215, 0.61, 0.355, 1] }}
          className="text-white/90 font-sans text-[14px] md:text-base max-w-lg mb-10 md:mb-8 leading-relaxed font-light"
        >
          We don&apos;t just send you a wig, we make sure you&apos;re fully ready to sleigh from the moment it arrives.
          <br /><br />
          <span className="text-[#D2A546] font-medium">Thoughtful. Intentional. Sleigh Strands.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1, ease: [0.215, 0.61, 0.355, 1] }}
        >
          <Link href="/#collections">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#ffffff" }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#F5E6E8] text-[#3D1218] rounded-2xl px-8 py-4 text-[11px] font-bold uppercase tracking-widest transition-all shadow-xl"
            >
              Explore The Collection
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
