import React, { useState, useEffect } from 'react';
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw, Check, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products } from '../data/mock-data';
import ProductCard from './ProductCard';

interface ProductDetailsProps {
  productId: string;
}

export default function ProductDetails({ productId }: ProductDetailsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description');

  useEffect(() => {
    setIsVisible(true);
    // Store in recently viewed
    const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    if (!recentlyViewed.includes(productId)) {
      const updated = [productId, ...recentlyViewed].slice(0, 8);
      localStorage.setItem('recentlyViewed', JSON.stringify(updated));
    }
  }, [productId]);

  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Product Not Found</h2>
          <p className="text-slate-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const images = product.images || [product.image];
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  // Get related products (same category)
  const relatedProducts = products
    .filter(p => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  // Get recently viewed
  const recentlyViewedIds = JSON.parse(localStorage.getItem('recentlyViewed') || '[]').filter((id: string) => id !== productId);
  const recentlyViewed = recentlyViewedIds.map((id: string) => products.find(p => p.id === id)).filter(Boolean).slice(0, 4);

  const handleQuantityChange = (delta: number) => {
    const newQty = quantity + delta;
    if (newQty >= 1 && newQty <= product.stock) {
      setQuantity(newQty);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-slate-600">
          <a href="/" className="hover:text-amber-600">Home</a>
          <span className="mx-2">/</span>
          <a href="/products" className="hover:text-amber-600">Products</a>
          <span className="mx-2">/</span>
          <span className="text-slate-900">{product.name}</span>
        </div>

        {/* Product Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <div
            className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{ animation: isVisible ? 'fadeInUp 0.8s ease-out' : 'none' }}
          >
            {/* Main Image */}
            <div className="relative aspect-square bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl overflow-hidden mb-4 border border-amber-200">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {discount > 0 && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                  {discount}% OFF
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === idx ? 'border-amber-600' : 'border-slate-200 hover:border-amber-300'
                  }`}
                >
                  <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div
            className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{ animation: isVisible ? 'fadeInUp 0.8s ease-out 0.2s both' : 'none' }}
          >
            {/* Badges */}
            <div className="flex gap-2 mb-4">
              {product.bestseller && (
                <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">
                  Bestseller
                </span>
              )}
              {product.featured && (
                <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">
                  Featured
                </span>
              )}
              {product.stock < 10 && (
                <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">
                  Low Stock
                </span>
              )}
            </div>

            <h1 className="text-4xl font-bold text-slate-900 mb-2">{product.name}</h1>
            
            {product.author && (
              <p className="text-lg text-amber-600 font-medium mb-4">by {product.author}</p>
            )}

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating || 0)
                        ? 'text-amber-500 fill-amber-500'
                        : 'text-slate-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-slate-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold text-slate-900">${product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-2xl text-slate-400 line-through">${product.originalPrice}</span>
                    <span className="text-green-600 font-semibold">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </span>
                  </>
                )}
              </div>
              <p className="text-sm text-slate-600">
                Stock: <span className="font-semibold text-slate-900">{product.stock} available</span>
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">Quantity</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-slate-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="p-3 hover:bg-amber-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-6 py-2 font-semibold">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                    className="p-3 hover:bg-amber-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-slate-600">
                  {product.stock < 10 && `Only ${product.stock} left!`}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-8">
              <Button className="flex-1 h-14 text-lg bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline" size="icon" className="h-14 w-14 border-amber-300 hover:bg-amber-50">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon" className="h-14 w-14 border-amber-300 hover:bg-amber-50">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200">
              <div className="text-center">
                <Truck className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                <p className="text-xs text-slate-700 font-medium">Free Shipping</p>
                <p className="text-xs text-slate-500">On orders $50+</p>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                <p className="text-xs text-slate-700 font-medium">Secure Payment</p>
                <p className="text-xs text-slate-500">100% Protected</p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                <p className="text-xs text-slate-700 font-medium">30-Day Returns</p>
                <p className="text-xs text-slate-500">Easy Process</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mb-16">
          <div className="border-b border-amber-200 mb-8">
            <div className="flex gap-8">
              {(['description', 'specifications', 'reviews'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 text-lg font-semibold capitalize transition-colors relative ${
                    activeTab === tab
                      ? 'text-amber-600'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-600 to-orange-600" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-xl border border-amber-200 p-8">
            {activeTab === 'description' && (
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Product Description</h3>
                <p className="text-slate-700 leading-relaxed mb-6">{product.description}</p>
                {product.author && (
                  <div className="mt-6 p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg">
                    <h4 className="font-semibold text-slate-900 mb-2">About the Author</h4>
                    <p className="text-slate-700">{product.author} is a renowned author known for compelling storytelling.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'specifications' && (
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Specifications</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {product.isbn && (
                    <div className="flex justify-between border-b border-slate-200 pb-3">
                      <span className="text-slate-600">ISBN</span>
                      <span className="font-semibold text-slate-900">{product.isbn}</span>
                    </div>
                  )}
                  {product.publisher && (
                    <div className="flex justify-between border-b border-slate-200 pb-3">
                      <span className="text-slate-600">Publisher</span>
                      <span className="font-semibold text-slate-900">{product.publisher}</span>
                    </div>
                  )}
                  {product.publishedYear && (
                    <div className="flex justify-between border-b border-slate-200 pb-3">
                      <span className="text-slate-600">Published Year</span>
                      <span className="font-semibold text-slate-900">{product.publishedYear}</span>
                    </div>
                  )}
                  {product.pages && (
                    <div className="flex justify-between border-b border-slate-200 pb-3">
                      <span className="text-slate-600">Pages</span>
                      <span className="font-semibold text-slate-900">{product.pages}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-b border-slate-200 pb-3">
                    <span className="text-slate-600">SKU</span>
                    <span className="font-semibold text-slate-900">{product.id}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-3">
                    <span className="text-slate-600">Availability</span>
                    <span className={`font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Customer Reviews</h3>
                <div className="space-y-6">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="border-b border-slate-200 pb-6">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center">
                          <span className="text-lg font-bold text-amber-600">JD</span>
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">John Doe</p>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, j) => (
                              <Star key={j} className="w-4 h-4 text-amber-500 fill-amber-500" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-slate-700">Excellent product! Highly recommend to anyone looking for quality.</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-slate-900 mb-8">Related Products</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} {...p} />
              ))}
            </div>
          </div>
        )}

        {/* Recently Viewed */}
        {recentlyViewed.length > 0 && (
          <div>
            <h3 className="text-3xl font-bold text-slate-900 mb-8">Recently Viewed</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentlyViewed.map(p => p && (
                <ProductCard key={p.id} {...p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}