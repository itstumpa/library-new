"use client";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4  md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <span className="text-2xl font-bold">BookHaven</span>
            </div>
            <p className="text-slate-400 mb-6 max-w-sm">
              Your trusted destination for books, stationery, and all things
              reading. Discover, explore, and fall in love with stories.
            </p>

            {/* Social Media */}
            <div>
              <h4 className="font-semibold mb-3">Follow Us</h4>
              <div className="flex gap-3">
                <Link
                  href="#"
                  className="w-10 h-10 bg-slate-800 hover:bg-amber-600 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 bg-slate-800 hover:bg-amber-600 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 bg-slate-800 hover:bg-amber-600 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 bg-slate-800 hover:bg-amber-600 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Youtube className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Shop Categories */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/allproducts"
                  className="text-slate-400 hover:text-amber-500 transition-colors"
                >
                  All Products
                </Link>
              </li>

              <li>
                <Link
                  href="/books"
                  className="text-slate-400 hover:text-amber-500 transition-colors"
                >
                  Books
                </Link>
              </li>
              <li>
                <Link
                  href="/#bestsellers"
                  scroll={true}
                  className="text-slate-400 hover:text-amber-500 transition-colors"
                >
                  Bestsellers
                </Link>
              </li>

              <li>
                <Link
                  href="/#sale"
                  scroll={true}
                  className="text-slate-400 hover:text-amber-500 transition-colors"
                >
                  Sale
                </Link>
              </li>
              <li>
                <Link
                  href="/#featured"
                  scroll={true}
                  className="text-slate-400 hover:text-amber-500 transition-colors"
                >
                  Featured
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="/about"
                  className="text-slate-400 hover:text-amber-500 transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-slate-400 hover:text-amber-500 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-slate-400 hover:text-amber-500 transition-colors"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-slate-400 hover:text-amber-500 transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="text-slate-400 hover:text-amber-500 transition-colors"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Address</h4>
            <ul className="space-y-3">
              <div>
                <p className="text-slate-400 text-sm pb-1">
                  123 Book Street, Reading City, RC 12345, USA
                </p>
                <p className="text-slate-400 text-sm pb-1">
                  Phone: +1 (555) 123-4567
                </p>
                <p className="text-slate-400 text-sm pb-1">
                  Mon-Fri: 9AM - 6PM
                </p>
                <p className="text-slate-400 text-sm pb-1">
                  Mail: support@bookhaven.com
                </p>
              </div>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © 2026 BookHaven. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
                width={30}
                height={100}
                alt="Visa"
                className="h-6 opacity-70"
              />
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                alt="Mastercard"
                width={30}
                height={100}
                className="h-6 opacity-70"
              />
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                width={30}
                height={100}
                alt="PayPal"
                className="h-6 opacity-70"
              />
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg"
                alt="Amex"
                width={30}
                height={100}
                className="h-6 opacity-70"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
