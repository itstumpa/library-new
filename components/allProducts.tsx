import React, { useState, useEffect } from 'react';
import {  ShoppingCart, Eye, Heart, Filter, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { categories, products } from '@/src/data/mock-data';
import Image from 'next/image';
// import { products, categories } from '../data/mock-data';

export default function AllProducts() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const id = requestAnimationFrame(() => {

      setIsVisible(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  // Filter and sort products
  let filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.categoryId === selectedCategory);

  // Sort products
  if (sortBy === 'price-low') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'name') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <section className="py-16 md:py-24 bg-linear-to-br from-amber-50 via-white to-orange-50 relative overflow-hidden">
      <div className="absolute top-20 right-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl" />
      
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
        {/* Header */}
        <div 
          className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ animation: isVisible ? 'fadeInUp 0.8s ease-out' : 'none' }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            All Products
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Browse our complete collection of {products.length} premium books and stationery items
          </p>
        </div>

        {/* Filter and Sort Bar */}
        <div 
          className={`bg-white border border-amber-200 rounded-xl p-4 mb-8 shadow-sm transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ animation: isVisible ? 'fadeInUp 0.8s ease-out 0.2s both' : 'none' }}
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Category Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-5 h-5 text-slate-600" />
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-linear-to-r from-amber-600 to-orange-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-amber-50'
                }`}
              >
                All
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-linear-to-r from-amber-600 to-orange-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-amber-50'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Sort and View */}
            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg border border-slate-300 text-sm font-medium text-slate-700 focus:outline-none focus:border-amber-500"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>

              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${
                    viewMode === 'grid'
                      ? 'bg-amber-100 text-amber-600'
                      : 'bg-slate-100 text-slate-600 hover:bg-amber-50'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${
                    viewMode === 'list'
                      ? 'bg-amber-100 text-amber-600'
                      : 'bg-slate-100 text-slate-600 hover:bg-amber-50'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-slate-600 mb-6">
          Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
        </p>

        {/* Products Grid/List */}
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          : "space-y-4"
        }>
          {filteredProducts.map((product, index) => (
            viewMode === 'grid' ? (
              // Grid View
              <div
                key={product.id}
                className={`group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-amber-100 ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ 
                  animation: isVisible ? `scaleIn 0.6s ease-out ${0.3 + index * 0.05}s both` : 'none'
                }}
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {product.originalPrice && (
                  <div className="absolute top-3 left-3 z-10 bg-linear-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </div>
                )}

                <button className="absolute top-3 right-3 z-10 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-amber-100 transition-colors shadow-md">
                  <Heart className="w-4 h-4 text-slate-700" />
                </button>

                <div className="relative aspect-3/4 overflow-hidden bg-linear-to-br from-amber-50 to-orange-50">
                  <Image
                  width={400}
                  height={400}
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  <div className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center gap-3 transition-opacity duration-300 ${
                    hoveredId === product.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <Button size="sm" className="bg-white text-slate-900 hover:bg-amber-100">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <p className="text-xs text-amber-600 font-medium mb-1">{product.author}</p>
                    <h3 className="font-semibold text-slate-900 text-base line-clamp-2 group-hover:text-amber-600 transition-colors">
                      {product.name}
                    </h3>
                  </div>

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
                </div>
              </div>
            ) : (
              // List View
              <div
                key={product.id}
                className={`group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-amber-100 ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ 
                  animation: isVisible ? `scaleIn 0.6s ease-out ${0.3 + index * 0.05}s both` : 'none'
                }}
              >
                <div className="flex gap-6 p-6">
                  <div className="relative w-32 h-40 shrink-0 overflow-hidden rounded-lg bg-linear-to-br from-amber-50 to-orange-50">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={128}
                      height={160}
                      className="w-full h-full object-cover"
                    />
                    {product.originalPrice && (
                      <div className="absolute top-2 left-2 bg-linear-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                      </div>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-xs text-amber-600 font-medium mb-1">{product.author}</p>
                      <h3 className="font-semibold text-slate-900 text-lg mb-2 group-hover:text-amber-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-slate-600 line-clamp-2">{product.description}</p>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-slate-900">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-slate-400 line-through">${product.originalPrice}</span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="border-amber-300 text-amber-700 hover:bg-amber-50">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-linear-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white"
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
}