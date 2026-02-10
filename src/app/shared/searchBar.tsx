"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Search, X, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { products } from '@/src/data/mock-data';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<typeof products>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Popular searches
  const popularSearches = ['Fiction', 'Bestsellers', 'Notebooks', 'Pens', 'The Midnight Library'];

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim().length > 0) {
      // Search products
      const searchResults = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description?.toLowerCase().includes(query.toLowerCase()) ||
        product.author?.toLowerCase().includes(query.toLowerCase()) ||
        product.brand?.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8); // Limit to 8 results

      setResults(searchResults);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [setResults, query]);

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  const handlePopularSearch = (term: string) => {
    setQuery(term);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
      {/* Search Input */}
      <div className="relative ">
       
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Search for books, stationery, or authors..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 0 && setIsOpen(true)}
          className="pl-12 pr-12 h-14 bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-amber-500 shadow-sm"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-8 z-10 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-2xl border border-amber-200 max-h-96 overflow-y-auto z-index: 9999">
          {results.length > 0 ? (
            <div className="p-2">
              <div className="text-xs text-slate-500 px-3 py-2 font-medium">
                Found {results.length} result{results.length !== 1 ? 's' : ''}
              </div>
              {results.map((product) => (
                <a
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="flex items-center gap-4 p-3 hover:bg-amber-50 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="w-16 h-16 shrink-0 bg-linear-to-br from-amber-50 to-orange-50 rounded-lg overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-900 truncate">
                      {product.name}
                    </h4>
                    {product.author && (
                      <p className="text-xs text-amber-600 truncate">
                        {product.author}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-bold text-slate-900">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-slate-400 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </a>
              ))}
              
              {results.length === 8 && (
                <a
                  href={`/products?search=${encodeURIComponent(query)}`}
                  className="block text-center p-3 text-sm text-amber-600 hover:text-amber-700 font-medium"
                >
                  View all results →
                </a>
              )}
            </div>
          ) : query.length > 0 ? (
            <div className="p-8 text-center">
              <p className="text-slate-600 mb-4">No products found for {query}</p>
              <a
                href="/products"
                className="text-sm text-amber-600 hover:text-amber-700 font-medium"
              >
                Browse all products →
              </a>
            </div>
          ) : null}

          {/* Popular Searches */}
          {query.length === 0 && (
            <div className="p-4 border-t border-slate-200">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-semibold text-slate-700">Popular Searches</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => handlePopularSearch(term)}
                    className="px-3 py-1.5 bg-amber-50 text-amber-700 text-sm rounded-full hover:bg-amber-100 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}