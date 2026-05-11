"use client";
import dynamic from 'next/dynamic';

// These are now safely lazy-loaded on the client side only
const CartDrawer = dynamic(() => import('@/components/cart/CartDrawer'), { ssr: false });
const WhatsAppButton = dynamic(() => import('@/components/WhatsAppButton'), { ssr: false });
const NewsletterModal = dynamic(() => import('@/components/ui/NewsletterModal'), { ssr: false });

export default function UIShell() {
  return (
    <>
      <CartDrawer />
      <WhatsAppButton />
      <NewsletterModal />
    </>
  );
}
