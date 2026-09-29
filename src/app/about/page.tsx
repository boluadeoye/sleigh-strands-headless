"use client";
import { useState } from 'react';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { GoldStar, SBadge } from '../../components/about/AboutIcons';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<'brand' | 'ceo'>('brand');
  const founderImg = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1777256282/blog_assets/nmgtkfnbogjddzwpdjza.jpg";
  const patternImg = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1777256302/blog_assets/qz5g1o0uix1pxdf5683i.png";
  const desktopAsset = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1777102560/blog_assets/satt0gqmz9vbix5sqg6z.png";

  return (
    <main className="min-h-screen bg-cream">
      <Navbar variant="solid" />

      {/* 1. HERO */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1779803473/blog_assets/gucfexrkaol0ojc5jacm.jpg" 
            alt="Backdrop" fill className="object-cover blur-sm scale-105 opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-white font-sans text-4xl md:text-7xl font-light tracking-[0.4em] uppercase drop-shadow-2xl mt-16"
        >
          ABOUT US
        </motion.h1>
      </section>

      {/* 2. CONTENT CARD */}
      <section className="relative z-20 -mt-12 md:-mt-20 max-w-[1440px] mx-auto px-4 md:px-12 pb-32">
        <div className="bg-white rounded-[2.5rem] md:rounded-[4rem] shadow-2xl p-6 md:p-16 lg:p-24">
          
          {/* Tab Navigation */}
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
                key="brand" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="space-y-20 md:space-y-28"
              >
                {/* Intro Narrative */}
                <div className="max-w-5xl space-y-8 text-ink/80 text-lg md:text-xl leading-relaxed font-light">
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

                {/* Section: Smart Beauty */}
                <div className="space-y-10">
                  <div className="flex items-center gap-6">
                    <GoldStar className="w-8 h-8 md:w-10 md:h-10" />
                    <h2 className="text-3xl md:text-5xl font-sans font-bold text-ink tracking-tighter">Smart Beauty, No Pressure</h2>
                  </div>
                  <div className="max-w-4xl space-y-8 text-ink/70 text-base md:text-lg leading-relaxed">
                    <p>We&apos;re not here to compete with raw bundles or luxury human hair, and we&apos;re honest about that.</p>
                    <p>Instead, we offer a smarter alternative: beautiful styles that allow you to look good consistently without breaking the bank.</p>
                    <p className="font-bold text-ink text-lg md:text-xl">Because looking good shouldn&apos;t feel like a financial burden.</p>
                  </div>
                </div>

                {/* Section: Why Try */}
                <div className="space-y-10">
                  <SBadge text="WHY YOU SHOULD TRY SLEIGH STRANDS" />
                  <ul className="space-y-6">
                    {[
                      'Instantly transforms your look',
                      'Perfect for everyday wear or quick switches',
                      'Saves you time on styling',
                      'Gives you variety without long-term commitment'
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-4 text-base md:text-xl font-medium text-ink/80">
                        <GoldStar className="w-3.5 h-3.5 md:w-4 md:h-4" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* FOUNDER NOTE: HYBRID */}
                <div className="w-full">
                  <div className="hidden md:block">
                    <div className="relative w-full aspect-[21/9] rounded-[3rem] overflow-hidden shadow-2xl">
                      <Image src={desktopAsset} alt="Founder's Note" fill className="object-contain" />
                    </div>
                  </div>
                  <div className="md:hidden relative bg-burgundy rounded-[2.5rem] overflow-hidden pt-12 px-8 pb-20 shadow-2xl h-fit">
                    <div className="flex flex-col gap-8 relative z-10">
                      <div className="relative w-48 h-60 rounded-2xl overflow-hidden border-2 border-white/10 shadow-xl">
                        <Image src={founderImg} alt="Founder" fill className="object-cover" />
                      </div>
                      <div className="text-white space-y-6">
                        <h3 className="text-4xl font-sans font-bold italic leading-tight">A Note From the Founder</h3>
                        <div className="space-y-6 text-sm font-light opacity-90 leading-relaxed">
                          <p>Sleigh Strands was created with one goal, to make looking good feel easy, accessible, and stress-free.</p>
                          <p>Wearing blend wigs doesn&apos;t make you cheap, tacky, or less than. It simply means you&apos;ve found a smarter way to show up as your best self.</p>
                        </div>
                        <p className="text-lg italic text-gold">Your hair, your choice. Always.</p>
                      </div>
                    </div>
                    <div 
                      className="absolute bottom-0 left-0 right-0 h-16 opacity-40 pointer-events-none"
                      style={{ backgroundImage: `url(${patternImg})`, backgroundRepeat: 'repeat-x', backgroundPosition: 'bottom', backgroundSize: 'auto 100%' }}
                    />
                  </div>
                </div>

                {/* Section: Our Promise */}
                <div className="space-y-10">
                  <SBadge text="OUR PROMISE" />
                  <div className="max-w-4xl space-y-6 text-ink/70 text-base md:text-lg leading-relaxed">
                    <p>At Sleigh Strands, what you see is what you get.</p>
                    <p>Our wigs are accurately represented and pre-styled to match the standard displayed. We focus on delivering consistency, so you can shop with confidence every time.</p>
                  </div>
                </div>

                {/* Section: Collections */}
                <div className="space-y-12">
                  <SBadge text="OUR COLLECTIONS" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
                    {[
                      { title: "Blend Wigs", sub: "stylish, affordable, and easy to wear.", img: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1779803473/blog_assets/gucfexrkaol0ojc5jacm.jpg" },
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

                {/* Final Sign-off */}
                <div className="text-center py-20 space-y-10">
                  <div className="flex justify-center"><GoldStar className="w-12 h-12" /></div>
                  <h2 className="text-3xl md:text-6xl font-sans font-bold text-burgundy tracking-tighter leading-tight max-w-4xl mx-auto">
                    This is for the girls who want to look good without overthinking it.
                  </h2>
                  <div className="space-y-2 text-ink/60 text-lg md:text-xl font-light">
                    <p>Welcome to Sleigh Strands.</p>
                    <p>Here&apos;s to sleighing your strands</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="ceo" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="space-y-16 md:space-y-24"
              >
                <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-start">
                  <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl border border-burgundy/5">
                    <Image src={founderImg} alt="Promise Oyeladun" fill className="object-cover" priority />
                  </div>
                  <div className="space-y-10">
                    <div className="space-y-4">
                      <h2 className="text-3xl md:text-5xl font-serif-italic text-burgundy leading-tight">The Visionary Behind the Brand</h2>
                      <h3 className="text-xl md:text-2xl font-sans font-bold tracking-[0.2em] text-ink uppercase">Promise Oyeladun</h3>
                    </div>
                    <div className="space-y-6 text-ink/80 text-base md:text-lg leading-relaxed font-light">
                      <p>Promise Oyeladun is the Creative Director and Founder of Sleigh Strands, a brand built on the belief that every woman deserves to look confident, stylish, and effortlessly beautiful without having to spend a fortune.</p>
                      <p>Prior to Sleigh Strands, Promise successfully built and managed Styledynastyng - a beauty & fashion brand that served thousands of satisfied customers through the sale of different fashion & beauty products, and personal shopping services.</p>
                      <p>Her experience in running a customer-focused fashion business has helped her understand what women truly want: quality, style, and affordability, which inspired the creation of Sleigh Strands.</p>
                      <p>What started as a simple idea quickly grew into a brand with a clear mission: to provide high-quality wigs that are stylish, natural-looking, and accessible to every woman.</p>
                      <p>For Promise, Sleigh Strands is not just about hair. It’s about confidence, self-expression and helping ladies show up as their best selves wherever they go.</p>
                    </div>
                    <div className="pt-8 border-t border-burgundy/10">
                      <p className="font-serif-italic text-2xl text-burgundy">Promise Oyeladun</p>
                      <p className="text-xs font-bold uppercase tracking-widest text-gold mt-1">Founder & Creative Director</p>
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
