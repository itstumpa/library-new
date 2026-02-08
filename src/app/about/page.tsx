"use client"
import React, { useState, useEffect } from 'react';
import { BookOpen, Users, Award, Target, Heart, TrendingUp } from 'lucide-react';

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { icon: BookOpen, value: '50,000+', label: 'Books Available' },
    { icon: Users, value: '100,000+', label: 'Happy Customers' },
    { icon: Award, value: '15+', label: 'Years Experience' },
    { icon: TrendingUp, value: '98%', label: 'Customer Satisfaction' },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Passion for Reading',
      description: 'We believe books change lives. Our passion drives us to curate the best selection for every reader.',
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'Your satisfaction is our priority. We go above and beyond to ensure you have the best shopping experience.',
    },
    {
      icon: Award,
      title: 'Quality Assured',
      description: 'Every product is carefully selected and inspected to meet our high standards of quality.',
    },
    {
      icon: Target,
      title: 'Innovation',
      description: 'We continuously improve our services and embrace new technologies to serve you better.',
    },
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: 'https://i.pravatar.cc/300?img=1',
      bio: 'Book enthusiast with 20+ years in publishing',
    },
    {
      name: 'Michael Chen',
      role: 'Head of Operations',
      image: 'https://i.pravatar.cc/300?img=12',
      bio: 'Expert in logistics and customer experience',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Curation Director',
      image: 'https://i.pravatar.cc/300?img=5',
      bio: 'Literature professor turned book curator',
    },
    {
      name: 'David Thompson',
      role: 'Marketing Director',
      image: 'https://i.pravatar.cc/300?img=8',
      bio: 'Digital marketing strategist and reader advocate',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
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
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">BookHaven</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Where stories come alive and knowledge finds a home. We&apos;re more than just a bookstore – we&apos;re a community of passionate readers dedicated to spreading the joy of reading.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center transition-all duration-1000 delay-${index * 100} ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ animation: isVisible ? `fadeInUp 0.8s ease-out ${index * 0.1}s both` : 'none' }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-amber-600" />
                </div>
                <div className="text-4xl font-bold text-slate-900 mb-2">{stat.value}</div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
              className={`transition-all duration-1000 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ animation: isVisible ? 'slideIn 1s ease-out 0.3s both' : 'none' }}
            >
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Founded in 2009, BookHaven started as a small neighborhood bookstore with a simple mission: to make quality books accessible to everyone. What began as a passion project by a group of book lovers has grown into one of the most trusted online destinations for readers worldwide.
                </p>
                <p>
                  Over the years, we&apos;ve expanded our collection to include over 50,000 titles spanning every genre imaginable – from classic literature to contemporary bestsellers, from academic texts to children&apos;s books. But our core values remain unchanged: quality, accessibility, and a genuine love for the written word.
                </p>
                <p>
                  Today, we&apos;re proud to serve over 100,000 satisfied customers, but we never forget that behind every order is a person looking for their next great read. That&apos;s what drives us every single day.
                </p>
              </div>
            </div>

            <div
              className={`transition-all duration-1000 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ animation: isVisible ? 'fadeInUp 1s ease-out 0.5s both' : 'none' }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-200/50 to-orange-200/50 rounded-2xl transform rotate-3" />
                <img
                  src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800"
                  alt="Bookstore"
                  className="relative rounded-2xl shadow-2xl w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Values</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              These principles guide everything we do, from selecting books to serving our customers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200 hover:shadow-lg transition-all duration-300 ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ animation: isVisible ? `fadeInUp 0.8s ease-out ${0.6 + index * 0.1}s both` : 'none' }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-orange-600 rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{value.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              The passionate people behind BookHaven, working every day to bring you the best reading experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className={`group bg-white rounded-xl overflow-hidden border border-amber-200 hover:shadow-xl transition-all duration-300 ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ animation: isVisible ? `fadeInUp 0.8s ease-out ${1 + index * 0.1}s both` : 'none' }}
              >
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-amber-100 to-orange-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">{member.name}</h3>
                  <p className="text-sm text-amber-600 font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-slate-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Join Our Community</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Discover your next favorite book and connect with fellow readers who share your passion
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/products" className="px-8 py-3 bg-white text-amber-600 rounded-lg font-semibold hover:bg-amber-50 transition-colors">
              Start Shopping
            </a>
            <a href="/contact" className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors">
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}