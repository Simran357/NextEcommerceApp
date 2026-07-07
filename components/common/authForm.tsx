"use client";

import Link from "next/link";
import { useState } from "react";
import type { AuthFormProps } from "@/interfaces/user";

export default function AuthForm({
  title,
  buttonText,
  onSubmit,
}: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isLogin = title === "Login";

  return (
    <div className="bg-white w-[400px] rounded-xl shadow-lg p-8">
      <h1 className="text-3xl font-bold text-center text-blue-600">
        ShopEase
      </h1>

      <p className="text-center text-gray-500 mt-2 mb-6">
        {isLogin ? "Welcome Back" : "Create Your Account"}
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(email, password);
        }}
        className="space-y-4"
      >
        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded-lg p-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-lg p-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-600 text-white rounded-lg p-3">
          {buttonText}
        </button>
      </form>

      <p className="text-center mt-5">
        {isLogin ? (
          <>
Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-blue-600 font-semibold">
              Sign Up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 font-semibold">
              Login
            </Link>
          </>
        )}
      </p>
    </div>
  );
}