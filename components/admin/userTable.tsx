"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  FaTrash,
} from "react-icons/fa";

import type { UserGridProps } from "@/interfaces/user";
import {
  deleteUser,
  updateUserRole,
} from "@/lib/adminUsers";
export default function UserTable({
  users,
}: UserGridProps) {
  const router = useRouter();

  
async function handleRoleChange(
  id: string,
  role: "user" | "admin"
) {
  const ok = confirm(
    `Change this user's role to ${role}?`
  );

  if (!ok) return;

  try {
    await updateUserRole(id, role);

    router.refresh();
  } catch {
    alert("Unable to update role.");
  }
}
  async function handleDelete(id: string) {
    const confirmed = confirm(
      "Delete this user?"
    );

    if (!confirmed) return;

    try {
      await deleteUser(id);
      router.refresh();
    } catch {
      alert("Unable to delete user.");
    }
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">

      {/* Header */}

      <div className="flex items-center justify-between border-b bg-gradient-to-r from-white to-slate-50 px-8 py-6">

        <div>

          <h2 className="text-2xl font-bold text-slate-900">
            Registered Users
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage registered customers and administrators.
          </p>

        </div>

        <div className="rounded-2xl bg-indigo-50 px-6 py-4">

          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
            Total Users
          </p>

          <h3 className="mt-1 text-3xl font-bold text-indigo-700">
            {users.length}
          </h3>

        </div>

      </div>

      <div className="max-h-[720px] overflow-y-auto">

        <table className="w-full">

          <thead className="sticky top-0 z-20 border-b bg-slate-100">

            <tr className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">

              <th className="px-8 py-5 text-left">
                User
              </th>

              <th className="text-left">
                Role
              </th>

              <th className="text-left">
                Joined
              </th>

              <th className="text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody className="divide-y divide-slate-100">

           {users.map((user) => {
  const avatar =
    user.avatar_url && user.avatar_url.trim() !== ""
      ? user.avatar_url
      : "/default-avatar.png";

  return (

              <tr
                key={user.id}
                className="odd:bg-white even:bg-slate-50 transition hover:bg-indigo-50"
              >

                <td className="px-8 py-6">

                  <div className="flex items-center gap-5">
<Image
  src={avatar}
  alt={user.full_name ?? "User"}
  width={70}
  height={70}
  className="rounded-full border-2 border-slate-200 object-cover"
/>
                    <div>

                      <h3 className="text-lg font-bold text-slate-900">

                        {user.full_name ??
                          "Unknown User"}

                      </h3>

                      <p className="mt-1 text-sm text-slate-500">

                        {user.email}

                      </p>

                    </div>

                  </div>

                </td>

               <td>

  <select
    value={user.role}
    onChange={(e) =>
      handleRoleChange(
        user.id,
        e.target.value as "user" | "admin"
      )
    }
    className={`rounded-xl border px-4 py-2 text-sm font-semibold outline-none transition ${
      user.role === "admin"
        ? "border-indigo-200 bg-indigo-50 text-indigo-700"
        : "border-emerald-200 bg-emerald-50 text-emerald-700"
    }`}
  >
    <option value="user">
      User
    </option>

    <option value="admin">
      Admin
    </option>
  </select>

</td>

                <td className="font-medium text-slate-600">

                  {new Date(
                    user.created_at
                  ).toLocaleDateString()}

                </td>

                <td>

                  <div className="flex justify-center gap-2">
                    

                    <button
                      onClick={() =>
                        handleDelete(user.id)
                      }
                      className="flex h-11 w-11 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-600 transition-all duration-200 hover:border-red-500 hover:bg-red-500 hover:text-white"
                    >
                      <FaTrash />
                    </button>

                  </div>

                </td>

              </tr>

                    )
})}

            {users.length === 0 && (

              <tr>

                <td
                  colSpan={4}
                  className="py-24"
                >

                  <div className="flex flex-col items-center justify-center">

                    <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-slate-100 text-5xl">
                      👥
                    </div>

                    <h3 className="text-3xl font-bold text-slate-900">
                      No Users Yet
                    </h3>

                    <p className="mt-3 max-w-md text-center text-slate-500">
                      Users will appear here once customers
                      create an account on your store.
                    </p>

                  </div>

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  );
}