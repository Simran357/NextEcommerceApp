"use client";

import { useState } from "react";
import type { ProductGridProps } from "@/interfaces/product";
import { useFilter } from "@/components/context/filterContext";

import Navbar from "@/components/layout/navbar";
import Sidebar from "@/components/layout/sidebar";

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

      <div className="max-w-7xl mx-auto mt-8 grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <Sidebar />
        </div>

        <div className="col-span-9">
          <ProductFilters />

          <ProductGrid
            products={filteredProducts}
          />
        </div>
      </div>
    </>
  );
}