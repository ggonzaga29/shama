"use server";

import { createAdminClient } from "src/common/lib/supabase/server";

// TODO: Implement Pagination since the listUsers method only returns 100 users
export async function getAllUsers() {
  const supabase = createAdminClient();
  const { data, error } = await supabase.auth.admin.listUsers();
  
  if (error) {
    throw new Error(error.message);
  }

  return data;
}
