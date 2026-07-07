"use client";

import AuthForm from "@/components/auth/authForm"
import { supabase } from "@/lib/supabase";
import type { LoginModalProps } from "@/interfaces/user"
export default function LoginModal({
  onClose,
  openSignup,
}: LoginModalProps) {
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