import DashboardCard from "@/components/admin/dashbaordCard";
import ProductTable from "@/components/admin/productForm";
import { getProducts } from "@/lib/products";

export default async function AdminDashboard() {

    const products = await getProducts();

    return (

        <div className="space-y-10">

            <div>

                <h1 className="text-4xl font-bold">
                    Dashboard
                </h1>

                <p className="text-gray-500 mt-2">
                    Welcome back Admin 👋
                </p>

            </div>

            <div className="grid grid-cols-4 gap-6">

                <DashboardCard
                    title="Products"
                    value={products.length}
                    icon="📦"
                />

                <DashboardCard
                    title="Users"
                    value={12}
                    icon="👥"
                />

                <DashboardCard
                    title="Orders"
                    value={46}
                    icon="🛒"
                />

                <DashboardCard
                    title="Revenue"
                    value="₹1,28,000"
                    icon="💰"
                />

            </div>

            <ProductTable
                products={products}
            />

        </div>

    );

}