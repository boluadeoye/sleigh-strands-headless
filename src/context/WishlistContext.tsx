"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import Toast from '@/components/ui/Toast';

type WishlistContextType = {
  wishlistIds: number[];
  toggleWishlist: (productId: number) => void;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishlistIds, setWishlistIds] = useState<number[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const [isToastVisible, setIsToastVisible] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('sleigh_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUserId(user.id);
      
      fetch(`/api/user?id=${user.id}`, { cache: 'no-store' })
        .then(res => res.json())
        .then(data => {
          if (data.customer?.meta_data) {
            const meta = data.customer.meta_data.find((m: any) => m.key === '_sleigh_wishlist');
            if (meta && meta.value) {
              const ids = String(meta.value).split(',').filter(Boolean).map(Number);
              setWishlistIds(ids);
            }
          }
        })
        .catch(() => {});
    }
  }, []);

  const toggleWishlist = async (productId: number) => {
    if (!userId) {
      // REPLACED alert() with designed Toast
      setIsToastVisible(true);
      setTimeout(() => setIsToastVisible(false), 6000);
      return;
    }

    setWishlistIds(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );

    try {
      await fetch('/api/user/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, productId })
      });
    } catch (error) {
      console.error("Sync failed");
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlistIds, toggleWishlist }}>
      {children}
      <Toast isVisible={isToastVisible} onClose={() => setIsToastVisible(false)} />
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within WishlistProvider');
  return context;
};
