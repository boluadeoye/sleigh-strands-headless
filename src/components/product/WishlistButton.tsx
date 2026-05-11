"use client";
import { Heart } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';

export default function WishlistButton({ productId }: { productId: number }) {
  const { wishlistIds, toggleWishlist } = useWishlist();
  const isWishlisted = wishlistIds.includes(productId);

  return (
    <button 
      onClick={() => toggleWishlist(productId)}
      className={`absolute top-10 right-10 p-3 bg-white rounded-full transition-colors shadow-sm ${isWishlisted ? 'text-[#8B2632]' : 'text-black/20 hover:text-[#8B2632]'}`}
    >
      <Heart size={20} strokeWidth={2} fill={isWishlisted ? "currentColor" : "none"} />
    </button>
  );
}
