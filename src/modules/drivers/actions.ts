'use server';

import { authActionClient } from 'src/common/lib/safeActions';
import { createClient } from 'src/common/lib/supabase/server';

export const getAllDrivers = authActionClient
  .metadata({
    actionName: 'getAllDrivers',
  })
  .action(async () => {
    const supabase = createClient();

    const { data, error } = await supabase.from('drivers').select();

    if (error || !data) {
      console.log(error);
      return [];
    }

    return data;
  });
