import { supabase } from "./supabase";
import type {
  WishlistItem,
  WishlistRow,
} from "@/interfaces/wishlist";
export async function getAllWishlist(): Promise<WishlistItem[]> {
  const { data, error } = await supabase
    .from("wishlist")
    .select(`
  id,
  created_at,
  profiles(full_name),
  products!wishlist_product_fk(
    title,
    price,
    thumbnail
  )
`)

  if (error) throw error;
return (data as WishlistRow[]).map((item) => ({
  id: item.id,
  user_name: item.profiles[0]?.full_name ?? "Unknown",
  title: item.products[0]?.title ?? "",
  price: item.products[0]?.price ?? 0,
  thumbnail: item.products[0]?.thumbnail ?? "",
  created_at: item.created_at,
}));
}

export async function deleteWishlistItem(id: number) {
  const { error } = await supabase
    .from("wishlist")
    .delete()
    .eq("id", id);

  if (error) throw error;
}