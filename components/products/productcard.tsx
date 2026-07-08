import Image from "next/image";
import Link from "next/link";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useWishlist } from "../context/wishlistContext";
import type { ProductCardProps } from "@/interfaces/product";
import { useAuth } from "../context/authContext";
export default function ProductCard({
  product,
}: ProductCardProps) {
  const { user } = useAuth();
const {
  addWishlist,
  removeWishlist,
  isWishlisted,
} = useWishlist();

const wishlisted = isWishlisted(product.id);
  const finalPrice = (
    product.price -
    (product.price * product.discount_percentage) / 100
  ).toFixed(2);

  return (
    <Link href={`/products/${product.id}`}>

      <div className="group relative overflow-hidden rounded-[30px] border border-[#ece8df] bg-[#fffdf9] shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">

        {/* Badge */}

        <div className="absolute left-5 top-5 z-20 rounded-full bg-black px-4 py-1 text-xs font-semibold text-white">
          {product.discount_percentage}% OFF
        </div>

        {/* Wishlist */}
<button
  onClick={async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      alert("Please login to use Wishlist");
      return;
    }

    if (wishlisted) {
      await removeWishlist(product.id);
    } else {
      await addWishlist(product.id);
    }
  }}
  className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md transition duration-300 hover:scale-110"
>
  {wishlisted ? (
    <FaHeart className="text-red-500 text-xl" />
  ) : (
    <FaRegHeart className="text-gray-700 text-xl" />
  )}
</button>
        {/* Image */}

        <div className="relative flex h-72 items-center justify-center overflow-hidden bg-gradient-to-br from-[#f8f4ef] to-[#fff]">

          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            sizes="(max-width:768px)100vw,25vw"
            className="object-contain p-8 transition duration-500 group-hover:scale-110 group-hover:rotate-2"
          />

        </div>

        {/* Content */}

        <div className="p-6">

          <span className="rounded-full bg-[#f4efe7] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gray-600">
            {product.category}
          </span>

          <h2 className="mt-4 line-clamp-2 text-xl font-bold leading-7 text-gray-900">
            {product.title}
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            {product.brand}
          </p>

          <div className="mt-5 flex items-center justify-between">

            <div className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
              ⭐ {product.rating}
            </div>

            <span
              className={`text-sm font-semibold ${
                product.stock > 0
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {product.stock > 0
                ? "In Stock"
                : "Out of Stock"}
            </span>

          </div>

          <div className="mt-6 flex items-end gap-3">

            <h3 className="text-3xl font-black text-gray-900">
              ₹{finalPrice}
            </h3>

            <span className="text-lg text-gray-400 line-through">
              ₹{product.price}
            </span>

          </div>

          <button
            disabled={!user}
            onClick={(e) => e.preventDefault()}
            className={`mt-7 w-full rounded-2xl py-4 font-semibold transition-all duration-300 ${
              user
                ? "bg-black text-white hover:scale-[1.03] hover:bg-[#1d1d1d]"
                : "cursor-not-allowed bg-gray-200 text-gray-500"
            }`}
          >
            {user ? "🛒 Add to Cart" : "Login to Shop"}
          </button>

        </div>

      </div>

    </Link>
  );
}