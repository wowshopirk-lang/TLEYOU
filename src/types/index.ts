// Product types
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  images: string[];
  category: ProductCategory;
  inStock: boolean;
}

export type ProductCategory = "set" | "rolls" | "cards" | "subscription";

// Cart types
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

// User types
export interface User {
  id: string;
  email: string;
  name: string;
  subscription?: Subscription;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: SubscriptionPlan;
  status: "active" | "expired" | "cancelled";
  startDate: Date;
  endDate: Date;
}

export type SubscriptionPlan = "monthly" | "quarterly" | "yearly";

// Order types
export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: Date;
  deliveryAddress?: string;
}

export type OrderStatus =
  | "pending"
  | "paid"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

// Card types (for daily cards)
export interface Card {
  id: number;
  question: string;
  category: string;
}





