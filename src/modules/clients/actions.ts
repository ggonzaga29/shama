'use server';

import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { createClient } from 'src/common/lib/supabase/server';
import { mapHookFormErrorsToZodIssues } from 'src/common/utils/formUtils';
import { FormState } from 'src/components/FormRenderer/types';
import { clientFormSchema } from 'src/modules/clients/schema';
import { getUserRequestMetadata } from 'src/common/utils/serverActionUtils';

export async function submitClientForm(
  previousState: FormState,
  data: FormData
): Promise<FormState> {
  const supabase = createClient();
  const formData = Object.fromEntries(data);
  const parsedFormData = clientFormSchema.safeParse(formData);
  const metadata = await getUserRequestMetadata();

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

  const { data: clientData, error } = await supabase
    .from('clients')
    .insert({
      name,
      email,
      phone,
      customer_type,
      notes,
    })
    .select()
    .single();

  const currentUser = await supabase.auth.getUser();
  const { error: crudLogInsertError } = await supabase
    .from('crud_logs')
    .insert({
      user_id: currentUser.data?.user?.id,
      table_name: 'clients',
      record_id: clientData?.id,
      action: 'CREATE',
      metadata: JSON.stringify(metadata),
      timestamp: new Date().toISOString(),
    });

  if (crudLogInsertError) {
    console.error('Failed to insert crud log', crudLogInsertError.message);
  }

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
