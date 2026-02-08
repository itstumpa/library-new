
"use client"
import React, { useState, useEffect } from 'react';

import { Gift, Heart, ShoppingCart, Tag, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount] = useState(3);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Top Promo Bar */}
      <div className={`fixed top-0 left-0 right-0 z-50 bg-linear-to-r from-amber-600 to-orange-600 text-white py-2.5 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-md bg-opacity-95' : ''
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 text-sm font-medium">
            <Tag className="w-4 h-4" />
            <span className="hidden sm:inline">Limited Time Offer:</span>
            <span className="font-bold">40% OFF on All Bestsellers</span>
            <Gift className="w-4 h-4 hidden sm:inline" />
            <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Use code: BOOK40</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`fixed top-10 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'backdrop-blur-lg bg-white/80 shadow-lg border-b border-slate-200/50' 
          : 'bg-white border-b border-slate-200'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-linear-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <span className="text-xl font-bold text-slate-900">BookHaven</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-slate-700 hover:text-amber-600 font-medium transition-colors">Home</Link>
              <Link href="books" className="text-slate-700 hover:text-amber-600 font-medium transition-colors">Books</Link>
              <Link href="stationery" className="text-slate-700 hover:text-amber-600 font-medium transition-colors">Stationery</Link>
              <Link href="bestsellers" className="text-slate-700 hover:text-amber-600 font-medium transition-colors">Bestsellers</Link>
              <Link href="contact" className="text-slate-700 hover:text-amber-600 font-medium transition-colors">Contact</Link>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative hover:bg-amber-50 text-slate-700">
                <Heart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-600 text-white text-xs rounded-full flex items-center justify-center">
                  2
                </span>
              </Button>
              
              <Button variant="ghost" size="icon" className="relative hover:bg-amber-50 text-slate-700">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-600 text-white text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              </Button>

              <Button variant="ghost" size="icon" className="hover:bg-amber-50 text-slate-700 hidden md:flex">
                <User className="w-5 h-5" />
              </Button>

              <Button className="hidden md:flex bg-linear-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white">
                Sign In
              </Button>

              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden text-slate-700"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-200">
              <div className="flex flex-col gap-4">
                <Link href="#" className="text-slate-700 hover:text-amber-600 font-medium">Home</Link>
                <Link href="books" className="text-slate-700 hover:text-amber-600 font-medium">Books</Link>
                <Link href="stationery" className="text-slate-700 hover:text-amber-600 font-medium">Stationery</Link>
                <Link href="bestsellers" className="text-slate-700 hover:text-amber-600 font-medium">Bestsellers</Link>
                <Link href="contact" className="text-slate-700 hover:text-amber-600 font-medium">Contact</Link>
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