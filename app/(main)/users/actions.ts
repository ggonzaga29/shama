'use server';

import { createAdminClient } from 'src/common/lib/supabase/adminClient';
import { TypedSupabaseClient } from 'src/common/types';

// TODO: Implement Pagination since the listUsers method only returns 100 users
export async function getAllUsers(client: TypedSupabaseClient) {
  return client.auth.admin.listUsers();
}

export async function getUser(uid: string) {
  const supabase = createAdminClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.admin.getUserById(uid);

  if (error) {
    throw new Error(error.message);
  }

  return user;
}

export async function getCurrentUserWithProfile(supabase: TypedSupabaseClient) {
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (!user || userError) {
      return null;
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    if (!profile || profileError) {
      return null;
    }

    return { ...user, profile };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    console.error(e);
    return null;
  }
}
