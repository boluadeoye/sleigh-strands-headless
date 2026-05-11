"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, CheckCircle2, Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function NewsletterModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'exists'>('idle');

  useEffect(() => {
    // 1. Check if user has already dismissed or subscribed
    const isSuppressed = localStorage.getItem('sleigh_newsletter_suppressed');
    if (isSuppressed) return;

    // 2. Trigger after 5 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
    // Suppress for this session
    localStorage.setItem('sleigh_newsletter_suppressed', 'temp');
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.status === 409) {
        setStatus('exists');
        localStorage.setItem('sleigh_newsletter_suppressed', 'permanent');
        return;
      }

      if (!res.ok) throw new Error();

      setStatus('success');
      localStorage.setItem('sleigh_newsletter_suppressed', 'permanent');
    } catch (err) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleDismiss}
            className="absolute inset-0 bg-[#3D1218]/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] flex flex-col md:flex-row min-h-[400px] md:min-h-[500px]"
          >
            {/* Close Button */}
            <button 
              onClick={handleDismiss}
              className="absolute top-4 right-4 z-20 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all"
            >
              <X size={20} />
            </button>

            {/* Left Side: Editorial Image */}
            <div className="relative w-full md:w-1/2 h-48 md:h-auto overflow-hidden">
              <Image 
                src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1777113260/blog_assets/mkn9hnehx4seqfxtdozo.jpg"
                alt="The Inner Circle"
                fill
                priority
                className="object-cover object-center scale-105 hover:scale-100 transition-transform duration-[10s]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3D1218]/40 to-transparent md:hidden" />
            </div>

            {/* Right Side: Content */}
            <div className="w-full md:w-1/2 bg-[#3D1218] p-8 md:p-12 flex flex-col justify-center relative">
              <AnimatePresence mode="wait">
                {status === 'success' || status === 'exists' ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-center space-y-6"
                  >
                    <div className="flex justify-center">
                      <div className="p-4 bg-[#D2A546]/10 rounded-full">
                        <CheckCircle2 className="text-[#D2A546]" size={48} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-outfit text-2xl font-bold text-white uppercase tracking-[0.2em]">Welcome to the Vault</h3>
                      <p className="font-montserrat text-sm text-white/70 leading-relaxed">
                        {status === 'exists' 
                          ? "You're already part of the inner circle. Your journey to effortless glamour continues."
                          : "Your membership is confirmed. Prepare for elite hair care secrets and limited drops."}
                      </p>
                    </div>
                    <button 
                      onClick={handleDismiss}
                      className="w-full py-4 bg-[#D2A546] text-[#3D1218] font-outfit text-[11px] font-bold uppercase tracking-[0.3em] rounded-xl hover:bg-white transition-all"
                    >
                      Enter the Store
                    </button>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-8"
                  >
                    <div className="space-y-3">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D2A546]/30 bg-[#D2A546]/5">
                        <Gift size={12} className="text-[#D2A546]" />
                        <span className="font-outfit text-[9px] font-bold text-[#D2A546] uppercase tracking-[0.2em]">Exclusive Invitation</span>
                      </div>
                      <h2 className="font-outfit text-3xl md:text-4xl font-bold text-white uppercase tracking-[0.3em] leading-tight">
                        The Inner <br/><span className="text-[#D2A546]">Circle</span>
                      </h2>
                      <p className="font-montserrat text-sm text-white/60 leading-relaxed max-w-[280px]">
                        Join the elite. Access limited collections and professional hair care curation.
                      </p>
                    </div>

                    <form onSubmit={handleSubscribe} className="space-y-4">
                      <div className="relative">
                        <input 
                          required
                          type="email"
                          placeholder="Email Address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white font-montserrat text-sm outline-none focus:border-[#D2A546] transition-all placeholder:text-white/20"
                        />
                      </div>
                      <button 
                        disabled={status === 'loading'}
                        className="w-full py-5 bg-[#D2A546] text-[#3D1218] font-outfit text-[11px] font-bold uppercase tracking-[0.3em] rounded-xl hover:bg-white transition-all shadow-xl flex items-center justify-center gap-3"
                      >
                        {status === 'loading' ? <Loader2 className="animate-spin" size={18} /> : "Claim Access"}
                      </button>
                      {status === 'error' && (
                        <p className="text-[10px] text-red-400 font-bold uppercase tracking-widest text-center">Please enter a valid email</p>
                      )}
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
