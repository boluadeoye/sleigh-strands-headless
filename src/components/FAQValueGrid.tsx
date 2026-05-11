"use client";
import { useState } from "react";
import Image from 'next/image';
import { Plus, Minus } from 'lucide-react';

/* ─── DATA: THE FIRST 4 QUESTIONS ────────────────────────────────────────── */

const FAQ_DATA = [
  {
    id: 1,
    question: "What type of wigs do you sell?",
    answer: "At Sleigh Strands, we offer high-quality blend wigs and Futura wigs (premium synthetic). They are designed to give you a polished, stylish look while being more affordable and easier to maintain than human hair."
  },
  {
    id: 2,
    question: "Are the wigs exactly as shown in pictures?",
    answer: "Yes 🤍.. What you see is what you get. All our wigs are carefully styled and presented to match what will be delivered to you."
  },
  {
    id: 3,
    question: "Do the wigs come styled?",
    answer: "Yes. All wigs come pre-styled and almost ready to wear. You only need to cut the lace and make minor adjustments if needed."
  },
  {
    id: 4,
    question: "Will the wig look like human hair?",
    answer: "Our wigs are made from high-quality blend fibers, so they give a natural and polished appearance. However, they are not raw or human hair, and may not behave exactly the same, and that's completely normal."
  }
];

export default function FAQValueGrid() {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <>
      {/* 1. FAQ SECTION: COORDINATE LOCKED */}
      <section className="bg-white py-24 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-14">
          <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-stretch">
            
            {/* LEFT: FAQ ACCORDION */}
            <div className="w-full md:w-[55%] flex flex-col justify-center">
              {/* Badge: Machined Pill */}
              <div className="inline-flex items-center gap-2 border border-[#3D1218]/10 rounded-full px-4 py-1.5 mb-8 self-start">
                <div className="w-4 h-4 bg-[#3D1218]/5 rounded-sm flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-[#3D1218] rounded-full" />
                </div>
                <span className="text-[#3D1218] text-[10px] font-bold uppercase tracking-[0.3em]">FAQs</span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-medium text-[#0C0608] mb-12 tracking-tighter leading-[1.1]">
                We answer to you
              </h2>

              <div className="space-y-5">
                {FAQ_DATA.map((faq) => (
                  <div 
                    key={faq.id} 
                    onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                    className="group bg-white border border-black/[0.03] p-6 md:p-8 rounded-[20px] cursor-pointer transition-all duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_50px_rgba(0,0,0,0.06)]"
                  >
                    <div className="flex justify-between items-center gap-4">
                      <span className="text-base md:text-xl font-montserrat italic font-medium text-[#0C0608]/80 leading-tight">
                        {faq.question}
                      </span>
                      {/* Plus Button: Machined Square */}
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 shrink-0 ${
                        openId === faq.id ? 'bg-[#3D1218] text-white rotate-180' : 'bg-[#F4F4F4] text-[#0C0608]/30'
                      }`}>
                        {openId === faq.id ? <Minus size={18} strokeWidth={2.5} /> : <Plus size={18} strokeWidth={2.5} />}
                      </div>
                    </div>
                    
                    {/* Answer: Smooth Reveal */}
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      openId === faq.id ? 'max-h-40 mt-6 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <p className="font-montserrat text-sm md:text-base text-[#0C0608]/60 leading-relaxed pr-10">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: HERO IMAGE */}
            <div className="w-full md:w-[45%] relative min-h-[500px] md:min-h-0 rounded-[32px] overflow-hidden shadow-2xl">
              <Image
                src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1776178787/blog_assets/pl11hvykxgybygohihqc.png"
                alt="Sleigh Strands FAQ"
                fill
                className="object-cover object-center hover:scale-105 transition-transform duration-1000"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. VALUE GRID SECTION: PRESERVED LUXURY WEIGHT */}
      <section className="bg-[#FDF8F0] py-24">
        <div className="max-w-[1440px] mx-auto px-6 md:px-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Burgundy Block */}
            <div className="bg-[#3D1218] p-10 md:p-16 rounded-[32px] text-white flex flex-col justify-between min-h-[380px] shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-sans font-medium leading-[1.1] tracking-tighter mb-8">
                  Trusted by 500k+<br/>Women Worldwide
                </h3>
                <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-sm">
                  <strong className="text-white font-semibold">Signature Luster.</strong> Experience the seamless movement and nourishing glow of hair that's designed to turn heads.
                </p>
              </div>
              {/* Subtle background accent */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
            </div>

            {/* White Block */}
            <div className="bg-white p-10 md:p-16 rounded-[32px] text-[#0C0608] flex flex-col justify-between min-h-[380px] shadow-xl border border-black/[0.02]">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-sans font-medium leading-[1.1] tracking-tighter mb-8">
                Unrivaled<br/>Authenticity
              </h3>
              <p className="text-sm md:text-base text-[#0C0608]/60 leading-relaxed max-w-sm">
                <strong className="text-[#0C0608] font-semibold">Proven Performance.</strong> Curation without compromise. We deliver the exact density and length you demand.
              </p>
            </div>
          </div>

          {/* Gold Block */}
          <div className="bg-[#D2A546] p-10 md:p-16 rounded-[32px] text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-12 shadow-xl">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-sans font-medium tracking-tighter shrink-0 leading-tight">
              Expertly <br className="hidden md:block"/>Vetted
            </h3>
            <p className="text-sm md:text-base lg:text-xl text-white/90 leading-relaxed max-w-2xl font-medium">
              We do the work so you don't have to. Our team sources and authenticates every piece, bringing you high-performance hair backed by the industry's most trusted names.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}