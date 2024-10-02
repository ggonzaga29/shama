/* eslint-disable react/no-unescaped-entities */
'use client';

import { Send } from '@carbon/icons-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useHookFormActionErrorMapper } from '@next-safe-action/adapter-react-hook-form/hooks';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Infer } from 'next-safe-action/adapters/types';
import { useAction } from 'next-safe-action/hooks';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { createClient } from 'src/common/lib/supabase/client';
import { cn } from 'src/common/utils/cvaUtils';
import { Button } from 'src/components/ui/Button';
import { Calendar } from 'src/components/ui/Calendar';
import { EnhancedButton } from 'src/components/ui/EnhancedButton';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'src/components/ui/Form';
import { Input } from 'src/components/ui/Input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from 'src/components/ui/Popover';
import { addDriver } from 'src/modules/drivers/actions';
import { addDriverClientSchema } from 'src/modules/drivers/schema';

const AddDriverForm = () => {
  const action = useAction(addDriver);
  const [isDatePopoverOpen, setIsDatePopoverOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const { hookFormValidationErrors } = useHookFormActionErrorMapper<
    typeof addDriverClientSchema
  >(action.result.validationErrors, { joinBy: '\n' });

  const form = useForm<Infer<typeof addDriverClientSchema>>({
    resolver: zodResolver(addDriverClientSchema),
    errors: hookFormValidationErrors,
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { isDirty },
  } = form;

  const onUploadAvatar = async (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (...event: any[]) => void
  ) => {
    const supabase = createClient();
    const file = event.target.files?.[0];

    if (!file) {
      console.error('No file selected.');
      return;
    }

    const { data, error } = await supabase.storage
      .from('driver_avatars')
      .upload(file.name, file);

    if (data && !error) {
      console.log('Uploaded file:', data.path);
      onChange(data.path);
    }
  };

  const onSubmit = handleSubmit((input) => {
    startTransition(async () => {
      try {
        const formData = new FormData();
        Object.entries(input).forEach(([key, value]) => {
          if (value instanceof Date) {
            formData.append(key, value.toISOString()); // Convert Date to ISO string
          } else if (value instanceof File) {
            formData.append(key, value); // Append File directly
          } else if (value !== undefined && value !== null) {
            formData.append(key, value.toString()); // Convert other types to string
          }
        });

        await action.executeAsync(formData);
        toast.success('Successfully added a new client.');
        reset(input, {
          keepDirtyValues: true,
        });
      } catch (e) {
        console.error('Something went wrong with submitting the form.');
      }
    });
  });

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
          name="email"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} id="email" />
              </FormControl>
              <FormDescription>
                The employee's primary email address for account-related
                communications.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="birth_date"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Date of birth</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 size-4" />
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        field.onChange(date);
                      }}
                      disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormDescription>
                The employee's date of birth, used to verify age and eligibility
                for certain services.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="first_name"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="first_name">First name</FormLabel>
              <FormControl>
                <Input type="text" {...field} id="first_name" />
              </FormControl>
              <FormDescription>
                The employee's legal first name as it appears on official
                documents.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="middle_name"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="middle_name">Middle name</FormLabel>
              <FormControl>
                <Input type="text" {...field} id="middle_name" />
              </FormControl>
              <FormDescription>
                The employee's middle name or initial (if applicable).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="last_name"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="last_name">Last name</FormLabel>
              <FormControl>
                <Input type="text" {...field} id="last_name" />
              </FormControl>
              <FormDescription>
                The employee's legal last name or surname.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="license_number"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="license_number">License Number</FormLabel>
              <FormControl>
                <Input type="text" {...field} id="license_number" />
              </FormControl>
              <FormDescription>
                The employee's driver's license number.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="license_expiry_date"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>License Expiry Date</FormLabel>
              <FormControl>
                <Popover
                  open={isDatePopoverOpen}
                  onOpenChange={setIsDatePopoverOpen}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 size-4" />
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        field.onChange(date);
                        setIsDatePopoverOpen(false);
                      }}
                      disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormDescription>
                The expiration date of the employee's driver's license, ensuring
                it is valid and up-to-date.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="employee_id"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="employee_id">Employee ID</FormLabel>
              <FormControl>
                <Input type="text" {...field} id="employee_id" />
              </FormControl>
              <FormDescription>
                The unique identifier assigned to the employee.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="address"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="address">Address</FormLabel>
              <FormControl>
                <Input type="text" {...field} id="address" />
              </FormControl>
              <FormDescription>
                The employee's residential address.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="avatar_file"
          control={control}
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <FormLabel htmlFor="avatar_file">Avatar</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Upload an image"
                  accept="image/*"
                  type="file"
                  onChange={(event) => onUploadAvatar(event, onChange)}
                  id="avatar_file"
                />
              </FormControl>
              <FormDescription>
                Upload a profile picture for the employee.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="!col-span-2">
          <EnhancedButton
            type="submit"
            variant="expandIcon"
            Icon={Send}
            disabled={!isDirty || isPending}
            loading={isPending}
          >
            Add Client
          </EnhancedButton>
        </div>
      </form>
    </Form>
  );
};

export default AddDriverForm;
