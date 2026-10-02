"use client";
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Minus, Plus, Loader2, Gift } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const TRANSACTION_FEE = 800;

export default function CartDrawer() {
  const {
    cart,
    isDrawerOpen,
    setIsDrawerOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    giftPackagingTotal,
    coupon,
    setCoupon,
    discountTotal
  } = useCart();

  const [isCouponOpen, setIsCouponOpen] = useState(false);
  const [couponInput, setCouponInput] = useState('');
  const [couponStatus, setCouponStatus] = useState<{loading: boolean, error: string}>({ loading: false, error: '' });
  const router = useRouter();

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return;
    setCouponStatus({ loading: true, error: '' });
    try {
      const res = await fetch('/api/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponInput }),
      });
      const data = await res.json();
      if (res.ok) {
        setCoupon(data);
        setCouponInput('');
        setIsCouponOpen(false);
      } else {
        setCouponStatus({ loading: false, error: data.error });
      }
    } catch (err) {
      setCouponStatus({ loading: false, error: 'Failed to apply coupon' });
    } finally {
      setCouponStatus(prev => ({ ...prev, loading: false }));
    }
  };

  const handleShopMore = () => {
    setIsDrawerOpen(false);
    router.push('/shop');
  };

  const total = subtotal - discountTotal + giftPackagingTotal + (cart.length > 0 ? TRANSACTION_FEE : 0);

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsDrawerOpen(false)} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200]" />
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed top-0 right-0 bottom-0 w-full max-w-[450px] bg-[#F5E6E8] z-[250] shadow-2xl flex flex-col">
            <div className="p-6 md:p-8 flex items-center justify-between border-b border-black/5">
              <div className="flex items-center gap-3 text-[#8B2632]">
                <Image
                  src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1778244116/blog_assets/ryvzrz6uupwqxgjycer2.png"
                  alt="Cart"
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <span className="font-sans font-bold text-lg uppercase tracking-tight">Cart</span>
              </div>
              <button onClick={() => setIsDrawerOpen(false)} className="text-black/40 hover:text-black transition-colors cursor-pointer"><X size={28} strokeWidth={1.5} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-40 h-40 bg-[#8B2632]/5 rounded-full flex items-center justify-center mb-2">
                    <Image
                      src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1778244116/blog_assets/ryvzrz6uupwqxgjycer2.png"
                      alt="Empty Cart"
                      width={100}
                      height={100}
                      className="opacity-40"
                    />
                  </div>
                  <p className="text-black/60 font-medium text-sm uppercase tracking-widest">Your cart is empty</p>
                  <button onClick={handleShopMore} className="bg-[#FF6B35] text-white px-12 py-4 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg hover:scale-105 transition-transform cursor-pointer">Shop Now</button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/30 ml-1">{cart.length} ITEM{cart.length > 1 ? 'S' : ''} SELECTED</p>
                  {cart.map((item) => {
                    const hasGiftFee = item.giftPackaging && item.giftPackaging.price > 0;
                    return (
                      <div key={`${item.id}-${item.variationId || 0}-${item.giftPackaging?.id || 'std'}-${item.giftPackaging?.message || ''}`} className="bg-white rounded-2xl p-3 md:p-4 flex gap-3 md:gap-4 border border-black/5 shadow-sm relative group">
                        <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden shrink-0 bg-[#F9F9F9]">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 flex flex-col justify-between py-0.5 min-w-0">
                          <div>
                            <h4 className="text-[11px] md:text-xs font-bold text-black/80 leading-tight line-clamp-2 uppercase tracking-tight">{item.name}</h4>
                            
                            {hasGiftFee && (
                              <div className="mt-1.5 p-2 bg-[#F5E6E8]/40 border border-[#8B2632]/10 rounded-xl space-y-0.5">
                                <div className="flex items-center gap-1 text-[9px] font-bold uppercase text-[#8B2632]">
                                  <Gift size={11} /> {item.giftPackaging?.name} (+₦{(item.giftPackaging?.price || 0).toLocaleString()})
                                </div>
                                {item.giftPackaging?.message && (
                                  <p className="text-[9px] text-black/60 italic truncate">
                                    &ldquo;{item.giftPackaging.message}&rdquo;
                                  </p>
                                )}
                              </div>
                            )}
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center justify-between bg-black/5 px-2.5 py-1.5 rounded-full w-20">
                              <button onClick={() => updateQuantity(item.id, -1, item.variationId, item.giftPackaging?.id, item.giftPackaging?.message)} className="text-black/40 hover:text-[#8B2632] cursor-pointer"><Minus size={10} /></button>
                              <span className="text-[10px] font-bold">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, 1, item.variationId, item.giftPackaging?.id, item.giftPackaging?.message)} className="text-black/40 hover:text-[#8B2632] cursor-pointer"><Plus size={10} /></button>
                            </div>
                            <span className="text-[11px] font-bold text-[#8B2632]">₦{((item.price + (hasGiftFee ? (item.giftPackaging?.price || 0) : 0)) * item.quantity).toLocaleString()}</span>
                          </div>
                        </div>
                        <button onClick={() => removeFromCart(item.id, item.variationId, item.giftPackaging?.id, item.giftPackaging?.message)} className="flex items-center justify-center p-1 text-[#FF6B35] hover:text-red-600 transition-colors self-start cursor-pointer"><Trash2 size={16} /></button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="bg-white p-6 md:p-8 space-y-5 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center"><span className="text-[10px] font-bold uppercase tracking-widest text-black/40">Subtotal</span><span className="text-sm font-bold text-black/80">₦{subtotal.toLocaleString()}</span></div>
                  
                  {giftPackagingTotal > 0 && (
                    <div className="flex justify-between items-center text-[#8B2632]">
                      <span className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5"><Gift size={12} /> Gift Packaging</span>
                      <span className="text-sm font-bold">₦{giftPackagingTotal.toLocaleString()}</span>
                    </div>
                  )}

                  {coupon && (
                    <div className="flex justify-between items-center text-green-600">
                      <span className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">Discount <button onClick={() => setCoupon(null)} className="text-red-400 cursor-pointer"><X size={12}/></button></span>
                      <span className="text-sm font-bold">-₦{discountTotal.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center"><span className="text-[10px] font-bold uppercase tracking-widest text-black/40">VAT & Processing</span><span className="text-sm font-bold text-black/80">₦{TRANSACTION_FEE.toLocaleString()}</span></div>
                  <div className="flex justify-between items-center pt-3 border-t border-black/5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#8B2632]">Total</span>
                    <span className="text-xl font-bold text-black">₦{total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Link href="/cart" onClick={() => setIsDrawerOpen(false)} className="flex items-center justify-center border border-[#8B2632] text-[#8B2632] py-4 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#8B2632] hover:text-white transition-all">View Cart</Link>
                  <button onClick={handleShopMore} className="bg-[#8B2632] text-white py-4 rounded-full text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-all cursor-pointer">Shop More</button>
                </div>
                <Link href="/checkout" onClick={() => setIsDrawerOpen(false)} className="block w-full bg-[#FF6B35] text-white py-5 rounded-full text-xs font-bold uppercase tracking-widest text-center shadow-lg shadow-[#FF6B35]/20 hover:scale-[1.02] transition-transform">Checkout</Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
