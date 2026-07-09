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

      <div className="mb-12 flex items-center justify-between">

        <div>

          <div className="mb-4 flex items-center gap-2 text-sm text-slate-500">

            <Link
              href="/products"
              className="hover:text-black"
            >
              Products
            </Link>

            <span>/</span>

            <span className="font-semibold text-slate-900">
              Shopping Cart
            </span>

          </div>

          <h1 className="text-5xl font-black text-slate-900">
            Shopping Cart
          </h1>

          <p className="mt-3 text-lg text-slate-500">
            {cart.reduce(
              (total, item) => total + item.quantity,
              0
            )}{" "}
            items ready for checkout
          </p>

        </div>

        <div className="rounded-3xl bg-gradient-to-r from-indigo-500 to-blue-600 px-8 py-6 text-white shadow-xl">

          <p className="text-sm uppercase tracking-widest opacity-80">
            Cart Total
          </p>

          <h2 className="mt-2 text-4xl font-black">
            ₹{subtotal.toFixed(0)}
          </h2>

        </div>

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
                className="group flex items-center gap-8 rounded-[32px] border border-slate-200 bg-white p-7 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"              >

                <div className="relative flex h-40 w-40 items-center justify-center rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100">
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain"
                  />

                </div>

                <div className="flex-1">

                  <h2 className="text-3xl font-bold leading-tight text-slate-900">                    {product.title}
                  </h2>

                  <p className="mt-1 text-gray-500">
                    {product.brand}
                  </p>

                  <div className="mt-5 flex items-center gap-3">

                    <h3 className="text-3xl font-black text-slate-900">
                      ₹{price.toFixed(2)}
                    </h3>

                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                      {product.discount_percentage}% OFF
                    </span>

                  </div>
                  <div className="mt-5 flex items-center gap-3">

                    <button
                      disabled={product.quantity === 1}
                      onClick={() => decreaseQty(product.id)}
                      className={`h-10 w-10 rounded-full border transition
    ${product.quantity === 1
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
                      className="rounded-full border border-pink-300 bg-pink-50 px-5 py-2 font-semibold text-pink-600 transition hover:bg-pink-600 hover:text-white">
                      ❤ Move to Wishlist
                    </button>
                  </div>

                </div>

                <button
                  onClick={() =>
                    removeFromCart(product.id)
                  }
                  className="flex h-12 w-20 items-center justify-center rounded-full bg-red-50 text-red-600 transition hover:bg-red-600 hover:text-white"                >
                  Remove
                </button>

              </div>
            );
          })}

        </div>

        {/* Right */}

<div className="sticky top-24 self-start rounded-[30px] border bg-white p-8 shadow-lg">
          <h2 className="text-3xl font-black">
            Order Summary
          </h2>

          <p className="mt-2 text-slate-500">
            Review your order before checkout.
          </p>
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

          <div className="mt-8 flex justify-between rounded-2xl bg-slate-100 p-5">

            <span className="text-xl font-bold">
              Total
            </span>

            <span className="text-3xl font-black">
              ₹{subtotal.toFixed(2)}
            </span>

          </div>
          <Link href="/checkout">
            <button className="mt-8 w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 py-4 text-lg font-bold text-white shadow-xl transition duration-300 hover:-translate-y-1 hover:shadow-2xl"> Proceed to Checkout </button> </Link>

        </div>
      </div>

    </main>
  );
}