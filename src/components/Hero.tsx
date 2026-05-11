"use client";
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative w-full h-[70vh] md:h-[75vh] max-h-[750px] min-h-[500px] bg-[#4A1018] overflow-hidden">
      <motion.div 
        initial={{ scale: 1.05 }} 
        animate={{ scale: 1 }} 
        transition={{ duration: 1.5, ease: "easeOut" }} 
        className="absolute inset-0 z-0"
      >
        <div className="hidden md:block absolute inset-0">
          <Image
            src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1777646135/blog_assets/tmod9vs49dv3hc8ptpu0.png"
            alt="Sleigh Strands Hero"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#3D1218] via-[#3D1218]/80 to-transparent z-10" />
        </div>
        <div className="block md:hidden absolute inset-0">
          <Image
            src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1777645864/blog_assets/aevb7xleszxtuelrvqok.png"
            alt="Sleigh Strands Hero"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#3D1218]/90 via-[#3D1218]/50 to-[#3D1218]/90 z-10" />
        </div>
      </motion.div>

      <div className="relative z-20 h-full max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col justify-center items-start pt-12 md:pt-32">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-white font-sans text-[34px] md:text-[64px] font-medium tracking-tight leading-[1.2] md:leading-[1.1] mb-6"
        >
          Effortless Glamour,<br />
          Rooted in Quality
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-white/90 font-sans text-[14px] md:text-base max-w-lg mb-10 md:mb-8 leading-relaxed font-light"
        >
          Real hair for real life. Exceptional quality that doesn&apos;t just look natural, it feels like home. <span className="text-[#D2A546] font-medium">Step into the room and let your hair do the talking.</span>
        </motion.p>

        <Link href="/#collections">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="bg-[#F5E6E8] text-[#3D1218] rounded-2xl px-8 py-4 text-[11px] font-bold uppercase tracking-widest hover:bg-white transition-all shadow-xl"
          >
            Explore The Collection
          </motion.button>
        </Link>
      </div>
    </section>
  );
}
