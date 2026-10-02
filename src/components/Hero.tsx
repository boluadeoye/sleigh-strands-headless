"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const DESKTOP_BANNERS = [
  "https://res.cloudinary.com/dwbjb3svx/image/upload/f_auto,q_auto/v1790824580/blog_assets/mhqckczerjmgiry8u5im.jpg",
  "https://res.cloudinary.com/dwbjb3svx/image/upload/f_auto,q_auto/v1790824586/blog_assets/vbw4ycdwk3318caul211.jpg"
];

const MOBILE_BANNERS = [
  "https://res.cloudinary.com/dwbjb3svx/image/upload/f_auto,q_auto/v1790824563/blog_assets/osvrtq2fyqwx89ilsm9q.jpg",
  "https://res.cloudinary.com/dwbjb3svx/image/upload/f_auto,q_auto/v1790824573/blog_assets/topalbl9cq9npjizzlhm.jpg"
];

export default function Hero() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % 2);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full bg-[#3D1218] overflow-hidden">
      
      {/* DESKTOP BANNER VIEW (>= 768px): SIDE BUTTONS REMOVED */}
      <div className="hidden md:block relative w-full aspect-[21/9] max-h-[620px] min-h-[420px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <Link href="/shop" className="block w-full h-full relative cursor-pointer">
              <Image
                src={DESKTOP_BANNERS[slide]}
                alt="Sleigh Strands Ember Sales"
                fill
                priority
                className="object-cover object-center"
              />
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* SUBTLE BOTTOM PROGRESS DOTS (ZERO BLOCKING OF ARTWORK) */}
        <div className="absolute bottom-4 inset-x-0 flex justify-center gap-2 z-20 pointer-events-none">
          {DESKTOP_BANNERS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                slide === i ? 'w-6 bg-[#D2A546]' : 'w-2 bg-black/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* MOBILE BANNER VIEW (< 768px) */}
      <div className="block md:hidden relative w-full aspect-[3/4] max-h-[580px] overflow-hidden bg-[#FAF8F3]">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-x-0 -top-11 h-[calc(100%+2.75rem)]"
          >
            <Link href="/shop" className="block w-full h-full relative cursor-pointer">
              <Image
                src={MOBILE_BANNERS[slide]}
                alt="Sleigh Strands Ember Sales Mobile"
                fill
                priority
                className="object-cover object-[center_15%]"
              />
            </Link>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-3 inset-x-0 flex justify-center gap-2 z-20 pointer-events-none">
          {MOBILE_BANNERS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                slide === i ? 'w-6 bg-[#8B2632]' : 'w-2 bg-black/30'
              }`}
            />
          ))}
        </div>
      </div>

    </section>
  );
}
