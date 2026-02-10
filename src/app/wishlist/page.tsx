"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/src/context/CartContext";
import { useWishlist } from "@/src/context/WishlistContext";
import { ArrowLeft, Heart, ShoppingCart, Star, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, moveToCart } = useWishlist();
  const { isInCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-white pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-linear-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <Heart className="w-16 h-16 text-red-500" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Your wishlist is empty
            </h2>
            <p className="text-slate-600 mb-8">
              Save your favorite items to your wishlist and shop them later!
            </p>
            <Link href="/allproducts">
              <Button className="bg-linear-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Explore Products
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
              <h1 className="text-4xl font-bold text-slate-900 flex items-center gap-3">
                <Heart className="w-10 h-10 text-red-500 fill-red-500" />
                My Wishlist
              </h1>
              <p className="text-slate-600 mt-2">
                {wishlist.length} {wishlist.length === 1 ? "item" : "items"}{" "}
                saved
              </p>
            </div>
          </div>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((item) => {
            const discount = item.originalPrice
              ? Math.round((1 - item.price / item.originalPrice) * 100)
              : 0;
            const inCart = isInCart(item.id);

            return (
              <div
                key={item.id}
                className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-amber-100"
              >
                {/* Product Image */}
                <div className="relative aspect-3/4 overflow-hidden bg-linear-to-br from-amber-50 to-orange-50">
                  <Link href={`/product/${item.id}`}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </Link>

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {discount > 0 && (
                      <div className="bg-linear-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        {discount}% OFF
                      </div>
                    )}
                    {item.bestseller && (
                      <div className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        Bestseller
                      </div>
                    )}
                  </div>

                  {/* Remove Button */}
                  <Button
                    size="sm"
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-3 right-3 w-9 h-9 p-0 bg-white/90 backdrop-blur-sm hover:bg-red-50 text-red-600 shadow-md"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>

                  {/* Stock Badge */}
                  {item.stock === 0 && (
                    <div className="absolute bottom-3 left-3 right-3 bg-red-500 text-white text-center py-2 rounded-lg font-semibold text-sm">
                      Out of Stock
                    </div>
                  )}
                  {item.stock > 0 && item.stock < 10 && (
                    <div className="absolute bottom-3 left-3 right-3 bg-orange-500 text-white text-center py-2 rounded-lg font-semibold text-xs">
                      Only {item.stock} left!
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-5 space-y-3">
                  <div>
                    {item.author && (
                      <p className="text-xs text-amber-600 font-medium mb-1">
                        {item.author}
                      </p>
                    )}
                    <Link href={`/product/${item.id}`}>
                      <h3 className="font-semibold text-slate-900 line-clamp-2 text-base hover:text-amber-600 transition-colors">
                        {item.name}
                      </h3>
                    </Link>
                  </div>

                  {/* Rating */}
                  {item.rating && (
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < Math.floor(item.rating || 0)
                                ? "text-amber-500 fill-amber-500"
                                : "text-slate-300"
                            }`}
                          />
                        ))}
                      </div>
                      {item.reviews && (
                        <span className="text-xs text-slate-600">
                          ({item.reviews})
                        </span>
                      )}
                    </div>
                  )}

                  {/* Price */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-slate-900">
                      ${item.price}
                    </span>
                    {item.originalPrice && (
                      <span className="text-sm text-slate-400 line-through">
                        ${item.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="space-y-2 pt-2">
                    <Button
                      onClick={() => moveToCart(item.id)}
                      disabled={item.stock === 0 || inCart}
                      className={`w-full ${
                        inCart
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-linear-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                      } text-white disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {inCart
                        ? "In Cart"
                        : item.stock === 0
                          ? "Out of Stock"
                          : "Move to Cart"}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Move All to Cart Button */}
        {wishlist.length > 0 && (
          <div className="mt-12 text-center">
            <Button
              onClick={() => {
                wishlist.forEach((item) => {
                  if (item.stock > 0 && !isInCart(item.id)) {
                    moveToCart(item.id);
                  }
                });
              }}
              className="bg-linear-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-6 text-lg"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Move All Available Items to Cart
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
