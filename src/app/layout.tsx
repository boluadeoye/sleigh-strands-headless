import type { Metadata } from "next";
import { Montserrat, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import UIShell from '@/components/ui/UIShell';
import Script from 'next/script';

const sans = Montserrat({ subsets: ["latin"], variable: "--font-sans", weight: ["400", "500", "600", "700"] });
const serif = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-serif", weight: ["400", "500", "600", "700"], style: ["normal", "italic"] });

export const metadata: Metadata = {
  title: "Sleigh Strands | Luxury Hair & Wigs",
  description: "Effortless Glamour, Rooted in Quality.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <head>
        <Script src="https://checkout.flutterwave.com/v3.js" strategy="beforeInteractive" />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-057GNKMWFL" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-057GNKMWFL', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body className="antialiased">
        <CartProvider>
          <WishlistProvider>
            {children}
            <UIShell />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
