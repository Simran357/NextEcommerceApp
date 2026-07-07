"use client";
import type {ProductFilterProps} from "@/interfaces/product"

export default function ProductFilter({
  category,
  setCategory,
  sort,
  setSort,
}: ProductFilterProps) {
  return (
    <div className="bg-white rounded-xl shadow p-4 mb-6 flex gap-4">

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border rounded-lg px-3 py-2"
      >
        <option value="">All Categories</option>
        <option value="beauty">Beauty</option>
        <option value="fragrances">Fragrances</option>
        <option value="furniture">Furniture</option>
        <option value="groceries">Groceries</option>
      </select>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="border rounded-lg px-3 py-2"
      >
        <option value="">Sort By</option>
        <option value="low">Price Low → High</option>
        <option value="high">Price High → Low</option>
        <option value="name">Name A → Z</option>
      </select>

    </div>
  );
}