import { supabase } from "./supabase";


export async function getOrders(userId: string) {
  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      profiles(full_name,email)
    `)
    .eq("user_id", userId)
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return data;
}
export async function placeOrder(
  userId: string,
  items: {
    product_id: number;
    title: string;
    thumbnail: string;
    quantity: number;
    price: number;
  }[]
) {
  const orderId = crypto.randomUUID();

  const { error } = await supabase.from("orders").insert(
    items.map((item) => ({
      order_id: orderId,
      user_id: userId,
      product_id: item.product_id,
      title: item.title,
      thumbnail: item.thumbnail,
      quantity: item.quantity,
      price: item.price,
      status: "Placed",
    }))
  );

  if (error) throw error;
}