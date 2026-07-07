import products from "../products.json";
import {supabase} from "../lib/supabase"


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

  console.log("Products Inserted");
}

seed();