"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, X } from 'lucide-react';
import Link from 'next/link';

interface ToastProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function Toast({ isVisible, onClose }: ToastProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] w-[90%] max-w-[400px]"
        >
          <div className="bg-[#3D1218] border-l-4 border-[#D2A546] shadow-2xl p-5 rounded-r-xl flex items-start gap-4 relative overflow-hidden">
            {/* Decorative Background Element */}
            <div className="absolute -right-4 -top-4 opacity-5">
              <Lock size={80} />
            </div>

            <div className="bg-[#D2A546]/10 p-2 rounded-lg shrink-0">
              <Lock className="text-[#D2A546]" size={20} />
            </div>

            <div className="flex-1">
              <h4 className="font-outfit text-[11px] font-bold uppercase tracking-[0.25em] text-[#D2A546] mb-1">
                Authentication Required
              </h4>
              <p className="font-montserrat text-[13px] font-medium text-white/90 leading-snug mb-3">
                Join the inner circle to save your curated collection.
              </p>
              <Link 
                href="/account" 
                onClick={onClose}
                className="inline-block font-outfit text-[10px] font-bold uppercase tracking-widest text-[#D2A546] hover:text-white transition-colors border-b border-[#D2A546] pb-0.5"
              >
                Sign In / Register
              </Link>
            </div>

            <button 
              onClick={onClose}
              className="text-white/30 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
