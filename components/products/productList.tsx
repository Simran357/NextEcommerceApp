"use client";

import { useState } from "react";
import type { ProductGridProps } from "@/interfaces/product";
import LoginModal from "@/components/auth/model/loginModel";
import SignupModal from "@/components/auth/model/signupModel";
import Navbar from "@/components/layout/navbar";
import Sidebar from "@/components/layout/sidebar";
import ProductGrid from "./productGrid";
import ProductFilters from "./productFilter";

export default function ProductList({
  products,
}: ProductGridProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [showLogin, setShowLogin] = useState(false);
const [showSignup, setShowSignup] = useState(false);

  let filteredProducts = [...products];

  if (search) {
    filteredProducts = filteredProducts.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (category) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === category
    );
  }

  if (sort === "low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sort === "high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <>
     <Navbar
  search={search}
  setSearch={setSearch}
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
          <Sidebar
            category={category}
            setCategory={setCategory}
          />
        </div>

        <div className="col-span-9">

          <ProductFilters
            category={category}
            setCategory={setCategory}
            sort={sort}
            setSort={setSort}
          />

          <ProductGrid
            products={filteredProducts}
          />

        </div>

      </div>
    </>
  );
}