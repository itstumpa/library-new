"use client";

import { CartProvider } from '@/src/context/CartContext';
import { WishlistProvider } from '@/src/context/WishlistContext';
import React from 'react';
import { Toaster } from 'sonner';
// import { WishlistProvider } from './ProductCard';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
       <WishlistProvider>
        {children}
        <Toaster 
          position="top-right" 
          richColors 
          closeButton
          duration={3000}
        />
      </WishlistProvider>
    </CartProvider>
  );
}