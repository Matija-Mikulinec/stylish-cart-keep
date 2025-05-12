
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

export interface CustomerInfo {
  fullName: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
}

export interface Order {
  customerInfo: CustomerInfo;
  notes?: string;
  items: CartItem[];
  totalAmount: number;
  orderId: string;
  orderDate?: string;
}
