export default function Sidebar() {
  return (
    <aside className="w-64 bg-white p-5 rounded-lg shadow">

      <h2 className="font-bold text-xl mb-4">
        Filters
      </h2>

      <div className="space-y-3">

        <select className="w-full border p-2 rounded">
          <option>All Categories</option>
          <option>Electronics</option>
          <option>Fashion</option>
          <option>Home</option>
          <option>Sports</option>
        </select>

        <input
          type="number"
          placeholder="Min Price"
          className="border p-2 rounded w-full"
        />

        <input
          type="number"
          placeholder="Max Price"
          className="border p-2 rounded w-full"
        />

        <button className="bg-blue-600 text-white w-full rounded p-2">
          Apply
        </button>

      </div>

    </aside>
  );
}