/* eslint-disable react-hooks/purity */
import { Button } from "@/components/ui/button";
import { products } from "@/src/data/mock-data";
import {
  Award,
  Eye,
  Flame,
  Heart,
  ShoppingCart,
  Star,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function BestsellerPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const bestsellerProducts = products.filter((p) => p.bestseller);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-amber-50 via-white to-yellow-50 relative overflow-hidden">
      <div className="absolute top-20 right-0 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl" />

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
      `}</style>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{ animation: isVisible ? "fadeInUp 0.8s ease-out" : "none" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-100 to-yellow-100 border border-amber-200 mb-4">
            <Award className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-medium text-amber-800">
              Most Popular Picks
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span
              className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600"
              style={{
                backgroundSize: "200% auto",
                animation: "shimmer 3s linear infinite",
              }}
            >
              Bestselling Books
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Join thousands of readers who chose these top-rated books.
            Handpicked by our community
          </p>
        </div>

        {/* Stats */}
        <div
          className={`grid grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{
            animation: isVisible ? "fadeInUp 0.8s ease-out 0.2s both" : "none",
          }}
        >
          <div className="bg-white/80 backdrop-blur-sm border border-amber-200 rounded-xl p-6 text-center">
            <Flame className="w-10 h-10 text-orange-600 mx-auto mb-2" />
            <div className="text-3xl font-bold text-amber-600">
              {bestsellerProducts.length}
            </div>
            <div className="text-xs text-slate-600">Bestsellers</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm border border-amber-200 rounded-xl p-6 text-center">
            <TrendingUp className="w-10 h-10 text-green-600 mx-auto mb-2" />
            <div className="text-3xl font-bold text-amber-600">1M+</div>
            <div className="text-xs text-slate-600">Books Sold</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm border border-amber-200 rounded-xl p-6 text-center">
            <Star className="w-10 h-10 text-yellow-600 mx-auto mb-2 fill-yellow-600" />
            <div className="text-3xl font-bold text-amber-600">4.9</div>
            <div className="text-xs text-slate-600">Avg Rating</div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {bestsellerProducts.map((product, index) => (
            <div
              key={product.id}
              className={`group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border-2 border-amber-200 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
              style={{
                animation: isVisible
                  ? `scaleIn 0.6s ease-out ${0.3 + index * 0.1}s both`
                  : "none",
              }}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Ranking Badge */}
              <div className="absolute top-3 left-3 z-10 w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                #{index + 1}
              </div>

              {/* Bestseller Badge */}
              <div className="absolute top-3 right-3 z-10 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                <Flame className="w-3 h-3" />
                Bestseller
              </div>

              {/* Wishlist Button */}
              <button className="absolute top-16 right-3 z-10 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-amber-100 transition-colors shadow-md">
                <Heart className="w-4 h-4 text-slate-700" />
              </button>

              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-amber-50 to-yellow-50 mt-2">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />

                <div
                  className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center gap-3 transition-opacity duration-300 ${
                    hoveredId === product.id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Button
                    size="sm"
                    className="bg-white text-slate-900 hover:bg-amber-100"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Quick View
                  </Button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5 space-y-3">
                <div>
                  <p className="text-xs text-amber-600 font-medium mb-1">
                    {product.author}
                  </p>
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
                        className="w-4 h-4 text-yellow-500 fill-yellow-500"
                      />
                    ))}
                  </div>
                  <span className="text-xs text-slate-600 font-medium">
                    (500+ reviews)
                  </span>
                </div>

                {/* Price & Action */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-slate-900">
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
                    className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </Button>
                </div>

                {/* Social Proof */}
                <div className="pt-2 border-t border-amber-100">
                  <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {Math.floor(Math.random() * 50 + 20)} sold in last 24 hours
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
