"use client";

import React from 'react';

/* ─── MACHINED FIGMA ICONS ──────────────────────────────────────────────── */

const IconEthical = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 21C12.5 21 13.5 20.5 14 20M10 20C10.5 20.5 11.5 21 12 21ZM21 12C21 12.5 20.5 13.5 20 14M20 10C20.5 10.5 21 11.5 21 12ZM12 3C11.5 3 10.5 3.5 10 4M14 4C13.5 3.5 12.5 3 12 3ZM3 12C3 11.5 3.5 10.5 4 10M4 14C3.5 13.5 3 12.5 3 12Z" stroke="currentColor" strokeWidth="0.5" opacity="0.5"/>
  </svg>
);

const IconShipping = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <path d="M20.5 15.5L18 13L13 18L15.5 20.5M3.5 3.5L11 6L13 11L18 13L21 21L13 18L11 13L6 11L3.5 3.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconExcellence = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <path d="M12 3L4 9L12 21L20 9L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4 9H20M8 6L12 9M16 6L12 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconSecure = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="10" y="11" width="4" height="3" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M11 11V10C11 9.44772 11.4477 9 12 9C12.5523 9 13 9.44772 13 10V11" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

/* ─── DATA ──────────────────────────────────────────────────────────────── */

const TRUST_POINTS = [
  { label: "Refined Looks, Smarter Spending", icon: IconEthical },
  { label: "Pre-Styled for Easy Wear", icon: IconShipping },
  { label: "No Stress, Everything You Need Include", icon: IconExcellence },
  { label: "Secure & Encrypted Checkout", icon: IconSecure },
];

export default function TrustBar() {
  return (
    <section className="bg-[#FDF8F0] border-y border-[#3D1218]/5 py-4 md:py-6 overflow-hidden relative group">
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 40s linear infinite;
          will-change: transform;
        }
      `}</style>

      <div className="flex overflow-hidden">
        <div className="animate-marquee flex items-center group-hover:[animation-play-state:paused]">
          {/* Quadruple content for seamless loop on ultra-wide PC screens */}
          {[...TRUST_POINTS, ...TRUST_POINTS, ...TRUST_POINTS, ...TRUST_POINTS].map((point, i) => (
            <div key={i} className="flex items-center gap-3 px-10 md:px-16 whitespace-nowrap subpixel-antialiased">
              <div className="text-[#3D1218]/60">
                <point.icon />
              </div>
              <span className="text-[#3D1218] font-sans font-medium text-[10px] md:text-[11px] tracking-[0.15em] uppercase">
                {point.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
