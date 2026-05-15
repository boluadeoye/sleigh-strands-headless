import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const InfoCard = ({ title, content }: { title: string, content: string }) => (
  <div className="bg-white border border-black/5 rounded-2xl p-6 md:p-8 shadow-sm space-y-4">
    <h4 className="text-sm font-bold text-black/80">{title}</h4>
    <div className="flex gap-4 items-start">
      <div className="w-3 h-3 rounded-full bg-[#8B2632] mt-1.5 shrink-0" />
      <p className="text-sm text-black/70 leading-relaxed">{content}</p>
    </div>
  </div>
);

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#FDF8F0]">
      <Navbar variant="solid" />

      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden bg-[#4A1018]">
        <div className="absolute inset-0 opacity-70 blur-[2px] scale-105">
          <img
            src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1776180088/blog_assets/xqie8to9cmdxjiaom0tm.png"
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
        <div className="absolute inset-0 bg-black/20" />
        <h1 className="relative z-10 text-white font-sans text-3xl md:text-7xl font-bold tracking-tighter uppercase whitespace-nowrap">
          Terms & <span className="text-[#8B2632] font-sans italic">Conditions</span>
        </h1>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-xl border border-black/5">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-sans text-[#8B2632] mb-2">Sleigh Strands Policy</h2>
            <p className="text-sm italic text-black/40 mb-8">Wig Styling & Expectations Policy</p>
            <div className="space-y-6 text-sm md:text-base text-black/80 leading-relaxed font-light">
              <p className="font-medium">Hi Sleigh Babe</p>
              <p>We understand that sometimes wigs seen online can look different upon delivery, especially when they arrive unstyled. This can be disappointing, and we want to make sure you never have that experience with us.</p>
              <p>At Sleigh Strands, customer satisfaction is very important to us. That&apos;s why all our wigs come pre-styled at no extra cost. So, what you order is exactly the standard you should expect to receive.</p>
              <p>Please note that our wigs are high-quality synthetic wigs, carefully selected to give you beautiful, long-lasting styles. While they are designed to look stunning, they will not behave exactly like human or raw hair.</p>
              <div className="space-y-2 pt-4">
                <p className="font-medium">What you can expect, however, is:</p>
                <ul className="space-y-1 pl-4">
                  <li>* well-defined styles</li>
                  <li>* easy-to-wear looks</li>
                  <li>* and a polished finish that helps you step out confidently</li>
                </ul>
              </div>
              <div className="pt-6">
                <p>Thank you for choosing Sleigh Strands</p>
                <p className="italic">Here&apos;s to sleighing your strands.</p>
              </div>
            </div>
          </div>
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-sans text-[#8B2632] mb-2">Processing & Delivery Information</h2>
            <p className="text-sm text-black/40 mb-10">To ensure every order meets our quality and styling standards, please note the following:</p>
            <div className="grid grid-cols-1 gap-6">
              <InfoCard title="Processing Time" content="All orders are processed within 5–7 working days after payment has been confirmed. This allows us to properly prepare, inspect, and style your wig to the Sleigh Strands standard." />
              <InfoCard title="Delivery Time" content="Once your order has been dispatched, delivery typically takes 3–4 working days, depending on your location." />
              <InfoCard title="Important Note" content="Kindly note that processing time and delivery time are separate. This means your total wait time may be up to 8–11 working days from the date your order is placed. We truly appreciate your patience as we take the time to deliver quality." />
              <InfoCard title="Need It Urgently?" content="If you require your order sooner, please reach out to us before placing your order, and we&apos;ll do our best to assist where possible." />
            </div>
          </div>
          <div className="pt-10 border-t border-black/5">
            <h2 className="text-3xl md:text-4xl font-sans text-[#8B2632] mb-4">Final Note</h2>
            <p className="text-sm md:text-base italic text-black/80 mb-8 font-medium">We are committed to giving you a smooth and satisfying experience from order to delivery.</p>
            <div className="text-sm text-black/60">
              <p>Thank you for choosing Sleigh Strands</p>
              <p className="italic">Here&apos;s to sleighing your strands.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
