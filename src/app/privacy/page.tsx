"use client"
import React, { useState, useEffect } from 'react';
import { Shield, Eye, Lock, Database, UserCheck, Globe } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const sections = [
    {
      icon: Database,
      title: 'Information We Collect',
      content: [
        'Personal Information: When you create an account, we collect your name, email address, shipping address, and phone number.',
        'Payment Information: Payment details are processed securely through our payment partners. We do not store complete credit card information.',
        'Browsing Data: We collect information about your interactions with our website, including pages visited, products viewed, and search queries.',
        'Device Information: We may collect information about the device you use to access our services, including IP address, browser type, and operating system.',
      ],
    },
    {
      icon: Eye,
      title: 'How We Use Your Information',
      content: [
        'Order Processing: To process and fulfill your orders, send order confirmations, and provide customer support.',
        'Communication: To send you updates about your orders, promotional offers (with your consent), and important service announcements.',
        'Personalization: To provide personalized recommendations and improve your shopping experience.',
        'Analytics: To understand how customers use our website and improve our services.',
        'Legal Compliance: To comply with legal obligations and protect our rights.',
      ],
    },
    {
      icon: Lock,
      title: 'Data Security',
      content: [
        'We implement industry-standard security measures to protect your personal information.',
        'All sensitive data is encrypted using SSL/TLS technology during transmission.',
        'We regularly update our security practices and conduct security audits.',
        'Access to personal information is restricted to authorized employees only.',
        'We use secure servers and firewalls to prevent unauthorized access.',
      ],
    },
    {
      icon: Globe,
      title: 'Sharing Your Information',
      content: [
        'Service Providers: We share information with trusted third-party service providers who assist us in operating our website and conducting our business (e.g., payment processors, shipping companies).',
        'Legal Requirements: We may disclose information when required by law or to protect our rights.',
        'Business Transfers: In the event of a merger or acquisition, your information may be transferred to the new owner.',
        'We do not sell your personal information to third parties for marketing purposes.',
      ],
    },
    {
      icon: UserCheck,
      title: 'Your Rights',
      content: [
        'Access: You have the right to access the personal information we hold about you.',
        'Correction: You can request corrections to inaccurate or incomplete information.',
        'Deletion: You may request deletion of your personal information, subject to legal requirements.',
        'Opt-Out: You can opt out of marketing communications at any time by clicking the unsubscribe link in our emails.',
        'Data Portability: You have the right to receive your data in a structured, commonly used format.',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-100/50 to-orange-100/50" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div 
            className={`text-center max-w-4xl mx-auto transition-all duration-1000 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ animation: isVisible ? 'fadeInUp 0.8s ease-out' : 'none' }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 border border-amber-200 mb-6">
              <Shield className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-medium text-amber-800">Your Privacy Matters</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">Policy</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              We are committed to protecting your privacy and ensuring the security of your personal information.
            </p>
            <p className="text-sm text-slate-500 mt-4">Last updated: February 8, 2024</p>
          </div>
        </div>
      </section>

      {/* Quick Summary */}
      <section className="py-12 bg-white border-y border-amber-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Quick Summary</h2>
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span>We collect only the information necessary to provide our services</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span>We do not sell your personal information to third parties</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span>You have full control over your data and can request deletion at any time</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span>We use industry-standard security measures to protect your information</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Sections */}
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
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-orange-600 rounded-lg flex items-center justify-center">
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
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Cookies and Tracking</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and personalize content. Cookies are small text files stored on your device.
              </p>
              <p className="text-slate-600 leading-relaxed">
                You can control cookie settings through your browser preferences. However, disabling cookies may limit certain features of our website.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-amber-200 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Children's Privacy</h2>
              <p className="text-slate-600 leading-relaxed">
                Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children. If you believe we have inadvertently collected such information, please contact us immediately.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-amber-200 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Changes to This Policy</h2>
              <p className="text-slate-600 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date. We encourage you to review this policy periodically.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-amber-200 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact Us</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-2 text-slate-600">
                <p>Email: privacy@bookhaven.com</p>
                <p>Phone: +1 (555) 123-4567</p>
                <p>Address: 123 Book Street, Reading City, RC 12345, USA</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Questions About Your Privacy?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Our team is here to help answer any questions you may have
          </p>
          <a href="/contact" className="inline-block px-8 py-3 bg-white text-amber-600 rounded-lg font-semibold hover:bg-amber-50 transition-colors">
            Contact Support
          </a>
        </div>
      </section>
    </div>
  );
}