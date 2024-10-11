'use client';

import { Send } from '@carbon/icons-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useHookFormActionErrorMapper } from '@next-safe-action/adapter-react-hook-form/hooks';
import { updateUserDetails } from 'app/account/actions';
import { UserDetailsSchema, userDetailsSchema } from 'app/account/schema';
import { useAction } from 'next-safe-action/hooks';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Table } from 'src/common/types';
import { cn } from 'src/common/utils/cvaUtils';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/Select';

const UserDetailsForm = ({
  profile,
}: {
  profile: Table<'profiles'> | null;
}) => {
  const action = useAction(updateUserDetails);
  const [isPending, startTransition] = useTransition();

  const { hookFormValidationErrors } = useHookFormActionErrorMapper<
    typeof userDetailsSchema
  >(action.result.validationErrors, { joinBy: '\n' });

  // Necessary type guard for form
  const form = useForm<UserDetailsSchema>({
    resolver: zodResolver(userDetailsSchema),
    defaultValues: {
      first_name: profile?.first_name ?? '',
      last_name: profile?.last_name ?? '',
      gender:
        profile?.gender === 'Male' || profile?.gender === 'Female'
          ? profile?.gender
          : undefined,
      phone: profile?.phone ?? '',
      address: profile?.address ?? '',
    },
    errors: hookFormValidationErrors,
  });

  const {
    control,
    handleSubmit,
    formState: { isDirty },
    reset,
  } = form;

  const onSubmit = handleSubmit((input) => {
    startTransition(async () => {
      try {
        await action.executeAsync(input);
        toast.success('User profile updated successfuly');
        // Optimistic Reset
        reset(input, {
          keepDirtyValues: true,
        });
      } catch (e) {
        console.error('Something went wrong with submitting the form: ', e);
      }
    });
  });

  return (
    <Form {...form}>
      <form
        className={cn(
          'grid grid-cols-1 gap-4 md:grid-cols-2',
          '[&>*]:col-span-2 [&>*]:md:col-span-1'
        )}
        onSubmit={onSubmit}
      >
        <FormField
          name="first_name"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="first_name">First name</FormLabel>
              <FormControl>
                <Input type={'text'} {...field} />
              </FormControl>
              <FormDescription>Enter your first name</FormDescription>
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
                <Input type={'text'} {...field} />
              </FormControl>
              <FormDescription>Enter your first name</FormDescription>
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
                <Input type={'text'} {...field} />
              </FormControl>
              <FormDescription>
                Enter your phone number. E.g. +63123456789
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="gender"
          control={control}
          render={({ field: { name: fieldName, value, onChange } }) => {
            return (
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
                <FormDescription>Select your gender</FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          name="address"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="address">Address</FormLabel>
              <FormControl>
                <Input type={'text'} {...field} />
              </FormControl>
              <FormDescription>Enter your address, e.g.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="!col-span-2">
          <EnhancedButton
            type="submit"
            variant="expandIcon"
            Icon={Send}
            loading={isPending || !isDirty}
            // className={buttonClassName}
          >
            Update
          </EnhancedButton>
        </div>
      </form>
    </Form>
  );
};

export default UserDetailsForm;
