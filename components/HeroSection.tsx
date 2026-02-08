import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ShoppingCart, Package, Truck, Shield, Star} from 'lucide-react';
import Link from 'next/link';

const useCountUp = (end: number, duration: number = 2000, start: boolean = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / duration;

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, start]);

  return count;
};

export default function BookStoreHero() {
  const [startCount, setStartCount] = useState(true);
  const [activeBook, setActiveBook] = useState(0);
const [isVisible] = useState(true);


useEffect(() => {
  const interval = setInterval(() => {
    setActiveBook(prev => (prev + 1) % 2);
  }, 2000);

  return () => clearInterval(interval);
}, []);

useEffect(() => {
  const timeout = setTimeout(() => {
    setStartCount(true);
  }, 800);

  return () => clearTimeout(timeout);
}, []);


  const books = useCountUp(50000, 2000, startCount);
  const customers = useCountUp(100000, 2000, startCount);
  const rating = useCountUp(48, 2000, startCount);

  return (
    <div className="relative min-h-screen bg-linear-to-br from-amber-50 via-white to-orange-50 overflow-hidden">

      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-size-[4rem_4rem] opacity-20" />
      
      {/* Floating decorative elements */}
      <div className="absolute top-40 right-20 w-72 h-72 bg-amber-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl" />

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      <div className="relative container mx-auto px-4 pt-36 pb-12 md:pt-40 md:pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="space-y-8">
              <div
                className={`space-y-6 transition-all duration-1000 ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ animation: isVisible ? 'fadeInUp 0.8s ease-out' : 'none' }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 border border-amber-200">
                  <Star className="w-4 h-4 text-amber-600 fill-amber-600" />
                  <span className="text-sm font-medium text-amber-800">Rated 4.8/5 by 100K+ Customers</span>
                </div>
                
                <h1 className="text-5xl md:text-6xl lg:text-6xl font-bold text-slate-900 leading-tight">
                  Your Destination for
                  <span className="block text-transparent bg-clip-text bg-linear-to-r from-amber-600 to-orange-600 mt-2">
                    Books & Stationery
                  </span>
                </h1>
                
                <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                  Discover premium books, elegant stationery, and quality supplies. Fast shipping, competitive prices, and exceptional service guaranteed.
                </p>
              </div>

              {/* Search bar */}
              <div
                className={`transition-all duration-1000 delay-200 ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ animation: isVisible ? 'fadeInUp 0.8s ease-out 0.2s both' : 'none' }}
              >
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="Search for books, notebooks, pens..."
                      className="pl-12 h-14 bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-amber-500 shadow-sm"
                    />
                  </div>
                  <Button className="h-14 px-8 bg-linear-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold shadow-lg">
                    Search
                  </Button>
                </div>
              </div>

              {/* CTA Buttons */}
              <div
                className={`flex flex-wrap gap-4 transition-all duration-1000 delay-300 ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ animation: isVisible ? 'fadeInUp 0.8s ease-out 0.3s both' : 'none' }}
              >
                <Link href="/allproducts">              
                <Button className="h-12 px-8 bg-linear-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-lg">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Start Shopping
                </Button>
                </Link>
                <Link href="/books">
                
                <Button variant="outline" className="h-12 px-8 border-amber-300 text-amber-700 hover:bg-amber-50">
                  <Package className="w-5 h-5 mr-2" />
                  View Collections
                </Button>
                </Link>
              </div>

              {/* Features */}
              <div
                className={`grid grid-cols-3 gap-4 pt-4 transition-all duration-1000 delay-400 ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ animation: isVisible ? 'fadeInUp 0.8s ease-out 0.4s both' : 'none' }}
              >
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-amber-600" />
                  <span className="text-sm text-slate-700 font-medium">Fast Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-amber-600" />
                  <span className="text-sm text-slate-700 font-medium">Secure Payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-amber-600" />
                  <span className="text-sm text-slate-700 font-medium">Easy Returns</span>
                </div>
              </div>
            </div>

            {/* Right side - Book animation */}
            <div className="relative">
              <div
                className={`transition-all duration-1000 delay-300 ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ animation: isVisible ? 'slideIn 1s ease-out 0.4s both' : 'none' }}
              >
                <div className="relative w-full aspect-square max-w-lg mx-auto">
                  {/* Decorative background */}
                  <div className="absolute inset-0 bg-linear-to-br from-amber-200/50 to-orange-200/30 rounded-full blur-2xl" />
                  
                  {/* Book stack visualization */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className={`absolute w-56 h-72 bg-linear-to-br from-white to-amber-50 rounded-lg shadow-2xl border border-amber-200 transition-all duration-700 ${
                          activeBook === i ? 'scale-110 z-20 shadow-2xl' : 'scale-95 opacity-60'
                        }`}
                        style={{
                          transform: `translateX(${(i - 1) * 50}px) translateY(${(i - 1) * -30}px) rotate(${(i - 1) * 8}deg) ${activeBook === i ? 'scale(1.1)' : 'scale(0.95)'}`,
                        }}
                      >
                        <div className="p-8 h-full flex flex-col">
                          <div className="flex-1 space-y-4">
                            <div className="w-16 h-16 bg-linear-to-br from-amber-400 to-orange-500 rounded-lg" />
                            <div className="space-y-2">
                              <div className="h-3 bg-amber-300 rounded w-full" />
                              <div className="h-3 bg-amber-300 rounded w-4/5" />
                              <div className="h-3 bg-amber-300 rounded w-3/5" />
                            </div>
                          </div>
                          <div className="flex items-center justify-between pt-4 border-t border-amber-200">
                            <div className="flex gap-1">
                              {[...Array(5)].map((_, j) => (
                                <Star key={j} className="w-4 h-4 text-amber-500 fill-amber-500" />
                              ))}
                            </div>
                            <div className="text-sm font-bold text-amber-700">$24.99</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats section */}
          <div
            className={`mt-20 transition-all duration-1000 delay-600 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ animation: isVisible ? 'fadeInUp 0.8s ease-out 0.6s both' : 'none' }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-white border border-amber-200 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl md:text-5xl font-bold bg-linear-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">
                  {books.toLocaleString()}+
                </div>
                <div className="text-sm text-slate-600 font-medium">Books Available</div>
              </div>
              <div className="bg-white border border-amber-200 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl md:text-5xl font-bold bg-linear-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">
                  {customers.toLocaleString()}+
                </div>
                <div className="text-sm text-slate-600 font-medium">Happy Customers</div>
              </div>
              <div className="bg-white border border-amber-200 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl md:text-5xl font-bold bg-linear-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2 flex items-center justify-center gap-1">
                  {(rating / 10).toFixed(1)}
                  <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
                </div>
                <div className="text-sm text-slate-600 font-medium">Average Rating</div>
              </div>
              <div className="bg-white border border-amber-200 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl md:text-5xl font-bold bg-linear-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">24h</div>
                <div className="text-sm text-slate-600 font-medium">Fast Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}