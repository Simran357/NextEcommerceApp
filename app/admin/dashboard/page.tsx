import DashboardCard from "@/components/admin/dashbaordCard";
import ProductTable from "@/components/admin/productTable";
import { getProducts } from "@/lib/products";
import { getUsers } from "@/lib/adminUsers";

import {
  FaBox,
  FaUsers,

} from "react-icons/fa";

export default async function DashboardPage() {
  const products = await getProducts();
  const users = await getUsers();

  const totalProducts = products.length;




  const totalUsers = users.length;

  const lowStockProducts = products.filter(
    (product) => product.stock < 20
  );

  return (
    <div className="space-y-8">
      {/* Heading */}

      <div>
        <h1 className="text-4xl font-bold text-slate-900">
          Dashboard
        </h1>

        <p className="mt-2 text-gray-500">
          Welcome back 👋 Here&apos;s what&apos;s happening today.
        </p>
      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard
          title="Products"
          value={totalProducts}
          icon={<FaBox />}
        />

        <DashboardCard
          title="Users"
          value={totalUsers}
          icon={<FaUsers />}
        />

      </div>

      {/* Products */}

      <ProductTable products={products} />

      {/* Low Stock */}

      <div className="rounded-3xl bg-white p-8 shadow">
        <h2 className="mb-5 text-2xl font-bold">
          Low Stock Products
        </h2>

        <div className="space-y-4">
          {lowStockProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between rounded-xl border p-4"
            >
              <div>
                <h3 className="font-semibold">
                  {product.title}
                </h3>

                <p className="text-sm text-gray-500">
                  {product.brand}
                </p>
              </div>

              <span className="rounded-full bg-red-100 px-4 py-1 text-red-600">
                {product.stock} left
              </span>
            </div>
          ))}

          {lowStockProducts.length === 0 && (
            <p className="text-gray-500">
              All products have sufficient stock.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}