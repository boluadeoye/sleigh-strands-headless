"use client";
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Star, Plus, Minus } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useState } from 'react';
import { motion, Variants } from 'framer-motion';

export default function ProductCard({ product, index = 0 }: { product: any, index?: number }) {
  const { addToCart } = useCart();
  const { wishlistIds, toggleWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const isOutOfStock = product.stock_status === 'outofstock';
  const isWishlisted = wishlistIds.includes(product.id);

  const hasRating = product.rating_count > 0;
  const displayRating = hasRating ? Number(product.average_rating).toFixed(1) : null;

  // STAGGERED REVEAL PHYSICS
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        delay: (index % 4) * 0.1, 
        ease: [0.215, 0.61, 0.355, 1] 
      } 
    }
  };

  return (
    <motion.div 
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="group flex flex-col bg-white rounded-[12px] p-2.5 sm:p-4 shadow-sm hover:shadow-xl transition-all h-full relative border border-black/[0.02]"
    >
      <div className="relative aspect-[4/5] rounded-[10px] overflow-hidden mb-3 sm:mb-4 bg-[#F9F9F9]">
        <Link href={`/product/${product.id}`}>
          {/* BOUTIQUE ZOOM ENGINE */}
          <motion.div 
            whileHover={{ scale: 1.08 }} 
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full h-full"
          >
            <Image
              src={product.images?.[0]?.src || "https://res.cloudinary.com/dwbjb3svx/image/upload/v1776170457/blog_assets/av9grfitavzjltpmsopn.png"}
              alt={product.name}
              fill
              className={`object-cover transition-opacity duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </motion.div>
        </Link>

        <button 
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product.id); }}
          className={`absolute top-2.5 right-2.5 sm:top-4 sm:right-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] hover:scale-125 transition-transform z-10 ${isWishlisted ? 'text-[#8B2632]' : 'text-white'}`}
        >
          <Heart className="w-[18px] h-[18px] sm:w-[22px] sm:h-[22px]" strokeWidth={2.5} fill={isWishlisted ? "currentColor" : "none"} />
        </button>

        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[2px] z-20">
            <span className="bg-[#E86A6A] text-white text-[8px] sm:text-[9px] px-3 py-1 rounded-full uppercase font-bold tracking-widest shadow-lg">
              Sold Out
            </span>
          </div>
        )}
      </div>

      <div className="text-center flex-1 flex flex-col items-center">
        <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-[#3D1218]/50 block mb-1.5 sm:mb-2 font-montserrat font-bold">
          {product.categories?.[0]?.name || 'CATEGORY'}
        </span>
        
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-1 w-full">
          <Link href={`/product/${product.id}`} className="truncate max-w-[75%]">
            <h3 className="text-[13px] sm:text-[15px] font-outfit font-medium text-[#3D1218] hover:opacity-70 transition-opacity truncate">
              {product.name}
            </h3>
          </Link>
          {hasRating && (
            <>
              <span className="text-[#3D1218]/10 text-[14px]">|</span>
              <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
                <Star size={10} className="fill-[#D2A546] text-[#D2A546]" />
                <span className="text-[11px] sm:text-[13px] font-montserrat font-medium text-[#3D1218]/40">
                  {displayRating}
                </span>
              </div>
            </>
          )}
        </div>

        <div className="text-[16px] sm:text-[18px] font-montserrat font-bold text-[#3D1218] mb-4 sm:mb-5">
          ₦{product.price ? parseFloat(product.price).toLocaleString() : '15,900'}
        </div>

        <div className="flex justify-center items-center gap-1.5 w-full mt-auto pb-0.5">
          <div className="flex-[0.42] flex items-center justify-between bg-[#F5E6E8] px-2 h-[30px] rounded-full">
            <button onClick={() => setQuantity(quantity + 1)} className="text-[#3D1218] hover:scale-110 transition-transform"><Plus size={10} strokeWidth={2.5} /></button>
            <span className="font-outfit font-bold text-[10px] text-[#3D1218]">{quantity}</span>
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-[#3D1218] hover:scale-110 transition-transform"><Minus size={10} strokeWidth={2.5} /></button>
          </div>
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={(e) => { e.preventDefault(); if (!isOutOfStock) addToCart(product, quantity); }}
            className={`flex-[0.58] h-[30px] text-[9px] font-outfit font-medium rounded-full transition-all ${isOutOfStock ? 'bg-gray-100 text-gray-400' : 'bg-[#F5E6E8] text-[#3D1218] hover:bg-[#3D1218] hover:text-white'}`}
          >
            {isOutOfStock ? 'Sold Out' : 'Add to cart'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
