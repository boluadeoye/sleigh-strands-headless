"use client";
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, ChevronDown, ChevronUp, ShoppingBag, Loader2, MapPin, Gift, Tag, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const NIGERIAN_STATES = [
  { code: 'AB', name: 'Abia' }, { code: 'FC', name: 'Abuja' }, { code: 'AD', name: 'Adamawa' }, { code: 'AK', name: 'Akwa Ibom' }, { code: 'AN', name: 'Anambra' }, { code: 'BA', name: 'Bauchi' }, { code: 'BY', name: 'Bayelsa' }, { code: 'BE', name: 'Benue' }, { code: 'BO', name: 'Borno' }, { code: 'CR', name: 'Cross River' }, { code: 'DE', name: 'Delta' }, { code: 'EB', name: 'Ebonyi' }, { code: 'ED', name: 'Edo' }, { code: 'EK', name: 'Ekiti' }, { code: 'EN', name: 'Enugu' }, { code: 'GO', name: 'Gombe' }, { code: 'IM', name: 'Imo' }, { code: 'JI', name: 'Jigawa' }, { code: 'KD', name: 'Kaduna' }, { code: 'KN', name: 'Kano' }, { code: 'KT', name: 'Katsina' }, { code: 'KE', name: 'Kebbi' }, { code: 'KO', name: 'Kogi' }, { code: 'KW', name: 'Kwara' }, { code: 'LA', name: 'Lagos' }, { code: 'NA', name: 'Nasarawa' }, { code: 'NI', name: 'Niger' }, { code: 'OG', name: 'Ogun' }, { code: 'ON', name: 'Ondo' }, { code: 'OS', name: 'Osun' }, { code: 'OY', name: 'Oyo' }, { code: 'PL', name: 'Plateau' }, { code: 'RI', name: 'Rivers' }, { code: 'SO', name: 'Sokoto' }, { code: 'TA', name: 'Taraba' }, { code: 'YO', name: 'Yobe' }, { code: 'ZA', name: 'Zamfara' }
];

export default function CartClient() {
  const { cart, updateQuantity, setQuantity, removeFromCart, subtotal, coupon, setCoupon, discountTotal } = useCart();
  const [isShipmentOpen, setIsShipmentOpen] = useState(true);
  const [customer, setCustomer] = useState<any>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [selectedState, setSelectedState] = useState('LA');
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

  // FINANCIAL STRIP: Force all fees to 0
  const currentShipping = 0; 
  const transactionFee = 0;
  const total = subtotal - discountTotal;

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
      <div className="bg-white rounded-2xl p-4 border border-black/5 shadow-sm overflow-hidden relative text-center">
        <p className="font-outfit text-[11px] font-bold uppercase tracking-widest text-green-600">
          TEST MODE: ALL SHIPPING AND FEES ARE CURRENTLY WAIVED
        </p>
      </div>

      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-black/5">
        <div className="hidden md:grid bg-[#8B2632] px-8 py-4 grid-cols-6 text-white text-[10px] font-bold uppercase tracking-widest items-center">
          <div className="col-span-2">Item Name</div>
          <div className="text-center">Unit Price</div>
          <div className="text-center">Quantity</div>
          <div className="text-center">Weight</div>
          <div className="text-right">Subtotal</div>
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
                <input type="number" value={item.quantity} onChange={(e) => setQuantity(item.id, parseInt(e.target.value) || 0, item.variationId)} className="w-8 text-center bg-transparent text-xs font-bold outline-none" />
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
        <div className="flex justify-between items-center border-b border-black/5 pb-6">
          <span className="text-[10px] font-bold uppercase tracking-widest text-black/60">Subtotal</span>
          <span className="text-[#8B2632] font-bold text-sm">₦{subtotal.toLocaleString()}</span>
        </div>

        <div className="flex justify-between items-center border-b border-black/5 pb-6">
          <span className="text-[10px] font-bold uppercase tracking-widest text-black/60">Shipping</span>
          <span className="text-green-600 font-bold text-sm uppercase">FREE (TEST)</span>
        </div>

        <div className="flex justify-between items-start border-b border-black/5 pb-6">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-black/60 block">VAT & Processing</span>
            <p className="text-[8px] text-black/40 italic leading-tight">Waived for testing.</p>
          </div>
          <span className="text-[#8B2632] font-bold text-sm">₦0</span>
        </div>

        <div className="flex justify-between items-center pt-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-black/60">Total</span>
          <span className="text-[#8B2632] font-bold text-lg">₦{total.toLocaleString()}</span>
        </div>

        <Link href="/checkout" className="block w-full bg-[#FF6B35] text-white py-5 rounded-full text-xs font-bold uppercase tracking-widest text-center hover:opacity-90 transition-all shadow-lg">
          Proceed to checkout
        </Link>
      </div>
    </div>
  );
}
