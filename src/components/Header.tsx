
import React from "react";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { openCart, totalItems } = useCart();

  return (
    <header className="sticky top-0 z-30 w-full bg-white/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-medium">Minimal Shop</h1>
        </div>
        <div>
          <Button
            variant="outline"
            size="sm"
            onClick={openCart}
            className="relative"
          >
            <ShoppingCart size={18} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
