"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ProductGridProps } from "@/interfaces/product";
import ProductDetailsModal from "./productDetailsModel";
import {

  FaEdit,
  FaTrash,
  FaPlus,
} from "react-icons/fa";
import { deleteProduct } from "@/lib/adminProducts";

export default function ProductTable({
  products,
}: ProductGridProps) {
  const router = useRouter();
const [open, setOpen] = useState(false);

const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  async function handleDelete(id: number) {
    const confirmDelete = confirm(
      "Delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);
      router.refresh();
    } catch {
      alert("Unable to delete product.");
    }
  }

  return (<>
    <div className="space-y-6">

      {/* Header */}

      <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
              Inventory
            </p>

            <h1 className="mt-2 text-4xl font-bold text-slate-900">
              Products
            </h1>

            <p className="mt-2 text-slate-500">
              Manage your products, pricing and stock.
            </p>

          </div>

          <Link
            href="/admin/products/add"
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.03]"
          >
            <FaPlus />
            Add Product
          </Link>

        </div>

      </div>

      {/* Table */}

    <div className="overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-xl">
  <div className="max-h-[700px] overflow-y-auto">
    <table className="w-full">
      <thead className="sticky top-0 z-10 border-b bg-white">
        <tr className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
          <th className="px-8 py-5 text-left">Product</th>
          <th className="text-left">Category</th>
          <th className="text-left">Price</th>
          <th className="text-left">Stock</th>
          <th className="text-center">Actions</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-100">
        {products.map((product) => (
          <tr
            key={product.id}
            className="transition-all duration-200 hover:bg-slate-50"
          >
            <td className="px-8 py-6">
              <div className="flex items-center gap-5">
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  width={82}
                  height={82}
                  className="rounded-2xl border border-gray-200 object-cover"
                />

                <div className="max-w-sm">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {product.title}
                  </h3>

                  <p className="mt-1 text-sm font-medium text-indigo-600">
                    {product.brand}
                  </p>

                  <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                    {product.description}
                  </p>
                </div>
              </div>
            </td>

            <td>
              <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                {product.category}
              </span>
            </td>

            <td>
              <div className="text-xl font-bold text-slate-900">
                ₹{product.price}
              </div>

              {product.discount_percentage > 0 && (
                <p className="mt-1 text-xs text-green-600">
                  {product.discount_percentage}% OFF
                </p>
              )}
            </td>

            <td>
              <div className="space-y-2">
                <p className="font-semibold text-slate-900">
                  {product.stock} pcs
                </p>

                {product.stock > 20 ? (
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                    In Stock
                  </span>
                ) : product.stock > 0 ? (
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                    Low Stock
                  </span>
                ) : (
                  <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                    Out of Stock
                  </span>
                )}
              </div>
            </td>

            <td>
              <div className="flex justify-center gap-3">
                
             <button
  onClick={() => {
    setSelectedProduct(product.id);
    setOpen(true);
  }}
  className="flex h-11 w-11 items-center justify-center rounded-xl border border-yellow-200 bg-yellow-50 text-yellow-700 transition hover:bg-yellow-500 hover:text-white"
>
  <FaEdit />
</button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-600 transition hover:bg-red-600 hover:text-white"
                >
                  <FaTrash />
                </button>
              </div>
            </td>
          </tr>
        ))}

        {products.length === 0 && (
          <tr>
            <td
              colSpan={5}
              className="py-24 text-center"
            >
              <div className="flex flex-col items-center">
                <div className="mb-4 text-7xl">📦</div>

                <h3 className="text-3xl font-bold text-slate-900">
                  No products found
                </h3>

                <p className="mt-3 max-w-sm text-gray-500">
                  Start building your catalog by adding your
                  first product.
                </p>

                <Link
                  href="/admin/products/add"
                  className="mt-8 rounded-2xl bg-indigo-600 px-7 py-3 font-semibold text-white transition hover:bg-indigo-700"
                >
                  Add Product
                </Link>
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>
    </div>
    <ProductDetailsModal
  open={open}
  productId={selectedProduct}
  onClose={() => setOpen(false)}
/>
</>  );
}