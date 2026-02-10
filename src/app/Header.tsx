"use client";
import { Button } from "@/components/ui/button";
import { Gift, Heart, Menu, ShoppingCart, Tag, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount] = useState(3);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/allproducts", label: "All Products" },
    { href: "/books", label: "Books" },
    { href: "/stationery", label: "Stationery" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      {/* Top Promo Bar */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 bg-linear-to-r from-amber-600 to-orange-600 text-white py-2 sm:py-2.5 transition-all duration-300 ${
          scrolled ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex items-center justify-center gap-1.5 sm:gap-3 text-xs sm:text-sm font-medium">
            <Tag className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
            <span className="hidden md:inline whitespace-nowrap">
              Limited Time Offer:
            </span>
            <span className="font-bold whitespace-nowrap text-center">
              40% OFF
              <span className="hidden xs:inline"> on All Bestsellers</span>
            </span>
            <Gift className="w-3 h-3 sm:w-4 sm:h-4 hidden lg:inline shrink-0" />
            <span className="text-[10px] sm:text-xs bg-white/20 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full whitespace-nowrap">
              BOOK40
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={`fixed left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "top-0 backdrop-blur-lg bg-white/80 shadow-lg border-b border-slate-200/50"
            : "top-10 bg-white border-b border-slate-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4  md:px-8">
          <div className="flex bg items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-linear-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <span className="text-xl font-bold text-slate-900">
                BookHaven
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-amber-600"
                      : "text-slate-700 hover:text-amber-600"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-amber-50 text-slate-700"
              >
                <Heart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-600 text-white text-xs rounded-full flex items-center justify-center">
                  2
                </span>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-amber-50 text-slate-700"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-600 text-white text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-amber-50 text-slate-700 hidden md:flex"
              >
                <User className="w-5 h-5" />
              </Button>

              <Button className="hidden md:flex bg-linear-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white">
                Sign In
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-slate-700"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-slate-200">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`font-medium transition-colors ${
                      isActive(link.href)
                        ? "text-amber-600"
                        : "text-slate-700 hover:text-amber-600"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Button className="w-full bg-linear-to-r from-amber-600 to-orange-600 text-white">
                  Sign In
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
