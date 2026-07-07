"use client";

import AuthForm from "@/components/auth/authForm";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();

  const handleSignup = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Account Created Successfully");
    router.push("/login");
  };

  return (
    <AuthForm
      title="Sign Up"
      buttonText="Create Account"
      onSubmit={handleSignup}
    />
  );
}