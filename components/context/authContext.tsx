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
  const [roleLoading, setRoleLoading] = useState(true);
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
  setRoleLoading(true);

  const { data } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", session.user.id)
    .single();

  setRole(data?.role ?? "user");
  setRoleLoading(false);
} else {
  setRole("user");
  setRoleLoading(false);
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
    role,
    loading,
    roleLoading,
    logout,
    isAuthenticated,
  }}
>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);