"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProfile } from "@/lib/profile";
import type { Profile } from "@/interfaces/user";
import { useAuth } from "@/components/context/authContext";
import { useRouter } from "next/navigation";
import { useFilter } from "@/components/context/filterContext";
import Image from "next/image";
import EditProfileForm from "@/components/profile/editProfile";
export default function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] =
    useState<Profile | null>(null);
const { logout } = useAuth();
const { resetFilters } = useFilter();
const router = useRouter();
const [editing, setEditing] = useState(false);
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
<main className="mx-auto max-w-6xl px-6 py-10">

  {/* Breadcrumb */}

  <div className="mb-8 flex items-center gap-2 text-sm text-gray-500">

    <Link
      href="/products"
      className="transition hover:text-black"
    >
      Products
    </Link>

    <span>/</span>

    <span className="font-semibold text-black">
      My Profile
    </span>

  </div>

  {/* Profile Card */}

  <div className="rounded-3xl border bg-white p-8 shadow-lg">

    <div className="flex flex-col items-center gap-6 md:flex-row">

      {profile.avatar_url ? (

        <Image
          src={profile.avatar_url}
          alt="Profile"
          width={120}
          height={120}
          className="rounded-full border object-cover"
        />

      ) : (

        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-black text-4xl font-bold text-white">

          {(profile.full_name || profile.email || "U")
            .charAt(0)
            .toUpperCase()}

        </div>

      )}

      <div className="flex-1">

        <h1 className="text-4xl font-bold">

          {profile.full_name || "User"}

        </h1>

        <p className="mt-2 text-gray-500">

          {profile.email}

        </p>

        <p className="mt-1 text-sm text-gray-400">

          Role : {profile.role}

        </p>

      </div>

      {!editing && (

        <button
          onClick={() => setEditing(true)}
          className="rounded-xl bg-black px-6 py-3 text-white transition hover:scale-105"
        >
          Edit Profile
        </button>

      )}

    </div>

  </div>

  {/* Edit Form */}

  <div className="mt-8 rounded-3xl border bg-white p-8 shadow">

    {editing ? (

      <EditProfileForm
        profile={profile}
        onSave={(updated) => {
          setProfile(updated);
          setEditing(false);
        }}
        onCancel={() => setEditing(false)}
      />

    ) : (

      <>
        <h2 className="mb-6 text-2xl font-bold">
          Personal Information
        </h2>

        <div className="grid gap-6 md:grid-cols-2">

          <div>

            <p className="text-sm text-gray-500">
              Full Name
            </p>

            <p className="font-semibold">
              {profile.full_name || "-"}
            </p>

          </div>

          <div>

            <p className="text-sm text-gray-500">
              Phone
            </p>

            <p className="font-semibold">
              {profile.phone || "-"}
            </p>

          </div>

          <div>

            <p className="text-sm text-gray-500">
              Address
            </p>

            <p className="font-semibold">
              {profile.address || "-"}
            </p>

          </div>

          <div>

            <p className="text-sm text-gray-500">
              City
            </p>

            <p className="font-semibold">
              {profile.city || "-"}
            </p>

          </div>

          <div>

            <p className="text-sm text-gray-500">
              Pincode
            </p>

            <p className="font-semibold">
              {profile.pincode || "-"}
            </p>

          </div>

        </div>

      </>

    )}

  </div>

  {/* Account Actions */}

  <div className="mt-8 grid gap-5 md:grid-cols-3">

    <Link
      href="/orders/prevOrders"
      className="rounded-2xl border bg-white p-6 text-center shadow transition hover:-translate-y-1 hover:shadow-lg"
    >
      📦
      <h3 className="mt-3 font-semibold">
        My Orders
      </h3>
    </Link>

    <Link
      href="/wishlist"
      className="rounded-2xl border bg-white p-6 text-center shadow transition hover:-translate-y-1 hover:shadow-lg"
    >
      ❤️
      <h3 className="mt-3 font-semibold">
        Wishlist
      </h3>
    </Link>

    <Link
      href="/cart"
      className="rounded-2xl border bg-white p-6 text-center shadow transition hover:-translate-y-1 hover:shadow-lg"
    >
      🛒
      <h3 className="mt-3 font-semibold">
        Cart
      </h3>
    </Link>

  </div>

  <button
    onClick={handleLogout}
    className="mt-8 rounded-xl bg-red-500 px-8 py-3 text-white transition hover:bg-red-600"
  >
    Logout
  </button>

</main>
  );
}