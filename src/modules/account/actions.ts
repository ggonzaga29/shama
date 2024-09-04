'use server';

import { createClient } from 'src/common/lib/supabase/server';
import { userDetailsSchema } from 'src/modules/account/schema';
import { v4 as uuidv4 } from 'uuid';
import { FormState } from 'src/components/FormRenderer';
import { OnUploadResponse, UploadedFile } from 'src/common/types';

export async function updateUserDetails(
  previousState: FormState,
  data: FormData
): Promise<FormState> {
  console.log('updateUserDetails');
  const supabase = createClient();

  const formData = Object.fromEntries(data);
  const parsedFormData = userDetailsSchema.safeParse(formData);

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

  const { first_name, last_name, gender, phone, address } = parsedFormData.data;

  const { error: userError } = await supabase
    .from('profiles')
    .update({
      first_name,
      last_name,
      gender,
      phone,
      address,
    })
    .eq('id', '631022ae-f19a-4b04-b193-0214ad16d451');

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
