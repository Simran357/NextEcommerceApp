// interfaces/user.ts

import type { ReactNode } from "react";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export interface Profile {
  id: string;
  email: string;
  role: "user" | "admin";
  full_name: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  pincode: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string | null;
}

export interface AuthContextType {
  user: SupabaseUser | null;
  role: "user" | "admin";
  loading: boolean;
  roleLoading: boolean;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
}

export interface LoginModalProps {
  onClose: () => void;
  openSignup: () => void;
}

export interface SignupModalProps {
  onClose: () => void;
  openLogin: () => void;
}

export interface AdminUser {
  id: string;
  full_name: string | null;
  email: string;
  role: "user" | "admin";
  city: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface UserGridProps {
  users: AdminUser[];
}

export interface AdminDashboardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
}