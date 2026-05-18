"use client";
import { motion, AnimatePresence } from 'framer-motion';

interface CancelModalProps {
  isOpen: boolean;
  onClose: () => void; // Continue to payment
  onConfirm: () => void; // Actually cancel
}

export default function CancelModal({ isOpen, onClose, onConfirm }: CancelModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0C0608]/80 backdrop-blur-xl"
          />
          
          {/* Modal Card */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-[#FDF8F0] w-full max-w-sm rounded-[2.5rem] p-10 md:p-12 border border-[#D2A546]/20 shadow-2xl text-center"
          >
            <h3 className="font-serif-italic text-[#8B2632] text-3xl md:text-4xl mb-4">
              Wait, Sleigh Babe...
            </h3>
            <p className="font-sans text-black/70 text-sm leading-relaxed mb-10">
              Are you sure you want to leave? Your luxury strands are waiting to be shipped.
            </p>
            
            <div className="flex flex-col gap-4">
              <button 
                onClick={onClose}
                className="w-full bg-[#8B2632] text-[#FDF8F0] py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg active:scale-95 transition-transform"
              >
                Keep Sleighing
              </button>
              <button 
                onClick={onConfirm}
                className="w-full bg-transparent text-[#8B2632]/50 py-2 text-[9px] font-bold uppercase tracking-widest hover:text-[#8B2632] transition-colors"
              >
                Yes, cancel payment
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
