import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <span className="text-2xl font-bold">BookHaven</span>
            </div>
            <p className="text-slate-400 mb-6 max-w-sm">
              Your trusted destination for books, stationery, and all things reading. Discover, explore, and fall in love with stories.
            </p>
            
            {/* Newsletter */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3">Subscribe to our newsletter</h4>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                />
                <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="font-semibold mb-3">Follow Us</h4>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-amber-600 rounded-lg flex items-center justify-center transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-amber-600 rounded-lg flex items-center justify-center transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-amber-600 rounded-lg flex items-center justify-center transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-amber-600 rounded-lg flex items-center justify-center transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Shop Categories */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-3">
              <li><a href="/products" className="text-slate-400 hover:text-amber-500 transition-colors">All Products</a></li>
              <li><a href="/bestsellers" className="text-slate-400 hover:text-amber-500 transition-colors">Bestsellers</a></li>
              <li><a href="/sale" className="text-slate-400 hover:text-amber-500 transition-colors">Sale</a></li>
              <li><a href="/featured" className="text-slate-400 hover:text-amber-500 transition-colors">Featured</a></li>
              <li><a href="/new-arrivals" className="text-slate-400 hover:text-amber-500 transition-colors">New Arrivals</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-3">
              <li><a href="/contact" className="text-slate-400 hover:text-amber-500 transition-colors">Contact Us</a></li>
              <li><a href="/faq" className="text-slate-400 hover:text-amber-500 transition-colors">FAQ</a></li>
              <li><a href="/shipping" className="text-slate-400 hover:text-amber-500 transition-colors">Shipping & Delivery</a></li>
              <li><a href="/returns" className="text-slate-400 hover:text-amber-500 transition-colors">Returns & Refunds</a></li>
              <li><a href="/payment-methods" className="text-slate-400 hover:text-amber-500 transition-colors">Payment Methods</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              <li><a href="/about" className="text-slate-400 hover:text-amber-500 transition-colors">About Us</a></li>
              <li><a href="/careers" className="text-slate-400 hover:text-amber-500 transition-colors">Careers</a></li>
              <li><a href="/blog" className="text-slate-400 hover:text-amber-500 transition-colors">Blog</a></li>
              <li><a href="/privacy" className="text-slate-400 hover:text-amber-500 transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="text-slate-400 hover:text-amber-500 transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-slate-800">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
            <div>
              <h5 className="font-semibold mb-1">Address</h5>
              <p className="text-slate-400 text-sm">123 Book Street, Reading City, RC 12345, USA</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
            <div>
              <h5 className="font-semibold mb-1">Phone</h5>
              <p className="text-slate-400 text-sm">+1 (555) 123-4567</p>
              <p className="text-slate-400 text-sm">Mon-Fri: 9AM - 6PM</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
            <div>
              <h5 className="font-semibold mb-1">Email</h5>
              <p className="text-slate-400 text-sm">support@bookhaven.com</p>
              <p className="text-slate-400 text-sm">sales@bookhaven.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © 2024 BookHaven. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-6 opacity-70" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6 opacity-70" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6 opacity-70" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="Amex" className="h-6 opacity-70" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}