import type { adminDashboardProps } from "@/interfaces/user";

export default function DashboardCard({
  title,
  value,
  icon,
}: adminDashboardProps) {
  return (
    <div className="bg-white rounded-2xl shadow p-8">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500">{title}</p>

          <h2 className="text-4xl font-bold mt-3">
            {value}
          </h2>
        </div>

        <span className="text-4xl">
          {icon}
        </span>
      </div>
    </div>
  );
}