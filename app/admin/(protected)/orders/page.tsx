import OrdersTable from "@/components/admin/orderTable";
import { getAllOrders } from "@/lib/adminOrders";
export default async function OrdersPage() {
const orders = await getAllOrders();
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
          Administration
        </p>

    
      </div>

      <OrdersTable orders={orders} />
    </div>
  );
}