import { User } from '@supabase/supabase-js';
import { Database } from 'src/common/types/supabase';

export type UserWithProfile = User & {
  profile: Database['public']['Tables']['profiles']['Row'] | null;
};
