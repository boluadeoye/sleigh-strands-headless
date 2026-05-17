"use client";
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, ChevronDown, ChevronUp, ShoppingBag, Loader2, MapPin, Gift, Tag, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const NIGERIAN_STATES = [
  { code: 'AB', name: 'Abia' }, { code: 'FC', name: 'Abuja' }, { code: 'AD', name: 'Adamawa' }, { code: 'AK', name: 'Akwa Ibom' }, { code: 'AN', name: 'Anambra' }, { code: 'BA', name: 'Bauchi' }, { code: 'BY', name: 'Bayelsa' }, { code: 'BE', name: 'Benue' }, { code: 'BO', name: 'Borno' }, { code: 'CR', name: 'Cross River' }, { code: 'DE', name: 'Delta' }, { code: 'EB', name: 'Ebonyi' }, { code: 'ED', name: 'Edo' }, { code: 'EK', name: 'Ekiti' }, { code: 'EN', name: 'Enugu' }, { code: 'GO', name: 'Gombe' }, { code: 'IM', name: 'Imo' }, { code: 'JI', name: 'Jigawa' }, { code: 'KD', name: 'Kaduna' }, { code: 'KN', name: 'Kano' }, { code: 'KT', name: 'Katsina' }, { code: 'KE', name: 'Kebbi' }, { code: 'KO', name: 'Kogi' }, { code: 'KW', name: 'Kwara' }, { code: 'LA', name: 'Lagos' }, { code: 'NA', name: 'Nasarawa' }, { code: 'NI', name: 'Niger' }, { code: 'OG', name: 'Ogun' }, { code: 'ON', name: 'Ondo' }, { code: 'OS', name: 'Osun' }, { code: 'OY', name: 'Oyo' }, { code: 'PL', name: 'Plateau' }, { code: 'RI', name: 'Rivers' }, { code: 'SO', name: 'Sokoto' }, { code: 'TA', name: 'Taraba' }, { code: 'YO', name: 'Yobe' }, { code: 'ZA', name: 'Zamfara' }
];

const FREE_SHIPPING_THRESHOLD = 200000;

export default function CartClient() {
  const { cart, updateQuantity, setQuantity, removeFromCart, subtotal, coupon, setCoupon, discountTotal } = useCart();
  const [isShipmentOpen, setIsShipmentOpen] = useState(true);
  const [customer, setCustomer] = useState<any>(null);
  const [profileLoading, setProfileLoading] = useState(true);

  const [selectedState, setSelectedState] = useState('LA');
  const [shippingCost, setShippingCost] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);

  const [couponInput, setCouponInput] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const stored = localStorage.getItem('sleigh_user');
        if (stored) {
          const user = JSON.parse(stored);
          if (user.id) {
            const res = await fetch(`/api/user?id=${user.id}`);
            const data = await res.json();
            if (data.customer) {
              setCustomer(data.customer);
              const profileState = data.customer.shipping?.state || data.customer.billing?.state;
              if (profileState) setSelectedState(profileState);
            }
          }
        }
      } catch (err) {
        console.error("Failed to fetch address", err);
      } finally {
        setProfileLoading(false);
      }
    };
    fetchUser();
  }, []);

  // FIX: Auto-Sync Shipping whenever selectedState changes
  useEffect(() => {
    if (profileLoading || cart.length === 0) return;
    
    const fetchShipping = async () => {
      setIsCalculating(true);
      try {
        const res = await fetch('/api/shipping', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ state: selectedState }),
        });
        const data = await res.json();
        if (res.ok) {
          setShippingCost(data.cost);
          localStorage.setItem('sleigh_shipping_state', selectedState);
        }
      } catch (err) {
        console.error("Shipping update failed");
      } finally {
        setIsCalculating(false);
      }
    };
    
    fetchShipping();
  }, [selectedState, profileLoading, cart.length]);

  const handleApplyCoupon = async () => {
    if (!couponInput || couponLoading) return;
    setCouponLoading(true);
    setCouponError("");
    try {
      const res = await fetch('/api/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponInput }),
      });
      const data = await res.json();
      if (res.ok) {
        setCoupon(data);
        setCouponInput("");
      } else {
        setCouponError(data.error);
      }
    } catch (err) {
      setCouponError("Error verifying code");
    } finally {
      setCouponLoading(false);
    }
  };

  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const amountToFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;
  const progressPercent = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

  const currentShipping = isFreeShipping ? 0 : shippingCost;
  const transactionFee = cart.length > 0 ? 800 : 0;
  const total = subtotal - discountTotal + currentShipping + transactionFee;

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-32 text-center space-y-8">
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-[#8B2632]/5 rounded-full flex items-center justify-center text-[#8B2632]/20">
            <ShoppingBag size={48} />
          </div>
        </div>
        <h2 className="text-3xl font-sans text-[#8B2632]">Your cart is empty</h2>
        <Link href="/shop" className="inline-block bg-[#FF6B35] text-white px-12 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-8">
      
      <div className="bg-white rounded-2xl p-4 border border-black/5 shadow-sm overflow-hidden relative">
        <div className="flex items-center gap-3 mb-3">
          <div className={`p-2 rounded-full ${isFreeShipping ? 'bg-green-100 text-green-600' : 'bg-[#FDF8F0] text-[#8B2632]'}`}>
            <Gift size={16} />
          </div>
          <p className="font-outfit text-[11px] font-bold uppercase tracking-widest text-black/80">
            {isFreeShipping 
              ? "Your order qualifies for free shipping!" 
              : `Add ₦${amountToFreeShipping.toLocaleString()} to cart and get free shipping!`}
          </p>
        </div>
        <div className="h-1.5 w-full bg-black/5 rounded-full overflow-hidden">
          <div className="h-full bg-[#8B2632] transition-all duration-1000 ease-out" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-black/5">
        <div className="hidden md:grid bg-[#8B2632] px-8 py-4 grid-cols-6 text-white text-[10px] font-bold uppercase tracking-widest items-center">
          <div className="col-span-2">Item Name</div>
          <div className="text-center">Unit Price</div>
          <div className="text-center">Quantity</div>
          <div className="text-center">Weight</div>
          <div className="text-right">Subtotal</div>
        </div>

        <div className="md:hidden bg-[#8B2632] px-6 py-4 text-white text-[10px] font-bold uppercase tracking-widest">
          Your Selection ({cart.length})
        </div>

        {cart.map((item) => (
          <div key={item.id + (item.variationId || 0)} className="px-6 md:px-8 py-6 grid grid-cols-1 md:grid-cols-6 items-center border-b border-black/5 gap-4 md:gap-0">
            <div className="col-span-2 flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border border-black/5 shrink-0">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              <span className="text-xs font-bold text-black/70 leading-tight">{item.name}</span>
            </div>
            <div className="flex justify-between md:justify-center items-center">
              <span className="md:hidden text-[10px] font-bold uppercase text-black/20">Price</span>
              <span className="text-[#8B2632] font-bold text-sm">₦{item.price.toLocaleString()}</span>
            </div>
            <div className="flex justify-between md:justify-center items-center">
              <span className="md:hidden text-[10px] font-bold uppercase text-black/20">Qty</span>
              <div className="flex items-center justify-between bg-black/5 px-3 py-2 rounded-full w-24">
                <button onClick={() => updateQuantity(item.id, -1, item.variationId)} className="text-black/40 hover:text-[#8B2632]"><Minus size={12} /></button>
                <input type="number" value={item.quantity} onChange={(e) => setQuantity(item.id, parseInt(e.target.value) || 0, item.variationId)} onBlur={(e) => { if (!e.target.value || parseInt(e.target.value) < 1) setQuantity(item.id, 1, item.variationId); }} className="w-8 text-center bg-transparent text-xs font-bold outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                <button onClick={() => updateQuantity(item.id, 1, item.variationId)} className="text-black/40 hover:text-[#8B2632]"><Plus size={12} /></button>
              </div>
            </div>
            <div className="hidden md:block text-center text-black/40 text-xs font-medium">0.3 kg</div>
            <div className="flex justify-between md:justify-end items-center gap-4">
              <span className="md:hidden text-[10px] font-bold uppercase text-black/20">Total</span>
              <div className="flex items-center gap-4">
                <span className="text-[#8B2632] font-bold text-sm">₦{(item.price * item.quantity).toLocaleString()}</span>
                <button onClick={() => removeFromCart(item.id, item.variationId)} className="p-2 bg-black/5 rounded-full text-[#FF6B35] hover:bg-red-50 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-black/5 space-y-6">
        
        <div className="border-b border-black/5 pb-6">
          <span className="text-[10px] font-bold uppercase tracking-widest text-black/60 block mb-4">Promo Code</span>
          {!coupon ? (
            <div className="flex gap-2 max-w-md">
              <input placeholder="Enter code" value={couponInput} onChange={(e) => setCouponInput(e.target.value)} className="flex-1 bg-[#FDF8F0] border-none rounded-xl px-4 py-3 text-xs font-montserrat outline-none" />
              <button onClick={handleApplyCoupon} disabled={couponLoading || !couponInput} className="bg-[#8B2632] text-white px-8 rounded-xl text-[9px] font-bold uppercase tracking-widest disabled:opacity-50">
                {couponLoading ? "..." : "Apply"}
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between bg-[#8B2632] text-white px-4 py-3 rounded-xl max-w-md">
              <div className="flex items-center gap-2"><Tag size={12} className="text-[#D2A546]" /><span className="text-[10px] font-bold tracking-widest uppercase">{coupon.code} Applied</span></div>
              <button onClick={() => setCoupon(null)} className="hover:text-[#D2A546]"><X size={14} /></button>
            </div>
          )}
          {couponError && <p className="text-[9px] text-red-500 font-bold mt-2 uppercase">{couponError}</p>}
        </div>

        <div className="flex justify-between items-center border-b border-black/5 pb-6">
          <span className="text-[10px] font-bold uppercase tracking-widest text-black/60">Subtotal</span>
          <span className="text-[#8B2632] font-bold text-sm">₦{subtotal.toLocaleString()}</span>
        </div>

        {discountTotal > 0 && (
          <div className="flex justify-between items-center border-b border-black/5 pb-6 text-[#8B2632]">
            <span className="text-[10px] font-bold uppercase tracking-widest">Discount</span>
            <span className="font-bold text-sm">-₦{discountTotal.toLocaleString()}</span>
          </div>
        )}

        <div className="border-b border-black/5 pb-6">
          <button onClick={() => setIsShipmentOpen(!isShipmentOpen)} className="w-full flex justify-between items-center mb-4">
            <div className="text-left">
              <span className="text-[10px] font-bold uppercase tracking-widest text-black/60 block">Shipment</span>
              <span className="text-[9px] text-[#8B2632] font-medium italic">Estimate your delivery cost</span>
            </div>
            {isShipmentOpen ? <ChevronUp size={18} className="text-black/20" /> : <ChevronDown size={18} className="text-black/20" />}
          </button>

          {isShipmentOpen && (
            <div className="py-4 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                <div className="space-y-2">
                  <label className="text-[8px] uppercase font-bold text-black/30 ml-1">Select Region</label>
                  <select 
                    value={selectedState} 
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full bg-[#FDF8F0] border border-black/5 rounded-xl px-4 py-3 text-xs font-medium outline-none focus:border-[#8B2632] appearance-none"
                  >
                    {NIGERIAN_STATES.map(s => <option key={s.code} value={s.code}>{s.name}</option>)}
                  </select>
                </div>
                {/* FIX: Button is now a visual indicator since calculation is automatic */}
                <button 
                  type="button"
                  disabled={isCalculating}
                  className="bg-[#8B2632] text-white h-[42px] rounded-xl text-[9px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 opacity-50 cursor-default"
                >
                  {isCalculating ? <Loader2 className="animate-spin" size={14} /> : 'Auto-Synced'}
                </button>
              </div>

              {profileLoading ? (
                <p className="text-[10px] text-black/40 italic">Checking saved profile...</p>
              ) : customer?.shipping?.address_1 && (
                <div className="bg-black/[0.02] p-4 rounded-2xl border border-black/[0.03]">
                   <p className="text-[8px] uppercase font-bold text-black/30 mb-2 flex items-center gap-1"><MapPin size={10}/> Saved Address</p>
                   <p className="text-[10px] text-black/60">{customer.shipping.address_1}, {customer.shipping.city}</p>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-between items-end mt-6">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-black/80 uppercase tracking-tight">
                Shipping to {NIGERIAN_STATES.find(s => s.code === selectedState)?.name}
              </p>
              <Link href="/account" className="text-[9px] text-[#8B2632] underline font-medium inline-block">Change default address</Link>
            </div>
            <span className={`font-bold text-sm ${isFreeShipping ? 'text-green-600' : 'text-[#8B2632]'}`}>
              {isCalculating ? "..." : isFreeShipping ? "FREE" : `₦${shippingCost.toLocaleString()}`}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-start border-b border-black/5 pb-6">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-black/60 block">VAT & Processing</span>
            <p className="text-[8px] text-black/40 italic leading-tight">Includes value-added tax and secure payment handling.</p>
          </div>
          <span className="text-[#8B2632] font-bold text-sm">₦{transactionFee.toLocaleString()}</span>
        </div>

        <div className="flex justify-between items-center pt-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-black/60">Total</span>
          <span className="text-[#8B2632] font-bold text-lg">
            {isCalculating ? "..." : `₦${total.toLocaleString()}`}
          </span>
        </div>

        <Link href="/checkout" className="block w-full bg-[#FF6B35] text-white py-5 rounded-full text-xs font-bold uppercase tracking-widest text-center hover:opacity-90 transition-all shadow-lg shadow-[#FF6B35]/20">
          Proceed to checkout
        </Link>
      </div>
    </div>
  );
}
