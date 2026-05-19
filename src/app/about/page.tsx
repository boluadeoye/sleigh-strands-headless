"use client";
import { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { GoldStar, SBadge } from '@/components/about/AboutIcons';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('brand');

  return (
    <main className="min-h-screen bg-cream">
      <Navbar variant="solid" />

      {/* 1. HERO: Recalibrated for Zero Collision */}
      <section className="relative min-h-[50vh] md:min-h-[60vh] flex flex-col items-center justify-center overflow-hidden pt-40 md:pt-52 pb-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1777256287/blog_assets/dgpak6qfdiosyrq7ajlf.jpg"
            alt="Backdrop" fill className="object-cover blur-md scale-105 opacity-40"
          />
          <div className="absolute inset-0 bg-black/5" />
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-white font-sans text-5xl md:text-8xl font-light tracking-[0.4em] uppercase drop-shadow-md text-center"
        >
          ABOUT US
        </motion.h1>
      </section>

      {/* 2. CONTENT CARD */}
      <section className="relative z-20 -mt-16 md:-mt-24 max-w-[1440px] mx-auto px-4 md:px-12 pb-32">
        <div className="bg-white rounded-[3rem] md:rounded-[4rem] shadow-2xl p-6 md:p-16 lg:p-24">
          
          {/* Tab Navigation */}
          <div className="flex justify-center gap-3 md:gap-6 mb-16 md:mb-24">
            <button
              onClick={() => setActiveTab('brand')}
              className={`px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all shrink-0 ${activeTab === 'brand' ? 'bg-burgundy text-white shadow-lg' : 'border border-burgundy/20 text-burgundy hover:bg-blush'}`}
            >
              About Sleigh Strands
            </button>
            <button
              onClick={() => setActiveTab('team')}
              className={`px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all shrink-0 ${activeTab === 'team' ? 'bg-burgundy text-white shadow-lg' : 'border border-burgundy/20 text-burgundy hover:bg-blush'}`}
            >
              About The Team
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'brand' ? (
              <motion.div
                key="brand" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                className="space-y-24 md:space-y-32"
              >
                <div className="max-w-5xl space-y-8 text-ink/80 text-lg md:text-xl leading-relaxed font-light">
                  <p>At Sleigh Strands, we believe switching up your look should be easy, affordable, and still feel premium.</p>
                  <p>Our wigs are designed to give you the freedom to experiment with different styles, colors, and lengths without damaging your natural hair or spending excessively to look good.</p>
                  <p>We specialize in high-quality blend wigs, carefully selected to give you beautiful, ready-to-wear styles that fit effortlessly into your everyday life.</p>
                </div>

                <div className="space-y-10">
                  <div className="flex items-center gap-6">
                    <GoldStar className="w-8 h-8 md:w-10 md:h-10" />
                    <h2 className="text-3xl md:text-5xl font-sans font-bold text-ink tracking-tighter">What Makes Our Wigs Different?</h2>
                  </div>
                  <div className="space-y-10">
                    <SBadge text="THEY ARE" />
                    <ul className="space-y-6">
                      {['Pre-styled for your convenience', 'Easy to maintain', 'Designed to hold their shape with minimal effort'].map((item) => (
                        <li key={item} className="flex items-center gap-4 text-base md:text-xl font-medium text-ink/80">
                          <GoldStar className="w-3.5 h-3.5 md:w-4 md:h-4" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-10">
                  <div className="flex items-center gap-6">
                    <GoldStar className="w-8 h-8 md:w-10 md:h-10" />
                    <h2 className="text-3xl md:text-5xl font-sans font-bold text-ink tracking-tighter">Smart Beauty, No Pressure</h2>
                  </div>
                  <div className="max-w-4xl space-y-8 text-ink/70 text-base md:text-xl leading-relaxed">
                    <p>We&apos;re not here to compete with raw bundles or luxury human hair, and we&apos;re honest about that.</p>
                    <p>Instead, we offer a smarter alternative: beautiful styles that allow you to look good consistently without breaking the bank.</p>
                    <p className="font-bold text-ink text-lg md:text-xl">Because looking good shouldn&apos;t feel like a financial burden.</p>
                  </div>
                </div>

                <div className="w-full">
                  <div className="hidden md:block p-1.5 rounded-[3.2rem] border border-burgundy/10 bg-white shadow-sm">
                    <div className="relative w-full aspect-[21/9] rounded-[3rem] overflow-hidden shadow-2xl border border-burgundy/5">
                      <Image
                        src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1777102560/blog_assets/satt0gqmz9vbix5sqg6z.png"
                        alt="Founder's Note" fill className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="md:hidden relative bg-burgundy rounded-[2.5rem] overflow-hidden pt-12 px-6 pb-32 shadow-2xl">
                    <div className="flex flex-col items-center text-center space-y-8 relative z-10">
                      <div className="relative w-48 h-60 rounded-2xl overflow-hidden border-2 border-white/10 shadow-xl">
                        <Image src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1777256282/blog_assets/nmgtkfnbogjddzwpdjza.jpg" alt="Founder" fill className="object-cover" />
                      </div>
                      <h3 className="text-3xl font-sans font-light italic text-white leading-tight">A Note From the Founder</h3>
                      <div className="text-white/90 text-sm font-light leading-relaxed space-y-4">
                        <p>Sleigh Strands was created with one goal, to make looking good feel easy, accessible, and stress-free.</p>
                        <p>Wearing blend wigs doesn&apos;t make you cheap, tacky, or less than. It simply means you&apos;ve found a smarter way to show up as your best self.</p>
                      </div>
                      <p className="text-lg font-sans italic text-gold">Your hair, your choice. Always.</p>
                    </div>
                  </div>
                </div>

                <div className="text-center py-16 md:py-24 space-y-10 md:space-y-12">
                  <div className="flex justify-center"><GoldStar className="w-12 h-12 md:w-16 md:h-16" /></div>
                  <h2 className="text-3xl md:text-6xl font-sans font-bold text-burgundy tracking-tighter leading-[1.1] max-w-5xl mx-auto">
                    This is for the girls who want to look good without overthinking it.
                  </h2>
                  <div className="text-lg md:text-2xl text-ink/60 font-light">
                    <p>Welcome to Sleigh Strands.</p>
                    <p>Here&apos;s to sleighing your strands</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="team" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                className="py-20 text-center space-y-12"
              >
                <div className="max-w-3xl mx-auto space-y-6">
                  <h2 className="text-4xl md:text-6xl font-sans font-bold text-burgundy tracking-tighter italic">Meet the Visionaries</h2>
                  <p className="text-lg text-ink/60 leading-relaxed font-light">
                    We are currently curating our team profiles to give you a deeper look into the hands that style your strands.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="aspect-[3/4] bg-blush/30 rounded-[2.5rem] border border-burgundy/5 animate-pulse" />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </main>
  );
}
