"use client";
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ProductCard({ product, index }: { product: any, index: number }) {
  return (
    <Link href={`/product/${product.id}`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        className="group cursor-pointer"
      >
        <div className="relative aspect-[4/5] mb-6 overflow-hidden bg-[#F5E6E8] rounded-sm">
          <Image 
            src={product.images[0]?.src || 'https://res.cloudinary.com/dwbjb3svx/image/upload/v1776170457/blog_assets/av9grfitavzjltpmsopn.png'} 
            alt={product.name} 
            fill 
            className="object-cover group-hover:scale-110 transition-transform duration-700" 
          />
          <div className="absolute bottom-4 left-4 right-4 translate-y-12 group-hover:translate-y-0 transition-transform duration-300">
            <button className="w-full bg-white/90 backdrop-blur py-3 text-[10px] font-bold uppercase tracking-widest text-black shadow-xl">
              View Details
            </button>
          </div>
        </div>
        <h3 className="text-xs font-bold text-black uppercase tracking-widest mb-1 truncate">{product.name}</h3>
        <p className="text-[#8B2632] font-bold text-lg">₦{product.price ? parseFloat(product.price).toLocaleString() : '0'}</p>
      </motion.div>
    </Link>
  );
}
