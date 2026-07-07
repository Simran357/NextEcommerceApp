import Image from "next/image";
import Link from "next/link";
import type { ProductCardProps } from "@/interfaces/product";
import { useAuth } from "../context/authContext";
export default function ProductCard({
  product,
}: ProductCardProps) {
  const finalPrice = (
    product.price -
    (product.price * product.discount_percentage) / 100
  ).toFixed(2);

  const { user} = useAuth();


  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition duration-300 cursor-pointer group">
        <div className="relative h-56 bg-gray-100">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            sizes="(max-width:768px) 100vw,33vw"
            className="object-contain p-4 group-hover:scale-105 transition"
          />
          <span className="absolute top-3 left-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
            {product.discount_percentage}% OFF
          </span>
        </div>
        <div className="p-5">
          <p className="text-xs uppercase text-gray-400">
            {product.category}
          </p>
          <h2 className="font-bold text-lg mt-2 line-clamp-2">
            {product.title}
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Brand : {product.brand}
          </p>
          <div className="flex justify-between items-center mt-3">
            <span className="text-yellow-500">
                ⭐ {product.rating}
            </span>

            <span
              className={`text-sm font-semibold ${
                product.stock > 0
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <p className="text-2xl font-bold text-blue-600">
              ₹ {finalPrice}
            </p>
            <p className="line-through text-gray-400">
              ₹ {product.price}
            </p>
          </div>

<button
  disabled={!user}
  className={`w-full mt-5 rounded-lg py-3 font-semibold ${
    user
      ? "bg-blue-600 hover:bg-blue-700 text-white"
      : "bg-gray-300 text-gray-500 cursor-not-allowed"
  }`}
>
  {user ? "Add To Cart" : "Login to Add"}
</button>
        </div>
      </div>
    </Link>
  );
}