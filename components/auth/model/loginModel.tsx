"use client";

import AuthForm from "@/components/auth/authForm"
import { supabase } from "@/lib/supabase";

interface Props {
  onClose: () => void;
  openSignup: () => void;
}

export default function LoginModal({
  onClose,
  openSignup,
}: Props) {
  const handleLogin = async (
    email: string,
    password: string
  ) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <AuthForm
        title="Login"
        buttonText="Login"
        onSubmit={handleLogin}
        changeForm={openSignup}
      />

    </div>
  );
}