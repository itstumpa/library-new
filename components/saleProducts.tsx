import React, { useState, useEffect } from 'react';
import { ShoppingCart, Eye, Heart, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products } from '@/src/data/mock-data';
import Image from 'next/image';
// import { products } from '../data/mock-data';

export default function SaleProducts() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsVisible(true);
  }, []);

  // Filter products that have originalPrice (on sale)
  const saleProducts = products.filter(p => p.originalPrice && p.originalPrice > p.price);

  const calculateDiscount = (price: number, originalPrice: number) => {
    return Math.round((1 - price / originalPrice) * 100);
  };

  return (
    <section id="sale" className=" bg-linear-to-br from-orange-50 via-white to-red-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-red-200/20 rounded-full blur-3xl" />
      
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>

      <div  className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 py-14">
        {/* Section Header */}
        <div 
          className={`text-center mb-6 transition-all duration-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ animation: isVisible ? 'fadeInUp 0.8s ease-out' : 'none' }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-orange-100 to-red-100 border border-orange-200 mb-4">
            <Tag className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-medium text-orange-800">Limited Time Offers</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-red-500">
              Hot Deals & Sales
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Don&apos;t miss out on these amazing discounts! Save big on your favorite books and stationery
          </p>
        </div>

        {/* Sale Stats */}
        <div 
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ animation: isVisible ? 'fadeInUp 0.8s ease-out 0.2s both' : 'none' }}
        >
        </div>
        <div className='flex  items-center gap-2 py-4 px-2'>
              
              <div className="text-xl font-bold text-orange-600">{saleProducts.length}</div>
              <div className= "text-xl text-slate-600">Items on Sale</div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 flex-1 gap-6">
          {saleProducts.map((product, index) => {
            const discount = product.originalPrice ? calculateDiscount(product.price, product.originalPrice) : 0;
            
            return (
              <div
                key={product.id}
                className={`group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-orange-100 ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ 
                  animation: isVisible ? `scaleIn 0.6s ease-out ${0.3 + index * 0.1}s both` : 'none'
                }}
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Discount Badge with animation */}
                <div 
                  className="absolute top-3 left-3 z-10 bg-linear-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
                  style={{ animation: 'pulse 2s ease-in-out infinite' }}
                >
                  {discount}% OFF
                </div>

                {/* Bestseller Badge */}
                {product.bestseller && (
                  <div className="absolute top-3 left-3 mt-10 z-10 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    Bestseller
                  </div>
                )}

                {/* Wishlist Button */}
                <button className="absolute top-3 right-3 z-10 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-orange-100 transition-colors shadow-md">
                  <Heart className="w-4 h-4 text-slate-700" />
                </button>

                {/* Product Image */}
                <div className="relative aspect-4/4 overflow-hidden bg-linear-to-br from-amber-50 to-orange-50">
                                <Image
                                width={300}
                                height={300}
                                  src={product.image}
                                  alt={product.name}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                  {/* Quick Actions Overlay */}
                  <div className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center gap-3 transition-opacity duration-300 ${
                    hoveredId === product.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <Button size="sm" className="bg-white text-slate-900 hover:bg-orange-100">
                      <Eye className="w-4 h-4 mr-2" />
                      Quick View
                    </Button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-5 space-y-3">
                  <div>
                    <p className="text-xs text-orange-600 font-medium mb-1">{product.author || product.brand}</p>
                    <h3 className="font-semibold text-slate-900 text-base line-clamp-2 group-hover:text-orange-600 transition-colors">
                      {product.name}
                    </h3>
                  </div>

                  {/* Price & Savings */}
                  <div className="space-y-1 flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-orange-600">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-slate-400 line-through">${product.originalPrice}</span>
                      )}
                    </div>
                    {product.originalPrice && (
                      <p className="text-xs text-green-600 font-medium">
                        Save ${(product.originalPrice - product.price).toFixed(0)}
                      </p>
                    )}
                  </div>

                  {/* Add to Cart */}
                  <Button 
                    className="w-full bg-linear-to-r from-orange-500 to-red-500 hover:from-orange-700 hover:to-red-700 text-white"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>

                  {/* Stock indicator */}
                  {product.stock < 10 && (
                    <p className="text-xs text-red-600 font-medium text-center">
                      🔥 Only {product.stock} left - Hurry!
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}