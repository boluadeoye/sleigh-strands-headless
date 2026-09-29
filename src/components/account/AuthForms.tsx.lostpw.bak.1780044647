"use client";
import { useState } from 'react';
import { Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function AuthForms() {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [regData, setRegData] = useState({ email: '', password: '', firstName: '', lastName: '' });
  
  // ISOLATED STATES: Prevents simultaneous loading spinners
  const [loginStatus, setLoginStatus] = useState<{type: 'idle' | 'loading' | 'success' | 'error', msg: string}>({ type: 'idle', msg: '' });
  const [regStatus, setRegStatus] = useState<{type: 'idle' | 'loading' | 'success' | 'error', msg: string}>({ type: 'idle', msg: '' });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginStatus({ type: 'loading', msg: '' });
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('sleigh_user', JSON.stringify({
          email: loginData.username,
          name: data.user,
          id: data.id
        }));
        setLoginStatus({ type: 'success', msg: `Welcome back!` });
        setTimeout(() => window.location.reload(), 1000);
      } else {
        setLoginStatus({ type: 'error', msg: 'Invalid credentials.' });
      }
    } catch (err) {
      setLoginStatus({ type: 'error', msg: 'Connection failed' });
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegStatus({ type: 'loading', msg: '' });
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...regData, send_notification: true }),
      });
      const data = await res.json();
      if (res.ok) {
        const displayName = regData.firstName ? `${regData.firstName} ${regData.lastName}`.trim() : 'Sleigh Babe';
        localStorage.setItem('sleigh_user', JSON.stringify({
          email: regData.email,
          name: displayName,
          id: data.id
        }));
        setRegStatus({ type: 'success', msg: 'Account created successfully!' });
        setTimeout(() => window.location.reload(), 1000);
      } else {
        setRegStatus({ type: 'error', msg: data.error || 'Registration failed' });
      }
    } catch (err) {
      setRegStatus({ type: 'error', msg: 'Registration failed' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-10">
      <div className="grid lg:grid-cols-2 gap-10 items-start">
        
        {/* LOGIN FORM */}
        <div className="bg-white rounded-[2.5rem] p-10 md:p-16 shadow-xl border border-black/[0.03]">
          <h2 className="text-4xl font-sans font-bold text-black mb-10 tracking-tight">Welcome back</h2>
          
          {loginStatus.msg && (
            <div className={`flex items-center gap-3 p-4 mb-6 rounded-xl border ${loginStatus.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
              {loginStatus.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
              <p className="text-[10px] font-bold uppercase tracking-[0.1em]">{loginStatus.msg}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-black/50 ml-1">Username or email address</label>
              <input required type="text" value={loginData.username} onChange={e => setLoginData({...loginData, username: e.target.value})} className="w-full bg-white border border-black/10 rounded-2xl px-6 py-5 text-sm outline-none focus:border-[#FF6B35] transition-all" />
            </div>
            <div className="space-y-3">
              <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-black/50 ml-1">Password</label>
              <input required type="password" value={loginData.password} onChange={e => setLoginData({...loginData, password: e.target.value})} className="w-full bg-white border border-black/10 rounded-2xl px-6 py-5 text-sm outline-none focus:border-[#FF6B35] transition-all" />
            </div>

            {/* FIGMA RESTORATION: Remember Me & Forgot Password */}
            <div className="flex items-center justify-between px-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-black/20 text-[#FF6B35] focus:ring-0 transition-all cursor-pointer translate-y-[1px]" />
                <span className="text-[13px] font-medium text-black/60 group-hover:text-black transition-colors">Remember me</span>
              </label>
              <Link href="/account/lost-password" title="Reset your password" className="text-[13px] font-medium text-[#FF6B35] hover:opacity-80 transition-opacity">
                Forgot password
              </Link>
            </div>

            <button disabled={loginStatus.type === 'loading'} className="w-full bg-[#FF6B35] text-white py-6 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:opacity-90 transition-all shadow-xl flex items-center justify-center">
              {loginStatus.type === 'loading' ? <Loader2 className="animate-spin" size={20} /> : 'Log in'}
            </button>
          </form>
        </div>

        {/* REGISTER FORM */}
        <div className="bg-white rounded-[2.5rem] p-10 md:p-16 shadow-xl border border-black/[0.03]">
          <div className="mb-10">
            <h2 className="text-4xl font-sans font-bold text-black tracking-tight">Are you new here?</h2>
            <p className="text-2xl font-sans font-bold text-black tracking-tight mt-1">Let get you started.</p>
          </div>

          {regStatus.msg && (
            <div className={`flex items-center gap-3 p-4 mb-6 rounded-xl border ${regStatus.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
              {regStatus.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
              <p className="text-[10px] font-bold uppercase tracking-[0.1em]">{regStatus.msg}</p>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-black/50 ml-1">First Name</label>
                <input required type="text" value={regData.firstName} onChange={e => setRegData({...regData, firstName: e.target.value})} className="w-full bg-white border border-black/10 rounded-2xl px-6 py-5 text-sm outline-none focus:border-[#FF6B35] transition-all" />
              </div>
              <div className="space-y-3">
                <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-black/50 ml-1">Last Name</label>
                <input required type="text" value={regData.lastName} onChange={e => setRegData({...regData, lastName: e.target.value})} className="w-full bg-white border border-black/10 rounded-2xl px-6 py-5 text-sm outline-none focus:border-[#FF6B35] transition-all" />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-black/50 ml-1">Enter your email address</label>
              <input required type="email" value={regData.email} onChange={e => setRegData({...regData, email: e.target.value})} className="w-full bg-white border border-black/10 rounded-2xl px-6 py-5 text-sm outline-none focus:border-[#FF6B35] transition-all" />
            </div>
            <div className="space-y-3">
              <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-black/50 ml-1">Create Password</label>
              <input required type="password" value={regData.password} onChange={e => setRegData({...regData, password: e.target.value})} className="w-full bg-white border border-black/10 rounded-2xl px-6 py-5 text-sm outline-none focus:border-[#FF6B35] transition-all" />
            </div>

            {/* LOGICAL FIX: Removed "email your password" lie. Added Privacy Compliance. */}
            <p className="text-[13px] leading-relaxed text-black/60 px-1">
              Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our <Link href="/privacy" className="text-[#FF6B35] underline">privacy policy</Link>.
            </p>

            <button disabled={regStatus.type === 'loading'} className="w-full bg-[#FF6B35] text-white py-6 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:opacity-90 transition-all shadow-xl flex items-center justify-center">
              {regStatus.type === 'loading' ? <Loader2 className="animate-spin" size={20} /> : 'Create my account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}