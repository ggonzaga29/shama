import { TypedSupabaseClient } from 'src/common/types';

/**
 * Checks if there's an overlap between existing bookings and a proposed new booking for a specific vehicle.
 *
 * This function queries the 'bookings' table and its associated 'booking_vehicles' table to determine
 * if the specified vehicle is already booked during the given time period. It considers three possible
 * overlap scenarios:
 * 1. The new booking starts before an existing booking ends and ends after the existing booking starts.
 * 2. The new booking starts during an existing booking.
 * 3. The new booking completely encompasses an existing booking.
 *
 * @returns A Promise that resolves to a boolean. True if there's an overlap, false otherwise.
 * @throws Will throw an error if the database query fails.
 */
export async function checkVehicleBookingOverlap(
  supabase: TypedSupabaseClient,
  vehicleId: number,
  newPickupDatetime: string,
  newDropoffDatetime: string
): Promise<boolean> {
  const { data, error } = await supabase
    .from('bookings')
    .select(
      `
      id,
      pickup_datetime,
      dropoff_datetime,
      booking_vehicles!inner(vehicle_id)
    `
    )
    .eq('booking_vehicles.vehicle_id', vehicleId)
    .or(`and(pickup_datetime.lt.${newDropoffDatetime},dropoff_datetime.gt.${newPickupDatetime}),
         and(pickup_datetime.lt.${newPickupDatetime},dropoff_datetime.gt.${newPickupDatetime}),
         and(pickup_datetime.gte.${newPickupDatetime},dropoff_datetime.lte.${newDropoffDatetime})`);

  if (error) {
    console.error('Error checking vehicle booking overlap:', error);
    throw error;
  }

  return (data?.length ?? 0) > 0;
}
