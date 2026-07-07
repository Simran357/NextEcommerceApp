import Image from "next/image";
import type { Product } from "@/interfaces/product";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="bg-white rounded-lg shadow p-4">

      <div className="relative h-48 w-full">
   <Image
  src={product.thumbnail}
  alt={product.title}
  width={300}
  height={220}
  loading="eager"
  className="w-full h-56 object-cover rounded-t-xl"
/>
      </div>

      <h2 className="font-bold mt-3">
        {product.title}
      </h2>

      <p className="text-sm text-gray-500">
        {product.category}
      </p>

      <p className="text-blue-600 font-bold mt-2">
        ₹ {product.price}
      </p>

      <button className="bg-blue-600 text-white w-full rounded mt-4 p-2">
        Add To Cart
      </button>

    </div>
  );
}