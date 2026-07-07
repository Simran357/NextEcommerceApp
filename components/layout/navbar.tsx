import Link from "next/link";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import SearchBar from "../common/searchBar";
import { useFilter } from "../context/filterContext";
import type { NavbarModalProps } from "@/interfaces/product";
import { useAuth } from "../context/authContext"
export default function Navbar({
  setShowLogin,
  setShowSignup,
}: NavbarModalProps) {

  const {
    search,
    setSearch,
  } = useFilter();
  const { user, logout } = useAuth();
  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto h-16 flex items-center justify-between px-6">
        <Link
          href="/products"
          className="text-3xl font-bold text-blue-600"
        >
          ShopEase
        </Link>

        <div className="w-[420px]">
          <SearchBar
            search={search}
            setSearch={setSearch}
          />
        </div>

        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <button
                onClick={() => setShowLogin(true)}
                className="border px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white"
              >
                Login
              </button>

              <button
                onClick={() => setShowSignup(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              <button className="relative">

                <FaShoppingCart
                  size={28}
                  className="text-gray-700"
                />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex justify-center items-center">
                  0
                </span>
              </button>
              <FaUserCircle
                size={32}
                className="text-gray-600"
              />
              <button onClick={logout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}