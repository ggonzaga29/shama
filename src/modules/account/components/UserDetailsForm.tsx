'use client';

import { Send } from '@carbon/icons-react';
import { zodResolver } from '@hookform/resolvers/zod';
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
import {
  UserDetailsSchema,
  userDetailsSchema,
} from 'src/modules/account/schema';

const UserDetailsForm = ({
  profile,
}: {
  profile: Table<'profiles'> | null;
}) => {
  // Type guard for gender
  const validGender =
    profile?.gender === 'Male' || profile?.gender === 'Female'
      ? profile?.gender
      : undefined;

  // Necessary type guard for form
  const form = useForm<UserDetailsSchema>({
    resolver: zodResolver(userDetailsSchema),
    defaultValues: {
      first_name: profile?.first_name ?? '',
      last_name: profile?.last_name ?? '',
      gender: validGender,
      phone: profile?.phone ?? '',
      address: profile?.address ?? '',
    },
  });

  const { control } = form;

  return (
    <Form {...form}>
      <form className="grid grid-cols-2 gap-4">
        <FormField
          name="first_name"
          control={control}
          render={({ field }) => (
            <FormItem className={cn('col-span-1')}>
              <FormLabel htmlFor="first_name">First name</FormLabel>
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
            // disabled={!isDirty || isPending}
            // loading={isPending}
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
