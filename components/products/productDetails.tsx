"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/components/context/authContext";
import LoginModal from "@/components/auth/model/loginModel";
import SignupModal from "@/components/auth/model/signupModel";
import type { ProductCardProps } from "@/interfaces/product";


export default function ProductGrid({
  product,
}: ProductCardProps) {
    const { user } = useAuth();
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] =
        useState(false);
    const finalPrice = (
        product.price -
        (product.price *
            product.discount_percentage) /
        100
    ).toFixed(2);

  return (
  <>
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link
          href="/products"
          className="hover:text-blue-600 transition"
        >
          Products
        </Link>
        <span>/</span>
        <span className="font-semibold text-gray-900">
          {product.title}
        </span>
      </div>

      <div className="grid lg:grid-cols-2 gap-16 mt-8">
        <div>
          <div className="bg-white border rounded-3xl shadow-sm p-10 sticky top-24">
            <div className="relative h-[520px]">
              <Image
                src={product.thumbnail}
                alt={product.title}
                fill
                priority
                sizes="50vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
        <div>
          <p className="uppercase tracking-widest text-blue-600 font-semibold">
            {product.category}
          </p>
          <h1 className="text-5xl font-bold mt-3 leading-tight">
            {product.title}
          </h1>
          <div className="flex items-center gap-4 mt-5">
            <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              ⭐ {product.rating}
            </div>
            <p className="text-gray-500">
              128 Reviews
            </p>
            <span className="text-green-600 font-semibold">
              {product.stock > 0
                ? "In Stock"
                : "Out of Stock"}
            </span>
          </div>
          <p className="text-gray-600 leading-8 mt-8">
            {product.description}
          </p>
          <div className="mt-8 border-t border-b py-6 space-y-4">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-600">
                Brand
              </span>
              <span>
                {product.brand}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-600">
                Available
              </span>
              <span className="text-green-600">
                {product.stock} Left
              </span>
            </div>
          </div>
          <div className="flex items-end gap-5 mt-8">
            <h2 className="text-5xl font-bold text-blue-600">
              ₹ {finalPrice}
            </h2>
            <p className="text-2xl text-gray-400 line-through">
              ₹ {product.price}
            </p>
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
              {product.discount_percentage}% OFF
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 mt-10">
            <button
              disabled={!user}
              onClick={() => {
                if (!user) {
                  setShowLogin(true);
                }
              }}
              className={`rounded-xl py-4 font-semibold transition ${
                user
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {user
                ? "Add To Cart"
                : "Login to Add"}
            </button>

            <button
              disabled={!user}
              onClick={() => {
                if (!user) {
                  setShowLogin(true);
                }
              }}
              className={`rounded-xl py-4 font-semibold transition ${
                user
                  ? "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                  : "border text-gray-400 cursor-not-allowed"
              }`}
            >
              {user
                ? "Buy Now"
                : "Login First"}
            </button>
          </div>
          {!user && (

            <div className="relative mt-10 overflow-hidden rounded-3xl">
              <div className="blur-sm opacity-40 bg-gray-100 p-8 rounded-3xl space-y-5">
                <div className="h-5 rounded bg-gray-300" />
                <div className="h-5 rounded bg-gray-300 w-2/3" />
                <div className="h-5 rounded bg-gray-300 w-1/2" />
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="h-24 rounded-xl bg-gray-300" />
                  <div className="h-24 rounded-xl bg-gray-300" />
                </div>
              </div>

              <div className="absolute inset-0 flex justify-center items-center backdrop-blur-sm bg-white/50">
                <div className="bg-white rounded-3xl shadow-xl p-8 text-center w-80">
                  <div className="text-4xl">
                    🔒
                  </div>
                  <h3 className="font-bold text-2xl mt-3">
                    Login Required
                  </h3>

                  <p className="text-gray-500 mt-3">
                    Login to unlock delivery
                    date, warranty, offers,
                    EMI options and exclusive
                    discounts.
                  </p>

                  <button
                    onClick={() =>
                      setShowLogin(true)
                    }
                    className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3"
                  >
                    Login
                  </button>

                </div>
              </div>
            </div>
          )}       
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
