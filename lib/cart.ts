import { supabase } from "./supabase";

export async function getCart(userId: string) {
  return await supabase
    .from("cart")
    .select("*")
    .eq("user_id", userId);
}

export async function clearCart(userId: string) {
  return await supabase
    .from("cart")
    .delete()
    .eq("user_id", userId);
}

export async function removeCartItem(
  userId: string,
  productId: number
) {
  return await supabase
    .from("cart")
    .delete()
    .eq("user_id", userId)
    .eq("product_id", productId);
}