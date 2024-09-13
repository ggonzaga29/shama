'use client';

import { Send } from '@carbon/icons-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useHookFormActionErrorMapper } from '@next-safe-action/adapter-react-hook-form/hooks';
import { useAction } from 'next-safe-action/hooks';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
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
import { updateUserDetails } from 'src/modules/account/actions';
import {
  UserDetailsSchema,
  userDetailsSchema,
} from 'src/modules/account/schema';

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
  } = form;

  const onSubmit = handleSubmit((input) => {
    startTransition(async () => {
      try {
        await action.executeAsync(input);
      } catch (e) {
        console.error('Something went wrong with submitting the form.');
      }
    });
  });

  return (
    <Form {...form}>
      <form className="grid grid-cols-2 gap-4" onSubmit={onSubmit}>
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
        <div className="col-span-2">
          <EnhancedButton
            type="submit"
            variant="expandIcon"
            Icon={Send}
            disabled={!isDirty || isPending}
            loading={isPending}
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
