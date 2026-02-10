"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'sonner';
import { useCart } from './CartContext';
import { Product, WishlistContextType } from '../hooks/useCart';

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const { addToCart } = useCart();

  const addToWishlist = (product: Product) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.some((item) => item.id === product.id)) {
        toast.info(`"${product.name}" is already in your wishlist`);
        return prevWishlist;
      }
      toast.success(`"${product.name}" added to wishlist`, { duration: 3000 });
      return [...prevWishlist, product];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prevWishlist) => {
      const item = prevWishlist.find((item) => item.id === productId);
      if (item) {
        toast.success(`"${item.name}" removed from wishlist`);
      }
      return prevWishlist.filter((item) => item.id !== productId);
    });
  };

  const toggleWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  const getWishlistCount = () => {
    return wishlist.length;
  };

  const moveToCart = (productId: string) => {
    const product = wishlist.find((item) => item.id === productId);
    if (product) {
      addToCart(product, 1);
      removeFromWishlist(productId);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        getWishlistCount,
        moveToCart,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}