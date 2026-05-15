"use client";
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import * as gtag from '@/lib/gtag';

export default function SuccessPage() {
  useEffect(() => {
    gtag.event({
      action: 'purchase',
      params: {
        transaction_id: `T_${Date.now()}`,
        currency: 'NGN',
        value: 0, // In a real flow, we would pass the actual total here
        items: []
      }
    });
  }, []);

  return (
    <main className="min-h-screen bg-[#FDF8F0]">
      <Navbar variant="solid" />
      <div className="max-w-4xl mx-auto px-6 py-32 text-center space-y-8">
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600">
            <CheckCircle size={48} />
          </div>
        </div>
        <h1 className="text-5xl font-sans text-[#8B2632]">Order Received!</h1>
        <p className="text-black/60 max-w-md mx-auto leading-relaxed">
          Hi Sleigh Babe 🤍
          <br /><br />
          Your order has been successfully placed and we&apos;re excited to prepare it for you. You&apos;ll receive updates once your order has been processed and shipped.
          <br /><br />
          Thank you for choosing Sleigh Strands ✨
        </p>
        <Link href="/shop" className="inline-block bg-[#3D1218] text-white px-12 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest">
          Continue Shopping
        </Link>
      </div>
      <Footer />
    </main>
  );
}
