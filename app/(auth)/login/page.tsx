"use client";

import AuthForm from "@/components/auth/authForm";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Login Successful");
    router.push("/products");
  };

  return (
    <AuthForm
      title="Login"
      buttonText="Login"
      onSubmit={handleLogin}
    />
  );
}