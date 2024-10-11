import { AuthError } from '@supabase/supabase-js';
import { TypedSupabaseClient } from 'src/common/types';

/**
 * Returns the current user with their profile details
 */
export async function getCurrentUser(supabase: TypedSupabaseClient) {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    if (error instanceof AuthError) {
      throw error;
    }
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

  // Get Current User Profile Avatar
  const { data: avatarData, error: avatarError } = await supabase
    .from('profile_avatars')
    .select('*')
    .eq('user_id', user.id)
    .eq('is_selected', true)
    .maybeSingle();

  if (avatarError) {
    console.error(avatarError);
  }

  if (!avatarData || !avatarData.path) {
    return {
      ...user,
      profile: profileData,
    };
  }

  return {
    ...user,
    profile: profileData,
    avatar: avatarData,
  };
}
