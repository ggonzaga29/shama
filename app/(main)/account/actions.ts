'use server';

import { userAvatarSchema, userDetailsSchema } from 'app/account/schema';
import { revalidatePath } from 'next/cache';
import { uploadToBucket } from 'src/common/lib/actions/uploadToBucket';
import { actionClient } from 'src/common/lib/safeActions';
import { createServerClient } from 'src/common/lib/supabase/serverClient';
import { OnUploadResponse, UploadedFile } from 'src/common/types';
import { FormState } from 'src/components/FormRenderer/types';
import { v4 as uuidv4 } from 'uuid';

export const updateUserDetails = actionClient
  .schema(userDetailsSchema)
  .action(async ({ parsedInput }) => {
    const supabase = createServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return;
    }

    const { error } = await supabase
      .from('profiles')
      .update(parsedInput)
      .eq('id', user.id);
    console.log('Action Running');

    if (error) {
      console.log(error);
    }
  });

export const uploadAvatar = async (
  formData: FormData
): Promise<OnUploadResponse> => {
  const supabase = createServerClient();
  const file = formData.get('file') as File;

  const { data, error } = await supabase.storage
    .from('avatars')
    .upload(`avatar_${uuidv4()}.png`, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    console.error(error);
    return {
      success: false,
      message: 'Failed to upload avatar',
      issues: [error.message],
      data: null,
    };
  }

  return {
    success: true,
    successMessage: 'Avatar uploaded successfully',
    data: data as UploadedFile,
  };
};

export const submitAvatarForm = async (
  previousState: FormState,
  data: FormData
): Promise<FormState> => {
  const formData = Object.fromEntries(data);
  console.log(formData);
  const supabase = createServerClient();
  const parsedFormData = userAvatarSchema.safeParse(formData);

  if (!parsedFormData.success) {
    const fields: Record<string, string> = {};
    for (const key of Object.keys(formData)) {
      fields[key] = formData[key].toString();
    }

    return {
      message: 'Invalid form data',
      fields,
      issues: parsedFormData.error.issues.map((issue) => issue.message),
    };
  }

  const file = parsedFormData.data.avatar;

  // If validation success, check if file is empty, size is too large, or type is invalid
  if (file.size === 0) {
    return {
      message: 'Invalid file',
      issues: ['File is empty'],
    };
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    return {
      message: 'Failed to fetch user',
      issues: [userError.message],
    };
  }

  if (!user) {
    return {
      message: 'User not found',
      issues: ['User not found'],
    };
  }

  // Upload the avatar to profile_avatars

  try {
    uploadToBucket({
      bucketName: 'avatars',
      file,
      upsert: false,
      randomizeFilename: true,
      randomizedNamePrefix: 'avatar',
      onFileUploaded: async ({ path }) => {
        await supabase
          .from('profile_avatars')
          .update({ is_selected: false })
          .eq('user_id', user.id);

        const { error: profileAvatarError } = await supabase
          .from('profile_avatars')
          .insert({
            user_id: user.id,
            path: path,
            is_selected: true,
          });

        if (profileAvatarError) {
          throw new Error(profileAvatarError.message);
        }
      },
    });
  } catch (error) {
    console.error('Error Submitting avatar: ', error);
    return {
      message: 'Failed to upload avatar',
    };
  }

  revalidatePath('/account');

  return {
    success: true,
    successMessage: 'Avatar updated successfully',
  };
};
