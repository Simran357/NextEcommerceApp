"use client";

import { useState } from "react";
import { updateProfile } from "@/lib/profile";
import { useAuth } from "@/components/context/authContext";
import type { Profile } from "@/interfaces/user";

interface EditProfileFormProps {
  profile: Profile;
  onSave: (profile: Profile) => void;
  onCancel: () => void;
}

export default function EditProfileForm({
  profile,
  onSave,
  onCancel,
}: EditProfileFormProps) {
  const { user } = useAuth();

  const [form, setForm] = useState({
    full_name: profile.full_name ?? "",
    phone: profile.phone ?? "",
    address: profile.address ?? "",
    city: profile.city ?? "",
    pincode: profile.pincode ?? "",
    avatar_url: profile.avatar_url ?? "",
  });

  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!user) return;

    setLoading(true);

    try {
      await updateProfile(user.id, form);

      onSave({
        ...profile,
        ...form,
        updated_at: new Date().toISOString(),
      });
    } catch (error) {
      console.error(error);
      alert("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <input
        value={form.full_name}
        onChange={(e) =>
          setForm({
            ...form,
            full_name: e.target.value,
          })
        }
        placeholder="Full Name"
        className="w-full rounded-xl border p-3"
      />

      <input
        value={form.phone}
        onChange={(e) =>
          setForm({
            ...form,
            phone: e.target.value,
          })
        }
        placeholder="Phone"
        className="w-full rounded-xl border p-3"
      />

      <input
        value={form.address}
        onChange={(e) =>
          setForm({
            ...form,
            address: e.target.value,
          })
        }
        placeholder="Address"
        className="w-full rounded-xl border p-3"
      />

      <input
        value={form.city}
        onChange={(e) =>
          setForm({
            ...form,
            city: e.target.value,
          })
        }
        placeholder="City"
        className="w-full rounded-xl border p-3"
      />

      <input
        value={form.pincode}
        onChange={(e) =>
          setForm({
            ...form,
            pincode: e.target.value,
          })
        }
        placeholder="Pincode"
        className="w-full rounded-xl border p-3"
      />

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-black px-6 py-3 text-white"
        >
          {loading ? "Saving..." : "Save"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border px-6 py-3"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}