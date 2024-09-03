'use server';

import { createClient } from 'src/common/lib/supabase/server';
import { FormState } from 'src/components/FormRenderer';
import { clientFormSchema } from 'src/modules/clients/schema';
import { mapHookFormErrorsToZodIssues } from 'src/common/utils/formUtils';
import { revalidatePath } from 'next/cache';

export async function submitClientForm(
  previousState: FormState,
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data);
  console.log(formData);
  const parsedFormData = clientFormSchema.safeParse(formData);
  const supabase = createClient();

  if (!parsedFormData.success) {
    const fields = mapHookFormErrorsToZodIssues(data);
    console.log(parsedFormData.error.issues);
    console.log(fields);

    return {
      message: 'Invalid form data',
      fields,
      issues: parsedFormData.error.issues.map((issue) => issue.message),
    };
  }

  console.log(parsedFormData.data);
  const { name, email, phone, customer_type, notes } = parsedFormData.data;

  const { error } = await supabase.from('clients').insert({
    name,
    email,
    phone,
    customer_type,
    notes,
  });

  if (error) {
    return {
      message: 'Failed to add client',
      issues: [error.message],
    };
  }

  revalidatePath('/clients');

  return {
    success: true,
    successMessage: 'Successfully added client',
  };
}
