'use server';

import {
  createAdminClient,
  createClient,
} from 'src/common/lib/supabase/server';
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

/**
 * Returns the current user with their profile details
 */
export async function getCurrentUser() {
  try {
    const supabase = createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      throw new Error(error.message);
    }

    if (!user) {
      return null;
    }

    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    if (profileError) {
      throw new Error(profileError.message);
    }

    return {
      ...user,
      profile: profileData,
    };
  } catch (error: any) {
    throw new Error(`Failed to get current user: ${error.message}`);
  }
}

/**
 * Gets a user with their profile details
 */
export async function getUserWithProfile(uid: string) {
  try {
    const supabaseAdmin = createAdminClient();
    const supabase = createClient();

    const {
      data: { user },
      error: userError,
    } = await supabaseAdmin.auth.admin.getUserById(uid);

    if (userError) {
      throw new Error(userError.message);
    }

    // TODO: find a better way to get the profile, maybe a fucking join?

    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', uid)
      .maybeSingle();

    if (profileError) {
      throw new Error(profileError.message);
    }

    return { ...user, profile: profileData };
  } catch (error: any) {
    throw new Error(`Failed to get user with profile: ${error.message}`);
  }
}
