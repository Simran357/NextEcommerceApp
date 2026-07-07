import type { Product } from "@/interfaces/product";
import ProductCard from "./productcard";

interface Props {
  products: Product[];
}

export default function ProductGrid({ products }: Props) {
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