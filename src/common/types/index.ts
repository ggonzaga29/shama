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

export type Avatar = Database['public']['Tables']['profile_avatars']['Row'];

export type UserWithProfileAndAvatar = User & {
  profile: Database['public']['Tables']['profiles']['Row'] | null;
  avatar?: Avatar | null;
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

export const fileInputAcceptSchema = z.enum([
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/*',
  'video/mp4',
  'video/mpeg',
  'video/*',
  'audio/mpeg',
  'audio/wav',
  'audio/*',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'text/plain',
  'text/csv',
  '.jpeg',
  '.jpg',
  '.png',
  '.webp',
  '.mp4',
  '.mpeg',
  '.mp3',
  '.wav',
  '.pdf',
  '.doc',
  '.docx',
  '.xls',
  '.xlsx',
  '.ppt',
  '.pptx',
  '.txt',
  '.csv',
]);

export type FileInputAcceptType = z.infer<typeof fileInputAcceptSchema>;
