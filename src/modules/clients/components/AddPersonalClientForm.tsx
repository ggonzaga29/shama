/* eslint-disable react/no-unescaped-entities */
'use client';

import { Calendar as CalendarIcon, Send } from '@carbon/icons-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useHookFormActionErrorMapper } from '@next-safe-action/adapter-react-hook-form/hooks';
import { format } from 'date-fns';
import { Infer } from 'next-safe-action/adapters/types';
import { useAction } from 'next-safe-action/hooks';
import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/Select';
import { addPersonalClient } from 'src/modules/clients/actions';
import { personalClientFormSchema } from 'src/modules/clients/schema';

const AddClientForm = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
  const action = useAction(addPersonalClient);
  const [isDatePopoverOpen, setIsDatePopoverOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const { hookFormValidationErrors } = useHookFormActionErrorMapper<
    typeof personalClientFormSchema
  >(action.result.validationErrors, { joinBy: '\n' });

  const form = useForm<Infer<typeof personalClientFormSchema>>({
    resolver: zodResolver(personalClientFormSchema),
    errors: hookFormValidationErrors,
  });

  const {
    control,
    handleSubmit,
    formState: { isDirty, errors },
    setError,
    reset,
  } = form;

  const onSubmit = handleSubmit((input) => {
    startTransition(async () => {
      try {
        await action.executeAsync(input);
        setOpen(false);
        toast.success('Successfully added a new client.');
        reset(input, {
          keepDirtyValues: true,
        });
      } catch (e) {
        console.error('Something went wrong with submitting the form. ', e);
      }
    });
  });

  useEffect(() => {
    if (Object.keys(errors).length === 0) {
      return;
    }

    console.log(errors);
    // Object.entries(errors).forEach(([key, error]) => {
    //   if (error && 'message' in error && typeof key === 'string') {
    //     const clientKey = key as keyof PersonalClientFormSchema;
    //     toast.error(`${clientKey}: ${error.message}`);
    //     setError(clientKey, {
    //       type: 'manual',
    //       message: error.message,
    //     });
    //   }
    // });
  }, [errors, setError]);

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
                The client's primary email address for account-related
                communications
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
                The client's legal first name as it appears on official
                documents
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
                The client's middle name or initial (if applicable)
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
                The client's legal last name or surname
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="phone"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="phone">Phone number</FormLabel>
              <FormControl>
                <Input type="tel" {...field} id="phone" />
              </FormControl>
              <FormDescription>
                The client's primary contact number (e.g., 09123456789 for
                mobile or 028123456 for landline)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="date_of_birth"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Date of birth</FormLabel>
              <FormControl>
                <Popover
                  modal={true}
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
                      toYear={new Date().getFullYear() - 16}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormDescription>
                The client's date of birth, used to verify age and eligibility
                for certain services
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="gender"
          control={control}
          render={({ field: { name: fieldName, value, onChange } }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select
                defaultValue={value}
                onValueChange={onChange}
                name={fieldName}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a value" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>The client's gender</FormDescription>
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
                The client's complete residential address (e.g., Unit number,
                Building, Street, Barangay, City)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="driver_license_number"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="driver_license_number">
                Driver's License Number
              </FormLabel>
              <FormControl>
                <Input type="text" {...field} id="driver_license_number" />
              </FormControl>
              <FormDescription>
                The client's valid LTO driver's license number (if applicable)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="zip_code"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="zip_code">Zip Code</FormLabel>
              <FormControl>
                <Input type="text" {...field} id="zip_code" />
              </FormControl>
              <FormDescription>
                The client's 4-digit postal code (e.g., 1200 for Makati)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="emergency_contact_name"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="emergency_contact_name">
                Emergency Contact Name
              </FormLabel>
              <FormControl>
                <Input type="text" {...field} id="emergency_contact_name" />
              </FormControl>
              <FormDescription>
                Full name of the client's primary emergency contact person
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="emergency_contact_phone"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="emergency_contact_phone">
                Emergency Contact Phone
              </FormLabel>
              <FormControl>
                <Input type="tel" {...field} id="emergency_contact_phone" />
              </FormControl>
              <FormDescription>
                Phone number of the client's emergency contact (e.g.,
                09123456789 for mobile or 028123456 for landline)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="emergency_contact_relationship"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="emergency_contact_relationship">
                Emergency Contact Relationship
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  id="emergency_contact_relationship"
                />
              </FormControl>
              <FormDescription>
                The client's relationship to the emergency contact (e.g.,
                spouse, parent, sibling)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="emergency_contact_email"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="emergency_contact_email">
                Emergency Contact Email
              </FormLabel>
              <FormControl>
                <Input type="email" {...field} id="emergency_contact_email" />
              </FormControl>
              <FormDescription>
                Email address of the client's emergency contact (optional)
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

export default AddClientForm;
