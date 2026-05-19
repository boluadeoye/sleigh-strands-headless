"use client";
import { useState, useEffect } from 'react';
import { LayoutDashboard, ShoppingBag, Heart, MapPin, CreditCard, Settings, Eye, EyeOff, Loader2, X, Package, Trash2, Edit2, CheckCircle, Sliders, Calendar, CheckCircle2, ArrowUp, ArrowDown, FilterX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '@/components/shop/ProductCard';

const NIGERIAN_STATES =[
  { code: 'AB', name: 'Abia' }, { code: 'FC', name: 'Abuja' }, { code: 'AD', name: 'Adamawa' }, { code: 'AK', name: 'Akwa Ibom' }, { code: 'AN', name: 'Anambra' }, { code: 'BA', name: 'Bauchi' }, { code: 'BY', name: 'Bayelsa' }, { code: 'BE', name: 'Benue' }, { code: 'BO', name: 'Borno' }, { code: 'CR', name: 'Cross River' }, { code: 'DE', name: 'Delta' }, { code: 'EB', name: 'Ebonyi' }, { code: 'ED', name: 'Edo' }, { code: 'EK', name: 'Ekiti' }, { code: 'EN', name: 'Enugu' }, { code: 'GO', name: 'Gombe' }, { code: 'IM', name: 'Imo' }, { code: 'JI', name: 'Jigawa' }, { code: 'KD', name: 'Kaduna' }, { code: 'KN', name: 'Kano' }, { code: 'KT', name: 'Katsina' }, { code: 'KE', name: 'Kebbi' }, { code: 'KO', name: 'Kogi' }, { code: 'KW', name: 'Kwara' }, { code: 'LA', name: 'Lagos' }, { code: 'NA', name: 'Nasarawa' }, { code: 'NI', name: 'Niger' }, { code: 'OG', name: 'Ogun' }, { code: 'ON', name: 'Ondo' }, { code: 'OS', name: 'Osun' }, { code: 'OY', name: 'Oyo' }, { code: 'PL', name: 'Plateau' }, { code: 'RI', name: 'Rivers' }, { code: 'SO', name: 'Sokoto' }, { code: 'TA', name: 'Taraba' }, { code: 'YO', name: 'Yobe' }, { code: 'ZA', name: 'Zamfara' }
];

interface DashboardProps {
  user: { email: string; name?: string; id: string | number };
  onLogout: () => void;
}

export default function Dashboard({ user, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [orders, setOrders] = useState<any[]>([]);
  const [wishlistProducts, setWishlistProducts] = useState<any[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  const [customer, setCustomer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeletingToken, setIsDeletingToken] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [orderFilter, setOrderFilter] = useState('All');
  const [filterDate, setFilterDate] = useState(''); // NEW: Date filter state
  const [updateStatus, setUpdateStatus] = useState<{type: 'success' | 'error', msg: string} | null>(null);
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [showPassword, setShowPassword] = useState(false);

  const [profile, setProfile] = useState({ firstName: '', lastName: '', email: user.email, username: '' });
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [addressForm, setAddressForm] = useState({
    firstName: '', lastName: '', phone: '', address1: '', city: '', state: 'LA'
  });

  const fetchUserData = async () => {
    try {
      const res = await fetch(`/api/user?id=${user.id}`);
      const result = await res.json();
      if (result.error) throw new Error(result.error);

      const { orders: ordersData, customer: customerData, wishlistProducts: wishlistData, paymentTokens } = result;

      if (Array.isArray(ordersData)) {
        const sorted = [...ordersData].sort((a, b) => new Date(b.date_created).getTime() - new Date(a.date_created).getTime());
        setOrders(sorted);
      }
      if (Array.isArray(wishlistData)) {
        setWishlistProducts(wishlistData);
      }
      if (Array.isArray(paymentTokens)) {
        setPaymentMethods(paymentTokens);
      }
      if (customerData && customerData.id) {
        setCustomer(customerData);
        setProfile({
          firstName: customerData.first_name || '',
          lastName: customerData.last_name || '',
          email: customerData.email || user.email,
          username: customerData.username || ''
        });
        setAddressForm({
          firstName: customerData.shipping?.first_name || customerData.first_name || '',
          lastName: customerData.shipping?.last_name || customerData.last_name || '',
          phone: customerData.shipping?.phone || customerData.billing?.phone || '',
          address1: customerData.shipping?.address_1 || '',
          city: customerData.shipping?.city || '',
          state: customerData.shipping?.state || 'LA'
        });
      }
    } catch (err) {
      console.error("Sync Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user.id]);

  const handleSort = () => {
    const newOrder = sortOrder === 'desc' ? 'asc' : 'desc';
    const sorted = [...orders].sort((a, b) => {
      const dateA = new Date(a.date_created).getTime();
      const dateB = new Date(b.date_created).getTime();
      return newOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });
    setOrders(sorted);
    setSortOrder(newOrder);
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user.id) return;
    if (passwords.new && passwords.new !== passwords.confirm) {
      setUpdateStatus({ type: 'error', msg: 'New passwords do not match.' });
      return;
    }
    setIsUpdating(true);
    setUpdateStatus(null);
    try {
      const payload: any = { id: user.id, firstName: profile.firstName, lastName: profile.lastName, email: profile.email };
      if (passwords.new) payload.password = passwords.new;
      const res = await fetch('/api/account/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok) {
        const updatedName = `${profile.firstName} ${profile.lastName}`.trim();
        localStorage.setItem('sleigh_user', JSON.stringify({ ...user, name: updatedName }));
        setUpdateStatus({ type: 'success', msg: 'Profile updated successfully!' });
        setPasswords({ current: '', new: '', confirm: '' });
        setTimeout(() => setUpdateStatus(null), 4000);
      } else {
        setUpdateStatus({ type: 'error', msg: data.error || 'Update failed.' });
      }
    } catch (err) {
      setUpdateStatus({ type: 'error', msg: 'Connection error.' });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const res = await fetch('/api/account/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: user.id,
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: profile.email,
          shipping: {
            first_name: addressForm.firstName,
            last_name: addressForm.lastName,
            address_1: addressForm.address1,
            city: addressForm.city,
            state: addressForm.state,
            phone: addressForm.phone
          }
        })
      });
      if (res.ok) {
        setShowAddressModal(false);
        setTimeout(() => fetchUserData(), 500);
      } else {
        const data = await res.json();
        alert(`Failed to save address: ${data.error}`);
      }
    } catch (err) {
      alert("Connection error while saving address.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteToken = async (tokenId: string) => {
    if (!confirm("Are you sure you want to remove this payment method?")) return;
    setIsDeletingToken(tokenId);
    try {
      const res = await fetch(`/api/account/payment-methods?id=${tokenId}`, { method: 'DELETE' });
      if (res.ok) {
        setPaymentMethods(prev => prev.filter(t => t.id !== tokenId));
      } else {
        alert("Failed to remove payment method.");
      }
    } catch (err) {
      alert("Connection error.");
    } finally {
      setIsDeletingToken(null);
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case 'processing': return 'bg-[#FDF6B2] text-[#723B13]';
      case 'completed': case 'delivered': return 'bg-[#DEF7EC] text-[#03543F]';
      case 'shipped': return 'bg-[#FCE8F3] text-[#99154B]';
      case 'cancelled': case 'failed': return 'bg-[#FDE8E8] text-[#9B1C1C]';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const menuItems = ['Dashboard', 'Orders', 'Saved', 'Shipping Address', 'Payment method', 'Account settings'];

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-8 md:py-12 flex flex-col md:flex-row gap-8 relative items-start pb-32">
      <aside className="w-full md:w-64 shrink-0">
        <div className="flex flex-wrap md:flex-col gap-2 bg-white p-3 md:p-4 rounded-2xl shadow-sm border border-black/[0.03]">
          {menuItems.map((item) => (
            <button
              key={item}
              onClick={() => setActiveTab(item)}
              className={`flex-1 md:w-full text-center md:text-left px-4 py-3 md:px-6 md:py-4 rounded-xl text-[10px] md:text-xs transition-all ${activeTab === item ? 'bg-[#8B2632] text-white font-medium shadow-md' : 'bg-white text-black/70 hover:bg-black/[0.02] border border-black/[0.03] md:border-none'}`}
            >
              {item}
            </button>
          ))}
          <button onClick={onLogout} className="w-full text-center px-6 py-4 rounded-xl text-xs font-medium text-[#8B2632] bg-[#F5E6E8] mt-2 hover:bg-[#8B2632] hover:text-white transition-all">
            Log Out
          </button>
        </div>
      </aside>

      <main className="flex-1 bg-white rounded-[2rem] p-6 md:p-12 shadow-sm border border-black/[0.03] min-h-[600px] w-full">
        <h2 className="text-2xl md:text-3xl font-sans font-bold text-[#8B2632] mb-6">{activeTab}</h2>
        <div className="h-[1px] bg-black/10 w-full mb-8" />

        {activeTab === 'Dashboard' && (
          <div className="space-y-10">
            <div className="space-y-2">
              <p className="text-sm text-black/80">Hello <span className="font-bold">{profile.firstName || user.name || user.email.split('@')[0]}</span>,</p>
              <p className="text-sm text-black/80 leading-relaxed max-w-3xl">
                <span className="font-bold">Welcome to your account!</span> From here, you can easily track your recent orders, update your shipping and billing info, or change your password and profile settings.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#8B2632]">Recent Activity</h3>
              <div className="h-[1px] bg-black/10 w-full" />
              {loading ? <Loader2 className="animate-spin text-[#8B2632]" /> : orders.length > 0 ? (
                <div className="space-y-2">
                  {orders.slice(0, 3).map((order: any) => (
                    <div key={order.id} className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-4 border-b border-black/5">
                      <div className="flex items-center gap-3 w-32">
                        <div className="w-2 h-2 rounded-full bg-[#FF6B35]" />
                        <span className="text-xs text-black/80">Order #{order.id}</span>
                      </div>
                      <span className="text-xs text-black/60 w-24">{new Date(order.date_created).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <div className="w-24">
                        <span className={`text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${getStatusStyles(order.status)}`}>{order.status}</span>
                      </div>
                      <span className="text-xs text-black/80 w-20">₦{parseFloat(order.total).toLocaleString()}</span>
                      <button onClick={(e) => { e.preventDefault(); setSelectedOrder(order); }} className="flex items-center gap-2 px-5 py-2 border border-black/20 rounded-full text-[10px] text-black/80 hover:bg-black hover:text-white transition-all active:scale-95">
                        <Eye size={12} /> View
                      </button>
                    </div>
                  ))}
                </div>
              ) : <p className="text-sm text-black/40">No recent activity.</p>}
            </div>
          </div>
        )}

        {activeTab === 'Orders' && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center gap-3">
              <Sliders size={16} className="text-[#8B2632]" />
              {['All', 'Processing', 'Shipped', 'Delivered', 'Canceled'].map((f) => (
                <button key={f} onClick={() => setOrderFilter(f)} className={`px-3 py-1.5 rounded-md text-[10px] transition-all ${orderFilter === f ? 'bg-[#FF6B35] text-white' : 'bg-white text-black/60 hover:text-black border border-black/5'}`}>
                  {f}
                </button>
              ))}
              
              {/* CALENDAR FILTER UI */}
              <div className="ml-auto flex items-center gap-2">
                <div className="relative">
                  <button className={`flex items-center gap-2 px-3 py-1.5 border rounded-md text-[10px] transition-all ${filterDate ? 'bg-[#8B2632] text-white border-[#8B2632]' : 'bg-white text-black/60 border-black/10 hover:bg-black/5'}`}>
                    <Calendar size={12} />
                    {filterDate ? new Date(filterDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Filter by Date'}
                  </button>
                  <input 
                    type="date" 
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                </div>
                {filterDate && (
                  <button 
                    onClick={() => setFilterDate('')}
                    className="p-1.5 bg-red-50 text-red-500 rounded-md hover:bg-red-100 transition-colors"
                    title="Clear Date Filter"
                  >
                    <FilterX size={14} />
                  </button>
                )}
                <button onClick={handleSort} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-black/10 rounded-md text-[10px] text-black/60 hover:bg-black/5 transition-all active:scale-95">
                  {sortOrder === 'desc' ? <ArrowDown size={12} className="text-[#FF6B35]" /> : <ArrowUp size={12} className="text-[#FF6B35]" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {loading ? <Loader2 className="animate-spin text-[#8B2632]" /> : 
                orders.filter(o => {
                  const matchesStatus = orderFilter === 'All' || o.status.toLowerCase() === orderFilter.toLowerCase();
                  const matchesDate = !filterDate || o.date_created.startsWith(filterDate);
                  return matchesStatus && matchesDate;
                }).length > 0 ? (
                orders.filter(o => {
                  const matchesStatus = orderFilter === 'All' || o.status.toLowerCase() === orderFilter.toLowerCase();
                  const matchesDate = !filterDate || o.date_created.startsWith(filterDate);
                  return matchesStatus && matchesDate;
                }).map((order: any) => (
                  <div key={order.id} className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-4 border-b border-black/5">
                    <div className="flex items-center gap-3 w-32">
                      <div className="w-2 h-2 rounded-full bg-[#FF6B35]" />
                      <span className="text-xs text-black/80">Order #{order.id}</span>
                    </div>
                    <span className="text-xs text-black/60 w-24">{new Date(order.date_created).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <div className="w-24">
                      <span className={`text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${getStatusStyles(order.status)}`}>{order.status}</span>
                    </div>
                    <span className="text-xs text-black/80 w-20">₦{parseFloat(order.total).toLocaleString()}</span>
                    <div className="w-20 flex md:justify-end">
                      <button onClick={(e) => { e.preventDefault(); setSelectedOrder(order); }} className="flex items-center gap-2 px-5 py-2 border border-black/20 rounded-full text-[10px] text-black/80 hover:bg-black hover:text-white transition-all active:scale-95">
                        <Eye size={12} /> View
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center space-y-2">
                  <Package size={32} className="mx-auto text-black/10" />
                  <p className="text-sm text-black/40 italic">No orders found matching your filters.</p>
                  {filterDate && (
                    <button onClick={() => setFilterDate('')} className="text-[10px] font-bold text-[#8B2632] uppercase tracking-widest underline">Clear date filter</button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'Saved' && (
          <div className="py-4">
            {loading ? (
              <Loader2 className="animate-spin text-[#8B2632]" />
            ) : wishlistProducts.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {wishlistProducts.map((product: any) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-black/40 italic">No saved items yet.</p>
            )}
          </div>
        )}

        {activeTab === 'Shipping Address' && (
          <div className="space-y-8">
            {customer?.shipping?.address_1 ? (
              <div className="bg-white border border-black/10 rounded-2xl p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-bold text-black/80">{customer.shipping.first_name} {customer.shipping.last_name}</h4>
                  <div className="flex items-center gap-3 text-[#FF6B35]">
                    <Edit2 size={14} className="cursor-pointer" onClick={() => setShowAddressModal(true)} />
                  </div>
                </div>
                <div className="text-xs text-black/60 space-y-1">
                  <p>{customer.shipping.address_1}</p>
                  <p>{customer.shipping.city}, {customer.shipping.state}</p>
                  <p>{customer.shipping.phone}</p>
                </div>
                <div className="flex items-center gap-2 text-green-600 pt-2">
                  <CheckCircle size={14} /> <span className="text-[10px] font-medium uppercase tracking-widest">Default Address</span>
                </div>
              </div>
            ) : <p className="text-sm text-black/40 italic">No shipping address found.</p>}
            <button onClick={() => setShowAddressModal(true)} className="bg-[#F5E6E8] text-[#8B2632] px-8 py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-[#8B2632] hover:text-white transition-all">
              {customer?.shipping?.address_1 ? 'EDIT ADDRESS' : 'ADD NEW ADDRESS'}
            </button>
          </div>
        )}

        {activeTab === 'Payment method' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#8B2632]">Saved Cards</h3>
              <span className="bg-[#FDF8F0] text-[#8B2632] text-[9px] px-3 py-1 rounded-full font-bold tracking-widest border border-[#8B2632]/10">
                SECURED BY FLUTTERWAVE
              </span>
            </div>
            
            {loading ? (
              <Loader2 className="animate-spin text-[#8B2632]" />
            ) : paymentMethods.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paymentMethods.map((token: any) => (
                  <div key={token.id} className="bg-white border border-black/10 rounded-2xl p-6 relative overflow-hidden group">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-6 bg-black/5 rounded flex items-center justify-center text-[10px] font-bold uppercase">
                          {token.card_type || 'CARD'}
                        </div>
                        <span className="text-sm font-bold text-black/80">•••• {token.last4 || '****'}</span>
                      </div>
                      <button 
                        onClick={() => handleDeleteToken(token.id)}
                        disabled={isDeletingToken === token.id}
                        className="text-black/30 hover:text-red-500 transition-colors"
                      >
                        {isDeletingToken === token.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                      </button>
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="space-y-1">
                        <span className="text-[8px] uppercase tracking-widest text-black/40">Expires</span>
                        <p className="text-xs font-medium text-black/80">{token.expiry_month || 'MM'}/{token.expiry_year || 'YY'}</p>
                      </div>
                      {token.is_default && (
                        <span className="text-[9px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded uppercase tracking-widest">Default</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-black/[0.02] border border-black/[0.03] rounded-2xl p-8 text-center space-y-3">
                <CreditCard size={32} className="mx-auto text-black/20 mb-2" />
                <p className="text-sm font-bold text-black/60">No saved payment methods</p>
                <p className="text-xs text-black/40 max-w-sm mx-auto leading-relaxed">
                  Save your card securely during your next checkout for a faster, seamless experience.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'Account settings' && (
          <form onSubmit={handleUpdateProfile} className="space-y-10">
            {updateStatus && (
              <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider p-4 rounded-xl border ${updateStatus.type === 'success' ? 'text-green-600 bg-green-50 border-green-100' : 'text-red-600 bg-red-50 border-red-100'}`}>
                {updateStatus.type === 'success' ? <CheckCircle2 size={16} /> : <X size={16} />} {updateStatus.msg}
              </div>
            )}

            <div className="space-y-6">
              <h3 className="text-lg font-bold text-[#FF6B35]">Personal details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-black/50 ml-1">First name</label>
                  <input value={profile.firstName} onChange={e => setProfile({...profile, firstName: e.target.value})} className="w-full bg-[#FDF8F0] border border-black/5 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#FF6B35]" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-black/50 ml-1">Last name</label>
                  <input value={profile.lastName} onChange={e => setProfile({...profile, lastName: e.target.value})} className="w-full bg-[#FDF8F0] border border-black/5 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#FF6B35]" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-black/50 ml-1">Email address</label>
                <input value={profile.email} disabled className="w-full bg-[#FDF8F0] border border-black/5 rounded-xl px-4 py-3 text-sm outline-none opacity-60" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-black/50 ml-1">Username</label>
                <input value={profile.username} disabled className="w-full bg-[#FDF8F0] border border-black/5 rounded-xl px-4 py-3 text-sm outline-none opacity-60" />
                <p className="text-[10px] italic text-black/30 ml-1">This name will be visible in your account settings and on any reviews you post.</p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-bold text-[#FF6B35]">Reset password</h3>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-black/50 ml-1">Current password <span className="text-[9px] lowercase font-normal tracking-normal">(leave blank to leave unchanged)</span></label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} value={passwords.current} onChange={e => setPasswords({...passwords, current: e.target.value})} className="w-full bg-[#FDF8F0] border border-black/5 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#FF6B35]" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-black/30 hover:text-black">{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-black/50 ml-1">New password <span className="text-[9px] lowercase font-normal tracking-normal">(leave blank to leave unchanged)</span></label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} value={passwords.new} onChange={e => setPasswords({...passwords, new: e.target.value})} className="w-full bg-[#FDF8F0] border border-black/5 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#FF6B35]" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-black/50 ml-1">Confirm new password</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} value={passwords.confirm} onChange={e => setPasswords({...passwords, confirm: e.target.value})} className="w-full bg-[#FDF8F0] border border-black/5 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#FF6B35]" />
                </div>
              </div>
            </div>

            <button type="submit" disabled={isUpdating} className="bg-[#FF6B35] text-white px-10 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:opacity-90 transition-all w-full md:w-auto shadow-lg shadow-[#FF6B35]/20 flex items-center justify-center min-w-[200px]">
              {isUpdating ? <Loader2 className="animate-spin" size={20} /> : 'Save changes'}
            </button>
          </form>
        )}
      </main>

      <AnimatePresence>
        {showAddressModal && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAddressModal(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[400]" />
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-xl bg-white z-[450] rounded-2xl shadow-2xl p-6 md:p-8 overflow-y-auto max-h-[90vh]">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold text-[#8B2632]">Shipping Address</h3>
                <button onClick={() => setShowAddressModal(false)} className="text-black/40 hover:text-black"><X size={20} /></button>
              </div>
              <form onSubmit={handleSaveAddress} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input required placeholder="First Name" value={addressForm.firstName} onChange={e => setAddressForm({...addressForm, firstName: e.target.value})} className="w-full border border-black/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#FF6B35]" />
                  <input required placeholder="Last Name" value={addressForm.lastName} onChange={e => setAddressForm({...addressForm, lastName: e.target.value})} className="w-full border border-black/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#FF6B35]" />
                </div>
                <input required placeholder="Phone Number" value={addressForm.phone} onChange={e => setAddressForm({...addressForm, phone: e.target.value})} className="w-full border border-black/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#FF6B35]" />
                <input required placeholder="Street Address" value={addressForm.address1} onChange={e => setAddressForm({...addressForm, address1: e.target.value})} className="w-full border border-black/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#FF6B35]" />
                <div className="grid grid-cols-2 gap-4">
                  <input required placeholder="City" value={addressForm.city} onChange={e => setAddressForm({...addressForm, city: e.target.value})} className="w-full border border-black/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#FF6B35]" />
                  <select required value={addressForm.state} onChange={e => setAddressForm({...addressForm, state: e.target.value})} className="w-full border border-black/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#FF6B35] bg-white">
                    {NIGERIAN_STATES.map(s => <option key={s.code} value={s.code}>{s.name}</option>)}
                  </select>
                </div>
                <button type="submit" disabled={isUpdating} className="w-full bg-[#FF6B35] text-white py-4 rounded-xl text-sm font-bold uppercase tracking-widest mt-4 shadow-lg flex items-center justify-center">
                  {isUpdating ? <Loader2 className="animate-spin" size={20} /> : 'SAVE ADDRESS'}
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedOrder && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedOrder(null)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[550]" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-xl bg-white z-[600] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
              <div className="p-6 bg-[#8B2632] text-white flex justify-between items-center">
                <h3 className="text-xl font-bold">Order #{selectedOrder.id}</h3>
                <button onClick={() => setSelectedOrder(null)} className="hover:opacity-70 transition-opacity"><X size={20} /></button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                {selectedOrder.line_items?.map((item: any) => (
                  <div key={item.id} className="flex justify-between py-3 border-b border-black/5">
                    <span className="text-sm text-black/80">{item.name} x{item.quantity}</span>
                    <span className="text-sm font-bold text-[#8B2632]">₦{parseFloat(item.total).toLocaleString()}</span>
                  </div>
                ))}
                <div className="pt-4 space-y-2 border-t border-black/10 mt-4">
                  <div className="flex justify-between text-xs text-black/60">
                    <span>Subtotal</span>
                    <span>₦{selectedOrder.line_items?.reduce((acc: number, item: any) => acc + parseFloat(item.subtotal), 0).toLocaleString()}</span>
                  </div>
                  {parseFloat(selectedOrder.discount_total) > 0 && (
                    <div className="flex justify-between text-xs text-[#8B2632] font-medium">
                      <span>Discount</span>
                      <span>-₦{parseFloat(selectedOrder.discount_total).toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xs text-black/60">
                    <span>Shipping</span>
                    <span>₦{parseFloat(selectedOrder.shipping_total).toLocaleString()}</span>
                  </div>
                  {selectedOrder.fee_lines?.map((fee: any) => (
                    <div key={fee.id} className="flex justify-between text-xs text-black/60">
                      <span>{fee.name}</span>
                      <span>₦{parseFloat(fee.total).toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-3 mt-3 border-t border-black/5">
                    <span className="text-base font-bold text-black/80">Total Paid</span>
                    <span className="text-xl font-bold text-[#8B2632]">₦{parseFloat(selectedOrder.total).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
