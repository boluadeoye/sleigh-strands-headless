"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

export type GiftPackagingOption = {
  id: 'standard' | 'premium';
  name: string;
  price: number;
  message?: string;
};

export type CartItem = {
  id: number;
  variationId?: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedAttributes?: any;
  stock_status?: string;
  backorders?: string;
  giftPackaging?: GiftPackagingOption;
};

type Coupon = { code: string; amount: number; type: string; } | null;

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: any, qty?: number, variation?: any, giftPackaging?: GiftPackagingOption) => void;
  removeFromCart: (id: number, variationId?: number, giftPackagingId?: string, giftMessage?: string) => void;
  updateQuantity: (id: number, delta: number, variationId?: number, giftPackagingId?: string, giftMessage?: string) => void;
  setQuantity: (id: number, qty: number, variationId?: number, giftPackagingId?: string, giftMessage?: string) => void;
  clearCart: () => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  subtotal: number;
  giftPackagingTotal: number;
  coupon: Coupon;
  setCoupon: (coupon: Coupon) => void;
  discountTotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [coupon, setCoupon] = useState<Coupon>(null);

  useEffect(() => {
    const savedCart = localStorage.getItem('sleigh_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        setCart([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('sleigh_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (
    product: any,
    qty: number = 1,
    variation: any = null,
    giftPackaging: GiftPackagingOption = { id: 'standard', name: 'Standard Packaging', price: 0 }
  ) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => {
        const sameVar = variation ? item.variationId === variation.id : (item.id === product.id && !item.variationId);
        const itemGiftId = item.giftPackaging?.id || 'standard';
        const targetGiftId = giftPackaging?.id || 'standard';
        const itemGiftMsg = (item.giftPackaging?.message || '').trim();
        const targetGiftMsg = (giftPackaging?.message || '').trim();
        return sameVar && itemGiftId === targetGiftId && itemGiftMsg === targetGiftMsg;
      });

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += qty;
        return updated;
      }

      let variantLabel = "";
      if (variation && variation.attributes) {
        if (Array.isArray(variation.attributes)) {
          variantLabel = variation.attributes.map((a: any) => a.option).filter(Boolean).join(' / ');
        } else {
          variantLabel = Object.values(variation.attributes).join(' / ');
        }
      }
      const finalName = variantLabel ? `${product.name} - ${variantLabel}` : product.name;

      return [...prev, {
        id: product.id,
        variationId: variation?.id,
        name: finalName,
        price: parseFloat(variation?.price || product.price || "0"),
        image: variation?.image?.src || product.images?.[0]?.src || "",
        quantity: qty,
        selectedAttributes: variation?.attributes || null,
        stock_status: variation?.stock_status || product.stock_status,
        backorders: variation?.backorders || product.backorders,
        giftPackaging: giftPackaging || { id: 'standard', name: 'Standard Packaging', price: 0 }
      }];
    });
    setIsDrawerOpen(true);
  };

  const removeFromCart = (id: number, variationId?: number, giftPackagingId?: string, giftMessage?: string) => {
    setCart(prev => prev.filter(item => {
      const matchVar = variationId ? item.variationId === variationId : (item.id === id && !item.variationId);
      const matchGiftId = (item.giftPackaging?.id || 'standard') === (giftPackagingId || 'standard');
      const matchMsg = (item.giftPackaging?.message || '').trim() === (giftMessage || '').trim();
      return !(matchVar && matchGiftId && matchMsg);
    }));
  };

  const updateQuantity = (id: number, delta: number, variationId?: number, giftPackagingId?: string, giftMessage?: string) => {
    setCart(prev => prev.map(item => {
      const matchVar = variationId ? item.variationId === variationId : (item.id === id && !item.variationId);
      const matchGiftId = (item.giftPackaging?.id || 'standard') === (giftPackagingId || 'standard');
      const matchMsg = (item.giftPackaging?.message || '').trim() === (giftMessage || '').trim();
      if (matchVar && matchGiftId && matchMsg) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const setQuantity = (id: number, qty: number, variationId?: number, giftPackagingId?: string, giftMessage?: string) => {
    setCart(prev => prev.map(item => {
      const matchVar = variationId ? item.variationId === variationId : (item.id === id && !item.variationId);
      const matchGiftId = (item.giftPackaging?.id || 'standard') === (giftPackagingId || 'standard');
      const matchMsg = (item.giftPackaging?.message || '').trim() === (giftMessage || '').trim();
      if (matchVar && matchGiftId && matchMsg) {
        return { ...item, quantity: Math.max(1, qty) };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
    setCoupon(null);
    localStorage.removeItem('sleigh_cart');
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const giftPackagingTotal = cart.reduce((acc, item) => {
    const giftFee = (item.giftPackaging?.id === 'premium' ? item.giftPackaging.price : 0) || 0;
    return acc + (giftFee * item.quantity);
  }, 0);

  let discountTotal = 0;
  if (coupon) {
    if (coupon.type === 'percent') discountTotal = subtotal * (coupon.amount / 100);
    else if (coupon.type === 'fixed_cart') discountTotal = coupon.amount;
    discountTotal = Math.min(discountTotal, subtotal);
  }

  return (
    <CartContext.Provider value={{
      cart, addToCart, removeFromCart, updateQuantity, setQuantity, clearCart,
      isDrawerOpen, setIsDrawerOpen, subtotal, giftPackagingTotal, coupon, setCoupon, discountTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
