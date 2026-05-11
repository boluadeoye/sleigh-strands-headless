"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Star, Loader2, CheckCircle2 } from 'lucide-react';

export default function ReviewForm({ product }: { product: any }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const[status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('sleigh_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  },[]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Please select a star rating.");
      return;
    }
    if (!reviewText.trim()) return;

    setStatus('loading');

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_id: product.id,
          review: reviewText,
          reviewer: user?.name || 'Sleigh Babe',
          reviewer_email: user?.email || 'guest@sleighstrands.shop',
          rating: rating
        }),
      });

      if (res.ok) {
        setStatus('success');
        setReviewText('');
        setRating(0);
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-white p-8 rounded-[2rem] border border-black/5 flex flex-col items-center justify-center text-center h-full min-h-[300px] space-y-4">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-2">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="text-xl font-bold text-black/80">Thank You!</h3>
        <p className="text-sm text-black/50">Your review has been submitted and is pending approval.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-[2rem] border border-black/5 shadow-sm">
      {/* Context-Aware Product Header */}
      <div className="flex items-center gap-4 mb-6 pb-6 border-b border-black/5">
        <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-[#F4F4F4]">
          <Image 
            src={product.images?.[0]?.src || "/placeholder.png"} 
            alt={product.name} 
            fill 
            className="object-cover" 
          />
        </div>
        <div>
          <h4 className="text-xs font-bold text-black/80 line-clamp-1">{product.name}</h4>
          <span className="text-[9px] uppercase tracking-widest text-black/40">Leave a review</span>
        </div>
      </div>

      <h3 className="text-2xl font-sans font-bold mb-6 tracking-tight">Write a Review</h3>
      
      <form onSubmit={handleSubmit}>
        {/* Interactive Star Rating */}
        <div className="flex gap-2 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="focus:outline-none transition-transform hover:scale-110"
            >
              <Star 
                size={24} 
                className={`transition-colors ${
                  star <= (hoverRating || rating) 
                  ? "fill-[#D2A546] text-[#D2A546]" 
                  : "text-black/10"
                }`} 
              />
            </button>
          ))}
        </div>

        <textarea 
          required
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          className="w-full bg-[#FDF8F0] rounded-2xl p-5 text-sm outline-none mb-6 h-32 resize-none border border-black/5 focus:border-[#8B2632]/20 transition-colors" 
          placeholder="Share your experience..."
        />

        <button 
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-[#F5E6E8] text-[#8B2632] py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-[#8B2632] hover:text-white transition-all flex items-center justify-center"
        >
          {status === 'loading' ? <Loader2 size={16} className="animate-spin" /> : 'Submit Review'}
        </button>
        {status === 'error' && <p className="text-[10px] text-red-500 mt-3 text-center font-bold uppercase tracking-widest">Failed to submit. Try again.</p>}
      </form>
    </div>
  );
}
