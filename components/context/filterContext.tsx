"use client";

import { createContext, useContext, useState } from "react";

import type { FilterContextType } from "@/interfaces/product";
const FilterContext = createContext({} as FilterContextType);

export function FilterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [rating, setRating] = useState(0);
  const [stock, setStock] = useState("");
  const [discount, setDiscount] = useState(0);
  const [sort, setSort] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const resetFilters = () => {
  setSearch("");
  setCategory("");
  setBrand("");
  setRating(0);
  setStock("");
  setDiscount(0);
  setSort("");
  setMinPrice("");
  setMaxPrice("");
};

  return (
   <FilterContext.Provider
  value={{
    search,
    setSearch,
    category,
    setCategory,
    brand,
    setBrand,
    rating,
    setRating,
    stock,
    setStock,
    discount,
    setDiscount,
    sort,
    setSort,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    resetFilters,
  }}
>
      {children}
    </FilterContext.Provider>
  );
}

export const useFilter = () => useContext(FilterContext);