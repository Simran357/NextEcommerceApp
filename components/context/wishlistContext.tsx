"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { supabase } from "@/lib/supabase";
import { useAuth } from "./authContext";

type WishlistContextType = {
  wishlist: number[];
  addWishlist: (id: number) => Promise<void>;
  removeWishlist: (id: number) => Promise<void>;
  isWishlisted: (id: number) => boolean;
};

const WishlistContext =
  createContext({} as WishlistContextType);

export function WishlistProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  const [wishlist, setWishlist] = useState<number[]>([]);
useEffect(() => {
  const fetchWishlist = async () => {
    if (!user) {
      return;
    }

    const { data } = await supabase
      .from("wishlist")
      .select("product_id")
      .eq("user_id", user.id);

    if (data) {
      setWishlist(data.map((item) => item.product_id));
    }
  };

  fetchWishlist();
}, [user]);

async function addWishlist(productId: number) {
  await supabase.from("wishlist").insert({
    user_id: user?.id,
    product_id: productId,
  });

  setWishlist((prev) => [...prev, productId]);
}

  async function removeWishlist(
    productId: number
  ) {
    await supabase
      .from("wishlist")
      .delete()
      .eq("user_id", user?.id)
      .eq("product_id", productId);

    setWishlist((prev) =>
      prev.filter((id) => id !== productId)
    );
  }

  function isWishlisted(id: number) {
    return wishlist.includes(id);
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addWishlist,
        removeWishlist,
        isWishlisted,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () =>
  useContext(WishlistContext);