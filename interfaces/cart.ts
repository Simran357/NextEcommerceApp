import type {Product} from "@/interfaces/product"

export interface CartItem {
  product_id: number;
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];

  addToCart: (
    productId: number
  ) => Promise<void>;

  removeFromCart: (
    productId: number
  ) => Promise<void>;

  increaseQty: (
    productId: number
  ) => Promise<void>;

  decreaseQty: (
    productId: number
  ) => Promise<void>;
isInCart: (
    productId: number
  ) => boolean;
  cartCount: number;
  clearCart: () => Promise<void>;
}




export interface CheckoutProps {
  product: Product;
}