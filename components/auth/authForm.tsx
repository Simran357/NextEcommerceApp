"use client";

import { useState } from "react";
import type { AuthFormProps } from "@/interfaces/product";

export default function AuthForm({
  title,
  buttonText,
  onSubmit,
  changeForm,
  showSwitch = true,
}: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isLogin = title === "Login";

 return (
  <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-10 shadow-2xl">
    <div className="mb-8 text-center">
      <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-blue-600 shadow-lg">
        <span className="text-3xl text-white">🛍️</span>
      </div>

      <h1 className="text-3xl font-bold text-slate-900">
        {title}
      </h1>

      <p className="mt-2 text-slate-500">
        {title === "Admin Login"
          ? "Sign in to access your admin dashboard."
          : isLogin
          ? "Welcome back! Sign in to continue shopping."
          : "Create your account and start shopping today."}
      </p>
    </div>

    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(email, password);
      }}
      className="space-y-5"
    >
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Email Address
        </label>

        <input
          type="email"
          autoComplete="email"
          placeholder="Enter your email"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Password
        </label>

        <input
          type="password"
          autoComplete={
            isLogin
              ? "current-password"
              : "new-password"
          }
          placeholder="Enter your password"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 py-3 text-lg font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:shadow-xl"
      >
        {buttonText}
      </button>
    </form>

    {showSwitch && (
      <div className="mt-8 border-t border-slate-200 pt-6 text-center text-sm text-slate-500">
        {isLogin ? (
          <>
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={changeForm}
              className="font-semibold text-indigo-600 transition hover:text-indigo-800 hover:underline"
            >
              Create Account
            </button>
          </>
        ) : (
          <>
            {/* Already have an account?{" "}
            <button
              type="button"
              onClick={changeForm}
              className="font-semibold text-indigo-600 transition hover:text-indigo-800 hover:underline"
            >
              Login
            </button> */}
          </>
        )}
      </div>
    )}
  </div>
);
}