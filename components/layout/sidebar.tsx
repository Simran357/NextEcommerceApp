"use client";

import { useFilter } from "@/components/context/filterContext";

export default function Sidebar() {
  const {
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
  } = useFilter();

  const clearFilters = () => {
    setCategory("");
    setBrand("");
    setRating(0);
    setStock("");
    setDiscount(0);
  };

  return (
    <aside className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">

      <h2 className="text-2xl font-bold mb-6">
        Filters
      </h2>

      {/* Category */}

      <div className="mb-8">

        <h3 className="font-semibold mb-3">Category</h3>

        <button
          onClick={() => setCategory("")}
          className={`block w-full text-left p-2 rounded ${
            category === "" ? "bg-blue-600 text-white" : ""
          }`}
        >
          All
        </button>

        <button
          onClick={() => setCategory("beauty")}
          className={`block w-full text-left p-2 rounded ${
            category === "beauty" ? "bg-blue-600 text-white" : ""
          }`}
        >
          Beauty
        </button>

        <button
          onClick={() => setCategory("groceries")}
          className={`block w-full text-left p-2 rounded ${
            category === "groceries" ? "bg-blue-600 text-white" : ""
          }`}
        >
          Groceries
        </button>

      </div>

      {/* Brand */}

      <div className="mb-8">

        <h3 className="font-semibold mb-3">Brand</h3>

        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="w-full border rounded-lg p-2"
        >
          <option value="">All Brands</option>
          <option value="Essence">Essence</option>
          <option value="Calvin Klein">Calvin Klein</option>
          <option value="Apple">Apple</option>
          <option value="Samsung">Samsung</option>
        </select>

      </div>

      {/* Rating */}

      <div className="mb-8">

        <h3 className="font-semibold mb-3">Rating</h3>

        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full border rounded-lg p-2"
        >
          <option value={0}>All Ratings</option>
          <option value={4}>4★ & above</option>
          <option value={3}>3★ & above</option>
          <option value={2}>2★ & above</option>
        </select>

      </div>

      {/* Stock */}

      <div className="mb-8">

        <h3 className="font-semibold mb-3">Availability</h3>

        <label className="flex gap-2 mb-2">

          <input
            type="radio"
            checked={stock === "in"}
            onChange={() => setStock("in")}
          />

          In Stock

        </label>

        <label className="flex gap-2">

          <input
            type="radio"
            checked={stock === "out"}
            onChange={() => setStock("out")}
          />

          Out Of Stock

        </label>

      </div>

      {/* Discount */}

      <div className="mb-8">

        <h3 className="font-semibold mb-3">Discount</h3>

        <select
          value={discount}
          onChange={(e) => setDiscount(Number(e.target.value))}
          className="w-full border rounded-lg p-2"
        >
          <option value={0}>Any</option>
          <option value={10}>10%+</option>
          <option value={20}>20%+</option>
          <option value={30}>30%+</option>
          <option value={50}>50%+</option>
        </select>

      </div>

      <button
        onClick={clearFilters}
        className="w-full bg-red-500 text-white rounded-lg py-3"
      >
        Clear Filters
      </button>

    </aside>
  );
}