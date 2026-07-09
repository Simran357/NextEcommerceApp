"use client";

import AuthForm from "@/components/auth/authForm";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();

  async function handleLogin(
    email: string,
    password: string
  ) {
    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      alert(error.message);
      return;
    }

    if (!data.user) return;

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    if (profile?.role !== "admin") {
      await supabase.auth.signOut();
      alert("Only admins can login here.");
      return;
    }

    router.replace("/admin/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <AuthForm
        title="Admin Login"
        buttonText="Admin Login"
        onSubmit={handleLogin}
        changeForm={() => {}}
      />
    </div>
  );
}