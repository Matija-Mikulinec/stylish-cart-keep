
import React from "react";
import { Product } from "../types/shop";
import { Button } from "./ui/button";
import { useCart } from "../context/CartContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
      <div className="aspect-square bg-gray-100 relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-medium text-lg mb-1">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-3 flex-grow">
          {product.description}
        </p>
        <div className="flex justify-between items-center mt-auto">
          <span className="font-semibold">${product.price.toFixed(2)}</span>
          <Button
            size="sm"
            onClick={() => addToCart(product)}
            className="text-xs px-3"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
