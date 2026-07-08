import { supabase } from "./supabase";
import type { Profile } from "@/interfaces/user";

export async function getProfile(user: {
  id: string;
  email?: string;
}) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (error) throw error;

  if (!data) {
    const { data: newProfile, error: insertError } =
      await supabase
        .from("profiles")
        .insert({
          id: user.id,
          email: user.email,
          role: "user",
        })
        .select()
        .single();

    if (insertError) throw insertError;

    return newProfile;
  }

  return data;
}
export async function updateProfile(
  userId: string,
  profile: Partial<Profile>
) {
  const { error } = await supabase
    .from("profiles")
    .update({
      ...profile,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId);

  if (error) throw error;
}