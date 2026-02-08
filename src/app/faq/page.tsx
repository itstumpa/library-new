"use client"
import React, { useState, useEffect } from 'react';
import { ChevronDown, Search, HelpCircle, Package, CreditCard, RotateCcw, Truck } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function FAQPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [openItem, setOpenItem] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const id = requestAnimationFrame(() => {

      setIsVisible(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const categories = [
    { id: 'all', name: 'All Questions', icon: HelpCircle },
    { id: 'orders', name: 'Orders', icon: Package },
    { id: 'payment', name: 'Payment', icon: CreditCard },
    { id: 'shipping', name: 'Shipping', icon: Truck },
    { id: 'returns', name: 'Returns', icon: RotateCcw },
  ];

  const faqs = [
    {
      category: 'orders',
      question: 'How do I place an order?',
      answer: 'Simply browse our collection, add items to your cart, and proceed to checkout. You\'ll need to create an account or log in, provide shipping information, and complete payment. You\'ll receive an order confirmation email immediately.',
    },
    {
      category: 'orders',
      question: 'Can I modify or cancel my order?',
      answer: 'Orders can be modified or cancelled within 1 hour of placement. After that, the order enters our processing system. Please contact our customer service team immediately if you need to make changes.',
    },
    {
      category: 'payment',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay, and bank transfers. All transactions are secured with SSL encryption.',
    },
    {
      category: 'payment',
      question: 'Is my payment information secure?',
      answer: 'Absolutely. We use industry-standard SSL encryption and do not store your complete credit card information. All payment processing is handled by certified payment gateways.',
    },
    {
      category: 'shipping',
      question: 'How long does shipping take?',
      answer: 'Standard shipping takes 3-5 business days. Express shipping (2-3 days) and overnight shipping options are available at checkout. International orders typically take 7-14 business days.',
    },
    {
      category: 'shipping',
      question: 'Do you offer free shipping?',
      answer: 'Yes! We offer free standard shipping on orders over $50. Express shipping is available for an additional fee.',
    },
    {
      category: 'shipping',
      question: 'Can I track my order?',
      answer: 'Yes, once your order ships, you\'ll receive a tracking number via email. You can track your package in real-time through our website or the carrier\'s website.',
    },
    {
      category: 'returns',
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for most items. Books must be in original condition with no markings. Return shipping is free for defective items, otherwise customers are responsible for return shipping costs.',
    },
    {
      category: 'returns',
      question: 'How do I initiate a return?',
      answer: 'Log into your account, go to Order History, select the order, and click "Return Items". Follow the prompts to print your return label. Refunds are processed within 5-7 business days of receiving the return.',
    },
    {
      category: 'orders',
      question: 'Do you offer gift wrapping?',
      answer: 'Yes! Gift wrapping is available for $5 per item at checkout. We also include a personalized gift message at no extra charge.',
    },
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-white to-orange-50">
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-amber-100/50 to-orange-100/50" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div 
            className={`text-center max-w-4xl mx-auto transition-all duration-1000 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ animation: isVisible ? 'fadeInUp 0.8s ease-out' : 'none' }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 border border-amber-200 mb-6">
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-medium text-amber-800">Help Center</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Frequently Asked <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-600 to-orange-600">Questions</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              Find quick answers to common questions about our services
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 bg-white border-slate-300 focus:border-amber-500 shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white border-y border-amber-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-linear-to-r from-amber-600 to-orange-600 text-white shadow-lg'
                    : 'bg-slate-100 text-slate-700 hover:bg-amber-50'
                } ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{ animation: isVisible ? `fadeInUp 0.8s ease-out ${index * 0.1}s both` : 'none' }}
              >
                <category.icon className="w-5 h-5" />
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Items */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-4">
            {filteredFaqs.map((faq, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl border border-amber-200 shadow-sm hover:shadow-md transition-all duration-300 ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ animation: isVisible ? `fadeInUp 0.6s ease-out ${index * 0.05}s both` : 'none' }}
              >
                <button
                  onClick={() => setOpenItem(openItem === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <h3 className="text-lg font-semibold text-slate-900 pr-4">{faq.question}</h3>
                  <ChevronDown 
                    className={`w-5 h-5 text-amber-600 shrink-0 transition-transform duration-300 ${
                      openItem === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    openItem === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 pb-5 text-slate-600 leading-relaxed border-t border-amber-100 pt-4">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-700 mb-2">No results found</h3>
              <p className="text-slate-600">Try adjusting your search or browse different categories</p>
            </div>
          )}
        </div>
      </section>

      {/* Still Need Help */}
      <section className="py-16 bg-linear-to-r from-amber-600 to-orange-600">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Can&apos;t find what you&apos;re looking for? Our customer support team is here to help
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/contact" className="px-8 py-3 bg-white text-amber-600 rounded-lg font-semibold hover:bg-amber-50 transition-colors">
              Contact Support
            </a>
            <a href="mailto:support@bookhaven.com" className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors">
              Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}