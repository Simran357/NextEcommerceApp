"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaChartPie,
  FaBoxOpen,
  FaPlusCircle,
  FaUsers,
  FaShoppingBag,
} from "react-icons/fa";

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    {
      href: "/admin/dashboard",
      title: "Dashboard",
      icon: <FaChartPie />,
    },
    {
      href: "/admin/products",
      title: "Products",
      icon: <FaBoxOpen />,
    },
    {
      href: "/admin/products/add",
      title: "Add Product",
      icon: <FaPlusCircle />,
    },
    {
      href: "/admin/user",
      title: "Users",
      icon: <FaUsers />,
    },
    {
      href: "/admin/orders",
      title: "Orders",
      icon: <FaShoppingBag />,
    },
  ];

  return (
    <aside className="sticky top-0 flex h-screen w-72 flex-col border-r border-slate-200 bg-white">

      {/* Logo */}

      <div className="border-b px-8 py-8">
        <h1 className="text-3xl font-black tracking-tight text-slate-900">
          Shop
          <span className="text-indigo-600">
            Ease
          </span>
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Admin Dashboard
        </p>
      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-2 px-5 py-8">

        {links.map((item) => {
          const active =
            pathname === item.href ||
            pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300 ${
                active
                  ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <span
                className={`text-lg ${
                  active
                    ? ""
                    : "group-hover:scale-110 transition"
                }`}
              >
                {item.icon}
              </span>

              <span className="font-semibold">
                {item.title}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}

      <div className="border-t p-6">
        <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 p-5 text-white">
          <h3 className="font-semibold">
            ShopEase Admin
          </h3>

          <p className="mt-2 text-sm text-indigo-100">
            Manage products, users, wishlists and
            orders from one place.
          </p>
        </div>
      </div>
    </aside>
  );
}