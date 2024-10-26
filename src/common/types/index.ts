import { SupabaseClient, User } from '@supabase/supabase-js';
import { Database } from 'src/common/types/supabase';
import { z } from 'zod';

export type TypedSupabaseClient = SupabaseClient<Database>;
export type Table<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];

// Abstract the types from the supabase client
export type Car = Table<'vehicles'>;
export type CarVariant = Table<'vehicle_variants'>;
export type CarVariantMetadata = Table<'vehicle_variant_metadata'>;
export type CarVariantImage =
  Database['public']['Tables']['vehicle_variant_images']['Row'];
export type FullCarVariant = CarVariant & {
  vehicle_variant_metadata: Partial<CarVariantMetadata> &
    {
      vehicle_variant_images: Partial<CarVariantImage>[];
    }[];
};
export type Driver = Table<'drivers'>;
export type DriverFiles = Table<'driver_files'>;
export type UserProfile = Table<'profiles'>;
export type Client = Table<'clients'>;
export type PersonalClient = Table<'personal_clients'>;
export type PersonalClientInsert = Omit<PersonalClient, 'id'>;
export type BusinessClient = Table<'business_clients'>;
export type Avatar = Table<'profile_avatars'>;

export type UserWithProfileAndAvatar = User & {
  profile: UserProfile | null;
  avatar?: Avatar | null;
};

// Enums
export type Enum<T extends keyof Database['public']['Enums']> =
  Database['public']['Enums'][T];

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
export type NullToUndefined<T> = {
  [P in keyof T]: T[P] extends null ? undefined : T[P];
};
