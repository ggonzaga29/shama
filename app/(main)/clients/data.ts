import { TypedSupabaseClient } from 'src/common/types';

export async function getPersonalClientsBySearch(
  supabase: TypedSupabaseClient,
  columns: string[],
  search: string,
  limit?: number
) {
  const orQuery = columns
    .map((column) => `${column}.ilike.%${search}%`)
    .join(',');
  const { data, error } = await supabase
    .from('personal_clients')
    .select('*')
    .or(orQuery)
    .limit(limit || 10);

  if (error || !data) {
    console.log(error);
    return [];
  }

  return data;
}
