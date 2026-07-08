"use client";

import { useFilter } from "../context/filterContext";

export default function ProductFilter() {
  const {
    category,
    setCategory,
    sort,
    setSort,
    resetFilters,
  } = useFilter();

  return (
    <div className="sticky top-20 z-20 mb-8">
      <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-xl px-6 py-4 shadow-lg">

        <div>
          <h2 className="text-lg font-semibold">
            Explore Products
          </h2>

          <p className="text-sm text-gray-500">
            Filter & sort your collection
          </p>
        </div>

        <div className="flex items-center gap-4">

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-black"
          >
            <option value="">Category</option>
            <option value="beauty">Beauty</option>
            <option value="fragrances">Fragrances</option>
            <option value="furniture">Furniture</option>
            <option value="groceries">Groceries</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-black"
          >
            <option value="">Sort</option>
            <option value="low">Price ↑</option>
            <option value="high">Price ↓</option>
            <option value="name">A → Z</option>
          </select>

          <button
            onClick={resetFilters}
            className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:scale-105"
          >
            Reset
          </button>

        </div>

      </div>
    </div>
  );
}