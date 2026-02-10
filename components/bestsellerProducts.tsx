/* eslint-disable react-hooks/purity */
import { Button } from "@/components/ui/button";
import { products } from "@/src/data/mock-data";
import {
  Award,
  Eye,
  Flame,
  ShoppingCart,
  Star,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import ProductCard from "./ProductCard";

export default function BestsellerPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const bestsellerProducts = products.filter((p) => p.bestseller);

  return (
    <section
      id="bestsellers"
      className="py-16 md:py-14 bg-linear-to-br from-amber-50 via-white to-yellow-50 relative overflow-hidden"
    >
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

      <div className="max-w-7xl mx-auto px-4  md:px-8 relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-8 transition-all duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{ animation: isVisible ? "fadeInUp 0.8s ease-out" : "none" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-amber-100 to-yellow-100 border border-amber-200 mb-4">
            <Award className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-medium text-amber-800">
              Most Popular Picks
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span
              className="text-transparent bg-clip-text bg-linear-to-r from-amber-600 via-yellow-600 to-orange-600"
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
          className={`grid grid-cols-3 gap-3 sm:gap-4 mb-8 max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{
            animation: isVisible ? "fadeInUp 0.8s ease-out 0.2s both" : "none",
          }}
        >
          <div className="bg-white/80 backdrop-blur-sm border border-amber-200 rounded-lg p-3 sm:p-4 text-center">
            <Flame className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600 mx-auto mb-1 sm:mb-2" />
            <div className="text-xl sm:text-2xl font-bold text-amber-600">
              {bestsellerProducts.length}
            </div>
            <div className="text-[10px] sm:text-xs text-slate-600">
              Bestsellers
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm border border-amber-200 rounded-lg p-3 sm:p-4 text-center">
            <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 mx-auto mb-1 sm:mb-2" />
            <div className="text-xl sm:text-2xl font-bold text-amber-600">
              1M+
            </div>
            <div className="text-[10px] sm:text-xs text-slate-600">
              Books Sold
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm border border-amber-200 rounded-lg p-3 sm:p-4 text-center">
            <Star className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600 mx-auto mb-1 sm:mb-2 fill-yellow-600" />
            <div className="text-xl sm:text-2xl font-bold text-amber-600">
              4.9
            </div>
            <div className="text-[10px] sm:text-xs text-slate-600">
              Avg Rating
            </div>
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
              <div className="absolute top-3 left-3 z-10 w-12 h-12 bg-linear-to-br from-amber-500 to-yellow-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                #{index + 1}
              </div>

              {/* Bestseller Badge */}
              <div className="absolute top-3 right-3 z-10 bg-linear-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                <Flame className="w-3 h-3" />
                Bestseller
              </div>

              {/* Product Image */}
              <div className="relative aspect-4/4 overflow-hidden bg-linear-to-br from-amber-50 to-orange-50">
                <Image
                  width={300}
                  height={300}
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                <div
                  className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center gap-3 transition-opacity duration-300 ${
                    hoveredId === product.id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Button
                    size="sm"
                    onClick={() => router.push(`/product/${product.id}`)}
                    className="bg-white text-slate-900 hover:bg-amber-100"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    <h5 className="text-sm font-medium items-center flex justify-center">
                      Quick View
                    </h5>
                  </Button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5 space-y-3">
                <div>
                  <p className="text-xs text-amber-600 font-medium mb-1">
                    {product.author || product.brand}
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
                    className="bg-linear-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white"
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
