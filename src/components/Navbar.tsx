"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X, Search } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useCart } from '@/context/CartContext';

export interface NavbarProps {
  variant?: 'transparent' | 'solid';
}

export default function Navbar({ variant = 'transparent' }: NavbarProps) {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { setIsDrawerOpen, cart } = useCart();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (isMenuOpen || isSearchOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen, isSearchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  if (!mounted) return null;

  const isSolid = variant === 'solid';
  const logoSrc = isSolid
    ? "https://res.cloudinary.com/dwbjb3svx/image/upload/v1776291105/blog_assets/rbjwbpir9367gfypuf1i.png"
    : "https://res.cloudinary.com/dwbjb3svx/image/upload/v1776160062/blog_assets/vkp8knugjh0e4rmjl385.png";

  const navBg = isSolid ? 'bg-[#F5E6E8] border-b border-[#8B2632]/5' : 'bg-transparent';
  const textColor = isSolid ? 'text-[#8B2632]' : 'text-white';
  const pillBg = isSolid ? 'bg-white/40 backdrop-blur-md border-[#8B2632]/10' : 'bg-black/20 border-white/10 backdrop-blur-md';
  const iconBorder = isSolid ? 'border-[#8B2632]/20' : 'border-white/30';
  const position = isSolid ? 'sticky top-0' : 'absolute top-0 pt-2';
  const iconFilter = !isSolid ? 'brightness(0) invert(1)' : 'none';

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Collections', href: '/#collections' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  const menuVariants: Variants = {
    closed: { x: "100%", transition: { type: "spring", stiffness: 400, damping: 40 } },
    opened: { x: 0, transition: { type: "spring", stiffness: 400, damping: 40 } }
  };

  return (
    <>
      <nav className={`${position} w-full z-[100] px-6 md:px-12 transition-all duration-500 ${navBg} ${isSolid ? 'py-4' : 'pb-8'} subpixel-antialiased`}>
        {!isSolid && (
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent -z-10 hidden md:block" />
        )}

        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          {/* LOGO CONTAINER: Aggressively upscaled for vivid presence */}
          <div className="flex items-center justify-start min-w-[180px] md:min-w-[240px] lg:min-w-[400px] flex-shrink-0">
            <Link href="/" className="relative block w-60 h-16 max-w-[65vw] md:w-72 md:h-20 lg:w-[400px] lg:h-[110px] transition-all duration-500">
              <Image src={logoSrc} alt="Sleigh Strands" fill className="object-contain object-left" priority />
            </Link>
          </div>

          <div className="hidden md:flex items-center mx-4 lg:mx-8">
            <div className={`flex items-center gap-1 lg:gap-2 rounded-full p-1.5 border ${pillBg} transition-all duration-500 shadow-sm`}>
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`font-bold uppercase transition-all rounded-full whitespace-nowrap px-3 py-2 text-[10px] tracking-[0.15em] lg:px-6 lg:text-[11px] lg:tracking-[0.2em] ${isActive ? 'bg-[#F5E6E8] text-[#3D1218] shadow-sm' : `${textColor} hover:opacity-70`}`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 md:gap-4 min-w-[120px] lg:min-w-[200px]">
            <button onClick={() => setIsSearchOpen(true)} className={`p-2.5 lg:p-3 rounded-full border ${iconBorder} ${textColor} hover:scale-110 transition-transform flex items-center justify-center`}>
              <Search className="w-5 h-5 lg:w-6 lg:h-6" strokeWidth={1.2} />
            </button>

            <Link href="/account" className={`relative w-10 h-10 lg:w-12 lg:h-12 rounded-full border ${iconBorder} hover:scale-110 transition-transform flex items-center justify-center overflow-hidden`}>
              <Image
                src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1778244116/blog_assets/vybptgygwkhfos955aj3.png"
                alt="Account"
                width={32}
                height={32}
                style={{ filter: iconFilter }}
                className="object-contain w-7 h-7 lg:w-9 lg:h-9 scale-[1.5]"
              />
            </Link>

            <button onClick={() => setIsDrawerOpen(true)} className={`relative w-10 h-10 lg:w-12 lg:h-12 rounded-full border ${iconBorder} transition-colors flex items-center justify-center`}>
              <Image
                src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1778244116/blog_assets/ryvzrz6uupwqxgjycer2.png"
                alt="Cart"
                width={24}
                height={24}
                style={{ filter: iconFilter }}
                className="object-contain w-5 h-5 lg:w-6 lg:h-6"
              />
              {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-[#8B2632] text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">{cart.length}</span>}
            </button>

            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(true)}>
              <Menu size={32} strokeWidth={1.2} className={textColor} />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMenuOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150]" />
              <motion.div variants={menuVariants} initial="closed" animate="opened" exit="closed" className="fixed top-0 right-0 bottom-0 w-[85%] max-w-[400px] bg-[#F5E6E8] z-[200] shadow-2xl flex flex-col">
                <div className="flex items-center justify-between p-8">
                  <Link href="/account" onClick={() => setIsMenuOpen(false)} className="bg-[#8B2632] p-3 rounded-full text-white shadow-lg">
                    <Image
                      src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1778244116/blog_assets/vybptgygwkhfos955aj3.png"
                      alt="Account"
                      width={28}
                      height={28}
                      style={{ filter: 'brightness(0) invert(1)' }}
                      className="scale-125"
                    />
                  </Link>
                  <button onClick={() => setIsMenuOpen(false)} className="text-black/40 hover:text-black"><X size={32} strokeWidth={1} /></button>
                </div>
                <div className="flex flex-col px-10 pt-4">
                  {navLinks.map((link, i) => (
                    <motion.div key={link.name} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * i }}>
                      <Link href={link.href} className="block py-6 text-[#8B2632] text-2xl font-sans border-b border-[#8B2632]/5 tracking-tight" onClick={() => setIsMenuOpen(false)}>{link.name}</Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed inset-0 bg-[#F5E6E8] z-[300] flex flex-col items-center justify-center p-6">
            <button onClick={() => setIsSearchOpen(false)} className="absolute top-8 right-8 md:top-12 md:right-12 text-[#8B2632]/40 hover:text-[#8B2632] transition-colors"><X size={40} strokeWidth={1} /></button>
            <form onSubmit={handleSearch} className="w-full max-w-3xl relative">
              <span className="text-[#8B2632] font-sans italic text-2xl md:text-4xl mb-4 block text-center">What are you looking for?</span>
              <input autoFocus type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search collections..." className="w-full bg-transparent border-b-2 border-[#8B2632]/20 text-3xl md:text-6xl font-sans font-bold text-[#8B2632] py-4 outline-none focus:border-[#8B2632] transition-colors text-center placeholder:text-[#8B2632]/10" />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
