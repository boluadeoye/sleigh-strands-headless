import { Star } from 'lucide-react';

export default function ReviewList({ reviews }: { reviews: any[] }) {
  if (reviews.length === 0) {
    return (
      <div className="py-10 text-center border border-dashed border-black/10 rounded-2xl">
        <p className="text-sm text-black/40 italic font-medium">No verified reviews yet. Be the first to Sleigh.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {reviews.map((review) => (
        <div key={review.id} className="border-b border-black/5 pb-8 last:border-0">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h4 className="text-sm font-bold text-black/80 uppercase tracking-tight">{review.reviewer}</h4>
              <p className="text-[10px] text-black/30 font-medium">
                {new Date(review.date_created).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={12} 
                  className={i < review.rating ? "fill-[#D2A546] text-[#D2A546]" : "text-black/10"} 
                />
              ))}
            </div>
          </div>
          <div 
            className="text-sm text-black/60 leading-relaxed font-light italic"
            dangerouslySetInnerHTML={{ __html: review.review }}
          />
        </div>
      ))}
    </div>
  );
}
