"use client";
import { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { GoldStar, SBadge } from '@/components/about/AboutIcons';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('brand');
  const founderImg = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1776312143/blog_assets/obgwiwfmnojallkjppdj.jpg";

  return (
    <main className="min-h-screen bg-cream">
      <Navbar variant="solid" />

      {/* 1. HERO: Corrected Vertical Physics */}
      <section className="relative h-[45vh] md:h-[55vh] flex items-end justify-center pb-20 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1777256287/blog_assets/dgpak6qfdiosyrq7ajlf.jpg" 
            alt="Backdrop" fill className="object-cover blur-sm scale-105 opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-white font-sans text-4xl md:text-7xl font-light tracking-[0.4em] uppercase drop-shadow-2xl"
        >
          ABOUT US
        </motion.h1>
      </section>

      {/* 2. MAIN CONTENT CONTAINER */}
      <section className="relative z-20 -mt-12 md:-mt-20 max-w-[1440px] mx-auto px-4 md:px-12 pb-32">
        <div className="bg-white rounded-[2.5rem] md:rounded-[4rem] shadow-2xl p-6 md:p-16 lg:p-24">
          
          {/* Tab Navigation: Rigid Grid for Mobile Fidelity */}
          <div className="grid grid-cols-2 md:flex md:w-max gap-3 md:gap-4 mb-16 md:mb-24">
            <button 
              onClick={() => setActiveTab('brand')}
              className={`px-4 md:px-8 py-4 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'brand' ? 'bg-burgundy text-white shadow-lg' : 'border border-burgundy/20 text-burgundy hover:bg-blush'}`}
            >
              About Sleigh Strands
            </button>
            <button 
              onClick={() => setActiveTab('ceo')}
              className={`px-4 md:px-8 py-4 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'ceo' ? 'bg-burgundy text-white shadow-lg' : 'border border-burgundy/20 text-burgundy hover:bg-blush'}`}
            >
              About The CEO
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'brand' ? (
              <motion.div 
                key="brand" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="space-y-24 md:space-y-32"
              >
                {/* Intro Text */}
                <div className="max-w-5xl space-y-8 text-ink/80 text-lg md:text-2xl leading-relaxed font-light">
                  <p>At Sleigh Strands, we believe switching up your look should be easy, affordable, and still feel premium.</p>
                  <p>Our wigs are designed to give you the freedom to experiment with different styles, colors, and lengths without damaging your natural hair or spending excessively to look good.</p>
                  <p>We specialize in high-quality blend wigs, carefully selected to give you beautiful, ready-to-wear styles that fit effortlessly into your everyday life.</p>
                </div>

                {/* Section: What Makes Us Different */}
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

                {/* FOUNDER NOTE: Editorial Card */}
                <div className="w-full">
                  <div className="hidden md:block p-1.5 rounded-[3.2rem] border border-burgundy/10 bg-white shadow-sm">
                    <div className="relative w-full aspect-[21/9] rounded-[3rem] overflow-hidden shadow-2xl">
                      <Image 
                        src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1777102560/blog_assets/satt0gqmz9vbix5sqg6z.png" 
                        alt="Founder's Note" fill className="object-contain"
                      />
                    </div>
                  </div>
                  
                  <div 
                    className="md:hidden relative bg-burgundy rounded-[2.5rem] overflow-hidden pt-12 px-6 pb-32 shadow-2xl"
                    style={{ 
                      backgroundImage: 'url(https://res.cloudinary.com/dwbjb3svx/image/upload/v1777256302/blog_assets/qz5g1o0uix1pxdf5683i.png)',
                      backgroundRepeat: 'repeat-x', backgroundPosition: 'bottom', backgroundSize: 'auto 80px'
                    }}
                  >
                    <div className="flex flex-col items-center text-center space-y-8 relative z-10">
                      <div className="relative w-48 h-60 rounded-2xl overflow-hidden border-2 border-white/10 shadow-xl">
                        <Image src={founderImg} alt="Founder" fill className="object-cover" />
                      </div>
                      <h3 className="text-3xl font-serif-italic text-white leading-tight">A Note From the Founder</h3>
                      <p className="text-white/90 text-sm font-light leading-relaxed">
                        Sleigh Strands was created with one goal, to make looking good feel easy, accessible, and stress-free.
                      </p>
                      <p className="text-lg font-serif-italic text-gold">Your hair, your choice. Always.</p>
                    </div>
                  </div>
                </div>

                {/* Section: Our Collections */}
                <div className="space-y-16">
                  <SBadge text="OUR COLLECTIONS" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
                    {[
                      { title: "Blend Wigs", sub: "stylish, affordable, and easy to wear.", img: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1777256287/blog_assets/dgpak6qfdiosyrq7ajlf.jpg" },
                      { title: "Futura Wigs", sub: "our highest quality synthetic option.", img: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1777256282/blog_assets/nmgtkfnbogjddzwpdjza.jpg" }
                    ].map((col, i) => (
                      <div key={i} className="relative aspect-[4/5] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden group cursor-pointer shadow-xl">
                        <Image src={col.img} alt={col.title} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                        <div className="absolute inset-0 bg-gradient-to-t from-burgundy via-burgundy/20 to-transparent opacity-90" />
                        <div className="absolute bottom-10 left-6 right-6 text-white text-center">
                          <h4 className="text-4xl font-sans font-medium mb-2 tracking-tighter">{col.title}</h4>
                          <p className="text-[10px] opacity-80 font-medium uppercase tracking-widest">{col.sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="ceo" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="space-y-24"
              >
                {/* CEO BIO SECTION */}
                <div className="space-y-12">
                  <div className="flex items-center gap-6">
                    <GoldStar className="w-8 h-8 md:w-10 md:h-10" />
                    <h2 className="text-3xl md:text-5xl font-sans font-bold text-ink tracking-tighter">Meet the Creative Director</h2>
                  </div>
                  
                  <div className="grid lg:grid-cols-5 gap-12 items-start">
                    <div className="lg:col-span-2 relative aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl border border-burgundy/5">
                      <Image src={founderImg} alt="Promise Oyeladun" fill className="object-cover" />
                    </div>
                    <div className="lg:col-span-3 space-y-8">
                      <div>
                        <h3 className="text-3xl md:text-4xl font-sans font-bold text-burgundy tracking-tight uppercase">PROMISE OYELADUN</h3>
                        <p className="text-lg font-serif-italic text-ink/60">The Vision Behind Sleigh Strands</p>
                      </div>
                      <div className="space-y-6 text-ink/80 text-lg leading-relaxed font-light">
                        <p>Promise Oyeladun is the Creative Director and Founder of Sleigh Strands, a brand built on the belief that every woman deserves to look confident, stylish, and effortlessly beautiful without having to spend a fortune.</p>
                        <p>Prior to Sleigh Strands, Promise successfully built and managed Styledynastyng—a beauty & fashion brand that served thousands of satisfied customers through personal shopping services and fashion products.</p>
                        <p>Her experience in running a customer-focused fashion business has helped her understand what women truly want: quality, style, and affordability, which inspired the creation of Sleigh Strands.</p>
                        <p>For Promise, Sleigh Strands is not just about hair. It&apos;s about confidence, self-expression and helping ladies show up as their best selves wherever they go.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* MESSAGE FROM CEO SECTION */}
                <div className="bg-blush/30 rounded-[3rem] p-8 md:p-16 space-y-12 border border-burgundy/5">
                  <div className="flex items-center gap-6">
                    <GoldStar className="w-8 h-8 md:w-10 md:h-10" />
                    <h2 className="text-3xl md:text-5xl font-sans font-bold text-ink tracking-tighter">Message from the CEO</h2>
                  </div>
                  <div className="space-y-8 text-ink/80 text-lg md:text-xl leading-relaxed font-light max-w-5xl">
                    <p className="font-serif-italic text-2xl text-burgundy">Dear Sleigh Babes,</p>
                    <p>You&apos;re here because you love to slay your strands, and we&apos;re here to make that effortless for you.</p>
                    <p>We know what it feels like to want luxury looks without the luxury price, to search for wigs that move naturally, feel soft, and turn heads, without compromise. That&apos;s exactly why we created Sleigh Strands.</p>
                    <p>Every wig you see here is hand-picked for confidence, style, and versatility, so whether it&apos;s a casual day out, a big meeting, or a night out, you&apos;re always ready to slay your strands with pride.</p>
                    <p className="font-bold text-ink">We&apos;re not just selling hair; we&apos;re celebrating every Sleigh Babe who knows her worth, her vibe, and her style.</p>
                    <div className="pt-8 border-t border-burgundy/10">
                      <p>With love,</p>
                      <p className="font-serif-italic text-2xl text-burgundy">The Sleigh Strands Team</p>
                    </div>
                  </div>
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
