import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Package, Truck, Shield, Star} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import SearchBar from '@/src/app/shared/searchBar';

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
      setActiveBook(prev => (prev + 1) % 3);
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

      <div className="relative max-w-7xl mx-auto px-4 pt-8 pb-8 sm:pt-20 md:pt-36 md:pb-16 md:px-8">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left content */}
          <div className="order-2 sm:order-1 space-y-6 md:space-y-8">
            <div
              className={`space-y-4 md:space-y-6 transition-all duration-1000 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ animation: isVisible ? 'fadeInUp 0.8s ease-out' : 'none' }}
            >
              {/* ✅ Responsive badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-amber-100 border border-amber-200">
                <Star className="w-3 h-3 md:w-4 md:h-4 text-amber-600 fill-amber-600 shrink-0" />
                <span className="text-xs md:text-sm font-medium text-amber-800">
                  Rated 4.8/5 by <span className="hidden sm:inline">100K+ </span>Customers
                </span>
              </div>
              
              {/* ✅ Responsive heading */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                Your Destination for
                <span className="block text-transparent bg-clip-text bg-linear-to-r from-amber-600 to-orange-600 mt-2">
                  Books & Stationery
                </span>
              </h1>
              
              {/* ✅ Responsive paragraph */}
              <p className="text-base md:text-lg lg:text-xl text-slate-600 leading-relaxed">
                Discover premium books, elegant stationery, and quality supplies. Fast shipping, competitive prices, and exceptional service guaranteed.
              </p>
            </div>

            {/* Search bar */}
            <div className='relative z-50 mb-6'>
              <div
                className={`transition-all duration-1000 delay-200 ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ animation: isVisible ? 'fadeInUp 0.8s ease-out 0.2s both' : 'none' }}
              >                      
                    <SearchBar/>
              </div>
              </div>

            {/* ✅ Responsive CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 transition-all duration-1000 delay-300 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ animation: isVisible ? 'fadeInUp 0.8s ease-out 0.3s both' : 'none' }}
            >
              <Link href="/allproducts" className="w-full sm:w-auto">              
                <Button className="w-full sm:w-auto h-11 md:h-12 px-6 md:px-8 bg-linear-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-lg text-sm md:text-base">
                  <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  Start Shopping
                </Button>
              </Link>
              <Link href="/books" className="hidden sm:flex w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto h-11 md:h-12 px-6 md:px-8 border-amber-300 text-amber-700 hover:bg-amber-50 text-sm md:text-base">
                  <Package className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  View Collections
                </Button>
              </Link>
            </div>

            {/* ✅ Responsive Features - 1 col mobile, 3 cols desktop */}
            <div
              className={`hidden lg:flex grid-cols-3 gap-3 md:gap-4 pt-4 transition-all duration-1000 delay-400 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ animation: isVisible ? 'fadeInUp 0.8s ease-out 0.4s both' : 'none' }}
            >
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 md:w-5 md:h-5 text-amber-600 shrink-0" />
                <span className="text-xs md:text-sm text-slate-700 font-medium">Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 md:w-5 md:h-5 text-amber-600 shrink-0" />
                <span className="text-xs md:text-sm text-slate-700 font-medium">Secure Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 md:w-5 md:h-5 text-amber-600 shrink-0" />
                <span className="text-xs md:text-sm text-slate-700 font-medium">Easy Returns</span>
              </div>
            </div>
          </div>

{/* ✅ Responsive Right side - Book animation */}
<div className="order-1 lg:order-2 relative mt-8 lg:mt-0">
  <div
    className={`transition-all duration-1000 delay-300 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}
    style={{ animation: isVisible ? 'slideIn 1s ease-out 0.4s both' : 'none' }}
  >
    <div className="relative w-full aspect-square max-w-sm sm:max-w-md lg:max-w-lg mx-auto">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-linear-to-br from-amber-200/50 to-orange-200/30 rounded-full blur-2xl" />
      
      {/* ✅ 4 Book data array */}
      {(() => {
        const books = [
          {
            image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600',
            title: 'Classic Literature',
            price: '$24.99'
          },
          {
            image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600',
            title: 'Art & Design',
            price: '$26.99'
          },
          {
            image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600',
            title: 'Self Development',
            price: '$28.99'
          }
        ];

        return (
          <div className="relative w-full h-full flex items-center justify-center">
            {books.map((book, i) => (
              <div
                key={i}
                className={`absolute w-40 h-52 sm:w-48 sm:h-64 md:w-72 md:h-96 bg-linear-to-br from-white to-amber-50 rounded-lg shadow-2xl border border-amber-200 transition-all duration-700 overflow-hidden ${
                  activeBook === i ? 'scale-110 z-20 shadow-2xl' : 'scale-95 opacity-60'
                }`}
                style={{
                  transform: `translateX(${(i - 1.5) * 30}px) translateY(${(i - 1.5) * -20}px) rotate(${(i - 1.5) * 6}deg) ${activeBook === i ? 'scale(1.1)' : 'scale(0.95)'}`,
                }}
              >
                <div className="h-full flex flex-col">
                  {/* Book Cover Image */}
                  <div className="flex-1 relative bg-linear-to-br from-slate-100 to-slate-200">
                 <Image
  src={book.image}
  alt={book.title}
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, 50vw"
/>
                  </div>
                  
                  {/* Rating and Price Footer */}
                  <div className='p-3 sm:p-4 md:p-6 border-t border-amber-200 bg-white '>                
                    <div className='flex flex-col  '>
                     <div className="text-xs sm:text-sm md:text-base font-bold text-amber-700">{book.title}</div>
</div>
                  <div className="flex items-center justify-between ">
                    
                    <div className="flex gap-0.5 md:gap-1">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="w-3 h-3 md:w-4 md:h-4 text-amber-500 fill-amber-500" />
                      ))}
                   
                    </div>
                    <div className="text-xs sm:text-sm md:text-base font-bold text-amber-700">{book.price}</div>
                  
                  </div>
                </div>
                 </div>
              </div>
            ))}
          </div>
        );
      })()}
    </div>
  </div>
</div>
        </div>

        {/* ✅ Responsive Stats section */}
        <div
          className={`mt-12 md:mt-20 transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ animation: isVisible ? 'fadeInUp 0.8s ease-out 0.6s both' : 'none' }}
        >
          <div className="hidden lg:grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            <div className="bg-white border border-amber-200 rounded-xl p-4 md:p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-1 md:mb-2">
                {books.toLocaleString()}+
              </div>
              <div className="text-xs md:text-sm text-slate-600 font-medium">Books Available</div>
            </div>
            <div className="bg-white border border-amber-200 rounded-xl p-4 md:p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-1 md:mb-2">
                {customers.toLocaleString()}+
              </div>
              <div className="text-xs md:text-sm text-slate-600 font-medium">Happy Customers</div>
            </div>
            <div className="bg-white border border-amber-200 rounded-xl p-4 md:p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-1 md:mb-2 flex items-center justify-center gap-1">
                {(rating / 10).toFixed(1)}
                <Star className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-amber-500 fill-amber-500" />
              </div>
              <div className="text-xs md:text-sm text-slate-600 font-medium">Average Rating</div>
            </div>
            <div className="bg-white border border-amber-200 rounded-xl p-4 md:p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-1 md:mb-2">24h</div>
              <div className="text-xs md:text-sm text-slate-600 font-medium">Fast Delivery</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}