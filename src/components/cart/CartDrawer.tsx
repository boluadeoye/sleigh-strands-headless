"use client";
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// FINANCIAL STRIP: Zero for testing
const TRANSACTION_FEE = 0;

export default function CartDrawer() {
  const { cart, isDrawerOpen, setIsDrawerOpen, removeFromCart, updateQuantity, subtotal, discountTotal } = useCart();
  const router = useRouter();

  const handleShopMore = () => {
    setIsDrawerOpen(false);
    router.push('/shop');
  };

  const total = subtotal - discountTotal;

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsDrawerOpen(false)} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200]" />
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="fixed top-0 right-0 bottom-0 w-full max-w-[450px] bg-[#F5E6E8] z-[250] shadow-2xl flex flex-col">
            <div className="p-6 md:p-8 flex items-center justify-between border-b border-black/5">
              <div className="flex items-center gap-3 text-[#8B2632]">
                <ShoppingBag size={24} />
                <span className="font-sans font-bold text-lg uppercase tracking-tight">Cart</span>
              </div>
              <button onClick={() => setIsDrawerOpen(false)} className="text-black/40 hover:text-black transition-colors"><X size={28} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <p className="text-black/60 font-medium text-sm uppercase tracking-widest">Your cart is empty</p>
                  <button onClick={handleShopMore} className="bg-[#FF6B35] text-white px-12 py-4 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">Shop Now</button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id + (item.variationId || 0)} className="bg-white rounded-2xl p-3 md:p-4 flex gap-3 md:gap-4 border border-black/5 shadow-sm relative group">
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-[#F9F9F9]">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-0.5 min-w-0">
                        <h4 className="text-[11px] md:text-xs font-bold text-black/80 leading-tight line-clamp-2 uppercase">{item.name}</h4>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center justify-between bg-black/5 px-2.5 py-1.5 rounded-full w-20">
                            <button onClick={() => updateQuantity(item.id, -1, item.variationId)} className="text-black/40"><Minus size={10} /></button>
                            <span className="text-[10px] font-bold">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1, item.variationId)} className="text-black/40"><Plus size={10} /></button>
                          </div>
                          <span className="text-[11px] font-bold text-[#8B2632]">₦{item.price.toLocaleString()}</span>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.id, item.variationId)} className="text-[#FF6B35] self-start"><Trash2 size={16} /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="bg-white p-6 md:p-8 space-y-5 shadow-2xl">
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center"><span className="text-[10px] font-bold uppercase text-black/40">Subtotal</span><span className="text-sm font-bold text-black/80">₦{subtotal.toLocaleString()}</span></div>
                  <div className="flex justify-between items-center"><span className="text-[10px] font-bold uppercase text-black/40">Shipping & Fees</span><span className="text-green-600 text-sm font-bold uppercase">FREE (TEST)</span></div>
                  <div className="flex justify-between items-center pt-3 border-t border-black/5">
                    <span className="text-[10px] font-bold uppercase text-[#8B2632]">Total</span>
                    <span className="text-xl font-bold text-black">₦{total.toLocaleString()}</span>
                  </div>
                </div>
                <Link href="/checkout" onClick={() => setIsDrawerOpen(false)} className="block w-full bg-[#FF6B35] text-white py-5 rounded-full text-xs font-bold uppercase tracking-widest text-center shadow-lg">Checkout</Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
