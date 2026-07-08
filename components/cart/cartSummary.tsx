"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useWishlist } from "../context/wishlistContext";
import { useCart } from "@/components/context/cartContext";
import { getProducts } from "@/lib/products";

import type { Product } from "@/interfaces/product";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty,
  } = useCart();
const {
  addWishlist,
  isWishlisted,
} = useWishlist();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts() {
      const data = await getProducts();
      setProducts(data);
    }

    loadProducts();
  }, []);
const cartProducts = cart
  .map((item) => {
    const product = products.find(
      (p) => p.id === item.product_id
    );

    if (!product) return null;

    return {
      ...product,
      quantity: item.quantity,
    };
  })
  .filter(
    (
      product
    ): product is Product & { quantity: number } =>
      product !== null
  );

  const subtotal = cartProducts.reduce((total, item) => {
    if (!item) return total;

    const price =
      item.price -
      (item.price * item.discount_percentage) / 100;

    return total + price * item.quantity;
  }, 0);

  if (!cartProducts.length) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">

        <h1 className="text-4xl font-bold">
          Your Cart is Empty 🛒
        </h1>

        <Link
          href="/products"
          className="mt-8 rounded-xl bg-black px-6 py-3 text-white"
        >
          Continue Shopping
        </Link>

      </div>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">

      <div className="mb-10">

      <div className="mb-8 flex items-center gap-2 text-sm text-gray-500">
  <Link
    href="/products"
    className="hover:text-black transition"
  >
    Products
  </Link>

  <span>/</span>

  <span className="font-semibold text-black">
    Cart
  </span>
</div>

      <p className="mt-2 text-gray-500">
  {cart.reduce(
    (total, item) => total + item.quantity,
    0
  )} Items in Cart
</p>
      </div>

      <div className="grid grid-cols-3 gap-10">

        {/* Left */}

        <div className="col-span-2 space-y-6">

          {cartProducts.map((product) => {
            if (!product) return null;

            const price =
              product.price -
              (product.price *
                product.discount_percentage) /
                100;

            return (
              <div
                key={product.id}
                className="flex items-center gap-6 rounded-3xl border bg-white p-6 shadow-sm"
              >

                <div className="relative h-36 w-36">

                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    fill
                    className="object-contain"
                  />

                </div>

                <div className="flex-1">

                  <h2 className="text-2xl font-bold">
                    {product.title}
                  </h2>

                  <p className="mt-1 text-gray-500">
                    {product.brand}
                  </p>

                  <h3 className="mt-4 text-2xl font-bold">
                    ₹{price.toFixed(2)}
                  </h3>

                  <div className="mt-5 flex items-center gap-3">

                  <button
  disabled={product.quantity === 1}
  onClick={() => decreaseQty(product.id)}
  className={`h-10 w-10 rounded-full border transition
    ${
      product.quantity === 1
        ? "cursor-not-allowed bg-gray-100 text-gray-400"
        : "hover:bg-black hover:text-white"
    }`}
>
  -
</button>
                    <span className="font-semibold">
                      {product.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQty(product.id)
                      }
                      className="h-10 w-10 rounded-full border"
                    >
                      +
                    </button>

<button
  onClick={async () => {
    if (!isWishlisted(product.id)) {
      await addWishlist(product.id);
    }

    await removeFromCart(product.id);
  }}
  className="rounded-xl border border-pink-500 px-4 py-2 text-pink-500 transition hover:bg-pink-500 hover:text-white"
>
  ❤ Move to Wishlist
</button>
                  </div>

                </div>

                <button
                  onClick={() =>
                    removeFromCart(product.id)
                  }
                  className="rounded-xl bg-red-500 px-4 py-2 text-white"
                >
                  Remove
                </button>

              </div>
            );
          })}

        </div>

        {/* Right */}

        <div className="sticky top-24 rounded-[30px] border bg-white p-8 shadow-lg">

  <h2 className="text-3xl font-bold">
    Price Details
  </h2>

  <div className="mt-8 space-y-4">

    <div className="flex justify-between">
      <span>Total MRP</span>
      <span>₹{subtotal.toFixed(2)}</span>
    </div>

    <div className="flex justify-between">
      <span>Discount</span>
      <span className="text-green-600">
        FREE
      </span>
    </div>

    <div className="flex justify-between">
      <span>Delivery</span>
      <span className="text-green-600">
        FREE
      </span>
    </div>

  </div>

  <hr className="my-6" />

  <div className="flex justify-between text-2xl font-bold">

    <span>Total</span>

    <span>
      ₹{subtotal.toFixed(2)}
    </span>

  </div>
<Link href="/checkout">
 <button className="mt-8 w-full rounded-2xl bg-black py-4 text-lg font-semibold text-white transition hover:scale-105"> Proceed to Checkout </button> </Link>

</div>
      </div>

    </main>
  );
}