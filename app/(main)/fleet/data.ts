import { TypedSupabaseClient } from 'src/common/types';

export async function getAllCars(
  supabase: TypedSupabaseClient,
  limit?: number,
  searchField?: string,
  searchValue?: string
) {
  let query = supabase
    .from('vehicles')
    .select('*')
    .limit(limit || 100);

  if (searchField && searchValue) {
    query = query.ilike(searchField, `%${searchValue}%`);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCarById(supabase: TypedSupabaseClient, id: string) {
  const { data, error } = await supabase
    .from('vehicles')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCarVariantList(supabase: TypedSupabaseClient) {
  const { data, error } = await supabase.from('vehicle_variants').select(`  
    id, name, metadata_url, url,
    vehicle_variant_metadata(
      id, name, transmission, fuel_type, seating_capacity, model, type, displacement, fuel_capacity, power_transmission,
      vehicle_variant_images(
        url
      )
    )
  `);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCarVariantMetadata(
  supabase: TypedSupabaseClient,
  variantId: string
) {
  const { data, error } = await supabase
    .from('vehicle_variant_metadata')
    .select(
      `id, name, transmission, fuel_type, seating_capacity, model, type, displacement, fuel_capacity, power_transmission,
    vehicle_variant_images(
      url
    ) 
  `
    )
    .eq('vehicle_id', variantId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
