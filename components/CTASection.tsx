import React, { useState, useEffect } from 'react';
import { ArrowRight, Mail, Gift, Truck, Shield, Star, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function CTASection() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [floatingElements, setFloatingElements] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    setIsVisible(true);
    
    // Generate random floating elements
    const elements = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setFloatingElements(elements);
  }, []);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {floatingElements.map((el) => (
          <div
            key={el.id}
            className="absolute w-2 h-2 bg-amber-500/20 rounded-full"
            style={{
              left: `${el.x}%`,
              top: `${el.y}%`,
              animation: `float 6s ease-in-out infinite`,
              animationDelay: `${el.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
      
      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          25% { transform: translateY(-20px) translateX(10px); opacity: 0.6; }
          50% { transform: translateY(-10px) translateX(-10px); opacity: 0.8; }
          75% { transform: translateY(-30px) translateX(5px); opacity: 0.6; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
      `}</style>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main CTA Card */}
        <div 
          className={`container mx-auto bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-3xl p-8 md:p-16 shadow-2xl transition-all duration-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ animation: isVisible ? 'scaleIn 1s ease-out' : 'none' }}
        >
          {/* Badge */}
          <div 
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 mb-6 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ animation: isVisible ? 'fadeInUp 0.8s ease-out 0.2s both' : 'none' }}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-amber-300">Exclusive Offer</span>
          </div>

          {/* Heading */}
          <h2 
            className={`text-4xl md:text-6xl font-bold text-white mb-6 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ animation: isVisible ? 'fadeInUp 0.8s ease-out 0.3s both' : 'none' }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400"
                  style={{
                    backgroundSize: '200% auto',
                    animation: 'shimmer 3s linear infinite'
                  }}>
              Get 20% Off
            </span>
            <br />
            Your First Order
          </h2>

          <p 
            className={`text-xl text-slate-300 mb-8 max-w-2xl transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ animation: isVisible ? 'fadeInUp 0.8s ease-out 0.4s both' : 'none' }}
          >
            Subscribe to our newsletter and unlock exclusive deals, early access to new arrivals, and personalized book recommendations.
          </p>

          {/* Email Form */}
          <div 
            className={`flex flex-col sm:flex-row gap-4 mb-8 max-w-2xl transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ animation: isVisible ? 'fadeInUp 0.8s ease-out 0.5s both' : 'none' }}
          >
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-12 h-14 bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-amber-500 backdrop-blur-sm"
              />
            </div>
            <Button className="h-14 px-8 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold shadow-lg group">
              Subscribe Now
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div 
              className={`flex items-start gap-4 transition-all duration-1000 delay-600 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ animation: isVisible ? 'slideInLeft 0.8s ease-out 0.6s both' : 'none' }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0 border border-amber-500/30">
                <Gift className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Exclusive Deals</h4>
                <p className="text-sm text-slate-400">Member-only discounts and promotions</p>
              </div>
            </div>

            <div 
              className={`flex items-start gap-4 transition-all duration-1000 delay-700 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ animation: isVisible ? 'fadeInUp 0.8s ease-out 0.7s both' : 'none' }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0 border border-amber-500/30">
                <Truck className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Free Shipping</h4>
                <p className="text-sm text-slate-400">On orders over $50 for subscribers</p>
              </div>
            </div>

            <div 
              className={`flex items-start gap-4 transition-all duration-1000 delay-800 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ animation: isVisible ? 'slideInRight 0.8s ease-out 0.8s both' : 'none' }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0 border border-amber-500/30">
                <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Early Access</h4>
                <p className="text-sm text-slate-400">Be first to discover new releases</p>
              </div>
            </div>
          </div>

          {/* Trust Badge */}
          <div 
            className={`flex items-center justify-center gap-2 mt-8 text-sm text-slate-400 transition-all duration-1000 delay-900 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ animation: isVisible ? 'fadeInUp 0.8s ease-out 0.9s both' : 'none' }}
          >
            <Shield className="w-4 h-4" />
            <span>Your email is safe with us. Unsubscribe anytime.</span>
          </div>
        </div>

     
        
      </div>
    </section>
  );
}