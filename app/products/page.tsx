import { getProducts } from "@/lib/products";
import ProductGrid from "@/components/products/productGrid"
export default async function Products() {

  const products = await getProducts();

  return (
    <main className="max-w-7xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Products
      </h1>

      <ProductGrid products={products} />

    </main>
  );
}