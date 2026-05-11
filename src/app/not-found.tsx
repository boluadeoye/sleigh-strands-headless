"use client";
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#D9E2EC] to-[#F1F4F8] flex items-center justify-center p-4 md:p-12 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full max-w-6xl aspect-[1000/524] flex items-center justify-center"
      >
        {/* THE ILLUSTRATION ASSET */}
        <div className="absolute inset-0 rounded-[3rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.07)] border border-white/40">
          <Image
            src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1776435724/blog_assets/v5lka5wbaywns0esn2zi.jpg"
            alt="404 Page Not Found"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* PREMIUM INTERACTIVE BUTTON OVERLAY */}
        <div className="absolute bottom-[11.5%] left-1/2 -translate-x-1/2 w-full flex justify-center z-30">
          <Link href="/account">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-4 md:px-16 md:py-5 bg-white/10 backdrop-blur-md border border-[#3D1218]/20 rounded-full text-[#3D1218] text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] shadow-lg hover:bg-[#3D1218] hover:text-white hover:border-[#3D1218] transition-all duration-500"
            >
              Go Back to Dashboard
            </motion.button>
          </Link>
        </div>

        {/* DECORATIVE DEPTH LAYER */}
        <div className="absolute inset-0 pointer-events-none rounded-[3rem] ring-1 ring-inset ring-black/5" />
      </motion.div>
    </main>
  );
}
