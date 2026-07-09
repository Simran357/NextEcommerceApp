import { supabase } from "./supabase";
import type { Product } from "@/interfaces/product";

export async function addProduct(
  product: Omit<Product, "id" | "created_at">
) {
  console.log("Sending Product:", product);

  const { data, error } = await supabase
    .from("products")
    .insert(product)
    .select();

  console.log("Inserted:", data);
  console.log("Error:", error);

  if (error) throw error;

  return data;
}

export async function updateProduct(
  id: number,
  product: Partial<Product>
) {
  const { error } = await supabase
    .from("products")
    .update(product)
    .eq("id", id);

  if (error) throw error;
}

export async function deleteProduct(id: number) {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

export async function getProduct(id: number) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}