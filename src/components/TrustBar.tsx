"use client";

import React from 'react';

const IconFlame = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D2A546" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
  </svg>
);

const IconGift = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D2A546" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
    <polyline points="20 12 20 22 4 22 4 12"/>
    <rect x="2" y="7" width="20" height="5"/>
    <line x1="12" y1="22" x2="12" y2="7"/>
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
  </svg>
);

const IconFlash = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D2A546" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

const IconSecure = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D2A546" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const TRUST_POINTS = [
  { label: "EMBER SALES — HAIRS UNDER ₦60K (AS LOW AS ₦37,000)", icon: IconFlame },
  { label: "FREE GIFT ON ALL ORDERS — FROM OCTOBER 5TH (10AM)", icon: IconGift },
  { label: "LIMITED QUANTITY ON EACH UNIT — TILL STOCK LASTS", icon: IconFlash },
  { label: "SECURE & ENCRYPTED CHECKOUT", icon: IconSecure },
];

export default function TrustBar() {
  return (
    <section className="bg-[#3D1218] border-y border-[#D2A546]/20 py-3.5 md:py-4 overflow-hidden relative group">
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
          will-change: transform;
        }
      `}</style>

      <div className="flex overflow-hidden">
        <div className="animate-marquee flex items-center group-hover:[animation-play-state:paused]">
          {[...TRUST_POINTS, ...TRUST_POINTS, ...TRUST_POINTS, ...TRUST_POINTS].map((point, i) => (
            <div key={i} className="flex items-center gap-3 px-8 md:px-14 whitespace-nowrap subpixel-antialiased">
              <div className="text-[#D2A546]">
                <point.icon />
              </div>
              <span className="text-[#F5E6E8] font-sans font-bold text-[10px] md:text-xs tracking-[0.2em] uppercase">
                {point.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
