import { SupabaseClient, User } from '@supabase/supabase-js';
import { Database } from 'src/common/types/supabase';

// Abstract the types from the supabase client
export type Car = Database['public']['Tables']['vehicles']['Row'];
export type CarVariant =
  Database['public']['Tables']['vehicle_variants']['Row'];
export type CarVariantMetadata =
  Database['public']['Tables']['vehicle_variant_metadata']['Row'];
export type CarVariantImage =
  Database['public']['Tables']['vehicle_variant_images']['Row'];
export type FullCarVariant = CarVariant & {
  vehicle_variant_metadata: Partial<CarVariantMetadata> &
    {
      vehicle_variant_images: Partial<CarVariantImage>[];
    }[];
};
export type Driver = Database['public']['Tables']['drivers']['Row'];
export type UserProfile = Database['public']['Tables']['profiles']['Row'];
export type Client = Database['public']['Tables']['clients']['Row'];

export type UserWithProfile = User & {
  profile: Database['public']['Tables']['profiles']['Row'] | null;
};

export type TypedSupabaseClient = SupabaseClient<Database>;

// Upload types
export type UploadedFile = {
  path: string;
  id: string;
  fullPath: string;
};

export type OnUploadResponse =
  | { success: false; message: string; issues?: string[] }
  | { success: true; successMessage: string; data: UploadedFile };

