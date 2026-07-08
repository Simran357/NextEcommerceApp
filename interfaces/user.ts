
import type { User } from "@supabase/supabase-js";
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
  user: User | null;
role: "user" | "admin";
  loading: boolean;
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

export interface adminDashboardProps{

title:string;

value:string|number;

icon:string;

}