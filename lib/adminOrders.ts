import { supabase } from "./supabase";
import type { OrderRow , AdminOrder} from "@/interfaces/order";
export async function getAllOrders(): Promise<AdminOrder[]> {
  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      profiles(full_name)
    `)
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return (data as OrderRow[]).map((order) => ({
    id: order.id,
    order_id: order.order_id,
    user_name: order.profiles?.full_name ?? "Unknown",
    total: order.price * order.quantity,
    status: order.status,
    created_at: order.created_at,
  }));
}
export async function deleteOrder(id: number) {
  const { error } = await supabase
    .from("orders")
    .delete()
    .eq("id", id);

  if (error) throw error;
}