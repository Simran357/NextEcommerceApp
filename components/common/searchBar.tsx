
"use client";

import {SearchBarProps} from "@/interfaces/product"
import { useAuth } from "../context/authContext";
export default function SearchBar({
  search,
  setSearch,
}: SearchBarProps) {
  const { user} = useAuth();
  return (
    <input
      type="text"
      disabled={!user}
     placeholder={
   user
     ? "Search products..."
     : "Login to search products"
}
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full border rounded-xl px-4 py-3 outline-none focus:border-blue-500"
    />
  );
}