"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProfile } from "@/lib/profile";
import type { Profile } from "@/interfaces/user";
import { useAuth } from "@/components/context/authContext";
import { useRouter } from "next/navigation";
import { useFilter } from "@/components/context/filterContext";

export default function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] =
    useState<Profile | null>(null);
const { logout } = useAuth();
const { resetFilters } = useFilter();
const router = useRouter();
  const [loading, setLoading] =
    useState(true);
async function handleLogout() {
  resetFilters();

  await logout();

  router.push("/products");
}
  useEffect(() => {
    async function fetchProfile() {
      if (!user) return;

      try {
        const data = await getProfile({
  id: user.id,
  email: user.email ?? undefined,
});;

        setProfile(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [user]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Profile not found.
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">

      <h1 className="mb-10 text-4xl font-bold">
        My Profile
      </h1>

     <div className="mt-10 border-t pt-8">

  <h2 className="mb-4 text-xl font-semibold">
    Account
  </h2>

  <div className="flex gap-4">

    <Link
      href="/orders/prevOrders"
      className="rounded-xl border px-6 py-3 hover:bg-gray-100"
    >
      My Orders
    </Link>

    <button
      onClick={handleLogout}
      className="rounded-xl bg-red-500 px-6 py-3 text-white hover:bg-red-600"
    >
      Logout
    </button>

  </div>

</div>
    </main>
  );
}