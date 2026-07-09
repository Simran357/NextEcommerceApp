"use client";

import { useState } from "react";
import type { ProductGridProps } from "@/interfaces/product";
import { useFilter } from "@/components/context/filterContext";
import Navbar from "@/components/layout/navbar";
import Sidebar from "@/components/layout/sidebar";
import ProtectedAction from "../common/protectedActions";
import ProductGrid from "./productGrid";
import ProductFilters from "./productFilter";
import LoginModal from "@/components/auth/model/loginModel";
import SignupModal from "@/components/auth/model/signupModel";
import useDebounce from "@/app/hooks/useDebounce";
export default function ProductList({
  products,
}: ProductGridProps) {
  const [currentPage, setCurrentPage] = useState(1);

const productsPerPage = 6;
  const {
    search,
    category,
    brand,
    rating,
    stock,
    discount,
    sort,
  } = useFilter();
  
  const debouncedSearch = useDebounce(search, 500);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  let filteredProducts = [...products];

  // Search
  if (debouncedSearch) {
    filteredProducts = filteredProducts.filter((product) =>
      product.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }

  // Category
  if (category) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === category
    );
  }

  // Brand
  if (brand) {
    filteredProducts = filteredProducts.filter(
      (product) => product.brand === brand
    );
  }

  // Rating
  if (rating > 0) {
    filteredProducts = filteredProducts.filter(
      (product) => product.rating >= rating
    );
  }

  // Stock
  if (stock === "in") {
    filteredProducts = filteredProducts.filter(
      (product) => product.stock > 0
    );
  }

  if (stock === "out") {
    filteredProducts = filteredProducts.filter(
      (product) => product.stock === 0
    );
  }

  // Discount
  if (discount > 0) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.discount_percentage >= discount
    );
  }

  // Sorting
  switch (sort) {
    case "low":
      filteredProducts.sort((a, b) => a.price - b.price);
      break;

    case "high":
      filteredProducts.sort((a, b) => b.price - a.price);
      break;

    case "name":
      filteredProducts.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      break;
  }

const totalPages = Math.max(
  1,
  Math.ceil(filteredProducts.length / productsPerPage)
);

const safeCurrentPage = Math.min(
  currentPage,
  Math.max(totalPages, 1)
);

const lastProductIndex =
  safeCurrentPage * productsPerPage;

const firstProductIndex =
  lastProductIndex - productsPerPage;

const currentProducts = filteredProducts.slice(
  firstProductIndex,
  lastProductIndex
);

return (
  <>
    <Navbar
      setShowLogin={setShowLogin}
      setShowSignup={setShowSignup}
    />

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

    <main className="min-h-screen bg-[#f8f7f4]">

      {/* Hero */}

      <section className="max-w-7xl mx-auto px-6 pt-10">

        <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-12 py-20">

          <div className="max-w-2xl relative z-10">

            <span className="inline-block rounded-full bg-white/10 backdrop-blur px-5 py-2 text-sm text-blue-300">
              ✨ Premium Collection 2026
            </span>

            <h1 className="mt-6 text-6xl font-black text-white leading-tight">
              Shop Smarter.
              <br />
              Live Better.
            </h1>

            <p className="mt-6 text-lg text-gray-300 max-w-xl">
              Discover beautifully crafted products with
              premium quality, fast delivery and amazing
              offers.
            </p>

            <button className="mt-10 rounded-full bg-white px-8 py-4 font-semibold text-black hover:scale-105 transition">
              Explore Collection
            </button>

          </div>

          <div className="absolute right-[-120px] top-[-120px] h-[420px] w-[420px] rounded-full bg-blue-500/20 blur-3xl"></div>

          <div className="absolute bottom-[-100px] left-[35%] h-[280px] w-[280px] rounded-full bg-indigo-500/20 blur-3xl"></div>

        </div>

      </section>

      {/* Products */}

      <section className="max-w-7xl mx-auto px-6 mt-14">

        <div className="flex justify-between items-end mb-8">

          <div>

            <p className="uppercase tracking-[5px] text-blue-600 text-sm font-semibold">
              Collection
            </p>

            <h2 className="text-5xl font-black mt-2">
              Featured Products
            </h2>

            <p className="text-gray-500 mt-3">
              {filteredProducts.length} products available
            </p>

          </div>

          <ProductFilters />

        </div>

        <div className="grid grid-cols-12 gap-8">

          <aside className="col-span-3">

            <ProtectedAction
              onLoginRequired={() =>
                setShowLogin(true)
              }
            >
              <Sidebar />
            </ProtectedAction>

          </aside>

          <section className="col-span-9">

            <ProductGrid
  products={currentProducts}
/>
<div className="mt-12 flex justify-center items-center gap-2">

  <button
  disabled={safeCurrentPage === 1}
  onClick={() => setCurrentPage((page) => page - 1)}
  className="rounded-lg border px-4 py-2 disabled:opacity-50"
>
  Previous
</button>

{Array.from({ length: totalPages }).map((_, index) => (
  <button
    key={index}
    onClick={() => setCurrentPage(index + 1)}
    className={`h-10 w-10 rounded-lg transition ${
      safeCurrentPage === index + 1
        ? "bg-black text-white"
        : "border hover:bg-gray-100"
    }`}
  >
    {index + 1}
  </button>
))}

<button
  disabled={safeCurrentPage === totalPages}
  onClick={() => setCurrentPage((page) => page + 1)}
  className="rounded-lg border px-4 py-2 disabled:opacity-50"
>
  Next
</button>

</div>
          </section>

        </div>

      </section>

    
    </main>
  </>
);
}