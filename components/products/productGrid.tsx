import type { ProductGridProps } from "@/interfaces/product";
import ProductCard from "./productcard";

export default function ProductGrid({
  products,
}: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
      {products.map((product) => (
        <div
          key={product.id}
          className="transition duration-500 hover:-translate-y-2"
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}