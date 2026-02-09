import React from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Category {
  id: string;
  name: string;
  slug: string;
  productCount?: number;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  totalProducts: number;
  filteredCount: number;
  onClearFilters?: () => void;
  showProductCount?: boolean;
  // Price Range props
  selectedPriceRanges?: string[];
  onPriceRangeChange?: (range: string) => void;
  // Availability props
  selectedAvailability?: string[];
  onAvailabilityChange?: (availability: string) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  totalProducts,
  filteredCount,
  onClearFilters,
  showProductCount = true,
  selectedPriceRanges = [],
  onPriceRangeChange,
  selectedAvailability = [],
  onAvailabilityChange,
}: CategoryFilterProps) {
  const hasActiveFilters = selectedCategory !== 'all' || selectedPriceRanges.length > 0 || selectedAvailability.length > 0;

  return (
    <div className="bg-white rounded-xl border border-amber-200 p-6 shadow-sm sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto ">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-amber-600" />
          <h3 className="text-lg font-semibold text-slate-900">Filters</h3>
        </div>
        {hasActiveFilters && onClearFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-amber-600 hover:text-amber-700 hover:bg-amber-50"
          >
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {/* Results Count */}
      {showProductCount && (
        <div className="mb-6 p-4 bg-linear-to-br from-amber-50 to-orange-50 rounded-lg border border-amber-200">
          <p className="text-sm text-slate-600">
            Showing <span className="font-bold text-amber-600">{filteredCount}</span> of{' '}
            <span className="font-bold">{totalProducts}</span> products
          </p>
        </div>
      )}

      {/* Categories */}
      <div>
        <h4 className="text-sm font-semibold text-slate-700 mb-3">Categories</h4>
        <div className="space-y-2">
          <button
            onClick={() => onCategoryChange('all')}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
              selectedCategory === 'all'
                ? 'bg-linear-to-r from-amber-600 to-orange-600 text-white shadow-md'
                : 'bg-slate-50 text-slate-700 hover:bg-amber-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">All Categories</span>
              {showProductCount && (
                <span className={`text-sm ${
                  selectedCategory === 'all' ? 'text-white/80' : 'text-slate-500'
                }`}>
                  {totalProducts}
                </span>
              )}
            </div>
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-linear-to-r from-amber-600 to-orange-600 text-white shadow-md'
                  : 'bg-slate-50 text-slate-700 hover:bg-amber-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{category.name}</span>
                {showProductCount && category.productCount !== undefined && (
                  <span className={`text-sm ${
                    selectedCategory === category.id ? 'text-white/80' : 'text-slate-500'
                  }`}>
                    {category.productCount}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mt-8 pt-6 border-t border-amber-100">
        <h4 className="text-sm font-semibold text-slate-700 mb-3">Price Range</h4>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-amber-50 transition-colors">
            <input 
              type="checkbox" 
              className="w-4 h-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
              checked={selectedPriceRanges.includes('under-20')}
              onChange={() => onPriceRangeChange?.('under-20')}
            />
            <span className="text-sm text-slate-700">Under $20</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-amber-50 transition-colors">
            <input 
              type="checkbox" 
              className="w-4 h-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
              checked={selectedPriceRanges.includes('20-40')}
              onChange={() => onPriceRangeChange?.('20-40')}
            />
            <span className="text-sm text-slate-700">$20 - $40</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-amber-50 transition-colors">
            <input 
              type="checkbox" 
              className="w-4 h-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
              checked={selectedPriceRanges.includes('40-60')}
              onChange={() => onPriceRangeChange?.('40-60')}
            />
            <span className="text-sm text-slate-700">$40 - $60</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-amber-50 transition-colors">
            <input 
              type="checkbox" 
              className="w-4 h-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
              checked={selectedPriceRanges.includes('over-60')}
              onChange={() => onPriceRangeChange?.('over-60')}
            />
            <span className="text-sm text-slate-700">Over $60</span>
          </label>
        </div>
      </div>

      {/* Availability */}
      <div className="mt-6 pt-6 border-t border-amber-100">
        <h4 className="text-sm font-semibold text-slate-700 mb-3">Availability</h4>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-amber-50 transition-colors">
            <input 
              type="checkbox" 
              className="w-4 h-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
              checked={selectedAvailability.includes('in-stock')}
              onChange={() => onAvailabilityChange?.('in-stock')}
            />
            <span className="text-sm text-slate-700">In Stock</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-amber-50 transition-colors">
            <input 
              type="checkbox" 
              className="w-4 h-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
              checked={selectedAvailability.includes('on-sale')}
              onChange={() => onAvailabilityChange?.('on-sale')}
            />
            <span className="text-sm text-slate-700">On Sale</span>
          </label>
        </div>
      </div>
    </div>
  );
}