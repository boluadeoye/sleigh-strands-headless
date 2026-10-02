"use client";
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';

export default function ProductGallery({ images, name, productId }: { images: any[], name: string, productId: any }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const { wishlistIds, toggleWishlist } = useWishlist();

  const isWishlisted = wishlistIds.includes(productId);

  if (!images || images.length === 0) return (
    <div className="relative aspect-[4/5] bg-[#F4F4F4] rounded-2xl overflow-hidden" />
  );

  return (
    <div className="flex flex-col gap-4 w-full min-w-0">
      {/* MAIN STAGE: Editorial Portrait Ratio */}
      <div className="relative w-full aspect-[4/5] max-h-[65vh] bg-white p-2 md:p-4 rounded-2xl shadow-sm border border-black/5 overflow-hidden">
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

        <button
          onClick={(e) => { e.preventDefault(); toggleWishlist(productId); }}
          className={`absolute top-6 right-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] hover:scale-110 transition-transform z-10 cursor-pointer ${isWishlisted ? 'text-[#8B2632]' : 'text-white'}`}
          aria-label="Save to Wishlist"
        >
          <Heart
            className="w-6 h-6 md:w-8 md:h-8"
            strokeWidth={2}
            fill={isWishlisted ? "currentColor" : "none"}
          />
        </button>
      </div>

      {/* THUMBNAILS: Responsive Touch Reel (Never tears the page) */}
      {images.length > 1 && (
        <div className="w-full min-w-0 flex gap-2.5 sm:gap-3 overflow-x-auto touch-pan-x [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-1 px-0.5">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`relative w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                activeIndex === idx ? 'border-[#8B2632] ring-1 ring-[#8B2632]/30 scale-[1.02]' : 'border-transparent opacity-55 hover:opacity-100'
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
