import type { Metadata } from "next";
import { Montserrat, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import dynamic from 'next/dynamic';
import Script from 'next/script';

// Lazy load non-critical components to speed up initial paint
const CartDrawer = dynamic(() => import('@/components/cart/CartDrawer'), { ssr: false });
const WhatsAppButton = dynamic(() => import('@/components/WhatsAppButton'), { ssr: false });
const NewsletterModal = dynamic(() => import('@/components/ui/NewsletterModal'), { ssr: false });

const sans = Montserrat({ subsets: ["latin"], variable: "--font-sans", weight: ["400", "500", "600", "700"] });
const serif = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-sans", weight: ["400", "500", "600", "700"], style: ["normal", "italic"] });

export const metadata: Metadata = {
  title: "Sleigh Strands | Luxury Hair & Wigs",
  description: "Effortless Glamour, Rooted in Quality.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-F6J2MM8VK3" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-F6J2MM8VK3', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body className="antialiased">
        <CartProvider>
          <WishlistProvider>
            {children}
            <CartDrawer />
            <WhatsAppButton />
            <NewsletterModal />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
