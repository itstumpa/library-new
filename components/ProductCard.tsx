import React, { useState } from 'react';
import { Star, ShoppingCart, Eye, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  originalPrice?: number;
  image: string;
  author?: string;
  stock: number;
  bestseller?: boolean;
  featured?: boolean;
  rating?: number;
  reviews?: number;
  onAddToCart?: (id: string) => void;
  onQuickView?: (id: string) => void;
  onToggleWishlist?: (id: string) => void;
}

export default function ProductCard({
  id,
  name,
//   slug,
  price,
  originalPrice,
  image,
  author,
  stock,
  bestseller,
  rating = 4.5,
  reviews = 100,
  onAddToCart,
  onQuickView,
  onToggleWishlist,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const discount = originalPrice ? Math.round((1 - price / originalPrice) * 100) : 0;

  return (
    <div
      className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-amber-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {discount > 0 && (
          <div className="bg-linear-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            {discount}% OFF
          </div>
        )}
        {bestseller && (
          <div className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            Bestseller
          </div>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={() => onToggleWishlist?.(id)}
        className="absolute top-3 right-3 z-10 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-amber-100 transition-colors shadow-md"
      >
        <Heart className="w-4 h-4 text-slate-700" />
      </button>

      {/* Product Image */}
      <div className="relative aspect-3/4 overflow-hidden bg-linear-to-br from-amber-50 to-orange-50">
        <Image
        width={300}
        height={300}
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Quick Actions Overlay */}
        <div
          className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center gap-3 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Button
            size="sm"
            onClick={() => onQuickView?.(id)}
            className="bg-white text-slate-900 hover:bg-amber-100"
          >
            <Eye className="w-4 h-4 mr-2" />
            Quick View
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5 space-y-3">
        <div>
          {author && (
            <p className="text-xs text-amber-600 font-medium mb-1">{author}</p>
          )}
          <h3 className="font-semibold text-slate-900 line-clamp-1 text-base  group-hover:text-amber-600 transition-colors">
            {name}
          </h3>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(rating)
                    ? 'text-amber-500 fill-amber-500'
                    : 'text-slate-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-slate-600">({reviews})</span>
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-slate-900">${price}</span>
            {originalPrice && (
              <span className="text-sm text-slate-400 line-through">
                ${originalPrice}
              </span>
            )}
          </div>
          <Button
            size="sm"
            onClick={() => onAddToCart?.(id)}
            className="bg-linear-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white"
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>

        {/* Stock indicator */}
        {stock < 10 && stock > 0 && (
          <p className="text-xs text-orange-600 font-medium">
            Only {stock} left in stock!
          </p>
        )}
        {stock === 0 && (
          <p className="text-xs text-red-600 font-medium">Out of Stock</p>
        )}
      </div>
    </div>
  );
}