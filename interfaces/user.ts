
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

  logout: () => Promise<void>;
}