
import React from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cart from "../components/Cart";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Minimal Design, Maximum Style</h1>
              <p className="text-lg text-gray-600 mb-8">
                Discover our curated collection of minimalist products designed for contemporary living.
              </p>
              <div className="flex justify-center">
                <Button size="lg" className="rounded-full">
                  Shop Now <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Products Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold mb-2">Our Products</h2>
            <p className="text-gray-600">Curated collection of minimalist essentials</p>
          </div>
          
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
        
        {/* Features Section */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-12 h-12 bg-black/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl">✦</span>
                </div>
                <h3 className="font-medium text-lg mb-2">Quality Materials</h3>
                <p className="text-gray-600 text-sm">
                  All our products are made from premium quality materials.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-12 h-12 bg-black/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl">✦</span>
                </div>
                <h3 className="font-medium text-lg mb-2">Fast Shipping</h3>
                <p className="text-gray-600 text-sm">
                  Get your orders delivered quickly and securely.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-12 h-12 bg-black/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl">✦</span>
                </div>
                <h3 className="font-medium text-lg mb-2">Satisfaction Guarantee</h3>
                <p className="text-gray-600 text-sm">
                  Not happy with your purchase? Return it within 30 days.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <Cart />
    </div>
  );
};

export default Index;
