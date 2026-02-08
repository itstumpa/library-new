import React, { useState, useEffect } from 'react';
import { ArrowRight, Mail,Shield, Star, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function CTASection() {
  const [email, setEmail] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('cta-section');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Add your submit logic here
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  return (
    <section id="cta-section" className="py-16 md:py-22 relative overflow-hidden bg-linear-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f59e0b15_1px,transparent_1px),linear-gradient(to_bottom,#f59e0b15_1px,transparent_1px)] bg-size-[4rem_4rem]" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-linear-to-r from-amber-500/10 to-orange-500/10 rounded-full blur-3xl" />
      </div>



      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.1; }
          50% { transform: translateY(-30px) rotate(10deg); opacity: 0.3; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <div className="container mx-auto px-4 relative z-10">
        <div 
          className={`max-w-7xl mx-auto transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Main CTA Card */}
          <div className="relative group">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-linear-to-r from-amber-600 to-orange-600 rounded-3xl opacity-20 group-hover:opacity-30 blur-xl transition-all duration-500" />
            
            <div className="relative bg-linear-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-amber-500/20 rounded-3xl p-8 md:p-16 shadow-2xl">
              {/* Header Section */}
              <div className="text-center max-w-5xl mx-auto mb-10">
                {/* Badge */}
                <div 
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-linear-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 mb-8"
                  style={{ animation: isVisible ? 'fadeInUp 0.6s ease-out 0.2s both' : 'none' }}
                >
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span className="text-sm font-semibold text-amber-300 tracking-wide">LIMITED TIME OFFER</span>
                  <Sparkles className="w-5 h-5 text-amber-400" />
                </div>

                {/* Main Heading */}
                <h2 
                  className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
                  style={{ animation: isVisible ? 'fadeInUp 0.6s ease-out 0.3s both' : 'none' }}
                >
                  <span className="text-white">Join </span>
                  <span 
                    className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 via-orange-400 to-amber-400 inline-block"
                    style={{
                      backgroundSize: '200% auto',
                      animation: 'shimmer 3s linear infinite'
                    }}
                  >
                    100,000+ 
                  </span>
                  
                  <span className="text-white"> Book Lovers</span>
                </h2>

                <p 
                  className="text-xl md:text-2xl text-slate-300 mb-4 leading-relaxed"
                  style={{ animation: isVisible ? 'fadeInUp 0.6s ease-out 0.4s both' : 'none' }}
                >
                  Subscribe now and get <span className="text-amber-400 font-bold">20% OFF</span> your first order
                </p>

                <p 
                  className="text-base text-slate-400"
                  style={{ animation: isVisible ? 'fadeInUp 0.6s ease-out 0.5s both' : 'none' }}
                >
                  Plus exclusive deals, early access to new releases, and personalized recommendations
                </p>
              </div>

              {/* Email Form */}
              <form 
                onSubmit={handleSubmit}
                className="max-w-2xl mx-auto mb-12"
                style={{ animation: isVisible ? 'scaleIn 0.6s ease-out 0.6s both' : 'none' }}
              >
                <div className="flex flex-col sm:flex-row gap-4 p-2 bg-slate-800/50 rounded-2xl border border-amber-500/20 shadow-2xl">
                  <div className="relative flex-1">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400 w-5 h-5" />
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-12 h-14 bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-amber-500 focus:ring-amber-500/20 rounded-xl"
                    />
                  </div>
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="h-14 px-8 bg-linear-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300 rounded-xl group relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center">
                      {isSubmitting ? 'Subscribing...' : 'Get 20% Off'}
                      <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                    </span>
                    <div className="absolute inset-0 bg-linear-to-r from-amber-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Button>
                </div>
              </form>



              {/* Trust Badges */}
              <div 
                className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400 pt-8 border-t border-slate-800"
                style={{ animation: isVisible ? 'fadeInUp 0.6s ease-out 1.1s both' : 'none' }}
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-amber-400" />
                  <span>Secure & Private</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-400" />
                  <span>Instant Access</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <span>Cancel Anytime</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div 
            className="text-center mt-10"
            style={{ animation: isVisible ? 'fadeInUp 0.6s ease-out 1.2s both' : 'none' }}
          >
            <p className="text-slate-400 text-sm">
              Join <span className="text-amber-400 font-semibold">100,000+ readers</span> who get exclusive book deals every week
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}