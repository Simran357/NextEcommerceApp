"use client";

import AuthForm from "@/components/auth/authForm";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
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

if (profile?.role === "admin") {
  router.push("/admin");
} else {
  router.push("/products");
}

  
    alert("Login Successful");
    router.push("/products");
  };

  return (
    
   <AuthForm
  title="Login"
  buttonText="Login"
  onSubmit={handleLogin}
  changeForm={() => router.push("/signup")}
/>
  );
}