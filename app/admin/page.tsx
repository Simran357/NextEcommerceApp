import DashboardCard from "@/components/admin/dashbaordCard";
import {
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaRupeeSign,
} from "react-icons/fa";

export default function AdminDashboard() {
    return (
        <>
            <h1 className="text-4xl font-bold mb-8">
                Dashboard
            </h1>
       <div className="grid grid-cols-4 gap-6">
  <DashboardCard
    title="Products"
    value={194}
    icon={<FaBoxOpen size={28} />}
  />

  <DashboardCard
    title="Orders"
    value={86}
    icon={<FaShoppingCart size={28} />}
  />

  <DashboardCard
    title="Users"
    value={34}
    icon={<FaUsers size={28} />}
  />

  <DashboardCard
    title="Revenue"
    value="₹2.8L"
    icon={<FaRupeeSign size={28} />}
  />
</div>
        </>

    );

}