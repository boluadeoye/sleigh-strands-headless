"use client";
import { motion } from 'framer-motion';

export default function WhatsAppButton() {
  const instagramUrl = "https://www.instagram.com/sleigh_strands/";

  return (
    <motion.a
      href={instagramUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[150] bg-[#3D1218] text-white p-3 md:p-4 rounded-full shadow-2xl flex items-center justify-center group"
    >
      <span className="absolute inset-0 rounded-full bg-[#3D1218] animate-ping opacity-20 group-hover:opacity-40" />

      {/* Instagram SVG Icon */}
      <svg 
        viewBox="0 0 24 24" 
        width="28" 
        height="28" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="relative z-10"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>

      <span className="absolute right-full mr-4 bg-white text-[#3D1218] px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity shadow-xl whitespace-nowrap pointer-events-none border border-black/5">
        Follow us on Instagram
      </span>
    </motion.a>
  );
}
