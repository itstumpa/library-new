"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
// import { Product, CartItem, CartContextType } from '@/types/cart';
import { toast } from 'sonner';
import { CartContextType, CartItem, Product } from '../hooks/useCart';

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        
        // Check stock availability
        if (newQuantity > product.stock) {
          toast.error(`Only ${product.stock} items available in stock`);
          return prevCart;
        }

        toast.success(
          `Added ${quantity} more "${product.name}" to cart (Total: ${newQuantity})`,
          { duration: 3000 }
        );

        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: newQuantity }
            : item
        );
      }

      // Check stock for new item
      if (quantity > product.stock) {
        toast.error(`Only ${product.stock} items available in stock`);
        return prevCart;
      }

      toast.success(`"${product.name}" added to cart`, { duration: 3000 });
      return [...prevCart, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => {
      const item = prevCart.find((item) => item.id === productId);
      if (item) {
        toast.success(`"${item.name}" removed from cart`);
      }
      return prevCart.filter((item) => item.id !== productId);
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) => {
      const item = prevCart.find((item) => item.id === productId);
      
      if (item && quantity > item.stock) {
        toast.error(`Only ${item.stock} items available in stock`);
        return prevCart;
      }

      return prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
    });
  };

  const clearCart = () => {
    setCart([]);
    toast.success('Cart cleared');
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const isInCart = (productId: string) => {
    return cart.some((item) => item.id === productId);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}