'use server';

import { createClient } from 'src/common/lib/supabase/server';
import { FormState } from 'src/components/FormRenderer';

export async function submitClientForm(
  previousState: FormState,
  data: FormData
): Promise<FormState> {
  console.log(data);
  return {
    success: true,
    successMessage: 'Successfully added client',
  };
}
