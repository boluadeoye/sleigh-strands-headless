"use client";
import { useState, useEffect } from 'react';

export default function ContactForm() {
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    setMounted(true);
    const savedUser = localStorage.getItem('sleigh_user');
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUser(parsed);
      setFormData(prev => ({
        ...prev,
        name: parsed.name || '',
        email: parsed.email || ''
      }));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus('success');
        setFormData(prev => ({ ...prev, message: '' }));
      } else { setStatus('error'); }
    } catch (err) { setStatus('error'); }
  };

  if (!mounted) return <div className="h-96" />;

  return (
    <section className="max-w-4xl mx-auto px-6 py-20 md:py-32">
      <h1 className="text-4xl md:text-6xl font-outfit font-bold text-[#3D1218] text-center mb-16 leading-[1.1] tracking-tighter">
        {user ? `Hello ${user.name.split(' ')[0]}! How can we be` : 'Hello! How can we be'}<br />of help to you today?
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 ml-2">Name</label>
            <input
              required
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-white border border-black/5 rounded-2xl px-6 py-4 text-sm outline-none focus:border-[#FF6B35] transition-all"
              placeholder="Your name"
            />
          </div>
          
          {!user && (
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 ml-2">Email</label>
              <input
                required
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-white border border-black/5 rounded-2xl px-6 py-4 text-sm outline-none focus:border-[#FF6B35] transition-all"
                placeholder="Your email address"
              />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 ml-2">Talk to us</label>
          <textarea
            required
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            className="w-full bg-white border border-black/5 rounded-[2rem] px-6 py-6 text-sm outline-none focus:border-[#FF6B35] transition-all h-48 resize-none"
            placeholder="How can we help?"
          ></textarea>
        </div>

        <button
          disabled={status === 'sending'}
          className="w-full bg-[#FF6B35] text-white py-5 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:opacity-90 transition-all shadow-lg shadow-[#FF6B35]/20"
        >
          {status === 'success' ? 'Inquiry Sent' : status === 'sending' ? 'Sending...' : 'Send inquiry'}
        </button>
      </form>
    </section>
  );
}
