import { supabase } from "./supabase";
import type { Product } from "@/interfaces/product";

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*");

  if (error) {
    console.log(error);
    return [];
  }

  return data ?? [];
}

export async function getProductById(id: string) {
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  return data;
}