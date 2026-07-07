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
   const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password,
});

if (error) {
  alert(error.message);
  return;
}

const { data: profile } = await supabase
  .from("profiles")
  .select("role")
  .eq("id", data.user.id)
  .single();

onClose();

if (profile?.role === "admin") {
  router.push("/admin");
} else {
  router.push("/products");
}
    onClose();
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