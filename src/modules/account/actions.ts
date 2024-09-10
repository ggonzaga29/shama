'use server';

import { createClient } from 'src/common/lib/supabase/server';
import {
  OnUploadResponse,
  UploadedFile,
  UploadedFiles,
} from 'src/common/types';
import { FormState } from 'src/components/FormRenderer/types';
import {
  userAvatarSchema,
  userDetailsSchema,
} from 'src/modules/account/schema';
import { v4 as uuidv4 } from 'uuid';

export async function updateUserDetails(
  previousState: FormState,
  data: FormData
): Promise<FormState> {
  console.log('updateUserDetails');
  const supabase = createClient();

  const formData = Object.fromEntries(data);
  const parsedFormData = userDetailsSchema.safeParse(formData);

  console.log('formData', formData);

  if (!parsedFormData.success) {
    const fields: Record<string, string> = {};
    for (const key of Object.keys(formData)) {
      fields[key] = formData[key].toString();
    }

    console.log(parsedFormData.error.issues);

    return {
      message: 'Invalid form data',
      fields,
      issues: parsedFormData.error.issues.map((issue) => issue.message),
    };
  }

  const { user_id, first_name, last_name, gender, phone, address } =
    parsedFormData.data;

  const { error: userError } = await supabase
    .from('profiles')
    .update({
      first_name,
      last_name,
      gender,
      phone,
      address,
    })
    .eq('id', user_id);

  if (userError) {
    return {
      message: 'Failed to add vehicle',
      issues: [userError.message],
    };
  }

  return {
    success: true,
    successMessage: 'User details updated successfully',
  };
}

export const uploadAvatar = async (
  formData: FormData
): Promise<OnUploadResponse> => {
  const supabase = createClient();
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
  const supabase = createClient();
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

  const { data: currentUser, error } = await supabase.auth.getUser();

  if (error || !currentUser) {
    return {
      message: 'Failed to fetch user',
      issues: [error ? error.message : 'No user found'],
    };
  }

  const { error: userError } = await supabase
    .from('profiles')
    .update({
      avatar: parsedFormData.data.avatar,
    })
    .eq('id', currentUser.user?.id);

  if (userError) {
    return {
      message: 'Failed to update avatar',
      issues: [userError.message],
    };
  }

  return {
    success: true,
    successMessage: 'Avatar updated successfully',
  };
};
