import { getProducts } from "@/lib/products";
import ProductList from "@/components/products/productList";

export default async function Products() {
  const products = await getProducts();

  return <ProductList products={products} />;
}