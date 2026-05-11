"use client";
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const Sparkle = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#8B2632]">
    <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" fill="currentColor"/>
  </svg>
);

const DiamondBullet = () => (
  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#8B2632] mt-1.5 shrink-0">
    <rect x="4" y="0" width="5.65685" height="5.65685" transform="rotate(45 4 0)" fill="currentColor"/>
  </svg>
);

export default function AboutClient() {
  const [activeTab, setActiveTab] = useState('brand');
  const founderImg = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1776312143/blog_assets/obgwiwfmnojallkjppdj.jpg";

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Tab Navigation */}
      <div className="flex justify-center gap-4 mb-16">
        <button 
          onClick={() => setActiveTab('brand')}
          className={`px-8 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border ${
            activeTab === 'brand' ? 'bg-[#8B2632] text-white border-[#8B2632]' : 'bg-white text-[#8B2632] border-[#8B2632]/10'
          }`}
        >
          About Sleigh Strands
        </button>
        <button 
          onClick={() => setActiveTab('ceo')}
          className={`px-8 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border ${
            activeTab === 'ceo' ? 'bg-[#8B2632] text-white border-[#8B2632]' : 'bg-white text-[#8B2632] border-[#8B2632]/10'
          }`}
        >
          About The CEO
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'brand' ? (
          <motion.div 
            key="brand"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="space-y-16"
          >
            <div className="space-y-6 text-black/80 text-sm md:text-base leading-relaxed font-light">
              <p>At Sleigh Strands, we believe switching up your look should be easy, affordable, and still feel premium.</p>
              <p>Our wigs are designed to give you the freedom to experiment with different styles, colors, and lengths without damaging your natural hair or spending excessively to look good.</p>
              <p>We specialize in high-quality blend wigs, carefully selected to give you beautiful, ready-to-wear styles that fit effortlessly into your everyday life.</p>
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <Sparkle />
                <h2 className="text-2xl md:text-3xl font-sans text-[#8B2632]">What Makes Our Wigs Different?</h2>
              </div>
              <ul className="space-y-4">
                {['Pre-styled for your convenience', 'Easy to maintain', 'Designed to hold their shape with minimal effort'].map((item) => (
                  <li key={item} className="flex items-start gap-4 text-sm font-medium text-black/80">
                    <DiamondBullet /> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Founder's Note Card */}
            <div className="relative bg-[#8B2632] rounded-[2.5rem] overflow-hidden pt-12 px-8 md:px-12 shadow-2xl">
              <div className="flex flex-col md:flex-row gap-10 items-start relative z-10">
                <div className="relative w-48 h-64 rounded-2xl overflow-hidden shrink-0 border-4 border-white/10">
                  <Image src={founderImg} alt="Founder" fill className="object-cover" />
                </div>
                <div className="text-white space-y-6 pb-24">
                  <h3 className="text-3xl md:text-4xl font-sans italic">A Note From the Founder</h3>
                  <p className="text-sm md:text-base font-light opacity-90 leading-relaxed">
                    Sleigh Strands was created with one goal, to make looking good feel easy, accessible, and stress-free.
                  </p>
                  <p className="font-medium italic">Your hair, your choice. Always.</p>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-20 opacity-40">
                <Image src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1776273970/blog_assets/kso0vkvjqfhgjr8sru5c.png" alt="" fill className="object-cover object-bottom" />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="ceo"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="space-y-20"
          >
            {/* Meet the Creative Director */}
            <div className="space-y-10">
              <div className="flex items-center gap-4">
                <Sparkle />
                <h2 className="text-2xl md:text-3xl font-sans text-[#8B2632]">Meet the Creative Director</h2>
              </div>
              
              <div className="grid md:grid-cols-5 gap-12 items-start">
                <div className="md:col-span-2 relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-xl">
                  <Image src={founderImg} alt="Promise Oyeladun" fill className="object-cover" />
                </div>
                <div className="md:col-span-3 space-y-6">
                  <div>
                    <h3 className="text-2xl font-sans font-bold text-[#8B2632] tracking-tight">PROMISE OYELADUN,</h3>
                    <p className="text-sm font-sans italic text-black/60">The Vision Behind Sleigh Strands</p>
                  </div>
                  <div className="space-y-4 text-sm text-black/80 leading-relaxed font-light">
                    <p>Promise Oyeladun is the Creative Director and Founder of Sleigh Strands, a brand built on the belief that every woman deserves to look confident, stylish, and effortlessly beautiful without having to spend a fortune.</p>
                    <p>Prior to Sleigh Strands, Promise successfully built and managed Styledynastyng- a beauty & fashion brand that served thousands of satisfied customers through the sale of different fashion and beauty products and personal shopping services.</p>
                    <p>Her experience in running a customer-focused fashion business has helped her understand what women truly want: quality, style, and affordability, which inspired the creation of Sleigh Strands.</p>
                    <p>What started as a simple idea quickly grew into a brand with a clear mission: to provide high-quality wigs that are stylish, natural-looking, and accessible to every woman.</p>
                    <p>For Promise, Sleigh Strands is not just about hair. It&apos;s about confidence, self-expression and helping ladies show up as their best selves wherever they go.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Message from the CEO */}
            <div className="space-y-10">
              <div className="flex items-center gap-4">
                <Sparkle />
                <h2 className="text-2xl md:text-3xl font-sans text-[#8B2632]">Message from the CEO</h2>
              </div>
              <div className="space-y-6 text-sm md:text-base text-black/80 leading-relaxed font-light max-w-4xl">
                <p>Dear Sleigh Babes,</p>
                <p>You&apos;re here because you love to slay your strands, and we&apos;re here to make that effortless for you.</p>
                <p>We know what it feels like to want luxury looks without the luxury price, to search for wigs that move naturally, feel soft, and turn heads, without compromise. That&apos;s exactly why we created Sleigh Strands.</p>
                <p>Every wig you see here is hand-picked for confidence, style, and versatility, so whether it&apos;s a casual day out, a big meeting, or a night out, you&apos;re always ready to slay your strands with pride.</p>
                <p>We&apos;re not just selling hair; <span className="font-bold">we&apos;re celebrating every Sleigh Babe who knows her worth, her vibe, and her style.</span></p>
                <p>So welcome, this space is for you. Explore, try new styles, and remember: affordable never looked this good.</p>
                <div className="pt-4">
                  <p>With love,</p>
                  <p className="font-medium">The Sleigh Strands Team</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
