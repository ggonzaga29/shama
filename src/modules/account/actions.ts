'use server';

import { createClient } from 'src/common/lib/supabase/server';
import {
  userDetailsSchema,
  UserDetailsSchema,
} from 'src/modules/account/schema';
import { FormState } from 'src/components/FormRenderer';
import { revalidatePath } from 'next/cache';

export async function updateUserDetails(
  previousState: FormState,
  data: FormData
): Promise<FormState> {
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

  const { data: userData, error: userError } = await supabase
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
  }
}
