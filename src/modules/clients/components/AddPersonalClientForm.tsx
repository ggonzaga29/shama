'use client';

import { Calendar as CalendarIcon, Send } from '@carbon/icons-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useHookFormActionErrorMapper } from '@next-safe-action/adapter-react-hook-form/hooks';
import { format } from 'date-fns';
import { useAction } from 'next-safe-action/hooks';
import { useTransition } from 'react';
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
import {
  PersonalClientFormSchema,
  personalClientFormSchema,
} from 'src/modules/clients/schema';

const AddClientForm = () => {
  const action = useAction(addPersonalClient);
  const [isPending, startTransition] = useTransition();

  const { hookFormValidationErrors } = useHookFormActionErrorMapper<
    typeof personalClientFormSchema
  >(action.result.validationErrors, { joinBy: '\n' });

  // Necessary type guard for form
  const form = useForm<PersonalClientFormSchema>({
    resolver: zodResolver(personalClientFormSchema),
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
        toast.success('Successfully added a new client.');
        // Optimistic Reset
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
          name="middle_name"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="middle_name">Last name</FormLabel>
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
          control={form.control}
          name="date_of_birth"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Date of birth</FormLabel>
              <FormControl>
                <Popover modal={true}>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
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
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      toYear={new Date().getFullYear() - 18}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormDescription>
                Your date of birth is used to calculate your age.
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

export default AddClientForm;
