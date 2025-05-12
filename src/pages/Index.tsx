
import React from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import Cart from "../components/Cart";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">Our Products</h2>
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>
      <Cart />
    </div>
  );
};

export default Index;
