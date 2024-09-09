import { SupabaseClient, User } from '@supabase/supabase-js';
import { Database } from 'src/common/types/supabase';
import { z } from 'zod';

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
export const uploadedFile = z.object({
  path: z.string(),
  id: z.string(),
  fullPath: z.string(),
});
export const uploadedFiles = z.array(uploadedFile);

export type UploadedFile = z.infer<typeof uploadedFile>;
export type UploadedFiles = z.infer<typeof uploadedFiles>;

export type OnUploadResponse =
  | { success: false; message: string; issues?: string[]; data: null }
  | { success: true; successMessage: string; data: UploadedFile };
