
"use client";

interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
}

export default function SearchBar({
  search,
  setSearch,
}: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder="Search Products..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full border rounded-xl px-4 py-3 outline-none focus:border-blue-500"
    />
  );
}