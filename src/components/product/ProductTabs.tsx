"use client";
import { useState } from 'react';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';

export default function ProductTabs({ product, reviews }: { product: any, reviews: any[] }) {
  const [activeTab, setActiveTab] = useState<'about' | 'reviews'>('about');

  return (
    <div className="mb-16">
      {/* TAB HEADERS */}
      <div className="flex gap-12 border-b border-black/5 mb-12 overflow-x-auto no-scrollbar">
        <button 
          onClick={() => setActiveTab('about')}
          className={`pb-6 text-[11px] font-bold uppercase tracking-[0.2em] transition-all border-b-2 ${
            activeTab === 'about' ? 'border-[#8B2632] text-[#8B2632]' : 'border-transparent text-black/20'
          }`}
        >
          About the product
        </button>
        <button 
          onClick={() => setActiveTab('reviews')}
          className={`pb-6 text-[11px] font-bold uppercase tracking-[0.2em] transition-all border-b-2 ${
            activeTab === 'reviews' ? 'border-[#8B2632] text-[#8B2632]' : 'border-transparent text-black/20'
          }`}
        >
          Reviews ({reviews.length})
        </button>
      </div>

      {/* TAB CONTENT */}
      <div className="grid lg:grid-cols-2 gap-12 md:gap-20">
        {activeTab === 'about' ? (
          <>
            <div className="max-w-2xl">
              <h3 className="text-3xl font-sans font-bold text-black/80 mb-10 tracking-tight">Specifications</h3>
              <div className="grid gap-8">
                {[{ label: 'Weight', value: '0.3 kg' }, { label: 'Color', value: 'Black' }, { label: 'Brand', value: 'Hair' }].map((spec) => (
                  <div key={spec.label} className="flex items-center py-1">
                    <span className="w-32 text-[11px] font-bold uppercase tracking-[0.3em] text-[#8B2632]">{spec.label}</span>
                    <div className="h-8 w-[1px] bg-black/10 mx-6" />
                    <span className="text-sm text-black/60 font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#F5E6E8]/30 p-8 rounded-[2rem] border border-[#8B2632]/5">
               <h4 className="text-lg font-bold text-[#8B2632] mb-4 uppercase tracking-widest">Sleigh Guarantee</h4>
               <p className="text-sm text-black/60 leading-relaxed">Every strand is hand-selected for quality. Our luxury hair is designed to feel like home and look like a dream.</p>
            </div>
          </>
        ) : (
          <>
            <div className="max-w-2xl">
              <h3 className="text-3xl font-sans font-bold text-black/80 mb-10 tracking-tight">Customer Stories</h3>
              <ReviewList reviews={reviews} />
            </div>
            <ReviewForm product={product} />
          </>
        )}
      </div>
    </div>
  );
}
