"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HelpCircle, MapPin, MessageSquare, Send } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ContactPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setIsVisible(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-white to-orange-50">
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative py-20 md:pt-32 md:pb-10 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-amber-100/50 to-orange-100/50" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl" />

        <div className="max-w-7xl md:px-8 mx-auto px-4 relative z-10">
          <div
            className={`text-center max-w-4xl mx-auto transition-all duration-1000 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            style={{ animation: isVisible ? "fadeInUp 0.8s ease-out" : "none" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 border border-amber-200 mb-6">
              <MessageSquare className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-medium text-amber-800">
                We&apos;re Here to Help
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Get in{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-600 to-orange-600">
                Touch
              </span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Have questions? We&apos;d love to hear from you. Send us a message
              and we&apos;ll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-12 md:py-22">
        <div className="max-w-7xl md:px-8 mx-auto px-4 ">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div
              className={`transition-all duration-1000 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
              style={{
                animation: isVisible ? "slideIn 1s ease-out 0.3s both" : "none",
              }}
            >
              <div className="bg-white rounded-2xl border border-amber-200 p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  Send us a Message
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Your Name *
                    </label>
                    <Input
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="h-12 border-slate-300 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="h-12 border-slate-300 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Subject *
                    </label>
                    <Input
                      type="text"
                      placeholder="How can we help you?"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="h-12 border-slate-300 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      placeholder="Tell us more about your inquiry..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full min-h-37.5 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500 resize-none"
                    />
                  </div>

                  <Button
                    onClick={handleSubmit}
                    className="w-full h-12 bg-linear-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                </div>
              </div>
            </div>

            {/* Map & Additional Info */}
            <div
              className={`transition-all duration-1000 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
              style={{
                animation: isVisible
                  ? "fadeInUp 1s ease-out 0.5s both"
                  : "none",
              }}
            >
              {/* Map Placeholder */}
              <div className="bg-linear-to-br from-amber-100 to-orange-100 rounded-2xl overflow-hidden mb-6 h-80 border border-amber-200">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-amber-600 mx-auto mb-4" />
                    <p className="text-slate-600 font-medium">
                      Map Integration Here
                    </p>
                    <p className="text-sm text-slate-500">
                      123 Book Street, Reading City
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ Quick Links */}
              <div className="bg-white rounded-2xl border border-amber-200 p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <HelpCircle className="w-6 h-6 text-amber-600" />
                  <h3 className="text-2xl font-bold text-slate-900">
                    Quick Help
                  </h3>
                </div>
                <div className="space-y-4">
                  <Link
                    href="/faq"
                    className="block p-4 bg-linear-to-br from-amber-50 to-orange-50 rounded-lg hover:shadow-md transition-all border border-amber-100"
                  >
                    <h4 className="font-semibold text-slate-900 mb-1">FAQ</h4>
                    <p className="text-sm text-slate-600">
                      Find answers to common questions
                    </p>
                  </Link>
                  <div className="block p-4 bg-linear-to-br from-amber-50 to-orange-50 rounded-lg hover:shadow-md transition-all border border-amber-100">
                    <h4 className="font-semibold text-slate-900 mb-1">
                      Address
                    </h4>
                    <p className="text-sm text-slate-600">
                      123 Book Street, Reading City, RC 12345, United States
                    </p>
                    <p className="text-sm text-slate-600">
                      Email : support@bookhaven.com | sales@bookhaven.com
                    </p>
                    <p className="text-sm text-slate-600">
                      Phone : +1 (555) 123-4567 | Mon-Fri: 9AM - 6PM{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
