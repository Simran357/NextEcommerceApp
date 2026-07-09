import Link from "next/link";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import SearchBar from "../common/searchBar";
import type { NavbarModalProps } from "@/interfaces/product";
import { useAuth } from "../context/authContext"
import { FaHeart } from "react-icons/fa";
import { useWishlist } from "@/components/context/wishlistContext";
import { useCart } from "@/components/context/cartContext";
import { useFilter } from "../context/filterContext"
import { useState, useEffect, useRef } from "react";import { getProfile } from "@/lib/profile";
import type { Profile } from "@/interfaces/user";
import { useRouter } from "next/navigation";
export default function Navbar({
  setShowLogin,
  setShowSignup,
}: NavbarModalProps) {
const { wishlist } = useWishlist();
  const {
    search,
    setSearch,
  } = useFilter();

const [profile, setProfile] =
  useState<Profile | null>(null);

const menuRef = useRef<HTMLDivElement>(null);
const router = useRouter();

const { resetFilters } = useFilter();
const { cartCount } = useCart();
const { user, logout, role,roleLoading } = useAuth(); 
useEffect(() => {
  console.log("Logged in user:", user);
}, [user]);
const [open, setOpen] = useState(false);
useEffect(() => {
  async function loadProfile() {
    if (!user) return;
      if (role === "admin") return;

    try {
const data = await getProfile({
  id: user.id,
  email: user.email ?? undefined,
});      setProfile(data);
    } catch (error) {
      console.error(error);
    }
  }

  loadProfile();
}, [user,role]);
async function handleLogout() {
  resetFilters();

  await logout();

  router.push("/products");
}

useEffect(() => {
  function handleClickOutside(event: MouseEvent) {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );
  };
}, []);

if (roleLoading) {
  return null; // or a small skeleton
}
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
           <Link
  href="/cart"
  className="relative"
>
  <FaShoppingCart
    size={28}
    className="text-gray-700"
  />

  {cartCount > 0 && (
    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
      {cartCount}
    </span>
  )}
</Link>
      {user && role !== "admin" ? (
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
        <div
  ref={menuRef}
  className="relative"
>
  <button
    onClick={() => setOpen(!open)}
    className="flex items-center gap-2"
  >
    <FaUserCircle size={32} />
      <span className="text-sm">
    {profile?.full_name || user.email}
  </span>
</button>

 {open && (
  <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border bg-white shadow-lg">

    <Link
      href="/profile"
      className="block px-4 py-3 hover:bg-gray-100"
      onClick={() => setOpen(false)}
    >
      My Profile
    </Link>

    <Link
      href="/orders/prevOrders"
      className="block px-4 py-3 hover:bg-gray-100"
      onClick={() => setOpen(false)}
    >
      My Orders
    </Link>

  
    <button
      onClick={handleLogout}
      className="w-full px-4 py-3 text-left text-red-500 hover:bg-gray-100"
    >
      Logout
    </button>

  </div>
)}
</div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}