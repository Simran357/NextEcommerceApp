import type { Product } from "@/interfaces/product";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="bg-white rounded-lg shadow p-4">

      <img
        src={product.thumbnail}
        alt={product.title}
        className="h-48 w-full object-cover rounded"
      />

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