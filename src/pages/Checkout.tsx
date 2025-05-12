
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Header from "../components/Header";
import CheckoutForm from "../components/CheckoutForm";
import { formatCurrency } from "../lib/utils";

const Checkout = () => {
  const { cart, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();

  // Redirect to home if cart is empty
  useEffect(() => {
    if (totalItems === 0) {
      navigate("/");
    }
  }, [totalItems, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-6">Checkout</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Checkout Form (2/3 width on desktop) */}
          <div className="md:col-span-2">
            <CheckoutForm />
          </div>
          
          {/* Order Summary (1/3 width on desktop) */}
          <div>
            <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
              <h2 className="text-lg font-medium mb-4">Order Summary</h2>
              
              {/* Items summary */}
              <div className="space-y-3 mb-4">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.quantity} × {item.name}</span>
                    <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>{formatCurrency(totalPrice)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
