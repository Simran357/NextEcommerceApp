"use client";

import Image from "next/image";
import { FaEye, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import type { WishlistGridProps } from "@/interfaces/wishlist";
import { deleteWishlistItem } from "@/lib/adminWishlist";
export default function WishlistTable({
  wishlist,
}: WishlistGridProps) {
  const router = useRouter();

  async function handleDelete(id: number) {
    if (!confirm("Remove wishlist item?")) return;

    try {
      await deleteWishlistItem(id);

      router.refresh();
    } catch {
      alert("Unable to delete.");
    }
  }

  return (
    <div className="overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-xl">

      <div className="border-b bg-white px-8 py-6">

        <h2 className="text-2xl font-bold">
          Wishlists
        </h2>

        <p className="mt-2 text-gray-500">
          Products saved by customers.
        </p>

      </div>

      <div className="max-h-[700px] overflow-y-auto">

        <table className="w-full">

          <thead className="sticky top-0 border-b bg-white">

            <tr className="text-xs uppercase tracking-[0.18em] text-gray-500">

              <th className="px-8 py-5 text-left">
                Product
              </th>

              <th className="text-left">
                User
              </th>

              <th className="text-left">
                Date Added
              </th>

              <th className="text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody className="divide-y divide-gray-100">

            {wishlist.map((item) => (

              <tr
                key={item.id}
                className="hover:bg-slate-50 transition"
              >

                <td className="px-8 py-6">

                  <div className="flex items-center gap-4">

                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      width={70}
                      height={70}
                      className="rounded-2xl border object-cover"
                    />

                    <div>

                      <h3 className="font-semibold">
                        {item.title}
                      </h3>

                      <p className="text-sm text-gray-500">
                        ₹{item.price}
                      </p>

                    </div>

                  </div>

                </td>

                <td>
                  {item.user_name}
                </td>

                <td>
                  {new Date(
                    item.created_at
                  ).toLocaleDateString()}
                </td>

                <td>

                  <div className="flex justify-center gap-3">

                    <button className="flex h-11 w-11 items-center justify-center rounded-xl border hover:bg-indigo-600 hover:text-white">
                      <FaEye />
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(item.id)
                      }
                      className="flex h-11 w-11 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white"
                    >
                      <FaTrash />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}