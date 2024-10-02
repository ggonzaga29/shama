'use server';

import { authActionClient } from 'src/common/lib/safeActions';
import { createClient } from 'src/common/lib/supabase/server';
import { Driver } from 'src/common/types';
import { addDriverServerSchema } from 'src/modules/drivers/schema';
import { z } from 'zod';

export const getAllDrivers = authActionClient
  .metadata({
    actionName: 'getAllDrivers',
  })
  .outputSchema(z.array(z.custom<Driver>()))
  .action(async () => {
    const supabase = createClient();

    const { data, error } = await supabase.from('drivers').select();

    if (error || !data) {
      console.log(error);
      return [];
    }

    return data;
  });

export const getDriverList = authActionClient
  .metadata({
    actionName: 'getDriverList',
  })
  // .outputSchema(z.array(z.custom<>()))
  .action(async () => {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('drivers')
      .select('first_name, last_name, id');

    if (error || !data) {
      console.log(error);
      return [];
    }

    return data;
  });

export const getDriverById = authActionClient
  .metadata({
    actionName: 'getDriverById',
  })
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput: { id } }) => {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('drivers')
      .select()
      .eq('id', id)
      .single();

    if (error || !data) {
      console.log(error);
      return null;
    }

    return data;
  });

export const addDriver = authActionClient
  .metadata({
    actionName: 'addDriver',
    verboseLogging: true,
  })
  .schema(addDriverServerSchema)
  .action(async ({ parsedInput }) => {
    const supabase = createClient();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { avatar_file, ...rest } = parsedInput;
    console.log('File Upload', {
      ...rest,
      avatar_file,
    });

    // Convert Date to ISO string format
    const formattedInput = {
      ...rest,
      birth_date:
        parsedInput.birth_date instanceof Date
          ? parsedInput.birth_date.toISOString()
          : parsedInput.birth_date,
      license_expiry_date:
        parsedInput.license_expiry_date instanceof Date
          ? parsedInput.license_expiry_date.toISOString()
          : parsedInput.license_expiry_date,
    };

    // const { data: insertedDriver, error } = await supabase
    //   .from('drivers')
    //   .insert(formattedInput)
    //   .select()
    //   .maybeSingle();

    // if (error || !insertedDriver) {
    //   console.log(error);
    //   return null;
    // }

    // if (avatar_file) {
    //   uploadToBucket({
    //     bucketName: 'driver_avatars',
    //     file: avatar_file as File,
    //     upsert: false,
    //     randomizeFilename: true,
    //     randomizedNamePrefix: 'driver_avatar',
    //     onFileUploaded: async (file) => {
    //       await supabase
    //         .from('drivers')
    //         .update({ avatar_url: file.path })
    //         .eq('id', insertedDriver.id);
    //     },
    //   });
    // }

    return {
      success: true,
    };
  });
