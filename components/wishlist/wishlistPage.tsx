"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/products/productcard";
import { useWishlist } from "@/components/context/wishlistContext";
import { getProducts } from "@/lib/products";
import type { Product } from "@/interfaces/product";
export default function WishlistPage() {
  const { wishlist } = useWishlist();
const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    async function loadProducts() {
      const data = await getProducts();
      setProducts(data);
    }

    loadProducts();
  }, []);

  const wishlistProducts = products.filter((product) =>
    wishlist.includes(product.id)
  );

  if (!wishlistProducts.length) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col">
        <h1 className="text-4xl font-bold">
          Wishlist is Empty ❤️
        </h1>

        <Link
          href="/products"
          className="mt-6 bg-black text-white px-6 py-3 rounded-xl"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto py-10 px-6">
    <div className="mb-10">

  <div className="flex items-center gap-2 text-sm text-gray-500">

    <Link
      href="/products"
      className="hover:text-black transition"
    >
      Products
    </Link>

    <span>/</span>

    <span className="font-semibold text-black">
      Wishlist
    </span>

  </div>

  <h1 className="mt-5 text-5xl font-black">
    My Wishlist
  </h1>

</div>

      <div className="grid md:grid-cols-4 gap-8">
        {wishlistProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </main>
  );
}