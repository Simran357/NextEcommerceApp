import UserTable from "@/components/admin/userTable";
import { getUsers } from "@/lib/adminUsers";

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
          Administration
        </p>
      </div>

      <UserTable users={users} />
    </div>
  );
}