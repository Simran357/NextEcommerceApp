
import type { User } from "@supabase/supabase-js";
export interface Profile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
}

export interface AuthContextType {
  user: User | null;

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