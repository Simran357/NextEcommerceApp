import DashboardCard from "@/components/admin/dashbaordCard";

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
                />
                <DashboardCard
                    title="Orders"
                    value={86}
                />
                <DashboardCard
                    title="Users"
                    value={34}
                />
                <DashboardCard
                    title="Revenue"
                    value="₹2.8L"
                />
            </div>

        </>

    );

}