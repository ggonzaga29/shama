'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';
import {
  FieldValues,
  Path,
  useForm,
  DefaultValues,
  PathValue,
} from 'react-hook-form';
import { toast } from 'sonner';
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
  SelectValue,
  SelectTrigger,
} from 'src/components/ui/Select';
import { Textarea } from 'src/components/ui/Textarea';
import { ZodSchema } from 'zod';

export type FormState = {
  message?: string;
  fields?: Record<string, string>;
  issues?: string[];
  success?: boolean;
  successMessage?: string;
};

export type FormFieldDefinition<T> = {
  /**
   * The name of the form field, which corresponds to a key in the form data object.
   */
  name: keyof T;

  /**
   * The label for the form field, which will be displayed to the user.
   */
  label: string;

  /**
   * The type of the form field. It can be one of the following:
   * - 'text'
   * - 'number'
   * - 'password'
   * - 'email'
   * - 'select'
   * - TODO: Add 'checkbox' type
   * - TODO: Add 'radio' type
   */
  type?: 'text' | 'number' | 'password' | 'email' | 'select' | 'textarea';

  /**
   * The placeholder text for the form field.
   */
  placeholder?: string;

  /**
   * An optional description for the form field.
   */
  description?: string;

  /**
   * An optional colspan value for the form field, which determines how many columns the field should span.
   */
  colspan?: number;

  /**
   * An optional flag indicating whether the form field is required.
   */
  required?: boolean;
} & (
  | {
      /**
       * If the type is 'select', this property is required and defines the options for the select input.
       */
      type: 'select';
      selectOptions: Array<{ label: string; value: string }>;
    }
  | {
      /**
       * If the type is not 'select', the options property should not be provided.
       */
      type?: 'text' | 'number' | 'password' | 'email' | 'textarea';
      selectOptions?: never;
    }
);

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
    if (state.success) {
      toast.success(state.successMessage);
      // FIX: form.reset() doesn't work for some reason
      // fix? force the form to re-render with the default values
      const fields = Object.keys(form.formState.touchedFields);

      if (redirectUrl) {
        router.push(redirectUrl);
      }
    }
  }, [state.success, state.successMessage]);

  const handleSelectChange = (value: string, fieldName: string) => {
    if (!value) {
      return;
    }

    form.setValue(fieldName as Path<T>, value as any);
    const values = form.getValues();
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
          form.handleSubmit(() => {
            formStateAction(new FormData(formRef.current!));
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
                            formField.colspan
                              ? `col-span-${formField.colspan}`
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
                            formField.colspan
                              ? `col-span-${formField.colspan}`
                              : ''
                          )}
                        >
                          <FormLabel htmlFor={formField.name as string}>
                            {formField.label}
                          </FormLabel>
                          <Select
                            onValueChange={(value) =>
                              handleSelectChange(value, formField.name as string)
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
                                <SelectItem value={option.value}>
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

                    default:
                      return (
                        <FormItem
                          className={
                            formField.colspan
                              ? `col-span-${formField.colspan}`
                              : ''
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
        </Form>
      </form>
    </Form>
  );
};

export default FormRenderer;
