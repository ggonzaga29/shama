'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import { FieldValues, Path, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { cn } from 'src/common/utils/cvaUtils';
import FileUploader from 'src/components/FileUploader/FileUploader';
import { FormRendererProps } from 'src/components/FormRenderer/types';
import { Checkbox } from 'src/components/ui/Checkbox';
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
import { Textarea } from 'src/components/ui/Textarea';

/**
 * A generic form component that uses react-hook-form for form management and zod for form validation.
 * It takes in a list of field definitions, a form action function, a zod schema for validation, and some optional parameters.
 * @param {FormFieldDefinition<T>[]} fields - An array of field definitions for the form fields.
 * @param {(previousState: FormState, data: FormData) => Promise<FormState>} formAction - A function that takes the previous form state and form data and returns a new form state.
 * @param onSuccess - A function that is called when the form action is successful.
 * @param {ZodSchema<T>} schema - A zod schema for form validation.
 * @param {number} [columns=1] - The number of columns in the form grid. Defaults to 1.
 * @param {string} [submitButtonLabel='Submit'] - The label for the submit button. Defaults to 'Submit'.
 * @param {DefaultValues<T>} [defaultValues] - Default values for the form fields.
 *
 * @param redirectUrl
 * @param className
 * @param buttonClassName
 * @example
 * <FormRenderer
 *   fields={fields}
 *   formAction={formAction}
 *   schema={schema}
 *   columns={2}
 *   submitButtonLabel="Save"
 *   defaultValues={defaultValues}
 * />
 */
const FormRenderer = <T extends FieldValues>({
  fields,
  formAction,
  onSuccess,
  schema,
  columns = 1,
  submitButtonLabel = 'Submit',
  defaultValues,
  redirectUrl,
  className,
  buttonClassName,
}: FormRendererProps<T>) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [state, formStateAction] = useFormState(formAction, {
    message: '',
  });

  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const formRef = useRef<HTMLFormElement>(null);

  // @see https://github.com/react-hook-form/react-hook-form/issues/1150#issuecomment-594853715
  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues]);

  useEffect(() => {
    if (state.success && onSuccess) {
      onSuccess(state);
    }

    if (state.success && !form.formState.isSubmitting) {
      setIsLoading(false);
      toast.success(state.successMessage);
      // FIX: form.reset() doesn't work for some reason
      // fix? force the form to re-render with the default values
      form.reset(undefined, { keepDirtyValues: true });

      if (redirectUrl) {
        router.push(redirectUrl);
      }
    }
  }, [state.success, state.successMessage, form.formState.isSubmitting]);

  useEffect(() => {}, [state]);

  const handleSelectChange = (value: string, fieldName: string) => {
    if (!value) {
      return;
    }

    form.setValue(fieldName as Path<T>, value as any);
    form.clearErrors(fieldName as Path<T>);
  };

  return (
    <Form {...form}>
      {state?.message !== '' && !state.issues && (
        <div className="text-red-500">{state.message}</div>
      )}
      {state?.issues && (
        <div className="text-red-500">
          <ul>
            {state.issues.map((issue) => (
              <li key={issue} className="flex gap-1">
                <X fill="red" />
                {issue}
              </li>
            ))}
          </ul>
        </div>
      )}
      <form
        ref={formRef}
        action={formStateAction}
        onSubmit={(event) => {
          event.preventDefault();
          form.handleSubmit(async () => {
            try {
              setIsLoading(true);
              formStateAction(new FormData(formRef.current!));
              /** @see: https://github.com/react-hook-form/react-hook-form/issues/1363
               * Submit handler needs to return a promise to determine when the form is done submitting
               * There may be a better solution
               */
              // return new Promise<void>((resolve) => {
              //   setTimeout(() => {
              //     resolve();
              //   }, 500);
              // });
            } catch (error) {
              console.error(error);
            }
          })(event);
        }}
      >
        <Form {...form}>
          <div className={cn(`grid gap-4`, `grid-cols-${columns}`, className)}>
            {fields.map((formField, index) => (
              <FormField
                key={formField.name as string}
                control={form.control}
                name={formField.name as Path<T>}
                render={({ field }) => {
                  switch (formField.type) {
                    case 'textarea':
                      return (
                        <FormItem
                          className={cn(
                            'col-span-full md:col-auto',
                            formField.colspan
                              ? `md:col-span-${formField.colspan}`
                              : ''
                          )}
                        >
                          <FormLabel htmlFor={formField.name as string}>
                            {formField.label}
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={formField.placeholder}
                              {...field}
                              autoFocus={index === 0}
                            />
                          </FormControl>
                          {formField.description && (
                            <FormDescription>
                              {formField.description}
                            </FormDescription>
                          )}
                          <FormMessage />
                        </FormItem>
                      );

                    case 'select':
                      return (
                        <FormItem
                          className={cn(
                            'col-span-full md:col-auto',
                            formField.colspan
                              ? `md:col-span-${formField.colspan}`
                              : ''
                          )}
                        >
                          <FormLabel htmlFor={formField.name as string}>
                            {formField.label}
                          </FormLabel>
                          <Select
                            onValueChange={(value) =>
                              handleSelectChange(
                                value,
                                formField.name as string
                              )
                            }
                            defaultValue={field.value}
                            name={formField.name as Path<T>}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a value" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {formField.selectOptions.map((option) => (
                                <SelectItem
                                  key={option.label}
                                  value={option.value}
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          {formField.description && (
                            <FormDescription>
                              {formField.description}
                            </FormDescription>
                          )}
                          <FormMessage />
                        </FormItem>
                      );

                    case 'hidden':
                      return (
                        <FormItem className="hidden">
                          <input
                            type="hidden"
                            {...field}
                            value={field.value ?? formField.value}
                          />
                        </FormItem>
                      );

                    case 'checkbox':
                      return (
                        <FormItem
                          className={cn(
                            'col-span-full md:col-auto',
                            'flex items-center space-x-3',
                            formField.colspan
                              ? `md:col-span-${formField.colspan}`
                              : ''
                          )}
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel htmlFor={formField.name as string}>
                              {formField.label}
                            </FormLabel>
                            {formField.description && (
                              <FormDescription className="block">
                                {formField.description}
                              </FormDescription>
                            )}
                          </div>
                          <FormMessage />
                        </FormItem>
                      );

                    case 'file':
                      return (
                        <FormItem
                          className={cn(
                            'col-span-full md:col-auto',
                            'flex items-center space-x-3',
                            formField.colspan
                              ? `md:col-span-${formField.colspan}`
                              : ''
                          )}
                        >
                          <FormControl>
                            <FileUploader
                              field={field}
                              onUpload={formField.onUpload}
                              acceptedFileTypes={formField.acceptedFileTypes}
                              maxFileSize={formField.maxFileSize}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );

                    default:
                      return (
                        <FormItem
                          className={cn(
                            'col-span-full md:col-auto',
                            formField.colspan
                              ? `md:col-span-${formField.colspan}`
                              : ''
                          )}
                        >
                          <FormLabel htmlFor={formField.name as string}>
                            {formField.label}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder={formField.placeholder}
                              type={formField.type ?? 'text'}
                              {...field}
                              autoFocus={index === 0}
                            />
                          </FormControl>
                          {formField.description && (
                            <FormDescription>
                              {formField.description}
                            </FormDescription>
                          )}
                          <FormMessage />
                        </FormItem>
                      );
                  }
                }}
              />
            ))}
          </div>
          <div className={cn(`mt-6`, `col-span-${columns}`)}>
            <EnhancedButton
              type="submit"
              variant="gooeyRight"
              loading={isLoading}
              className={buttonClassName}
            >
              {submitButtonLabel}
            </EnhancedButton>
          </div>
        </Form>
      </form>
    </Form>
  );
};

export default FormRenderer;
