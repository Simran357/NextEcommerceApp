import { supabase } from "./supabase";

export async function getUsers() {
  const { data, error } = await supabase
    .from("profiles")
    .select("*");

  if (error) throw error;

  return data ?? [];
}

export async function deleteUser(id: string) {
  const { error } = await supabase
    .from("users")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

export async function updateUserRole(
  id: string,
  role: "user" | "admin"
) {
  const { error } = await supabase
    .from("profiles")
    .update({ role })
    .eq("id", id);

  if (error) throw error;
}