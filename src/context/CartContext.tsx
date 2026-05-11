"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

type CartItem = { 
  id: number; 
  variationId?: number;
  name: string; 
  price: number; 
  image: string; 
  quantity: number; 
  selectedAttributes?: any;
};

type Coupon = { code: string; amount: number; type: string; } | null;

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: any, qty?: number, variation?: any) => void;
  removeFromCart: (id: number, variationId?: number) => void;
  updateQuantity: (id: number, delta: number, variationId?: number) => void;
  setQuantity: (id: number, qty: number, variationId?: number) => void;
  clearCart: () => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  subtotal: number;
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
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem('sleigh_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: any, qty: number = 1, variation: any = null) => {
    setCart(prev => {
      // Check if this specific variation (or simple product) is already in cart
      const existing = prev.find(item => 
        variation ? item.variationId === variation.id : (item.id === product.id && !item.variationId)
      );
      
      if (existing) {
        return prev.map(item => 
          (variation ? item.variationId === variation.id : (item.id === product.id && !item.variationId))
            ? { ...item, quantity: item.quantity + qty } 
            : item
        );
      }

      // FIX: Correctly extract attribute options to prevent [OBJECT OBJECT]
      let variantLabel = "";
      if (variation && variation.attributes) {
        // WooCommerce attributes are usually an array of {name, option}
        if (Array.isArray(variation.attributes)) {
          variantLabel = variation.attributes.map((a: any) => a.option).filter(Boolean).join(' / ');
        } else {
          // Fallback for object-style attributes
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
        selectedAttributes: variation?.attributes || null
      }];
    });
    setIsDrawerOpen(true);
  };

  const removeFromCart = (id: number, variationId?: number) => {
    setCart(prev => prev.filter(item => variationId ? item.variationId !== variationId : item.id !== id));
  };

  const updateQuantity = (id: number, delta: number, variationId?: number) => {
    setCart(prev => prev.map(item => 
      (variationId ? item.variationId === variationId : (item.id === id && !item.variationId))
        ? { ...item, quantity: Math.max(1, item.quantity + delta) } 
        : item
    ));
  };

  const setQuantity = (id: number, qty: number, variationId?: number) => {
    setCart(prev => prev.map(item => 
      (variationId ? item.variationId === variationId : (item.id === id && !item.variationId))
        ? { ...item, quantity: Math.max(1, qty) } 
        : item
    ));
  };

  const clearCart = () => {
    setCart([]);
    setCoupon(null);
    localStorage.removeItem('sleigh_cart');
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  let discountTotal = 0;
  if (coupon) {
    if (coupon.type === 'percent') discountTotal = subtotal * (coupon.amount / 100);
    else if (coupon.type === 'fixed_cart') discountTotal = coupon.amount;
    discountTotal = Math.min(discountTotal, subtotal);
  }

  return (
    <CartContext.Provider value={{
      cart, addToCart, removeFromCart, updateQuantity, setQuantity, clearCart,
      isDrawerOpen, setIsDrawerOpen, subtotal, coupon, setCoupon, discountTotal
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
