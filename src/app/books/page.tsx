"use client"
import React, { useState, useEffect, useMemo } from 'react';
import { BookOpen, Grid, List, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { categories, products } from '@/src/data/mock-data';
import CategoryFilter from '@/components/CategoryFilter';
import ProductCard from '@/components/ProductCard';
import Image from 'next/image';

export default function BooksCategory() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setIsVisible(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  // Filter only book products (assuming books have author field)
  const bookProducts = products.filter(p => p.author);

  // Get book categories
  const bookCategories = categories.map(cat => ({
    ...cat,
    productCount: bookProducts.filter(p => p.categoryId === cat.id).length,
  }));

  // Filter Handlers
  const handlePriceRangeChange = (range: string) => {
    setSelectedPriceRanges(prev =>
      prev.includes(range)
        ? prev.filter(r => r !== range)
        : [...prev, range]
    );
  };

  const handleAvailabilityChange = (availability: string) => {
    setSelectedAvailability(prev =>
      prev.includes(availability)
        ? prev.filter(a => a !== availability)
        : [...prev, availability]
    );
  };

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSelectedPriceRanges([]);
    setSelectedAvailability([]);
  };

  // ✅ COMPLETE FILTERING LOGIC
  const filteredProducts = useMemo(() => {
    let filtered = [...bookProducts];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.categoryId === selectedCategory);
    }

    // Filter by price range
    if (selectedPriceRanges.length > 0) {
      filtered = filtered.filter(product => {
        return selectedPriceRanges.some(range => {
          switch (range) {
            case 'under-20':
              return product.price < 20;
            case '20-40':
              return product.price >= 20 && product.price <= 40;
            case '40-60':
              return product.price >= 40 && product.price <= 60;
            case 'over-60':
              return product.price > 60;
            default:
              return true;
          }
        });
      });
    }

    // Filter by availability
    if (selectedAvailability.length > 0) {
      filtered = filtered.filter(product => {
        return selectedAvailability.every(filter => {
          if (filter === 'in-stock') return product.stock > 0;
          if (filter === 'on-sale') return product.originalPrice !== undefined && product.originalPrice > product.price;
          return true;
        });
      });
    }

    // Sort products
    if (sortBy === 'price-low') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'newest') {
      filtered = [...filtered].sort((a, b) => 
        new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
      );
    }

    return filtered;
  }, [bookProducts, selectedCategory, selectedPriceRanges, selectedAvailability, sortBy]);

  const handleAddToCart = (id: string) => {
    console.log('Add to cart:', id);
  };

  const handleQuickView = (id: string) => {
    console.log('Quick view:', id);
  };

  const handleToggleWishlist = (id: string) => {
    console.log('Toggle wishlist:', id);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-white to-orange-50">
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 md:pt-32 md:pb-10 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-amber-100/50 to-orange-100/50" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div
            className={`text-center max-w-4xl mx-auto transition-all duration-1000 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ animation: isVisible ? 'fadeInUp 0.8s ease-out' : 'none' }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-amber-100 border border-amber-200 mb-4 sm:mb-6">
              <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600" />
              <span className="text-xs sm:text-sm font-medium text-amber-800">Books Collection</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 sm:mb-6">
              Discover Your Next{' '}
              <span 
                className="text-transparent bg-clip-text bg-linear-to-r from-amber-600 via-orange-600 to-amber-600"
                style={{
                  backgroundSize: '200% auto',
                  animation: 'shimmer 3s linear infinite'
                }}
              >
                Great Read
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed">
              Explore our extensive collection of {bookProducts.length} carefully curated books across all genres
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4">
          {/* Top Bar - Mobile Filter Toggle & Sort */}
          <div className="bg-white border border-amber-200 rounded-xl p-3 sm:p-4 mb-6 sm:mb-8 shadow-sm">
            <div className="flex flex-col md:flex-row gap-3 sm:gap-4 items-center justify-between">
              {/* Mobile Filter Toggle */}
              <Button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden w-full bg-linear-to-r from-amber-600 to-orange-600 text-white text-sm"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>

              <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto">
                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="flex-1 md:flex-none px-3 sm:px-4 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm font-medium text-slate-700 focus:outline-none focus:border-amber-500"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>

                {/* View Mode Toggle */}
                <div className="flex gap-1 sm:gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg ${
                      viewMode === 'grid'
                        ? 'bg-amber-100 text-amber-600'
                        : 'bg-slate-100 text-slate-600 hover:bg-amber-50'
                    }`}
                  >
                    <Grid className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg ${
                      viewMode === 'list'
                        ? 'bg-amber-100 text-amber-600'
                        : 'bg-slate-100 text-slate-600 hover:bg-amber-50'
                    }`}
                  >
                    <List className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Sidebar Filters */}
            <div className={`${showFilters ? 'block' : 'hidden'} lg:block lg:col-span-1`}>
              <CategoryFilter
                categories={bookCategories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                totalProducts={bookProducts.length}
                filteredCount={filteredProducts.length}
                selectedPriceRanges={selectedPriceRanges}
                onPriceRangeChange={handlePriceRangeChange}
                selectedAvailability={selectedAvailability}
                onAvailabilityChange={handleAvailabilityChange}
                onClearFilters={handleClearFilters}
                showProductCount={true}
              />
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {/* Results Info */}
              <div className="mb-4 sm:mb-6">
                <p className="text-xs sm:text-sm text-slate-600">
                  Showing <span className="font-bold text-amber-600">{filteredProducts.length}</span>{' '}
                  {filteredProducts.length === 1 ? 'book' : 'books'}
                  {selectedCategory !== 'all' && (
                    <span className="hidden sm:inline">
                      {' '}in{' '}
                      <span className="font-semibold text-amber-600">
                        {bookCategories.find(c => c.id === selectedCategory)?.name}
                      </span>
                    </span>
                  )}
                </p>
                {(selectedPriceRanges.length > 0 || selectedAvailability.length > 0) && (
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <span className="text-xs text-slate-500">Active filters:</span>
                    {selectedPriceRanges.length > 0 && (
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full">
                        Price ({selectedPriceRanges.length})
                      </span>
                    )}
                    {selectedAvailability.length > 0 && (
                      <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded-full">
                        Availability ({selectedAvailability.length})
                      </span>
                    )}
                    <button
                      onClick={handleClearFilters}
                      className="text-xs text-amber-600 hover:text-amber-700 underline"
                    >
                      Clear all
                    </button>
                  </div>
                )}
              </div>

              {/* Products */}
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {filteredProducts.map((product, index) => (
                    <div
                      key={product.id}
                      className={`transition-all duration-500 ${
                        isVisible ? 'opacity-100' : 'opacity-0'
                      }`}
                      style={{
                        animation: isVisible
                          ? `fadeInUp 0.6s ease-out ${index * 0.05}s both`
                          : 'none',
                      }}
                    >
                      <ProductCard
                        {...product}
                        onAddToCart={handleAddToCart}
                        onQuickView={handleQuickView}
                        onToggleWishlist={handleToggleWishlist}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4 sm:space-y-6">
                  {filteredProducts.map((product, index) => (
                    <div
                      key={product.id}
                      className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-amber-100 ${
                        isVisible ? 'opacity-100' : 'opacity-0'
                      }`}
                      style={{
                        animation: isVisible
                          ? `fadeInUp 0.6s ease-out ${index * 0.05}s both`
                          : 'none',
                      }}
                    >
                      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6">
                        <div className="relative w-full sm:w-32 h-44 sm:h-44 shrink-0 overflow-hidden rounded-lg bg-linear-to-br from-amber-50 to-orange-50">
                          <Image
                            width={200}
                            height={300}
                            src={product.image}
                            alt={product.name}
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
                            {product.author && (
                              <p className="text-xs text-amber-600 font-medium mb-1">
                                {product.author}
                              </p>
                            )}
                            <h3 className="font-semibold text-slate-900 text-base sm:text-lg mb-2 hover:text-amber-600 transition-colors">
                              {product.name}
                            </h3>
                            {product.description && (
                              <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mb-3">
                                {product.description}
                              </p>
                            )}
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="flex items-baseline gap-2">
                              <span className="text-xl sm:text-2xl font-bold text-slate-900">
                                ${product.price}
                              </span>
                              {product.originalPrice && (
                                <span className="text-sm text-slate-400 line-through">
                                  ${product.originalPrice}
                                </span>
                              )}
                            </div>
                            <Button
                              size="sm"
                              onClick={() => handleAddToCart(product.id)}
                              className="bg-linear-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white text-xs sm:text-sm w-full sm:w-auto"
                            >
                              <BookOpen className="w-4 h-4 mr-2" />
                              Add to Cart
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* No Results */}
              {filteredProducts.length === 0 && (
                <div className="text-center py-12 sm:py-16">
                  <BookOpen className="w-16 h-16 sm:w-20 sm:h-20 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-700 mb-2">
                    No books found
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 mb-6">
                    Try adjusting your filters or browse all categories
                  </p>
                  <Button
                    onClick={handleClearFilters}
                    className="bg-linear-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white"
                  >
                    View All Books
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}