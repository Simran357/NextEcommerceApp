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

    <main className="max-w-7xl mx-auto px-6 py-8">

   <div className="flex justify-between items-center mb-6">
  <div>
    <h1 className="text-3xl font-bold">Products</h1>

    <p className="text-gray-500 mt-1">
      {filteredProducts.length} products available
    </p>
  </div>

  <ProductFilters />
</div>

<div className="grid grid-cols-12 gap-8">
  <aside className="col-span-3">
    <ProtectedAction
      onLoginRequired={() => setShowLogin(true)}
    >
      <Sidebar />
    </ProtectedAction>
  </aside>

  <section className="col-span-9">
    <ProductGrid products={filteredProducts} />
  </section>
</div>

    </main>
  </>
);
}