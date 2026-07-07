"use client";

interface Props {
  category: string;
  setCategory: (value: string) => void;
}

export default function Sidebar({
  category,
  setCategory,
}: Props) {
  return (
    <aside className="bg-white rounded-xl shadow p-5">

      <h2 className="text-xl font-bold mb-4">
        Categories
      </h2>

      <div className="space-y-3">

        <button
          onClick={() => setCategory("")}
          className={`block w-full text-left p-2 rounded ${
            category === ""
              ? "bg-blue-600 text-white"
              : "hover:bg-gray-100"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setCategory("beauty")}
          className={`block w-full text-left p-2 rounded ${
            category === "beauty"
              ? "bg-blue-600 text-white"
              : "hover:bg-gray-100"
          }`}
        >
          Beauty
        </button>

        <button
          onClick={() => setCategory("groceries")}
          className={`block w-full text-left p-2 rounded ${
            category === "groceries"
              ? "bg-blue-600 text-white"
              : "hover:bg-gray-100"
          }`}
        >
          Groceries
        </button>

        <button
          onClick={() => setCategory("furniture")}
          className={`block w-full text-left p-2 rounded ${
            category === "furniture"
              ? "bg-blue-600 text-white"
              : "hover:bg-gray-100"
          }`}
        >
          Furniture
        </button>

      </div>

    </aside>
  );
}