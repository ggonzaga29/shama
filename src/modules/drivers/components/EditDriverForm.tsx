/* eslint-disable react/no-unescaped-entities */
'use client';

import { Send } from '@carbon/icons-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useHookFormActionErrorMapper } from '@next-safe-action/adapter-react-hook-form/hooks';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Infer } from 'next-safe-action/adapters/types';
import { useAction } from 'next-safe-action/hooks';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { queryKeys } from 'src/common/lib/queryKeys';
import { createBrowserClient } from 'src/common/lib/supabase/browserClient';
import { cn } from 'src/common/utils/cvaUtils';
import { mapInputToFormData } from 'src/common/utils/formUtils';
import DateField from 'src/components/FIelds/DateField';
import FileDropzoneField from 'src/components/FIelds/FileDropzoneField';
import TextField from 'src/components/FIelds/TextField';
import { EnhancedButton } from 'src/components/ui/EnhancedButton';
import { Form, FormField, FormItem } from 'src/components/ui/Form';
import { editDriver } from 'src/modules/drivers/actions';
import { getDriverById } from 'src/modules/drivers/data';
import { editDriverSchema } from 'src/modules/drivers/schema';

const transformStringToDate = (date?: string | null) => {
  if (!date) return null;

  return new Date(date);
};

type FieldValues = Infer<typeof editDriverSchema>;

const EditDriverForm = ({ id }: { id: string }) => {
  const action = useAction(editDriver);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const supabase = createBrowserClient();
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.drivers.byId(id),
    queryFn: () => getDriverById(supabase, id),
  });

  const { hookFormValidationErrors } = useHookFormActionErrorMapper<
    typeof editDriverSchema
  >(action.result.validationErrors, { joinBy: '\n' });

  const form = useForm<FieldValues>({
    resolver: zodResolver(editDriverSchema),
    errors: hookFormValidationErrors,
    defaultValues: {
      id: data?.id ?? undefined,
      email: data?.email ?? undefined,
      birth_date: transformStringToDate(data?.birth_date) ?? undefined,
      first_name: data?.first_name ?? undefined,
      middle_name: data?.middle_name ?? undefined,
      last_name: data?.last_name ?? undefined,
      license_number: data?.license_number ?? undefined,
      license_expiry_date:
        transformStringToDate(data?.license_expiry_date) ?? undefined,
      employee_id: data?.employee_id ?? undefined,
      address: data?.address ?? undefined,
    },
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { isDirty },
  } = form;

  const onSubmit = handleSubmit((input) => {
    startTransition(async () => {
      try {
        const formData = mapInputToFormData(input);
        await action.executeAsync(formData);
        toast.success('Driver updated successfully. Redirecting...');
        router.push(`/fleet/drivers/${input.id}`);
        reset(input, {
          keepDirtyValues: true,
        });
      } catch (e) {
        console.error('Something went wrong with submitting the form.');
      }
    });
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Form {...form}>
      <form
        className={cn(
          'grid grid-cols-1 gap-4 px-1 md:grid-cols-2',
          '[&>*]:col-span-2 [&>*]:md:col-span-1'
        )}
        onSubmit={onSubmit}
      >
        <FormField
          name="id"
          control={control}
          render={({ field }) => {
            return (
              <FormItem className="hidden">
                <input type="hidden" {...field} value={field.value} />
              </FormItem>
            );
          }}
        />

        <TextField
          name="email"
          control={control}
          label="Email"
          description="The employee's primary email address for account-related communications."
        />

        <DateField
          name="birth_date"
          control={control}
          label="Date of birth"
          description="The employee's date of birth, used to verify age and eligibility for certain services."
        />

        <TextField
          name="first_name"
          control={control}
          label="First name"
          description="The employee's legal first name as it appears on official documents."
        />

        <TextField
          name="middle_name"
          control={control}
          label="Middle name"
          description="The employee's middle name or initial (if applicable)."
        />

        <TextField
          name="last_name"
          control={control}
          label="Last name"
          description="The employee's legal last name or surname."
        />

        <TextField
          name="license_number"
          control={control}
          label="License Number"
          description="The employee's driver's license number."
        />

        <DateField
          name="license_expiry_date"
          control={control}
          label="License Expiry Date"
          description="The expiration date of the employee's driver's license, ensuring it is valid and up-to-date."
        />

        <TextField
          name="employee_id"
          control={control}
          label="Employee ID"
          description="The unique identifier assigned to the employee."
        />

        <TextField
          name="address"
          control={control}
          label="Address"
          description="The employee's residential address."
        />

        <p className="!col-span-2 text-sm text-muted-foreground">
          Note: Adding a new Avatar will replace the existing one. Adding new
          files will append to the existing ones.
        </p>

        <FileDropzoneField<FieldValues>
          name="avatar_file"
          control={control}
          label="Avatar"
          description="Upload a profile picture for the employee."
          fileInputProps={{
            hideOnDisabled: true,
            maxFileCount: 1,
          }}
        />

        <FileDropzoneField<FieldValues>
          name="files"
          control={control}
          label="Files"
          description="Upload any additional files or documents related to the
                employee. E.g.: CV, Driver's License, etc."
          fileInputProps={{
            maxFileCount: 5,
          }}
        />
        <div className="!col-span-2">
          <EnhancedButton
            type="submit"
            variant="expandIcon"
            Icon={Send}
            disabled={!isDirty || isPending}
            loading={isPending}
          >
            Update Driver
          </EnhancedButton>
        </div>
      </form>
    </Form>
  );
};

export default EditDriverForm;
