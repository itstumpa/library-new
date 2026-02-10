"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/src/context/CartContext";
import {
  ArrowLeft,
  Minus,
  Package,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
// import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart } =
    useCart();

  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-white pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-linear-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingBag className="w-16 h-16 text-amber-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-slate-600 mb-8">
              Looks like you haven&apos;t added anything to your cart yet.
            </p>
            <Link href="/allproducts">
              <Button className="bg-linear-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-white pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/allproducts"
            className="inline-flex items-center text-amber-600 hover:text-amber-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-900">
                Shopping Cart
              </h1>
              <p className="text-slate-600 mt-2">
                {cart.length} {cart.length === 1 ? "item" : "items"} in your
                cart
              </p>
            </div>
            <Button
              variant="outline"
              onClick={clearCart}
              className="border-red-300 text-red-600 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Cart
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => {
              const discount = item.originalPrice
                ? Math.round((1 - item.price / item.originalPrice) * 100)
                : 0;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-xl p-6 shadow-sm border border-amber-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <div className="relative w-32 h-40 shrink-0 bg-linear-to-br from-amber-50 to-orange-50 rounded-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                      {discount > 0 && (
                        <div className="absolute top-2 left-2 bg-linear-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          {discount}% OFF
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        {item.author && (
                          <p className="text-xs text-amber-600 font-medium mb-1">
                            {item.author}
                          </p>
                        )}
                        <Link href={`/product/${item.id}`}>
                          <h3 className="text-lg font-semibold text-slate-900 hover:text-amber-600 transition-colors mb-2">
                            {item.name}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-2xl font-bold text-slate-900">
                            ${item.price}
                          </span>
                          {item.originalPrice && (
                            <span className="text-sm text-slate-400 line-through">
                              ${item.originalPrice}
                            </span>
                          )}
                        </div>
                        {item.stock < 10 && (
                          <p className="text-xs text-orange-600 font-medium mb-2">
                            <Package className="w-3 h-3 inline mr-1" />
                            Only {item.stock} left in stock
                          </p>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-8 h-8 p-0 border-amber-300 hover:bg-amber-50"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="text-lg font-semibold text-slate-900 w-12 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            disabled={item.quantity >= item.stock}
                            className="w-8 h-8 p-0 border-amber-300 hover:bg-amber-50 disabled:opacity-50"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="text-lg font-bold text-slate-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-amber-100 sticky top-32">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Tax (10%)</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>

                {subtotal < 50 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <p className="text-xs text-amber-700">
                      Add <strong>${(50 - subtotal).toFixed(2)}</strong> more to
                      get FREE shipping!
                    </p>
                  </div>
                )}

                <div className="border-t border-slate-200 pt-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-lg font-bold text-slate-900">
                      Total
                    </span>
                    <span className="text-3xl font-bold text-amber-600">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-linear-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white h-12 text-lg font-semibold mb-4">
                Proceed to Checkout
              </Button>

              <Link href="/allproducts">
                <Button
                  variant="outline"
                  className="w-full border-amber-300 text-amber-700 hover:bg-amber-50"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Button>
              </Link>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-slate-200 space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Package className="w-4 h-4 text-green-600" />
                  </div>
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4 text-blue-600" />
                  </div>
                  <span>30-day return policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
