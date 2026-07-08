"use client";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/components/context/cartContext";
import { getProducts } from "@/lib/products";
import type { Product } from "@/interfaces/product";

export default function CheckoutClient() {
const { cart, clearCart, removeFromCart } =
  useCart();  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [payment, setPayment] = useState("cod");
const searchParams = useSearchParams();

const productId = Number(
  searchParams.get("product")
);
  useEffect(() => {
    getProducts().then(setProducts);
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
      item
    ): item is Product & { quantity: number } =>
      item !== null
  );
const buyNowProduct = products.find(
  (p) => p.id === productId
);

const checkoutProducts = buyNowProduct
  ? [
      {
        ...buyNowProduct,
        quantity: 1,
      },
    ]
  : cartProducts;
  const total = checkoutProducts.reduce(
  (sum, item) => {
    const price =
      item.price -
      (item.price *
        item.discount_percentage) /
        100;

    return sum + price * item.quantity;
  },
  0
);

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">

      <div className="mb-10 flex items-center gap-2 text-sm text-gray-500">
        <Link href="/products">Products</Link>

        <span>/</span>

        <Link href="/cart">Cart</Link>

        <span>/</span>

        <span className="font-semibold text-black">
          Checkout
        </span>
      </div>

      <div className="grid grid-cols-3 gap-10">

        {/* LEFT */}

        <div className="col-span-2 space-y-8">

          <div className="rounded-3xl border bg-white p-8 shadow">

            <h2 className="text-2xl font-bold mb-6">
              Shipping Address
            </h2>

            <input
              placeholder="Full Name"
              className="mb-4 w-full rounded-xl border p-4"
            />

            <input
              placeholder="Phone Number"
              className="mb-4 w-full rounded-xl border p-4"
            />

            <textarea
              placeholder="Complete Address"
              className="mb-4 w-full rounded-xl border p-4"
              rows={4}
            />

            <div className="grid grid-cols-2 gap-4">

              <input
                placeholder="City"
                className="rounded-xl border p-4"
              />

              <input
                placeholder="Pincode"
                className="rounded-xl border p-4"
              />

            </div>

          </div>

          <div className="rounded-3xl border bg-white p-8 shadow">

            <h2 className="mb-6 text-2xl font-bold">
              Payment Method
            </h2>

            <label className="mb-4 flex cursor-pointer items-center gap-3">

              <input
                type="radio"
                checked={payment === "cod"}
                onChange={() => setPayment("cod")}
              />

              Cash on Delivery

            </label>

            <label className="mb-4 flex cursor-pointer items-center gap-3">

              <input
                type="radio"
                checked={payment === "upi"}
                onChange={() => setPayment("upi")}
              />

              UPI

            </label>

            <label className="flex cursor-pointer items-center gap-3">

              <input
                type="radio"
                checked={payment === "card"}
                onChange={() => setPayment("card")}
              />

              Credit / Debit Card

            </label>

          </div>

        </div>

        {/* RIGHT */}

        <div className="sticky top-24 h-fit rounded-3xl border bg-white p-8 shadow">

          <h2 className="mb-6 text-2xl font-bold">
            Order Summary
          </h2>

          {checkoutProducts.map((item) => (

            <div
              key={item.id}
              className="mb-4 flex justify-between"
            >
              <span>
                {item.title} × {item.quantity}
              </span>

              <span>
                ₹
                {(
                  (item.price -
                    (item.price *
                      item.discount_percentage) /
                      100) *
                  item.quantity
                ).toFixed(2)}
              </span>

            </div>

          ))}

          <hr className="my-6" />

          <div className="flex justify-between text-2xl font-bold">

            <span>Total</span>

            <span>₹{total.toFixed(2)}</span>

          </div>

         <button
  onClick={async () => {
    if (buyNowProduct) {
    } else {
      await clearCart();
    }

    router.push("/orders");
  }}
  className="mt-8 w-full rounded-2xl bg-black py-4 font-semibold text-white transition hover:scale-105"
>
  Place Order
</button>

        </div>

      </div>

    </main>
  );
}