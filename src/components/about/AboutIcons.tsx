import Image from 'next/image';
import React from 'react';

export function GoldStar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" fill="#D2A546"/>
    </svg>
  );
}

export function SBadge({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-3 bg-[#F5E6E8] border border-[#8B2632]/10 rounded-full px-4 py-1.5 shadow-sm">
      <div className="relative w-3.5 h-4.5">
        <Image 
          src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1777256291/blog_assets/wjeutmf2yyjxpp75amwo.png" 
          alt="S" fill className="object-contain"
        />
      </div>
      <span className="text-[#8B2632] text-[9px] font-bold uppercase tracking-[0.25em] leading-none">{text}</span>
    </div>
  );
}
