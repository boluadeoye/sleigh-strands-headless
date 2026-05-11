"use client";
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FinalCTA from '@/components/FinalCTA';
import { Loader2, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    const savedUser = localStorage.getItem('sleigh_user');
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUser(parsed);
      setFormData(prev => ({ ...prev, name: parsed.name || '', email: parsed.email || '' }));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) setStatus('success');
      else setStatus('error');
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen bg-cream font-sans">
      <Navbar variant="solid" />

      <section className="pt-32 md:pt-48 pb-24 px-6">
        <div className="max-w-[900px] mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-burgundy text-center leading-[1.1] tracking-tighter mb-16">
            {user ? `Hello ${user.name.split(' ')[0]}! How can we be of help to you today?` : "Hello! How can we be of help to you today?"}
          </h1>

          {status === 'success' ? (
            <div className="bg-white rounded-[2rem] p-12 text-center shadow-xl border border-green-100">
              <CheckCircle2 className="mx-auto text-green-500 mb-4" size={48} />
              <h2 className="text-2xl font-bold text-ink mb-2">Message Sent!</h2>
              <p className="text-ink/60">We've received your inquiry and will get back to you shortly.</p>
              <button onClick={() => setStatus('idle')} className="mt-8 text-burgundy font-bold uppercase text-xs tracking-widest border-b border-burgundy pb-1">Send another message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {!user && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-ink/40 ml-2">Name</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-white border border-black/5 rounded-2xl px-6 py-4 outline-none focus:border-[#FF6B35] transition-all shadow-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-ink/40 ml-2">Email</label>
                    <input 
                      required
                      type="email" 
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-white border border-black/5 rounded-2xl px-6 py-4 outline-none focus:border-[#FF6B35] transition-all shadow-sm"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-widest text-ink/40 ml-2">Talk to us</label>
                <textarea 
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder={user ? "How can we help you today?" : ""}
                  className="w-full bg-white border border-black/5 rounded-[2rem] px-6 py-5 outline-none focus:border-[#FF6B35] transition-all shadow-sm resize-none"
                />
              </div>

              <button 
                type="submit"
                disabled={status === 'loading'}
                style={{ backgroundColor: '#FF6B35' }}
                className="w-full text-white py-6 rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-lg shadow-[#FF6B35]/30 hover:opacity-90 transition-all flex items-center justify-center gap-3"
              >
                {status === 'loading' ? <Loader2 className="animate-spin" size={20} /> : "Send inquiry"}
              </button>
            </form>
          )}
        </div>
      </section>

      <div className="bg-white">
        <FinalCTA />
      </div>

      <Footer />
    </main>
  );
}
