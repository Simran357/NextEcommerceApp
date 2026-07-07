"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import type {AuthContextType} from "@/interfaces/user"
const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<"user" | "admin">("user");
const isAuthenticated = !!user;
const logout = async () => {
  await supabase.auth.signOut();
};
useEffect(() => {
 async function getSession() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  setUser(session?.user ?? null);

  if (session?.user) {
    const { data } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", session.user.id)
      .single();

    setRole(data?.role ?? "user");
  }

  setLoading(false);
}

  getSession();

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(
  async (_event, session) => {

    setUser(session?.user ?? null);

    if (session?.user) {
      const { data } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      setRole(data?.role ?? "user");
    } else {
      setRole("user");
    }
  }
);

  return () => subscription.unsubscribe();
}, []);
  return (
   <AuthContext.Provider
  value={{
    user,
    loading,
    role,
    logout,
    isAuthenticated,
  }}
>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);