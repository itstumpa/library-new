"use client"
import React, { useState, useEffect } from 'react';
import { FileText, Scale, AlertCircle, CheckCircle } from 'lucide-react';

export default function TermsConditionsPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => {

      setIsVisible(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const sections = [
    {
      icon: CheckCircle,
      title: 'Acceptance of Terms',
      content: [
        'By accessing and using BookHaven\'s website and services, you accept and agree to be bound by these Terms and Conditions.',
        'If you do not agree to these terms, please do not use our services.',
        'We reserve the right to modify these terms at any time. Continued use of our services constitutes acceptance of any changes.',
        'These terms apply to all visitors, users, and customers of our website.',
      ],
    },
    {
      icon: FileText,
      title: 'Use of Services',
      content: [
        'You must be at least 18 years old to make purchases on our website.',
        'You are responsible for maintaining the confidentiality of your account credentials.',
        'You agree to provide accurate, current, and complete information during registration and checkout.',
        'You may not use our services for any illegal or unauthorized purpose.',
        'You agree not to reproduce, duplicate, copy, sell, or exploit any portion of our website without permission.',
      ],
    },
    {
      icon: Scale,
      title: 'Products and Pricing',
      content: [
        'All products are subject to availability. We reserve the right to limit quantities.',
        'Prices are subject to change without notice. The price charged will be the price displayed at the time of purchase.',
        'We strive to display accurate product information, but we do not guarantee that descriptions, images, or other content is error-free.',
        'We reserve the right to refuse or cancel any order for any reason, including pricing errors.',
        'All prices are listed in USD unless otherwise specified.',
      ],
    },
    {
      icon: AlertCircle,
      title: 'Orders and Payment',
      content: [
        'By placing an order, you are making an offer to purchase products subject to these terms.',
        'We reserve the right to accept or decline your order for any reason.',
        'Payment must be received before products are shipped.',
        'We accept major credit cards, PayPal, and other payment methods as indicated at checkout.',
        'You are responsible for any taxes, duties, or customs fees associated with your order.',
      ],
    },
  ];

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
              <FileText className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-medium text-amber-800">Legal Agreement</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Terms & <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-600 to-orange-600">Conditions</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Please read these terms carefully before using our services.
            </p>
            <p className="text-sm text-slate-500 mt-4">Last updated: February 8, 2024</p>
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-12 bg-white border-y border-amber-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-linear-to-br from-orange-50 to-red-50 rounded-xl p-6 border-2 border-orange-200">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-8 h-8 text-orange-600 shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Important Notice</h3>
                  <p className="text-slate-700 leading-relaxed">
                    These Terms and Conditions constitute a legally binding agreement between you and BookHaven. 
                    By using our website or making a purchase, you acknowledge that you have read, understood, 
                    and agree to be bound by these terms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {sections.map((section, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl border border-amber-200 p-8 shadow-sm hover:shadow-md transition-all duration-300 ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ animation: isVisible ? `fadeInUp 0.8s ease-out ${index * 0.1}s both` : 'none' }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-linear-to-br from-amber-600 to-orange-600 rounded-lg flex items-center justify-center">
                    <section.icon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">{section.title}</h2>
                </div>
                <ul className="space-y-4">
                  {section.content.map((item, i) => (
                    <li key={i} className="text-slate-600 leading-relaxed pl-6 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-amber-500 before:rounded-full">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Additional Sections */}
            <div className="bg-white rounded-xl border border-amber-200 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Shipping and Delivery</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                We aim to process and ship orders within 1-2 business days. Delivery times vary based on your location and selected shipping method. Standard shipping takes 3-5 business days, while express options are available for faster delivery.
              </p>
              <p className="text-slate-600 leading-relaxed">
                We are not responsible for delays caused by shipping carriers, customs, or circumstances beyond our control. Title and risk of loss pass to you upon delivery to the carrier.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-amber-200 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Returns and Refunds</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                We offer a 30-day return policy for most items in their original condition. Books must be unmarked and in resalable condition. Refunds are processed within 5-7 business days of receiving your return.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Return shipping costs are the customer&apos;s responsibility unless the item is defective or we made an error. Some items may be subject to restocking fees.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-amber-200 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Intellectual Property</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                All content on this website, including text, graphics, logos, images, and software, is the property of BookHaven or its content suppliers and is protected by copyright and intellectual property laws.
              </p>
              <p className="text-slate-600 leading-relaxed">
                You may not reproduce, distribute, modify, or create derivative works from any content without our express written permission.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-amber-200 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Limitation of Liability</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                To the fullest extent permitted by law, BookHaven shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Our total liability for any claim arising from these terms or your use of our services shall not exceed the amount you paid for the product giving rise to the claim.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-amber-200 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Governing Law</h2>
              <p className="text-slate-600 leading-relaxed">
                These Terms and Conditions are governed by the laws of the United States. Any disputes arising from these terms shall be resolved in the courts of Reading City, RC, USA.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-amber-200 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Modifications to Terms</h2>
              <p className="text-slate-600 leading-relaxed">
                We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting to the website. Your continued use of our services after any changes constitutes acceptance of the new terms.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-amber-200 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact Information</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you have any questions about these Terms and Conditions, please contact us:
              </p>
              <div className="space-y-2 text-slate-600">
                <p>Email: legal@bookhaven.com</p>
                <p>Phone: +1 (555) 123-4567</p>
                <p>Address: 123 Book Street, Reading City, RC 12345, USA</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-linear-to-r from-amber-600 to-orange-600">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Have Questions?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Our customer support team is here to help clarify any terms or conditions
          </p>
          <a href="/contact" className="inline-block px-8 py-3 bg-white text-amber-600 rounded-lg font-semibold hover:bg-amber-50 transition-colors">
            Contact Support
          </a>
        </div>
      </section>
    </div>
  );
}