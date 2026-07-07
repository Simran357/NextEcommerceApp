"use client";

import Link from "next/link";
import {
    FaBox,
    FaUsers,
    FaChartBar,
    FaPlus,
} from "react-icons/fa";

export default function AdminSidebar() {
    return (
        <aside className="w-72 bg-slate-900 text-white min-h-screen p-6">
            <h1 className="text-3xl font-bold mb-10">
                ShopEase Admin
            </h1>
            <nav className="space-y-3">
                <Link
                    href="/admin"
                    className="flex gap-3 p-3 rounded-xl hover:bg-slate-800"
                >
                    <FaChartBar />
                    Dashboard
                </Link>
                <Link
                    href="/admin/products"
                    className="flex gap-3 p-3 rounded-xl hover:bg-slate-800"
                >
                    <FaBox />
                    Products
                </Link>
                <Link
                    href="/admin/products/add"
                    className="flex gap-3 p-3 rounded-xl hover:bg-slate-800"
                >
                    <FaPlus />
                    Add Product
                </Link>
                <Link
                    href="/admin/users"
                    className="flex gap-3 p-3 rounded-xl hover:bg-slate-800"
                >
                    <FaUsers />
                    Users
                </Link>
            </nav>
        </aside>
    );
}