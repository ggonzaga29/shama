import { TypedSupabaseClient } from 'src/common/types';

export async function getAllDrivers(supabase: TypedSupabaseClient) {
  const { data, error } = await supabase.from('drivers').select();

  if (error || !data) {
    console.log(error);
    return [];
  }

  return data;
}

export async function getDriverById(supabase: TypedSupabaseClient, id: string) {
  const { data, error } = await supabase
    .from('drivers')
    .select(
      `
          *,
          driver_files (
            id,
            file_name,
            file_url
          )
        `
    )
    .eq('id', id)
    .single();

  if (error || !data) {
    console.log(error);
    return null;
  }

  return data;
}
