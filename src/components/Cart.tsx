
import React from "react";
import { Button } from "./ui/button";
import { useCart } from "../context/CartContext";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import { formatCurrency } from "../lib/utils";

export default function Cart() {
  const {
    cart,
    closeCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    totalItems,
    totalPrice,
  } = useCart();

  return (
    <>
      {/* Overlay */}
      {cart.isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={closeCart}
        ></div>
      )}

      {/* Cart drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          cart.isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Cart header */}
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <ShoppingCart size={18} /> Cart ({totalItems})
              </h2>
              <Button variant="ghost" size="sm" onClick={closeCart}>
                Close
              </Button>
            </div>
          </div>

          {/* Cart items */}
          <div className="flex-grow overflow-auto p-4">
            {cart.items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 p-4">
                <ShoppingCart size={48} className="opacity-20 mb-4" />
                <p>Your cart is empty</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  size="sm"
                  onClick={closeCart}
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <ul className="divide-y">
                {cart.items.map((item) => (
                  <li key={item.id} className="py-4">
                    <div className="flex gap-4">
                      <div className="bg-gray-100 w-16 h-16 rounded flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-gray-500 text-sm mb-1">
                          ${item.price.toFixed(2)}
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center border rounded">
                            <button
                              className="p-1 px-2 hover:bg-gray-100"
                              onClick={() => decreaseQuantity(item.id)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={14} />
                            </button>
                            <span className="px-2">{item.quantity}</span>
                            <button
                              className="p-1 px-2 hover:bg-gray-100"
                              onClick={() => increaseQuantity(item.id)}
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Cart footer */}
          {cart.items.length > 0 && (
            <div className="border-t p-4">
              <div className="flex justify-between mb-4">
                <span>Subtotal</span>
                <span className="font-semibold">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <Button className="w-full">Checkout</Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
