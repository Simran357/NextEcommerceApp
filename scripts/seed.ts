import "dotenv/config";
import products from "../products.json";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function seed() {
  const { error } = await supabase.from("products").insert(
    products.products.map((product) => ({
      id: product.id,
      title: product.title,
      description: product.description,
      category: product.category,
      price: product.price,
      discount_percentage: product.discountPercentage,
      rating: product.rating,
      stock: product.stock,
      brand: product.brand,
      thumbnail: product.thumbnail,
    }))
  );

  if (error) {
    console.log(error);
    return;
  }

  console.log("Products Inserted Successfully");
}

seed();