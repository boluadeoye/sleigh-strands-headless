"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

/* ─── ICONS ───────────────────────────────────────────────────────────────── */

const IconStar = () => (
  <svg width="10" height="10" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="shrink-0">
    <path d="M7 0L8.89 5.11L14 7L8.89 8.89L7 14L5.11 8.89L0 7L5.11 5.11L7 0Z" fill="#D2A546" />
  </svg>
);

const IconPlus = () => (
  <svg width="10" height="10" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="shrink-0">
    <path d="M6 6V0H8V6H14V8H8V14H6V8H0V6H6Z" fill="#D2A546" />
  </svg>
);

const SocialWhatsApp = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-label="WhatsApp">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const SocialInstagram = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-label="Instagram">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const SocialTikTok = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-label="TikTok">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.54V6.78a4.85 4.85 0 01-1.02-.09z"/>
  </svg>
);

const SocialX = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-label="X / Twitter">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

/* ─── DATA ────────────────────────────────────────────────────────────────── */

const SITE_PAGES = [
  { label: "Home Page", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Collection", href: "/#collections" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
];

const ACCOUNT_LINKS = [
  { label: "My Account", href: "/account" },
  { label: "My orders", href: "/account" },
  { label: "Cart Summary", href: "/cart" },
  { label: "Terms & Condition", href: "/terms" },
  { label: "Return Policy", href: "/returns" },
  { label: "Privacy Policy", href: "/privacy" },
];

const CONTACT_INFO = [
  { label: "09056113019", isPhone: true, href: "tel:09056113019", icon: IconPlus },
  { label: "info@sleighstrands.com", isPhone: false, href: "mailto:info@sleighstrands.com", icon: IconStar },
  { label: "Nigeria, United Kingdom", isPhone: false, href: "#", icon: IconStar },
];

/* ─── SHARED PRIMITIVES ───────────────────────────────────────────────────── */

function BulletLink({
  label,
  href,
  isOrange = false,
  icon: Icon = IconStar,
  isRightAligned = false,
}: {
  label: string;
  href: string;
  isOrange?: boolean;
  icon?: React.ElementType;
  isRightAligned?: boolean;
}) {
  return (
    <li className={`grid ${isRightAligned ? 'grid-cols-[1fr_20px]' : 'grid-cols-[20px_1fr]'} items-start`}>
      {!isRightAligned && (
        <div className="pt-[3px] flex justify-start">
          <Icon />
        </div>
      )}
      <Link
        href={href}
        className={`font-montserrat text-[12px] leading-snug transition-colors duration-150 whitespace-nowrap ${
          isRightAligned ? 'text-right pr-2' : ''
        } ${
          isOrange
            ? "text-[#FF6B35] font-semibold hover:opacity-75"
            : "text-white/70 font-medium hover:text-[#D2A546]"
        }`}
      >
        {label}
      </Link>
      {isRightAligned && (
        <div className="pt-[3px] flex justify-end">
          <Icon />
        </div>
      )}
    </li>
  );
}

function PillBadge({
  children,
  variant = "outline",
}: {
  children: React.ReactNode;
  variant?: "outline" | "orange";
}) {
  return (
    <div
      className={`inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-[3px] ${
        variant === "orange" ? "bg-[#FF6B35]" : "border border-white/10"
      }`}
    >
      <span className="font-outfit text-[9px] font-semibold tracking-[0.18em] text-white uppercase">
        {children}
      </span>
    </div>
  );
}

function SocialRow({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 mt-1 ${className}`}>
      <a href="https://wa.me/09056113019" aria-label="WhatsApp" className="!text-white hover:text-[#D2A546] transition-colors duration-150">
        <SocialWhatsApp />
      </a>
      <a href="https://instagram.com/sleigh_strands" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="!text-white hover:text-[#D2A546] transition-colors duration-150">
        <SocialInstagram />
      </a>
      <a href="#" aria-label="TikTok" className="!text-white hover:text-[#D2A546] transition-colors duration-150">
        <SocialTikTok />
      </a>
      <a href="#" aria-label="X / Twitter" className="!text-white hover:text-[#D2A546] transition-colors duration-150">
        <SocialX />
      </a>
    </div>
  );
}

/* ─── FOOTER ──────────────────────────────────────────────────────────────── */

export default function Footer() {
  const [email, setEmail] = useState("");
  // LOGIC FIX: Added 'exists' state
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "exists">("idle");

  useEffect(() => {
    if (status !== "idle" && status !== "loading") {
      const timer = setTimeout(() => setStatus("idle"), 4000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      // LOGIC FIX: Handle 409 Conflict (Existing User)
      if (res.status === 409) {
        setStatus("exists");
        setEmail("");
        return;
      }

      if (!res.ok) throw new Error("Failed");
      
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <footer className="bg-[#3D1218] text-white overflow-hidden">

      {/* MOBILE BLOCK */}
      <div className="md:hidden px-6 pt-10 pb-10 flex flex-col gap-8">
        <div className="flex flex-col">
          <div className="-ml-[32px] w-[220px]">
            <Image
              src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1776160062/blog_assets/vkp8knugjh0e4rmjl385.png"
              alt="Sleigh Strands"
              width={280}
              height={112}
              className="w-full h-auto object-contain object-left"
              priority
            />
          </div>
          <div className="flex flex-col mt-[-12px]">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 px-2.5 py-[3px]">
              <IconStar />
              <span className="font-outfit text-[9px] font-semibold tracking-[0.18em] text-white uppercase">
                Sleighing Your Strands
              </span>
            </div>
            <p className="font-outfit text-[18px] font-medium leading-[0.95] tracking-[-0.05em] text-white mt-3">
              Discover the collection or connect with a specialist for guided selection.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2 relative">
            <h2 className="font-outfit text-[18px] font-medium leading-[1.0] tracking-[-0.03em] text-[#D2A546]">
              Join our newsletter today
            </h2>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2 w-full">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your mail address"
                required
                className="h-[40px] w-full rounded-full bg-[#FDF8F0] px-5 font-montserrat text-xs font-medium text-[#3D1218] placeholder:text-[#3D1218]/45 outline-none border-none"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="h-[40px] w-full rounded-xl bg-[#FDF8F0] font-outfit text-[10px] font-bold tracking-[0.25em] text-[#3D1218] uppercase transition-opacity hover:opacity-90"
              >
                {status === "loading" ? "···" : "Submit"}
              </button>
            </form>
            {/* Status Feedback: Absolute to prevent layout shift */}
            <div className="absolute -bottom-5 left-0 w-full h-4">
              {status === "success" && <p className="text-[9px] text-[#D2A546] font-medium">Successfully subscribed!</p>}
              {status === "exists" && <p className="text-[9px] text-[#D2A546] font-medium">You're already on the list, Sleigh Queen.</p>}
              {status === "error" && <p className="text-[9px] text-red-400 font-medium">Please enter a valid email.</p>}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-6">
            <div className="flex flex-col gap-2">
              <PillBadge variant="outline">Site Pages</PillBadge>
              <ul className="flex flex-col gap-1.5">
                {SITE_PAGES.map(({ label, href }) => (
                  <BulletLink key={label} label={label} href={href} />
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-2">
              <PillBadge variant="outline">Account</PillBadge>
              <ul className="flex flex-col gap-1.5">
                {ACCOUNT_LINKS.map(({ label, href }) => (
                  <BulletLink key={label} label={label} href={href} />
                ))}
              </ul>
            </div>
            <div className="col-span-2 flex flex-col gap-2 mt-2">
              <PillBadge variant="orange">Get In Touch</PillBadge>
              <ul className="flex flex-col gap-1.5">
                {CONTACT_INFO.map(({ label, isPhone, href, icon }) => (
                  <BulletLink key={label} label={label} href={href} isOrange={isPhone} icon={icon} />
                ))}
              </ul>
              <SocialRow className="mt-3" />
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP BLOCK */}
      <div className="hidden md:flex mx-auto max-w-7xl px-14 pt-20 pb-16 min-h-[600px] justify-between items-start">
        <div className="w-[38%] shrink-0 flex flex-col items-start">
          <div className="-ml-[28px] w-[320px]">
            <Image
              src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1776160062/blog_assets/vkp8knugjh0e4rmjl385.png"
              alt="Sleigh Strands"
              width={320}
              height={128}
              className="w-full h-auto object-contain object-left"
              priority
            />
          </div>
          <div className="flex flex-col mt-[-12px]">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 px-2.5 py-[3px]">
              <IconStar />
              <span className="font-outfit text-[9px] font-semibold tracking-[0.18em] text-white uppercase">
                Sleighing Your Strands
              </span>
            </div>
            <p className="font-outfit text-[28px] font-semibold leading-[0.95] tracking-[-0.05em] text-white max-w-[340px] mt-4">
              Discover the collection or connect with a specialist for guided selection.
            </p>
          </div>
        </div>

        <div className="w-[62%] flex flex-col gap-12 mt-[72px]">
          <div className="flex flex-col gap-3 w-full max-w-[480px] items-start relative">
            <h2 className="font-outfit text-[28px] font-medium leading-[1.0] tracking-[-0.03em] text-[#D2A546] text-left w-full -ml-[1px]">
              Join our newsletter today
            </h2>
            <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your mail address"
                required
                className="flex-1 h-[40px] min-w-0 rounded-full bg-[#FDF8F0] px-6 font-montserrat text-sm font-medium text-[#3D1218] placeholder:text-[#3D1218]/45 outline-none border-none"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="h-[40px] shrink-0 px-8 rounded-xl bg-[#FDF8F0] font-outfit text-[11px] font-bold tracking-[0.25em] text-[#3D1218] uppercase transition-opacity hover:opacity-90"
              >
                {status === "loading" ? "···" : "Submit"}
              </button>
            </form>
            {/* Status Feedback: Absolute to prevent layout shift */}
            <div className="absolute -bottom-6 left-0 w-full h-5">
              {status === "success" && <p className="text-[11px] text-[#D2A546] font-medium">Thank you for subscribing!</p>}
              {status === "exists" && <p className="text-[11px] text-[#D2A546] font-medium">You're already on the list, Sleigh Queen.</p>}
              {status === "error" && <p className="text-[11px] text-red-400 font-medium">Please enter a valid email address.</p>}
            </div>
          </div>

          <div className="grid grid-cols-[1fr_1fr_auto] gap-x-8 w-full items-start">
            <div className="flex flex-col gap-2">
              <PillBadge variant="outline">Site Pages</PillBadge>
              <ul className="mt-1 flex flex-col gap-1.5">
                {SITE_PAGES.map(({ label, href }) => (
                  <BulletLink key={label} label={label} href={href} />
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-2">
              <PillBadge variant="outline">Account</PillBadge>
              <ul className="mt-1 flex flex-col gap-1.5">
                {ACCOUNT_LINKS.map(({ label, href }) => (
                  <BulletLink key={label} label={label} href={href} />
                ))}
              </ul>
            </div>

            <div className="flex flex-col items-end gap-2 ml-auto">
              <PillBadge variant="orange">Get In Touch</PillBadge>
              <ul className="mt-1 flex flex-col items-end gap-1.5 w-fit">
                {CONTACT_INFO.map(({ label, isPhone, href, icon }) => (
                  <BulletLink key={label} label={label} href={href} isOrange={isPhone} icon={icon} isRightAligned={true} />
                ))}
              </ul>
              <SocialRow className="mt-2 justify-end w-full" />
            </div>
          </div>
        </div>

      </div>

      <div className="border-t border-white/[0.08]">
        <div className="mx-auto max-w-7xl px-14 py-[16px]">
          <p className="text-center font-montserrat text-[9px] font-medium tracking-[0.3em] text-white/30 uppercase">
            © {new Date().getFullYear()} SLEIGHSTRANDS. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>

    </footer>
  );
}