"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  clearCart as clearCartDB,
} from "@/lib/cart";
import { supabase } from "@/lib/supabase";
import { useAuth } from "./authContext";
import type {
  CartContextType,
  CartItem,
} from "@/interfaces/cart";

const CartContext =
  createContext<CartContextType>({} as CartContextType);

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);
useEffect(() => {
  async function fetchCart() {
    if (!user) {
      setCart([]);
      return;
    }

    const { data, error } = await supabase
      .from("cart")
      .select("product_id, quantity")
      .eq("user_id", user.id);

    if (error) {
      console.error(error);
      return;
    }

    setCart((data ?? []) as CartItem[]);
  }

  fetchCart();
}, [user]);

async function clearCart() {
  if (!user) return;

  await clearCartDB(user.id);

  setCart([]);
}
  async function addToCart(productId: number) {
  if (!user) return;

  console.log("Adding product:", productId);

  const existing = cart.find(
    (item) => item.product_id === productId
  );

  if (existing) {
    console.log("Already exists");
    await increaseQty(productId);
    return;
  }
console.log("Adding product:", productId);

const { data, error } = await supabase
  .from("cart")
  .insert({
    user_id: user.id,
    product_id: productId,
    quantity: 1,
  })
  .select();

console.log("Insert Data:", data);
console.log("Insert Error:", error);


  if (error) return;

  setCart((prev) => [
    ...prev,
    {
      product_id: productId,
      quantity: 1,
    },
  ]);
}

  async function removeFromCart(productId: number) {
    if (!user) return;

    const { error } = await supabase
      .from("cart")
      .delete()
      .eq("user_id", user.id)
      .eq("product_id", productId);

    if (error) {
      console.error(error);
      return;
    }

    setCart((prev) =>
      prev.filter(
        (item) => item.product_id !== productId
      )
    );
  }
function isInCart(productId: number) {
  return cart.some((item) => item.product_id === productId);
}
  async function increaseQty(productId: number) {
    if (!user) return;

    const item = cart.find(
      (item) => item.product_id === productId
    );

    if (!item) return;

    const { error } = await supabase
      .from("cart")
      .update({
        quantity: item.quantity + 1,
      })
      .eq("user_id", user.id)
      .eq("product_id", productId);

    if (error) {
      console.error(error);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.product_id === productId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  }

  async function decreaseQty(productId: number) {
    if (!user) return;

    const item = cart.find(
      (item) => item.product_id === productId
    );

    if (!item) return;

    if (item.quantity === 1) {
      await removeFromCart(productId);
      return;
    }

    const { error } = await supabase
      .from("cart")
      .update({
        quantity: item.quantity - 1,
      })
      .eq("user_id", user.id)
      .eq("product_id", productId);

    if (error) {
      console.error(error);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.product_id === productId
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )
    );
  }

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
   <CartContext.Provider
  value={{
    cart,
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    isInCart,
    clearCart,
    cartCount,
  }}
>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}