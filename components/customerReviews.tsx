import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import Image from 'next/image';

const reviews = [
  {
    id: 1,
    customerName: 'Sarah Johnson',
    customerImage: 'https://i.pravatar.cc/150?img=1',
    rating: 5,
    date: '2024-01-20',
    productName: 'The Midnight Library',
    review: 'Absolutely loved this book! The concept is unique and the writing is beautiful. It made me think about life choices in a whole new way. Highly recommend to anyone who enjoys thought-provoking fiction.',
    verified: true,
  },
  {
    id: 2,
    customerName: 'Michael Chen',
    customerImage: 'https://i.pravatar.cc/150?img=12',
    rating: 5,
    date: '2024-01-18',
    productName: 'Atomic Habits',
    review: 'This book changed my life! The practical advice and clear examples made it easy to implement positive changes. I\'ve already built 3 new habits using the strategies from this book.',
    verified: true,
  },
  {
    id: 3,
    customerName: 'Emily Rodriguez',
    customerImage: 'https://i.pravatar.cc/150?img=5',
    rating: 4,
    date: '2024-01-15',
    productName: 'The Psychology of Money',
    review: 'Great insights on financial decision-making. Some chapters were a bit repetitive, but overall a valuable read. The storytelling approach makes complex concepts easy to understand.',
    verified: true,
  },
  {
    id: 4,
    customerName: 'David Thompson',
    customerImage: 'https://i.pravatar.cc/150?img=8',
    rating: 5,
    date: '2024-01-14',
    productName: 'Educated',
    review: 'Powerful memoir that stays with you long after finishing. The author\'s journey is both heartbreaking and inspiring. A must-read for anyone interested in education and personal transformation.',
    verified: true,
  },
  {
    id: 5,
    customerName: 'Jessica Lee',
    customerImage: 'https://i.pravatar.cc/150?img=9',
    rating: 5,
    date: '2024-01-12',
    productName: 'The Midnight Library',
    review: 'One of the best books I\'ve read this year. The characters are relatable and the story is incredibly moving. Perfect for book clubs - so many discussion points!',
    verified: true,
  },
  {
    id: 6,
    customerName: 'Robert Martinez',
    customerImage: 'https://i.pravatar.cc/150?img=13',
    rating: 4,
    date: '2024-01-10',
    productName: 'Atomic Habits',
    review: 'Solid advice on habit formation. The book is well-structured and easy to follow. Would have liked more diverse examples, but the core principles are sound.',
    verified: true,
  },
];

export default function ReviewCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  // Auto-advance timer
  useEffect(() => {
    if (isPaused) return;
    
    const timer = setInterval(() => {
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
      setTimeout(() => setIsAnimating(false), 300);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 600);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 600);
  };

  const goToSlide = (index: React.SetStateAction<number>) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const currentReview = reviews[currentIndex];

  return (
    <section className="min-h-screen  bg-linear-to-br from-amber-50 via-white to-orange-50 relative overflow-hidden flex items-center">
      <div className="absolute top-20 right-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl" />

      <style>{`
        @keyframes slideInFromRight {
          0% { 
            opacity: 0; 
            transform: translateX(100px) scale(0.9);
          }
          100% { 
            opacity: 1; 
            transform: translateX(0) scale(1);
          }
        }
        
        @keyframes fadeInScale {
          0% { 
            opacity: 0; 
            transform: scale(0.8);
          }
          100% { 
            opacity: 1; 
            transform: scale(1);
          }
        }

        .review-card {
          animation: slideInFromRight 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .customer-info {
          animation: fadeInScale 0.8s ease-out 0.2s both;
        }

        .review-text {
          animation: fadeInScale 0.8s ease-out 0.4s both;
        }
      `}</style>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 border border-amber-200 mb-4">
            <Quote className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-medium text-amber-800">Customer Stories</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            What Our Readers Say
          </h2>
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-6 h-6 ${
                    i < Math.floor(averageRating) 
                      ? 'text-amber-500 fill-amber-500' 
                      : 'text-slate-300'
                  }`} 
                />
              ))}
            </div>
            <span className="text-lg font-semibold text-slate-700">
              {averageRating.toFixed(1)} out of 5
            </span>
          </div>
          <p className="text-slate-600">Based on {reviews.length} verified reviews</p>
        </div>

        {/* Main Review Card */}
        <div 
          className="max-w-4xl mx-auto relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div 
            key={currentIndex}
            className="review-card bg-white rounded-2xl border-2 border-amber-200 p-8 md:p-12 shadow-xl relative overflow-hidden"
          >
            {/* Decorative Quote */}
            <Quote className="absolute top-8 right-8 w-24 h-24 text-amber-100 opacity-50" />

            {/* Customer Info */}
            <div className="customer-info flex items-center gap-4 mb-6 relative z-10">
              <div className="relative">
                <Image
                width={150}
                height={150}
                  src={currentReview.customerImage}
                  alt={currentReview.customerName}
                  className="w-20 h-20 rounded-full object-cover border-4 border-amber-200"
                />
                {currentReview.verified && (
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-slate-900 mb-1">
                  {currentReview.customerName}
                </h3>
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${
                          i < currentReview.rating 
                            ? 'text-amber-500 fill-amber-500' 
                            : 'text-slate-300'
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-slate-500">
                    {new Date(currentReview.date).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>
                <p className="text-amber-600 font-semibold mt-2">
                  {currentReview.productName}
                </p>
              </div>

              {currentReview.verified && (
                <span className="hidden md:inline-flex text-sm bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold border-2 border-green-200">
                  ✓ Verified Purchase
                </span>
              )}
            </div>

            {/* Review Text */}
            <div className="review-text relative z-10">
              <p className="text-lg md:text-xl text-slate-700 leading-relaxed italic">
                {currentReview.review}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-amber-100">
              <div 
                className="h-full bg-linear-to-r from-amber-500 to-orange-500 transition-all"
                style={{
                  width: isPaused ? '100%' : '0%',
                  animation: isPaused ? 'none' : 'progressBar 5s linear',
                }}
              />
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrevious}
            disabled={isAnimating}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:-translate-x-full md:left-0 w-14 h-14 bg-white border-2 border-amber-300 rounded-full shadow-lg hover:shadow-xl hover:bg-amber-50 hover:border-amber-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center group"
          >
            <ChevronLeft className="w-6 h-6 text-amber-600 group-hover:text-amber-700 transition-colors" />
          </button>

          <button
            onClick={handleNext}
            disabled={isAnimating}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-full md:right-0 w-14 h-14 bg-white border-2 border-amber-300 rounded-full shadow-lg hover:shadow-xl hover:bg-amber-50 hover:border-amber-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center group"
          >
            <ChevronRight className="w-6 h-6 text-amber-600 group-hover:text-amber-700 transition-colors" />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-3 mt-8">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isAnimating}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'w-12 h-3 bg-linear-to-r from-amber-500 to-orange-500'
                  : 'w-3 h-3 bg-amber-200 hover:bg-amber-300'
              } disabled:cursor-not-allowed`}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>

        {/* Counter */}
        <div className="text-center mt-6">
          <span className="text-slate-600 font-medium">
            {currentIndex + 1} / {reviews.length}
          </span>
        </div>
      </div>

      <style>{`
        @keyframes progressBar {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
}