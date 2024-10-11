'use server';

import { revalidatePath } from 'next/cache';
import { uploadToBucket } from 'src/common/lib/actions/uploadToBucket';
import { authActionClient } from 'src/common/lib/safeActions';
import { createServerClient } from 'src/common/lib/supabase/serverClient';
import { FormState } from 'src/components/FormRenderer/types';
import { addCarSchema, carFormSchema } from 'src/modules/cars/schema';
import { z } from 'zod';

export async function getAllCars() {
  const supabase = createServerClient();
  const { data, error } = await supabase.from('vehicles').select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCarVariantList() {
  const supabase = createServerClient();
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

export async function getCarVariantMetadata(variantId: string) {
  const supabase = createServerClient();
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

export async function submitCarForm(
  previousState: FormState,
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsedFormData = carFormSchema.safeParse(formData);
  const supabase = createServerClient();

  if (!parsedFormData.success) {
    const fields: Record<string, string> = {};
    for (const key of Object.keys(formData)) {
      fields[key] = formData[key].toString();
    }

    console.log(parsedFormData.error.issues);

    return {
      message: 'Invalid form data',
      fields,
      issues: parsedFormData.error.issues.map((issue) => issue.message),
    };
  }

  const { error: vehicleError } = await supabase.from('vehicles').insert({
    name: parsedFormData.data.name,
    default_price: parsedFormData.data.default_price,
    license_plate: parsedFormData.data.license_plate,
    transmission: parsedFormData.data.transmission,
    fuel_type: parsedFormData.data.fuel_type,
    seating_capacity: parsedFormData.data.seating_capacity,
    model: parsedFormData.data.model,
    type: parsedFormData.data.type,
    displacement: parsedFormData.data.displacement,
    fuel_capacity: parsedFormData.data.fuel_capacity,
    power_transmission: parsedFormData.data.power_transmission,
    tires: parsedFormData.data.tires,
    wheels: parsedFormData.data.wheels,
    image_url: parsedFormData.data.image_url,
  });

  if (vehicleError) {
    return {
      message: 'Failed to add vehicle',
      issues: [vehicleError.message],
    };
  }

  revalidatePath('/fleet');

  return {
    success: true,
    successMessage: 'Successfully added vehicle',
  };
}

export const addCar = authActionClient
  .metadata({
    actionName: 'addCar',
    verboseLogging: true,
  })
  .schema(addCarSchema)
  .action(async ({ parsedInput }) => {
    const supabase = createServerClient();
    const { image, ...rest } = parsedInput;

    const { data: insertedCar, error } = await supabase
      .from('vehicles')
      .insert(rest)
      .select()
      .maybeSingle();

    if (error || !insertedCar) {
      console.error(error);
      return null;
    }

    if (image && image instanceof File) {
      uploadToBucket({
        bucketName: 'cars',
        file: image,
        upsert: true,
        onFileUploaded: async (file) => {
          await supabase
            .from('vehicles')
            .update({ image_url: file.path })
            .eq('id', insertedCar.id);
        },
      });
    }

    revalidatePath('/fleet');
    return {
      success: true,
    };
  });

export const deleteCar = authActionClient
  .metadata({
    actionName: 'deleteCar',
  })
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput: { id } }) => {
    const supabase = createServerClient();
    const { error } = await supabase.from('vehicles').delete().eq('id', id);

    if (error) {
      console.error(error);
      return null;
    }

    revalidatePath('/fleet');
    return {
      success: true,
    };
  });
