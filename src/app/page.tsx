// import { HeroSection } from '@/components/customer/home/HeroSection';

"use client";
// import AllProducts from "@/components/allProducts";
import BestsellerPage from "@/components/bestsellerProducts";
import CTASection from "@/components/CTASection";
import CustomerReviews from "@/components/customerReviews";
import FeaturedProducts from "@/components/featuredProducts";
import HeroSection from "@/components/HeroSection";
import SaleProducts from "@/components/saleProducts";

export default function HomePage() {
  return (
    <div>
   
      <HeroSection />
      <FeaturedProducts />
      <SaleProducts />
      {/* <AllProducts /> */}
      <BestsellerPage />
      <CustomerReviews />
      <CTASection />

    </div>
  );
}