'use server';

import { clientFormSchema, personalClientFormSchema } from 'app/clients/schema';
import { actionClient } from 'src/common/lib/safeActions';
import { createServerClient } from 'src/common/lib/supabase/serverClient';
import { mapHookFormErrorsToZodIssues } from 'src/common/utils/formUtils';
import { getUserRequestMetadata } from 'src/common/utils/serverActionUtils';
import { FormState } from 'src/components/FormRenderer/types';

export async function submitClientForm(
  previousState: FormState,
  data: FormData
): Promise<FormState> {
  const supabase = createServerClient();
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

  return {
    success: true,
    successMessage: 'Successfully added client',
  };
}

export async function getClients() {
  const supabase = createServerClient();
  const { data, error } = await supabase.from('clients').select();

  if (error) {
    console.error('Failed to fetch clients', error.message);
    return [];
  }

  return data;
}

export async function getPersonalClients() {
  const supabase = createServerClient();

  const { data, error } = await supabase.from('personal_clients').select();

  if (error) {
    console.error('Failed to fetch personal clients', error.message);
    return [];
  }

  return data;
}

export async function getBusinessClients() {
  const supabase = createServerClient();

  const { data, error } = await supabase.from('business_clients').select();

  if (error) {
    console.error('Failed to fetch business clients', error.message);
    return [];
  }

  return data;
}

export async function getPersonalClientsCSV() {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('personal_clients')
    .select()
    .csv();

  if (error) {
    console.error('Failed to fetch personal clients', error.message);
    return [];
  }

  return data;
}

export async function getBusinessClientsCSV() {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('business_clients')
    .select()
    .csv();

  if (error) {
    console.error('Failed to fetch business clients', error.message);
    return [];
  }

  return data;
}

export const addPersonalClient = actionClient
  .schema(personalClientFormSchema)
  .action(async ({ parsedInput }) => {
    const supabase = createServerClient();

    // Convert Date to ISO string format
    const formattedDateOfBirth =
      parsedInput.date_of_birth instanceof Date
        ? parsedInput.date_of_birth.toISOString()
        : parsedInput.date_of_birth;

    const { data, error } = await supabase
      .from('personal_clients')
      .insert({
        ...parsedInput,
        date_of_birth: formattedDateOfBirth,
      })
      .select();

    if (error) {
      console.error('Error inserting data:', error);
      return { successful: false, error: error.message };
    }

    return {
      successful: true,
      data,
    };
  });
