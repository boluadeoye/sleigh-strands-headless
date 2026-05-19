import Image from 'next/image';

export default function ValueGrid() {
  return (
    <section className="py-24 bg-cream">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h2 className="text-5xl font-sans mb-10">We answer to you</h2>
            <div className="space-y-4">
              {["How long does shipping take?", "What is your return policy?", "How do I maintain my wig?"].map((q, i) => (
                <div key={i} className="border-b border-black/10 pb-4 flex justify-between items-center cursor-pointer">
                  <span className="text-lg font-medium">{q}</span>
                  <span className="text-2xl">+</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-square rounded-sm overflow-hidden">
            <Image src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1776170491/blog_assets/liscfbvfxxgmth7jfh1o.png" alt="FAQ" fill className="object-cover" />
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-0 shadow-2xl">
          <div className="bg-burgundy p-12 text-white">
            <h3 className="text-3xl font-sans mb-4">Trusted by 500k+ Women</h3>
            <p className="text-sm text-blush/70 leading-relaxed">Experience the seamless movement and nourishing glow of hair designed to turn heads.</p>
          </div>
          <div className="bg-white p-12">
            <h3 className="text-3xl font-sans mb-4">Unrivaled Authenticity</h3>
            <p className="text-sm text-black/60 leading-relaxed">
              We believe in getting it right the first time.
              <br /><br />
              From how our wigs are styled to how they are delivered, every detail reflects accuracy, honesty, and intention.
              <br /><br />
              Because your satisfaction matters.
            </p>
          </div>
          <div className="bg-gold p-12 text-white">
            <h3 className="text-3xl font-sans mb-4">Expertly Vetted</h3>
            <p className="text-sm text-white/80 leading-relaxed">Our team sources and authenticates every piece, bringing you high-performance hair.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
