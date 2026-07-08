import Link from "next/link";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import SearchBar from "../common/searchBar";
import { useFilter } from "../context/filterContext";
import type { NavbarModalProps } from "@/interfaces/product";
import { useAuth } from "../context/authContext"
import { FaHeart } from "react-icons/fa";
import { useWishlist } from "@/components/context/wishlistContext";
export default function Navbar({
  setShowLogin,
  setShowSignup,
}: NavbarModalProps) {
const { wishlist } = useWishlist();
  const {
    search,
    setSearch,
  } = useFilter();
  const { user, logout } = useAuth();
  const { resetFilters } = useFilter();
  const handleLogout = async () => {
  try {
    resetFilters();
    await logout();
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
const { role } = useAuth();

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto h-16 flex items-center justify-between px-6">
        <Link
          href="/products"
          className="text-3xl font-bold text-blue-600">
          ShopEase
        </Link>
        <div className="w-[420px]">
    
            <SearchBar
              search={search}
              setSearch={setSearch}/>
        </div>
        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <button
                onClick={() => setShowLogin(true)}
                className="border px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white">
                Login
              </button>
              <button
                onClick={() => setShowSignup(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                Sign Up
              </button>
            </>
          ) : (
            <>
              <button className="relative">
                <FaShoppingCart
                  size={28}
                  className="text-gray-700"/>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex justify-center items-center">
                  0
                </span>
              </button>
          {user ? (
  <Link href="/wishlist" className="relative">
    <FaHeart size={22} />

    {wishlist.length > 0 && (
      <span className="absolute -top-2 -right-2 ...">
        {wishlist.length}
      </span>
    )}
  </Link>
) : (
  <button
    onClick={() => setShowLogin(true)}
    className="relative"
  >
    <FaHeart size={22} />
  </button>
)}
              <FaUserCircle
                size={32}
                className="text-gray-600"/>

<p>{role}</p>
           <button
  onClick={handleLogout}
  className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
>
  Logout
</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}