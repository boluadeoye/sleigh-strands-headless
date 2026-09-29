import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PolicySection = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="bg-white border border-black/5 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
    <h4 className="text-sm font-bold text-black/80 border-b border-black/5 pb-4">{title}</h4>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

const BulletItem = ({ text }: { text: string }) => (
  <div className="flex gap-4 items-start">
    <div className="w-3 h-3 rounded-full bg-[#8B2632] mt-1 shrink-0" />
    <p className="text-sm text-black/70 leading-relaxed">{text}</p>
  </div>
);

export default function ReturnPolicyPage() {
  return (
    <main className="min-h-screen bg-[#FDF8F0]">
      <Navbar variant="solid" />

      {/* Header - High Blur Editorial */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden bg-[#4A1018]">
        <div className="absolute inset-0 opacity-70 blur-[2px] scale-110">
          <img
            src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1779784645/blog_assets/kqlt5ehf1fhox5pqd5dp.jpg"
            className="w-full h-full object-cover object-top"
            alt=""
          />
        </div>
        <div className="absolute inset-0 bg-black/20" />
        <h1 className="relative z-10 text-white font-sans text-4xl md:text-7xl font-bold tracking-tighter uppercase text-center px-6">
          Return & <span className="text-[#8B2632] font-sans italic">Refund Policy</span>
        </h1>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-xl border border-black/5">

          {/* Intro */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-sans text-[#8B2632] mb-6">Returns & Exchanges Policy</h2>
            <div className="space-y-4 text-sm md:text-base text-black/80 leading-relaxed font-light">
              <p className="font-medium">Hi Sleigh Babe</p>
              <p>At Sleigh Strands, we are committed to delivering wigs that meet our quality and styling standards. Due to the nature of our products, please read our return policy carefully before placing an order.</p>
            </div>
          </div>

          {/* Policy Cards Grid */}
          <div className="grid grid-cols-1 gap-8 mb-16">

            <PolicySection title="Eligibility for Returns">
              <p className="text-sm text-black/60 mb-4">For hygiene and quality reasons, we only accept returns under the following conditions:</p>
              <div className="space-y-3">
                <BulletItem text="The wig must be unused and unworn" />
                <BulletItem text="Wig tag must remain attached to the hair" />
                <BulletItem text="Lace must be uncut and intact" />
                <BulletItem text="Wig must remain in its original condition and packaging" />
                <BulletItem text="Return request must be made within 48 hours of delivery" />
              </div>
            </PolicySection>

            <PolicySection title="Exchanges Only (No Refunds)">
              <p className="text-sm text-black/60 mb-4">We currently offer exchanges only, no refunds.</p>
              <p className="text-sm font-bold text-black/80">Eligible items can be exchanged for:</p>
              <div className="space-y-3">
                <BulletItem text="Another style" />
                <BulletItem text="or store credit" />
              </div>
            </PolicySection>

            <PolicySection title="Items Not Eligible for Return">
              <p className="text-sm text-black/60 mb-4">We do not accept returns if:</p>
              <div className="space-y-3">
                <BulletItem text="The wig has been worn, styled, or altered" />
                <BulletItem text="Lace has been cut or tampered with" />
                <BulletItem text="The product has been damaged after delivery" />
                <BulletItem text="The return request is made after 48 hours" />
              </div>
            </PolicySection>

            <PolicySection title="Damaged or Incorrect Orders">
              <p className="text-sm text-[#8B2632] font-medium leading-relaxed">
                If you receive a damaged or incorrect item, please contact us within 24 hours of delivery with clear photos/videos.
              </p>
              <p className="text-sm text-black/60">We will resolve this as quickly as possible.</p>
            </PolicySection>

          </div>

          {/* Final Note */}
          <div className="pt-10 border-t border-black/5">
            <h2 className="text-3xl md:text-4xl font-sans text-[#8B2632] mb-4">Final Note</h2>
            <p className="text-sm md:text-base italic text-black/80 mb-8 font-medium">
              We truly want you to love your purchase and feel confident in your choice. If you have any questions before ordering, feel free to reach out – we&apos;re always happy to help.
            </p>
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
