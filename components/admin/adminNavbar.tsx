"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../context/authContext";
import {
  FaSearch,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";

export default function AdminNavbar() {
  const { logout } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.replace("/admin");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-xl">

      <div className="flex h-20 items-center justify-between px-10">

        {/* Left */}

        <div>

          <h1 className="text-3xl font-bold text-slate-900">
            Dashboard
          </h1>

<p>
  Welcome back! Here&apos;s what&apos;s happening today.
</p>         
        </div>

        {/* Right */}

        <div className="flex items-center gap-5">

          {/* Search */}

          <div className="relative hidden lg:block">

            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              placeholder="Search products..."
              className="w-72 rounded-2xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 outline-none transition focus:border-indigo-500 focus:bg-white"
            />

          </div>

       

          {/* Admin */}

          <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-2 shadow-sm">

            <FaUserCircle className="text-4xl text-indigo-600" />

            <div>

              <p className="font-semibold text-slate-900">
                Admin
              </p>

              <p className="text-xs text-slate-500">
                ShopEase Store
              </p>

            </div>

          </div>

          {/* Logout */}

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-2xl bg-rose-500 px-5 py-3 font-medium text-white transition hover:-translate-y-0.5 hover:bg-rose-600 hover:shadow-lg"
          >
            <FaSignOutAlt />

            Logout
          </button>

        </div>

      </div>

    </header>
  );
}