"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <Link href="/products" className="text-2xl font-bold text-blue-600">
          ShopEase
        </Link>

        <input
          type="text"
          placeholder="Search Products..."
          className="border rounded-lg px-4 py-2 w-96"
        />

        <div className="flex items-center gap-5">
          <Link href="/profile">
            <FaUser size={22} />
          </Link>

          <Link href="/cart" className="relative">
            <FaShoppingCart size={22} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
              0
            </span>
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}