"use client";

import { createContext, useContext, useState } from "react";

interface FilterContextType {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;

  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;

  brand: string;
  setBrand: React.Dispatch<React.SetStateAction<string>>;

  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;

  stock: string;
  setStock: React.Dispatch<React.SetStateAction<string>>;

  discount: number;
  setDiscount: React.Dispatch<React.SetStateAction<number>>;

  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;

  minPrice: string;
  setMinPrice: React.Dispatch<React.SetStateAction<string>>;

  maxPrice: string;
  setMaxPrice: React.Dispatch<React.SetStateAction<string>>;
}

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
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export const useFilter = () => useContext(FilterContext);