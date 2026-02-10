import { Button } from "@/components/ui/button";
import { products } from "@/src/data/mock-data";
import { Eye, Heart, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function FeaturedProducts() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setIsVisible(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const featuredProducts = products.filter((p) => p.featured);

  return (
    <section
      id="featured"
      className="py-16 md:py-16 bg-linear-to-br from-amber-50 via-white to-orange-50 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl" />

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
      `}</style>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{ animation: isVisible ? "fadeInUp 0.8s ease-out" : "none" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 border border-amber-200 mb-4">
            <Star className="w-4 h-4 text-amber-600 fill-amber-600" />
            <span className="text-sm font-medium text-amber-800">
              Handpicked for You
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover our carefully curated selection of bestselling books and
            premium stationery
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className={`group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-amber-100 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
              style={{
                animation: isVisible
                  ? `scaleIn 0.6s ease-out ${index * 0.1}s both`
                  : "none",
              }}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Discount Badge */}
              {product.originalPrice && (
                <div className="absolute top-3 left-3 z-10 bg-linear-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  {Math.round(
                    (1 - product.price / product.originalPrice) * 100,
                  )}
                  % OFF
                </div>
              )}

              {/* Wishlist Button */}
              <button className="absolute top-3 right-3 z-10 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-amber-100 transition-colors shadow-md">
                <Heart className="w-4 h-4 text-slate-700" />
              </button>

              {/* Product Image */}
              <div className="relative aspect-4/4 overflow-hidden bg-linear-to-br from-amber-50 to-orange-50">
                <Image
                  width={300}
                  height={300}
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Quick Actions Overlay */}
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
                    Quick View
                  </Button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5 space-y-3">
                <div>
                  <h3 className="font-semibold text-slate-900 text-base line-clamp-2 group-hover:text-amber-600 transition-colors">
                    {product.name}
                    <p className="text-xs text-amber-600 font-medium mb-1">
                      {product.author || product.brand}
                    </p>
                  </h3>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(product.rating)
                            ? "text-amber-500 fill-amber-500"
                            : "text-slate-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-slate-600">
                    ({product.reviews})
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

                {/* Stock indicator */}
                {product.stock < 10 && (
                  <p className="text-xs text-orange-600 font-medium">
                    Only {product.stock} left in stock!
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
