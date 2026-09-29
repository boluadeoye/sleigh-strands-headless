"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Plus, Minus, Mail, Instagram } from "lucide-react";

/* ─── DATA: 12 QUESTIONS WITH BULLET POINT LOGIC ────────────────────────── */

const FAQ_GROUPS = [
  {
    category: "The Collection",
    items: [
      {
        id: 1,
        q: "What type of wigs do you sell?",
        a: "At Sleigh Strands, we offer high-quality blend wigs and Futura wigs (premium synthetic). They are designed to give you a polished, stylish look while being more affordable and easier to maintain than human hair."
      },
      {
        id: 2,
        q: "Are the wigs exactly as shown in pictures?",
        a: "Yes 🤍.. What you see is what you get. All our wigs are carefully styled and presented to match what will be delivered to you."
      },
      {
        id: 3,
        q: "Do the wigs come styled?",
        a: "Yes. All wigs come pre-styled and almost ready to wear. You only need to cut the lace and make minor adjustments if needed."
      },
      {
        id: 4,
        q: "Will the wig look like human hair?",
        a: "Our wigs are made from high-quality blend fibers, so they give a natural and polished appearance. However, they are not raw or human hair, and may not behave exactly the same, and that's completely normal."
      },
      {
        id: 5,
        q: "Why are your wigs more affordable?",
        a: "We believe looking good shouldn't require overspending. Hence, we focus on providing smart beauty options; giving you stylish, ready-to-wear wigs without the high cost of human hair."
      },
      {
        id: 11,
        q: "I’ve had a bad experience with wigs before… how are you different?",
        intro: "We understand the disappointment many customers face. That’s why at Sleigh Strands, we focus on:",
        bullets: [
          "Accurate representation",
          "Pre-styled delivery",
          "Quality control",
          "Clear expectations"
        ],
        outro: "So you can shop with confidence."
      },
      {
        id: 12,
        q: "Who are Sleigh Strands wigs for?",
        intro: "For the Sleigh Babe who:",
        bullets: [
          "loves to switch her look",
          "values convenience",
          "wants to look good without overspending",
          "appreciates intentional beauty"
        ]
      }
    ]
  },
  {
    category: "Care & Maintenance",
    items: [
      {
        id: 6,
        q: "How do I care for my wig?",
        intro: "Proper care helps extend the lifespan of your wig. Follow these steps:",
        bullets: [
          "Gently brush with a wig brush or wide-tooth comb (From tip to top)",
          "Wash occasionally with mild shampoo",
          "Allow to air dry",
          "Avoid excessive heat (except Futura wigs, with care)",
          "Store properly after use"
        ]
      }
    ]
  },
  {
    category: "Shipping & Returns",
    items: [
      {
        id: 7,
        q: "How long does delivery take?",
        bullets: [
          "Processing time: 5–7 working days",
          "Delivery time: 3–4 working days after dispatch"
        ],
        outro: "Kindly note these timelines are separate."
      },
      {
        id: 8,
        q: "Can I get my order urgently?",
        a: "If you need your order urgently, please contact us before placing your order, and we’ll do our best to assist."
      },
      {
        id: 9,
        q: "Can I return or exchange my wig?",
        intro: "Due to the nature of our products, returns are only accepted if:",
        bullets: [
          "The item is unused",
          "The lace is not cut",
          "The original condition is maintained"
        ],
        outro: "Please refer to our full policy before placing your order."
      }
    ]
  }
];

export default function FAQPage() {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <main className="bg-[#FDF8F0] min-h-screen">
      <Navbar variant="solid" />

      {/* 1. EDITORIAL HERO */}
      <section className="relative h-[300px] md:h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <img
          src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1779784645/blog_assets/kqlt5ehf1fhox5pqd5dp.jpg"
          className="absolute inset-0 w-full h-full object-cover object-top blur-sm scale-110"
          alt="FAQ Hero"
        />
        <div className="relative z-20 text-center px-6">
          <h1 className="font-outfit text-4xl md:text-6xl font-bold text-white tracking-tighter uppercase leading-none">
            Frequently Asked <br/> Questions
          </h1>
        </div>
      </section>

      {/* 2. FAQ ACCORDION GRID */}
      <section className="max-w-4xl mx-auto px-6 -mt-12 md:-mt-20 relative z-30 pb-24">
        <div className="space-y-16">
          {FAQ_GROUPS.map((group, gIndex) => (
            <div key={gIndex} className="space-y-6">
              {/* Silo Header */}
              <div className="inline-flex items-center gap-2 border border-[#3D1218]/10 rounded-full px-4 py-1.5 bg-white/50 backdrop-blur-sm">
                <div className="w-1.5 h-1.5 bg-[#D2A546] rounded-full" />
                <span className="text-[#3D1218] text-[10px] font-bold uppercase tracking-[0.3em]">
                  {group.category}
                </span>
              </div>

              {/* Accordion Items */}
              <div className="space-y-4">
                {group.items.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setOpenId(openId === item.id ? null : item.id)}
                    className="group bg-white border border-black/[0.02] rounded-[20px] p-6 md:p-8 cursor-pointer transition-all duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_50px_rgba(0,0,0,0.05)]"
                  >
                    <div className="flex justify-between items-center gap-4">
                      <span className="text-base md:text-lg font-montserrat italic font-medium text-[#0C0608]/80 leading-tight">
                        {item.q}
                      </span>
                      {/* Machined Square Button */}
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 shrink-0 ${
                        openId === item.id ? 'bg-[#3D1218] text-white rotate-180' : 'bg-[#F4F4F4] text-[#0C0608]/30'
                      }`}>
                        {openId === item.id ? <Minus size={18} strokeWidth={2.5} /> : <Plus size={18} strokeWidth={2.5} />}
                      </div>
                    </div>

                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      openId === item.id ? 'max-h-[500px] mt-6 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="font-montserrat text-sm md:text-base text-[#0C0608]/60 leading-relaxed pr-6 border-l-2 border-[#D2A546]/20 pl-6 space-y-4">
                        {item.a && <p>{item.a}</p>}
                        {item.intro && <p>{item.intro}</p>}
                        {item.bullets && (
                          <ul className="space-y-2.5">
                            {item.bullets.map((bullet, bIndex) => (
                              <li key={bIndex} className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#3D1218] mt-2 shrink-0" />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                        {item.outro && <p className="pt-2">{item.outro}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 3. CONCIERGE ANCHOR */}
        <div className="mt-20 bg-[#3D1218] rounded-[32px] p-10 md:p-16 text-center shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="font-outfit text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
              Still have questions?
            </h2>
            <p className="font-montserrat text-white/60 mb-10 max-w-md mx-auto text-sm md:text-base">
              Our specialists are available to guide your selection and ensure you find your perfect strand.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <a
                href="mailto:info@sleighstrands.com"
                className="w-full md:w-auto flex items-center justify-center gap-3 bg-[#FDF8F0] text-[#3D1218] px-8 h-[48px] rounded-full font-outfit text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-all"
              >
                <Mail size={16} />
                Email Us
              </a>
              <a
                href="https://www.instagram.com/sleigh_strands?igsh=a2FidnF6d2oxbGRt"
                className="w-full md:w-auto flex items-center justify-center gap-3 border border-white/20 text-white px-8 h-[48px] rounded-full font-outfit text-xs font-bold uppercase tracking-[0.2em] hover:bg-white/5 transition-all"
              >
                <Instagram size={16} />
                Instagram
              </a>
            </div>
          </div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#D2A546]/10 rounded-full blur-[100px]" />
        </div>
      </section>

      <Footer />
    </main>
  );
}
