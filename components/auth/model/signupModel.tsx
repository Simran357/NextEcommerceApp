"use client";

import AuthForm from "@/components/auth/authForm";
import { supabase } from "@/lib/supabase";

interface Props {
  onClose: () => void;
  openLogin: () => void;
}

export default function SignupModal({
  onClose,
  openLogin,
}: Props) {

  const handleSignup = async (
    email: string,
    password: string
  ) => {

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Account Created");

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <AuthForm
        title="Sign Up"
        buttonText="Create Account"
        onSubmit={handleSignup}
        changeForm={openLogin}
      />

    </div>
  );
}