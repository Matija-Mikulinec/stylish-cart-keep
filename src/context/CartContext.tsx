import { createContext, useContext, useEffect, useState } from "react";
import { CartItem, CartState, Product } from "../types/shop";
import { toast } from "sonner";

interface CartContextProps {
  cart: CartState;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartState>({
    items: [],
    isOpen: false,
  });

  // Calculate derived values
  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart((prevCart) => ({
          ...prevCart,
          items: parsedCart.items || [],
        }));
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify({ items: cart.items }));
  }, [cart.items]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.items.find((item) => item.id === product.id);

      if (existingItem) {
        // Item already exists, increase quantity
        const updatedItems = prevCart.items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        toast(`Added another ${product.name} to cart`);
        return { ...prevCart, items: updatedItems };
      } else {
        // Item doesn't exist, add new item
        toast(`${product.name} added to cart`);
        return {
          ...prevCart,
          items: [...prevCart.items, { ...product, quantity: 1 }],
        };
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => {
      const item = prevCart.items.find((item) => item.id === productId);
      if (item) {
        toast(`Removed ${item.name} from cart`);
      }
      return {
        ...prevCart,
        items: prevCart.items.filter((item) => item.id !== productId),
      };
    });
  };

  const increaseQuantity = (productId: number) => {
    setCart((prevCart) => ({
      ...prevCart,
      items: prevCart.items.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    }));
  };

  const decreaseQuantity = (productId: number) => {
    setCart((prevCart) => {
      // Find the item
      const item = prevCart.items.find((item) => item.id === productId);
      
      // If item doesn't exist or quantity is already 1, don't change anything
      if (!item || item.quantity <= 1) return prevCart;
      
      // Otherwise decrease quantity
      return {
        ...prevCart,
        items: prevCart.items.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    });
  };

  const openCart = () => {
    setCart((prevCart) => ({ ...prevCart, isOpen: true }));
  };

  const closeCart = () => {
    setCart((prevCart) => ({ ...prevCart, isOpen: false }));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        openCart,
        closeCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
