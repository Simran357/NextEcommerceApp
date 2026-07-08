"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/components/context/authContext";
import LoginModal from "@/components/auth/model/loginModel";
import SignupModal from "@/components/auth/model/signupModel";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useWishlist } from "../context/wishlistContext";
import type { ProductCardProps } from "@/interfaces/product";

export default function ProductDetailsClient({
  product,
}: ProductCardProps) {
  const { user } = useAuth();
  const {
    addWishlist,
    removeWishlist,
    isWishlisted,
  } = useWishlist();

  const wishlisted = isWishlisted(product.id);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const finalPrice = (
    product.price -
    (product.price * product.discount_percentage) / 100
  ).toFixed(2);

  return (
    <>
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#faf7f2] via-white to-[#eef4ff]">

        {/* Background Blur */}
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-blue-200 blur-[140px] opacity-40" />
        <div className="absolute top-40 right-0 h-96 w-96 rounded-full bg-pink-200 blur-[160px] opacity-30" />

        <div className="relative max-w-7xl mx-auto px-6 py-12">

          {/* Breadcrumb */}

          <div className="flex items-center gap-2 text-sm text-gray-500">

            <Link
              href="/products"
              className="hover:text-black transition"
            >
              Products
            </Link>

            <span>/</span>

            <span className="font-semibold text-black">
              {product.title}
            </span>

          </div>

          <div className="grid lg:grid-cols-2 gap-16 mt-10">

            {/* LEFT */}

            <div>

              <div className="sticky top-24 rounded-[40px] border border-white/60 bg-white/70 backdrop-blur-xl shadow-2xl p-10">

              <button
  onClick={async () => {
    if (!user) {
      setShowLogin(true);
      return;
    }

    if (wishlisted) {
      await removeWishlist(product.id);
    } else {
      await addWishlist(product.id);
    }
  }}
  className="absolute right-8 top-8 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg transition hover:scale-110"
>
  {wishlisted ? (
    <FaHeart className="text-2xl text-red-500" />
  ) : (
    <FaRegHeart className="text-2xl" />
  )}
</button>
                <div className="relative h-[560px]">

                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    fill
                    priority
                    loading="eager"
                    sizes="(max-width:768px)100vw,50vw"
                    className="object-contain transition duration-500 hover:scale-110"
                  />

                </div>

              </div>

            </div>

            {/* RIGHT */}

            <div>

              <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-blue-700">
                {product.category}
              </span>

              <h1 className="mt-6 text-6xl font-black leading-tight tracking-tight">
                {product.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mt-6">

                <div className="rounded-full bg-black px-4 py-2 text-sm font-semibold text-white shadow-lg">
                  ⭐ {product.rating}
                </div>

                <span className="text-gray-500">
                  128 Reviews
                </span>

                <span
                  className={`font-semibold ${product.stock > 0
                      ? "text-green-600"
                      : "text-red-500"
                    }`}
                >
                  {product.stock > 0
                    ? "In Stock"
                    : "Out of Stock"}
                </span>

              </div>

              <p className="mt-8 text-lg leading-9 text-gray-600">
                {product.description}
              </p>

              <div className="mt-10 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

                <div className="flex justify-between py-3">

                  <span className="text-gray-500">
                    Brand
                  </span>

                  <span className="font-semibold">
                    {product.brand}
                  </span>

                </div>

                <div className="flex justify-between py-3">

                  <span className="text-gray-500">
                    Availability
                  </span>

                  <span className="font-semibold text-green-600">
                    {product.stock} Items Left
                  </span>

                </div>

                <div className="flex justify-between py-3">

                  <span className="text-gray-500">
                    Category
                  </span>

                  <span className="font-semibold capitalize">
                    {product.category}
                  </span>

                </div>

              </div>

              <div className="flex items-end gap-5 mt-10">

                <h2 className="text-6xl font-black">
                  ₹ {finalPrice}
                </h2>

                <p className="text-3xl line-through text-gray-400">
                  ₹ {product.price}
                </p>

                <div className="rounded-full bg-black px-5 py-2 text-white font-semibold">
                  {product.discount_percentage}% OFF
                </div>

              </div>
              {/* Action Buttons */}

              <div className="grid grid-cols-2 gap-5 mt-10">

                <button
                  disabled={!user}
                  onClick={() => {
                    if (!user) {
                      setShowLogin(true);
                    }
                  }}
                  className={`rounded-2xl py-5 font-semibold text-lg transition duration-300 ${user
                      ? "bg-black text-white hover:scale-105 hover:shadow-2xl"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                >
                  {user ? "🛒 Add To Cart" : "Login to Add"}
                </button>

                <button
                  disabled={!user}
                  onClick={() => {
                    if (!user) {
                      setShowLogin(true);
                    }
                  }}
                  className={`rounded-2xl border-2 py-5 font-semibold text-lg transition duration-300 ${user
                      ? "border-black hover:bg-black hover:text-white"
                      : "border-gray-300 text-gray-400 cursor-not-allowed"
                    }`}
                >
                  {user ? "⚡ Buy Now" : "Login First"}
                </button>

              </div>

              {/* Login Lock */}

              {!user && (

                <div className="relative mt-12 overflow-hidden rounded-[32px]">

                  <div className="space-y-4 rounded-[32px] bg-gray-100 p-10 opacity-30 blur-sm">

                    <div className="h-6 rounded bg-gray-300" />

                    <div className="h-6 w-2/3 rounded bg-gray-300" />

                    <div className="h-24 rounded-2xl bg-gray-300" />

                    <div className="h-24 rounded-2xl bg-gray-300" />

                  </div>

                  <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-md">

                    <div className="w-96 rounded-[30px] bg-white p-10 text-center shadow-2xl">

                      <div className="text-6xl">
                        🔒
                      </div>

                      <h3 className="mt-5 text-3xl font-black">
                        Unlock Premium Features
                      </h3>

                      <p className="mt-4 leading-7 text-gray-500">
                        Login to access wishlist,
                        exclusive offers,
                        delivery dates,
                        EMI options,
                        warranty details
                        and much more.
                      </p>

                      <button
                        onClick={() => setShowLogin(true)}
                        className="mt-8 w-full rounded-2xl bg-black py-4 font-semibold text-white transition hover:scale-105"
                      >
                        Login Now
                      </button>

                    </div>

                  </div>

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          openSignup={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
        />
      )}

      {showSignup && (
        <SignupModal
          onClose={() => setShowSignup(false)}
          openLogin={() => {
            setShowSignup(false);
            setShowLogin(true);
          }}
        />
      )}

    </>
  );
}