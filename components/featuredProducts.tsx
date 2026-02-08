import React, { useState, useEffect } from 'react';
import { Star, ShoppingCart, Eye, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

// Mock data - replace with your actual import
const products = [
  {
    id: 'prod-1',
    name: 'The Midnight Library',
    slug: 'the-midnight-library',
    description: 'Between life and death there is a library, and within that library, the shelves go on forever.',
    price: 24.99,
    originalPrice: 29.99,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600',
    categoryId: 'cat-1',
    stock: 45,
    featured: true,
    bestseller: true,
    author: 'Matt Haig',
    rating: 4.8,
    reviews: 245,
  },
  {
    id: 'prod-2',
    name: 'Atomic Habits',
    slug: 'atomic-habits',
    description: 'An easy & proven way to build good habits & break bad ones.',
    price: 19.99,
    originalPrice: 27.99,
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600',
    categoryId: 'cat-2',
    stock: 32,
    featured: true,
    bestseller: true,
    author: 'James Clear',
    rating: 4.9,
    reviews: 512,
  },
  {
    id: 'prod-3',
    name: 'The Psychology of Money',
    slug: 'psychology-of-money',
    description: 'Timeless lessons on wealth, greed, and happiness.',
    price: 22.99,
    originalPrice: 28.99,
    image: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=600',
    categoryId: 'cat-3',
    stock: 28,
    featured: true,
    bestseller: false,
    author: 'Morgan Housel',
    rating: 4.7,
    reviews: 189,
  },
  {
    id: 'prod-4',
    name: 'Educated',
    slug: 'educated',
    description: 'A memoir about a young girl who leaves her survivalist family.',
    price: 18.99,
    originalPrice: 24.99,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600',
    categoryId: 'cat-1',
    stock: 41,
    featured: true,
    bestseller: true,
    author: 'Tara Westover',
    rating: 4.6,
    reviews: 321,
  },
];

export default function FeaturedProducts() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => {

      setIsVisible(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const featuredProducts = products.filter(p => p.featured);

  return (
    <section className="py-16 md:py-24 bg-linear-to-br from-amber-50 via-white to-orange-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl" />
      
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div 
          className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ animation: isVisible ? 'fadeInUp 0.8s ease-out' : 'none' }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 border border-amber-200 mb-4">
            <Star className="w-4 h-4 text-amber-600 fill-amber-600" />
            <span className="text-sm font-medium text-amber-800">Handpicked for You</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover our carefully curated selection of bestselling books and premium stationery
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className={`group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-amber-100 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ 
                animation: isVisible ? `scaleIn 0.6s ease-out ${index * 0.1}s both` : 'none'
              }}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Discount Badge */}
              {product.originalPrice && (
                <div className="absolute top-3 left-3 z-10 bg-linear-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </div>
              )}

              {/* Wishlist Button */}
              <button className="absolute top-3 right-3 z-10 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-amber-100 transition-colors shadow-md">
                <Heart className="w-4 h-4 text-slate-700" />
              </button>

              {/* Product Image */}
              <div className="relative aspect-3/4 overflow-hidden bg-linear-to-br from-amber-50 to-orange-50">
                <Image
                width={400}
                height={400}
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Quick Actions Overlay */}
                <div className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center gap-3 transition-opacity duration-300 ${
                  hoveredId === product.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <Button size="sm" className="bg-white text-slate-900 hover:bg-amber-100">
                    <Eye className="w-4 h-4 mr-2" />
                    Quick View
                  </Button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5 space-y-3">
                <div>
                  <p className="text-xs text-amber-600 font-medium mb-1">{product.author}</p>
                  <h3 className="font-semibold text-slate-900 text-base line-clamp-2 group-hover:text-amber-600 transition-colors">
                    {product.name}
                  </h3>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(product.rating) 
                            ? 'text-amber-500 fill-amber-500' 
                            : 'text-slate-300'
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-xs text-slate-600">({product.reviews})</span>
                </div>

                {/* Price & Action */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-slate-900">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-slate-400 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                  <Button 
                    size="sm" 
                    className="bg-linear-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </Button>
                </div>

                {/* Stock indicator */}
                {product.stock < 10 && (
                  <p className="text-xs text-orange-600 font-medium">Only {product.stock} left in stock!</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div 
          className={`text-center mt-12 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ animation: isVisible ? 'fadeInUp 0.8s ease-out 0.5s both' : 'none' }}
        >
          <Button className="h-12 px-8 bg-linear-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-lg">
            View All Featured Products
          </Button>
        </div>
      </div>
    </section>
  );
}