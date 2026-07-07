import { supabase } from "./supabase";
import { Product } from "@/interfaces/product";

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}