import type { ProductGridProps } from "@/interfaces/product";
import ProductCard from "./productcard";



export default function ProductGrid({
  products,
}: ProductGridProps) {
  return (
    <div className="grid md:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />

      ))}

    </div>
  );
}