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
      setLoading(false);
    }
    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return (
   <AuthContext.Provider
  value={{
    user,
    loading,
    logout,
    isAuthenticated,
  }}
>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);