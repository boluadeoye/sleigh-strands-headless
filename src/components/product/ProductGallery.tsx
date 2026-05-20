"use client";
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductGallery({ images, name }: { images: any[], name: string }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) return (
    <div className="relative aspect-[4/5] bg-[#F4F4F4] rounded-2xl overflow-hidden" />
  );

  return (
    <div className="flex flex-col gap-4">
      {/* MAIN STAGE: Editorial Portrait Ratio */}
      <div className="relative aspect-[4/5] max-h-[65vh] bg-white p-2 md:p-4 rounded-2xl shadow-sm border border-black/5 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full rounded-xl overflow-hidden"
          >
            <Image
              src={images[activeIndex]?.src || ""}
              alt={name}
              fill
              priority
              className="object-cover object-[center_15%]"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* THUMBNAILS: Top-Weighted Sync */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative w-20 h-24 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                activeIndex === idx ? 'border-[#8B2632]' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <Image 
                src={img.src} 
                alt={`${name} ${idx}`} 
                fill 
                className="object-cover object-top" 
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
