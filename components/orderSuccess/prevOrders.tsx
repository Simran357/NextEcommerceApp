"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useAuth } from "../context/authContext";
import { getOrders } from "@/lib/orders";
import type { Order , GroupedOrder} from "@/interfaces/order";
export default function OrdersPage() {
  const { user } = useAuth();

  const [orders, setOrders] = useState<Order[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function load() {
      if (!user) return;

      const data = await getOrders(user.id);

      setOrders(data);

      setLoading(false);
    }

    load();
  }, [user]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="flex h-screen items-center justify-center text-3xl font-bold">
        No Orders Yet 📦
      </div>
    );
  }

 const groupedOrders: GroupedOrder[] = Object.values(
  orders.reduce<Record<string, GroupedOrder>>((acc, item) => {
    if (!acc[item.order_id]) {
      acc[item.order_id] = {
        order_id: item.order_id,
        created_at: item.created_at,
        status: item.status,
        items: [],
      };
    }

    acc[item.order_id].items.push(item);

    return acc;
  }, {})
);

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="mb-10 text-4xl font-bold">
        My Orders
      </h1>

     <div className="space-y-8">
  {groupedOrders.map((order) => (
    <div
      key={order.order_id}
      className="overflow-hidden rounded-3xl border bg-white shadow-lg"
    >
      {/* Header */}

      <div className="flex items-center justify-between border-b bg-gray-50 px-8 py-6">
        <div>
          <h2 className="text-2xl font-bold">
            Order #{order.order_id.slice(0, 8)}
          </h2>

          <p className="text-gray-500">
            {new Date(order.created_at).toLocaleString()}
          </p>
        </div>

        <span className="rounded-full bg-green-100 px-5 py-2 font-semibold text-green-700">
          {order.status}
        </span>
      </div>

      {/* Products */}

      <div className="space-y-6 p-8">
        {order.items.map((item: Order) => (
          <div
            key={item.id}
            className="flex items-center gap-6 border-b pb-6 last:border-none"
          >
            <div className="relative h-28 w-28">
              <Image
                src={item.thumbnail}
                alt={item.title}
                fill
                className="object-contain"
              />
            </div>

            <div className="flex-1">
              <h3 className="text-xl font-bold">
                {item.title}
              </h3>

              <p className="mt-2 text-gray-500">
                Quantity: {item.quantity}
              </p>
            </div>

            <div className="text-right">
              <p className="text-xl font-bold">
                ₹{item.price}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}

      <div className="flex items-center justify-between border-t bg-gray-50 px-8 py-6">
        <div className="text-2xl font-bold">
          Total ₹
          {order.items
            .reduce(
              (sum: number, item: Order) =>
                sum + item.price * item.quantity,
              0
            )
            .toFixed(2)}
        </div>

        <button className="rounded-xl bg-black px-6 py-3 text-white transition hover:bg-gray-800">
          Buy Again
        </button>
      </div>
    </div>
  ))}
</div>
    </main>
  );
}