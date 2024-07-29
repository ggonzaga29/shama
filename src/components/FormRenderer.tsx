'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';
import { FieldValues, Path, useForm, DefaultValues } from 'react-hook-form';
import { toast } from 'sonner';
import { cn } from 'src/common/utils/cvaUtils';
import { EnhancedButton } from 'src/components/ui/EnhancedButton';
import { gridCols } from 'src/common/utils/cvaUtils';
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
import { ZodSchema } from 'zod';

export type FormState = {
  message?: string;
  fields?: Record<string, string>;
  issues?: string[];
  success?: boolean;
  successMessage?: string;
};

export type FormFieldDefinition<T> = {
  name: keyof T;
  label: string;
  type?: 'text' | 'number' | 'password' | 'email';
  placeholder: string;
  description?: string;
  colspan?: number;
  required?: boolean;
};

export type FormFieldDefinitionArray<T> = FormFieldDefinition<T>[];

export type FormRendererProps<T> = {
  fields: FormFieldDefinition<T>[];
  formAction: (previousState: FormState, data: FormData) => Promise<FormState>;
  schema: ZodSchema<T>;
  columns?: number;
  submitButtonLabel?: string;
  defaultValues?: DefaultValues<T>;
  redirectUrl?: string;
  className?: string;
  buttonClassName?: string;
};

/**
 * A generic form component that uses react-hook-form for form management and zod for form validation.
 * It takes in a list of field definitions, a form action function, a zod schema for validation, and some optional parameters.
 *
 * @component
 * @param {FormFieldDefinition<T>[]} fields - An array of field definitions for the form fields.
 * @param {(previousState: FormState, data: FormData) => Promise<FormState>} formAction - A function that takes the previous form state and form data and returns a new form state.
 * @param {ZodSchema<T>} schema - A zod schema for form validation.
 * @param {number} [columns=1] - The number of columns in the form grid. Defaults to 1.
 * @param {string} [submitButtonLabel='Submit'] - The label for the submit button. Defaults to 'Submit'.
 * @param {DefaultValues<T>} [defaultValues] - Default values for the form fields.
 *
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
  schema,
  columns = 1,
  submitButtonLabel = 'Submit',
  defaultValues,
  redirectUrl,
  className,
  buttonClassName,
}: FormRendererProps<T>) => {
  const router = useRouter();
  const [state, formStateAction] = useFormState(formAction, {
    message: '',
  });

  const form = useForm<T>({
    resolver: zodResolver(schema),
  });

  const formRef = useRef<HTMLFormElement>(null);

  // @see https://github.com/react-hook-form/react-hook-form/issues/1150#issuecomment-594853715
  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues]);

  useEffect(() => {
    if (state.success) {
      toast.success(state.successMessage);
      form.reset();

      if (redirectUrl) {
        router.push(redirectUrl);
      }
    }
  }, [state.success, state.successMessage]);

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
          form.handleSubmit(() => {
            formStateAction(new FormData(formRef.current!));
          })(event);
        }}
      >
        <div className={cn(`grid gap-4`, `grid-cols-${columns}`, className)}>
          {fields.map((formField, index) => (
            <FormField
              key={formField.name as string}
              control={form.control}
              name={formField.name as Path<T>}
              render={({ field }) => {
                return (
                  <FormItem
                    className={
                      formField.colspan ? `col-span-${formField.colspan}` : ''
                    }
                  >
                    <FormLabel htmlFor={formField.name as string}>
                      {formField.label}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={formField.placeholder}
                        type={formField.type}
                        {...field}
                        autoFocus={index === 0}
                      />
                    </FormControl>
                    {formField.description && (
                      <FormDescription>{formField.description}</FormDescription>
                    )}
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          ))}
        </div>
        <div className={`mt-6 col-span-${columns}`}>
          <EnhancedButton
            type="submit"
            variant="gooeyRight"
            loading={form.formState.isSubmitting}
            className={buttonClassName}
          >
            {submitButtonLabel}
          </EnhancedButton>
        </div>
      </form>
    </Form>
  );
};

export default FormRenderer;
