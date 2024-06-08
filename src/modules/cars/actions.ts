import { TypedSupabaseClient } from 'src/common/types';

export function getAllCars(client: TypedSupabaseClient) {
  return client
    .from('vehicles')
    .select(
      'id, name, transmission, default_price, fuel_type, seating_capacity, model, type, displacement, fuel_capacity, power_transmission, image_url, license_plate, created_at, updated_at'
    )
    .throwOnError();
}

export function getCarVariantList(client: TypedSupabaseClient) {
  return client.from('vehicle_variants').select(`
    id, name, metadata_url, url,
    vehicle_variant_metadata(
      id, name, transmission, fuel_type, seating_capacity, model, type, displacement, fuel_capacity, power_transmission,
      vehicle_variant_images(
        url
      )
    )
  `);
}

export function getCarVariantMetadata(
  client: TypedSupabaseClient,
  variantId: string
) {
  return client
    .from('vehicle_variant_metadata')
    .select(
      `
    id, name, transmission, fuel_type, seating_capacity, model, type, displacement, fuel_capacity, power_transmission,
    vehicle_variant_images(
      url
    ) 
  `
    )
    .eq('vehicle_id', variantId)
    .maybeSingle();
}
