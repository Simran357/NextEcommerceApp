"use client";

import { FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import type { OrderGrid } from "@/interfaces/order";
import { deleteOrder } from "@/lib/adminOrders";
export default function OrdersTable({
  orders,
}: OrderGrid) {
  const router = useRouter();

  async function handleDelete(id: number) {
    if (!confirm("Delete this order?")) return;

    try {
      await deleteOrder(id);
      router.refresh();
    } catch {
      alert("Unable to delete order.");
    }
  }

  return (
    <div className="overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-xl">
      <div className="border-b bg-white px-8 py-6">
        <h2 className="text-2xl font-bold text-slate-900">
          Orders
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Manage customer orders.
        </p>
      </div>

      <div className="max-h-[700px] overflow-y-auto">
        <table className="w-full">
          <thead className="sticky top-0 border-b bg-white">
            <tr className="text-xs uppercase tracking-[0.18em] text-gray-500">
              <th className="px-8 py-5 text-left">
                Order ID
              </th>

              <th className="text-left">
                Customer
              </th>

              <th className="text-left">
                Total
              </th>

              <th className="text-left">
                Status
              </th>

              <th className="text-left">
                Date
              </th>

              <th className="text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => (
              <tr
                key={order.id}
                className="transition hover:bg-slate-50"
              >
                <td className="px-8 py-6 font-semibold">
                  #{order.order_id.slice(0, 8)}
                </td>

                <td>{order.user_name}</td>

                <td className="font-bold">
                  ₹{order.total}
                </td>

                <td>
                  <span
                    className={`rounded-full px-4 py-2 text-sm font-semibold ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Placed"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td>
                  {new Date(
                    order.created_at
                  ).toLocaleDateString()}
                </td>

                <td>
                  <div className="flex justify-center gap-3">
                
                    <button
                      onClick={() =>
                        handleDelete(order.id)
                      }
                      className="flex h-11 w-11 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {orders.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="py-20 text-center text-gray-500"
                >
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}