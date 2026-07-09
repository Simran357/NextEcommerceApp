"use client";

import AuthForm from "@/components/auth/authForm"
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import type { LoginModalProps } from "@/interfaces/user"
export default function LoginModal({
  onClose,
  openSignup,
}: LoginModalProps) {
  const router = useRouter();
  const handleLogin = async (
  email: string,
  password: string
) => {
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

  const { data: profile, error: profileError } =
    await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .maybeSingle();

  if (profileError) {
    alert(profileError.message);
    return;
  }

  // ADMIN LOGIN FROM USER MODAL
  if (profile?.role === "admin") {
    await supabase.auth.signOut();

    onClose();

    alert("Please login through the Admin Portal.");

    router.replace("/admin");

    return;
  }

  // USER PROFILE DOESN'T EXIST
  if (!profile) {
    const { error } = await supabase
      .from("profiles")
      .insert({
        id: data.user.id,
        email: data.user.email,
        role: "user",
      });

    if (error) {
      alert(error.message);
      return;
    }
  }

  onClose();

  router.replace("/products");
};

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div
        className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
        onClick={onClose}>
        <div
          onClick={(e) => e.stopPropagation()}>
          <AuthForm
            title="Login"
            buttonText="Login"
            onSubmit={handleLogin}
            changeForm={openSignup}
          />
        </div>

      </div>


    </div>
  );
}