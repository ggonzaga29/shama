'use server';

import { revalidatePath } from 'next/cache';
import { uploadToBucket } from 'src/common/lib/actions/uploadToBucket';
import { authActionClient } from 'src/common/lib/safeActions';
import { createClient } from 'src/common/lib/supabase/server';
import { Driver } from 'src/common/types';
import { addDriverSchema, editDriverSchema } from 'src/modules/drivers/schema';
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
  .action(async () => {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('drivers')
      .select('first_name, last_name, id, avatar_url');

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
  });

export const editDriver = authActionClient
  .metadata({
    actionName: 'addDriver',
    verboseLogging: true,
  })
  .schema(editDriverSchema)
  .action(async ({ parsedInput }) => {
    const supabase = createClient();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { avatar_file, files, id, ...rest } = parsedInput;
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

    const { data: insertedDriver, error } = await supabase
      .from('drivers')
      .update(formattedInput)
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error || !insertedDriver) {
      console.log(error);
      return null;
    }

    if (avatar_file instanceof File && avatar_file) {
      uploadToBucket({
        bucketName: 'driver_avatars',
        file: avatar_file,
        upsert: false,
        randomizeFilename: true,
        randomizedNamePrefix: 'driver_avatar',
        onFileUploaded: async (file) => {
          await supabase
            .from('drivers')
            .update({ avatar_url: file.path })
            .eq('id', insertedDriver.id);
        },
      });
    }

    if (parsedInput.files) {
      let files = parsedInput.files;

      if (files instanceof File) {
        files = [files];
      }

      for (const file of files) {
        const filePath = `drivers/${insertedDriver.id}/${file.name}`;

        const { data: insertedFile, error } = await supabase.storage
          .from('files')
          .upload(filePath, file);

        if (error || !insertedFile) {
          console.error(error);
          return null;
        }

        const { error: insertError } = await supabase
          .from('driver_files')
          .insert({
            driver_id: insertedDriver.id,
            file_url: filePath,
            file_name: file.name,
          });

        if (insertError) {
          console.error(insertError);
          return null;
        }
      }
    }

    revalidatePath('/fleet/drivers');
    return {
      success: true,
    };
  });

export const addDriver = authActionClient
  .metadata({
    actionName: 'editDriver',
    verboseLogging: true,
  })
  .schema(addDriverSchema)
  .outputSchema(
    z.object({ success: z.boolean(), id: z.string().nullable() }).nullable()
  )
  .action(async ({ parsedInput }) => {
    const supabase = createClient();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { avatar_file, files, ...rest } = parsedInput;
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

    const { data: insertedDriver, error } = await supabase
      .from('drivers')
      .insert(formattedInput)
      .select()
      .maybeSingle();

    if (error || !insertedDriver) {
      console.log(error);
      return null;
    }

    if (avatar_file instanceof File && avatar_file) {
      uploadToBucket({
        bucketName: 'driver_avatars',
        file: avatar_file,
        upsert: false,
        randomizeFilename: true,
        randomizedNamePrefix: 'driver_avatar',
        onFileUploaded: async (file) => {
          await supabase
            .from('drivers')
            .update({ avatar_url: file.path })
            .eq('id', insertedDriver.id);
        },
      });
    }

    if (parsedInput.files) {
      let files = parsedInput.files;

      if (files instanceof File) {
        files = [files];
      }

      for (const file of files) {
        const filePath = `drivers/${insertedDriver.id}/${file.name}`;

        const { data: insertedFile, error } = await supabase.storage
          .from('files')
          .upload(filePath, file);

        if (error || !insertedFile) {
          console.error(error);
          return null;
        }

        const { error: insertError } = await supabase
          .from('driver_files')
          .insert({
            driver_id: insertedDriver.id,
            file_url: filePath,
            file_name: file.name,
          });

        if (insertError) {
          console.error(insertError);
          return null;
        }
      }
    }

    revalidatePath('/fleet/drivers');
    return {
      success: true,
      id: insertedDriver.id,
    };
  });

export const deleteDriver = authActionClient
  .metadata({
    actionName: 'deleteDriver',
  })
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput: { id } }) => {
    const supabase = createClient();

    const { error } = await supabase.from('drivers').delete().eq('id', id);

    if (error) {
      console.log(error);
      return null;
    }

    console.log('Driver deleted successfully');
    revalidatePath('/fleet/drivers');
    return {
      success: true,
    };
  });
