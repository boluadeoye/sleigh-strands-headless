"use client";
import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { Loader2, Lock, CheckCircle, Tag, X, Minus, Plus, Trash2, Gift } from 'lucide-react';
import Image from 'next/image';

const NIGERIAN_STATES = [
  { code: 'AB', name: 'Abia' }, { code: 'FC', name: 'Abuja' }, { code: 'AD', name: 'Adamawa' }, { code: 'AK', name: 'Akwa Ibom' }, { code: 'AN', name: 'Anambra' }, { code: 'BA', name: 'Bauchi' }, { code: 'BY', name: 'Bayelsa' }, { code: 'BE', name: 'Benue' }, { code: 'BO', name: 'Borno' }, { code: 'CR', name: 'Cross River' }, { code: 'DE', name: 'Delta' }, { code: 'EB', name: 'Ebonyi' }, { code: 'ED', name: 'Edo' }, { code: 'EK', name: 'Ekiti' }, { code: 'EN', name: 'Enugu' }, { code: 'GO', name: 'Gombe' }, { code: 'IM', name: 'Imo' }, { code: 'JI', name: 'Jigawa' }, { code: 'KD', name: 'Kaduna' }, { code: 'KN', name: 'Kano' }, { code: 'KT', name: 'Katsina' }, { code: 'KE', name: 'Kebbi' }, { code: 'KO', name: 'Kogi' }, { code: 'KW', name: 'Kwara' }, { code: 'LA', name: 'Lagos' }, { code: 'NA', name: 'Nasarawa' }, { code: 'NI', name: 'Niger' }, { code: 'OG', name: 'Ogun' }, { code: 'ON', name: 'Ondo' }, { code: 'OS', name: 'Osun' }, { code: 'OY', name: 'Oyo' }, { code: 'PL', name: 'Plateau' }, { code: 'RI', name: 'Rivers' }, { code: 'SO', name: 'Sokoto' }, { code: 'TA', name: 'Taraba' }, { code: 'YO', name: 'Yobe' }, { code: 'ZA', name: 'Zamfara' }
];

const FREE_SHIPPING_THRESHOLD = 200000;
const TRANSACTION_FEE = 800;

export default function CheckoutClient() {
  const { cart, subtotal, updateQuantity, setQuantity, removeFromCart, coupon, setCoupon, discountTotal, clearCart } = useCart();
  const router = useRouter();
  
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);
  const [shippingLoading, setShippingLoading] = useState(false);
  const [userSession, setUserSession] = useState<any>(null);
  
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '', state: 'LA' });
  const [shippingData, setShippingData] = useState({ cost: 0, method_id: '', method_title: 'Calculating...' });
  const [couponInput, setCouponInput] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState("");

  useEffect(() => {
    setIsMounted(true);
    const savedState = localStorage.getItem('sleigh_shipping_state');
    if (savedState) setForm(prev => ({ ...prev, state: savedState }));
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const savedUser = localStorage.getItem('sleigh_user');
    const sessionState = localStorage.getItem('sleigh_shipping_state');
    
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUserSession(user);
      fetch('/api/user/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id })
      })
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          const fullName = [data.first_name, data.last_name].filter(Boolean).join(' ');
          setForm(prev => ({
            ...prev,
            name: fullName || user.name || prev.name,
            email: data.email || user.email || prev.email,
            phone: data.phone || prev.phone,
            address: data.address || prev.address,
            city: data.city || prev.city,
            state: sessionState || data.state || 'LA'
          }));
        }
      })
      .finally(() => setProfileLoading(false));
    } else {
      setProfileLoading(false);
    }
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted || profileLoading) return;
    const fetchShipping = async () => {
      setShippingLoading(true);
      try {
        const res = await fetch('/api/shipping', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ state: form.state }),
        });
        const data = await res.json();
        if (res.ok) setShippingData(data);
      } catch (err) {
        setShippingData({ cost: 0, method_id: '', method_title: 'Error' });
      } finally {
        setShippingLoading(false);
      }
    };
    fetchShipping();
  }, [form.state, profileLoading, isMounted]);

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
  const currentShipping = isFreeShipping ? 0 : shippingData.cost;
  const amountToFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;
  const progressPercent = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const total = subtotal - discountTotal + currentShipping + TRANSACTION_FEE;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!isFreeShipping && shippingData.cost === 0) || loading || cart.length === 0) return;
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: form,
          items: cart,
          shipping: { ...shippingData, cost: currentShipping },
          coupon: coupon ? { code: coupon.code, amount: discountTotal } : null,
          customerId: userSession?.id,
          transactionFee: TRANSACTION_FEE
        }),
      });
      if (res.ok) {
        localStorage.removeItem('sleigh_shipping_state');
        clearCart();
        router.push('/success');
      }
    } catch (err) {
      alert("Order failed.");
    } finally {
      setLoading(false);
    }
  };

  if (!isMounted || profileLoading) {
    return (
      <div className="max-w-6xl mx-auto px-5 md:px-6 min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-[#3D1218]" size={40} />
        <p className="font-outfit text-[10px] font-bold uppercase tracking-[0.3em] text-[#3D1218]">Initializing Secure Checkout...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-10 md:gap-20">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-2xl md:text-3xl font-sans font-bold text-[#3D1218] italic tracking-tight">Shipping Details</h2>
          <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1.5 rounded-full border border-green-100 w-fit">
            <CheckCircle size={12} />
            <span className="text-[9px] font-bold uppercase tracking-widest">Verified Account</span>
          </div>
        </div>
        <form id="checkout-form" onSubmit={handleCheckout} className="space-y-5">
          <div className="space-y-1">
            <label className="text-[9px] font-bold uppercase tracking-widest text-black/30 ml-1">Full Name</label>
            <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full border border-black/10 rounded-2xl px-5 py-4 text-sm outline-none focus:border-[#3D1218] bg-white" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1">
              <label className="text-[9px] font-bold uppercase tracking-widest text-black/30 ml-1">Email</label>
              <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full border border-black/10 rounded-2xl px-5 py-4 text-sm outline-none focus:border-[#3D1218] bg-white" />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-bold uppercase tracking-widest text-black/30 ml-1">Phone</label>
              <input required type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full border border-black/10 rounded-2xl px-5 py-4 text-sm outline-none focus:border-[#3D1218] bg-white" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[9px] font-bold uppercase tracking-widest text-black/30 ml-1">Address</label>
            <input required value={form.address} onChange={e => setForm({...form, address: e.target.value})} className="w-full border border-black/10 rounded-2xl px-5 py-4 text-sm outline-none focus:border-[#3D1218] bg-white" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1">
              <label className="text-[9px] font-bold uppercase tracking-widest text-black/30 ml-1">City</label>
              <input required value={form.city} onChange={e => setForm({...form, city: e.target.value})} className="w-full border border-black/10 rounded-2xl px-5 py-4 text-sm outline-none focus:border-[#3D1218] bg-white" />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-bold uppercase tracking-widest text-black/30 ml-1">State</label>
              <select required value={form.state} onChange={e => setForm({...form, state: e.target.value})} className="w-full border border-black/10 rounded-2xl px-5 py-4 text-sm bg-white outline-none focus:border-[#3D1218]">
                {NIGERIAN_STATES.map(s => <option key={s.code} value={s.code}>{s.name}</option>)}
              </select>
            </div>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] p-5 md:p-12 shadow-2xl border border-black/[0.03] h-fit space-y-8 w-full overflow-hidden">
        <h3 className="text-xl font-sans font-bold text-black tracking-tight">Order Summary</h3>
        
        <div className="space-y-5 max-h-[240px] overflow-y-auto pr-2 custom-scrollbar">
          {cart.map((item) => (
            <div key={`${item.id}-${item.variationId || 0}`} className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-black/5 shrink-0">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                {/* FIX: Removed truncate and added leading-tight to show variation names clearly */}
                <p className="text-[10px] font-bold text-black/80 uppercase leading-tight">{item.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center bg-black/5 rounded-full px-2 py-0.5">
                    <button onClick={() => updateQuantity(item.id, -1, item.variationId)} className="text-black/30 hover:text-[#8B2632]"><Minus size={8} /></button>
                    <input 
                      type="number" 
                      value={item.quantity} 
                      onChange={(e) => setQuantity(item.id, parseInt(e.target.value) || 0, item.variationId)}
                      onBlur={(e) => { if (!e.target.value || parseInt(e.target.value) < 1) setQuantity(item.id, 1, item.variationId); }}
                      className="w-8 text-center bg-transparent text-[9px] font-bold outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                    />
                    <button onClick={() => updateQuantity(item.id, 1, item.variationId)} className="text-black/30 hover:text-[#8B2632]"><Plus size={8} /></button>
                  </div>
                  <button onClick={() => removeFromCart(item.id, item.variationId)} className="text-[#FF6B35] opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={10} /></button>
                </div>
              </div>
              <span className="text-[10px] font-bold text-[#3D1218] shrink-0">₦{(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          {!coupon ? (
            <div className="flex gap-2">
              <input placeholder="Promo Code" value={couponInput} onChange={(e) => setCouponInput(e.target.value)} className="flex-1 bg-[#FDF8F0] border-none rounded-xl px-4 py-3 text-[10px] font-montserrat outline-none" />
              <button onClick={handleApplyCoupon} disabled={couponLoading || !couponInput} className="bg-[#3D1218] text-white px-5 rounded-xl text-[9px] font-bold uppercase tracking-widest disabled:opacity-50">
                {couponLoading ? "..." : "Apply"}
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between bg-[#3D1218] text-white px-4 py-2.5 rounded-xl">
              <div className="flex items-center gap-2"><Tag size={10} className="text-[#D2A546]" /><span className="text-[9px] font-bold tracking-widest uppercase">{coupon.code} Applied</span></div>
              <button onClick={() => setCoupon(null)} className="hover:text-[#D2A546]"><X size={12} /></button>
            </div>
          )}
          {couponError && <p className="text-[9px] text-red-500 font-bold ml-1 uppercase">{couponError}</p>}
        </div>

        <div className="space-y-4 border-t border-black/5 pt-6">
          <div className="flex justify-between text-[10px] uppercase font-bold text-black/40"><span>Subtotal</span><span className="text-black/80">₦{subtotal.toLocaleString()}</span></div>
          {discountTotal > 0 && <div className="flex justify-between text-[10px] uppercase font-bold text-[#8B2632]"><span>Discount</span><span>-₦{discountTotal.toLocaleString()}</span></div>}
          <div className="flex justify-between text-[10px] uppercase font-bold text-black/40"><span>Shipping ({form.state})</span><span className={`font-bold ${isFreeShipping ? 'text-green-600' : 'text-black/80'}`}>
            {shippingLoading ? "..." : isFreeShipping ? "FREE" : `₦${currentShipping.toLocaleString()}`}
          </span></div>
          <div className="flex justify-between items-start">
            <div className="space-y-0.5"><span className="text-[9px] font-bold uppercase text-black/40 block">VAT & Processing</span><p className="text-[7px] text-black/30 italic leading-tight max-w-[140px]">Includes tax and secure handling.</p></div>
            <span className="font-bold text-xs text-black/80">₦{TRANSACTION_FEE.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center pt-6 border-t border-black/10">
            <span className="text-lg font-sans italic text-[#3D1218] font-medium">Total</span>
            <span className="text-2xl md:text-3xl font-sans font-bold text-[#3D1218] tracking-tight">₦{total.toLocaleString()}</span>
          </div>
        </div>

        <div className="bg-[#FDF8F0] rounded-xl p-4 border border-[#8B2632]/5">
          <div className="flex items-center gap-3 mb-2">
            <Gift size={14} className={isFreeShipping ? 'text-green-600' : 'text-[#8B2632]'} />
            <p className="text-[9px] font-bold uppercase tracking-widest text-black/60">
              {isFreeShipping ? "Your order qualifies for free shipping!" : `Add ₦${amountToFreeShipping.toLocaleString()} for free shipping`}
            </p>
          </div>
          <div className="h-1 w-full bg-black/5 rounded-full overflow-hidden"><div className="h-full bg-[#8B2632] transition-all duration-700" style={{ width: `${progressPercent}%` }} /></div>
        </div>

        <button type="submit" form="checkout-form" disabled={loading || shippingLoading || cart.length === 0 || (!isFreeShipping && currentShipping === 0)} className="w-full bg-[#FF6B35] text-white py-5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-xl transition-all active:scale-95 disabled:opacity-50">
          {loading ? <Loader2 className="animate-spin" size={16} /> : <><Lock size={14}/> Complete Order</>}
        </button>
      </div>
    </div>
  );
}
