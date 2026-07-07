"use client";

import AuthForm from "@/components/auth/authForm";
import { SignupModalProps } from "@/interfaces/user";
import { supabase } from "@/lib/supabase";

export default function SignupModal({
  onClose,
  openLogin,
}: SignupModalProps) {

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
      <div
        className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
        onClick={onClose}>
        <div
          onClick={(e) => e.stopPropagation()}>
          <AuthForm
            title="Sign Up"
            buttonText="Create Account"
            onSubmit={handleSignup}
            changeForm={openLogin}
          />
        </div>
      </div>
    </div>
  );
}