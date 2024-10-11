'use client';

import { Send } from '@carbon/icons-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useTransition } from 'react';
import { useFormState } from 'react-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { cn } from 'src/common/utils/cvaUtils';
import FileInputField from 'src/components/FormRenderer/components/FileInputField';
import HiddenField from 'src/components/FormRenderer/components/HiddenField';
import InputField from 'src/components/FormRenderer/components/InputField';
import SelectField from 'src/components/FormRenderer/components/SelectField';
import TextareaField from 'src/components/FormRenderer/components/TextareaField';
import { FormRendererProps } from 'src/components/FormRenderer/types';
import { EnhancedButton } from 'src/components/ui/EnhancedButton';
import { Form } from 'src/components/ui/Form';

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
  const [isPending, startTransition] = useTransition();
  const [state, formStateAction] = useFormState(formAction, {
    message: '',
  });

  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const formRef = useRef<HTMLFormElement>(null);
  const {
    control,
    formState: { isDirty },
    handleSubmit,
    reset,
  } = form;

  // @see https://github.com/react-hook-form/react-hook-form/issues/1150#issuecomment-594853715
  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues]);

  useEffect(() => {
    if (state.success && onSuccess) {
      onSuccess(state);
    }

    if (state.success) {
      toast.success(state.successMessage);
      // FIX: form.reset() doesn't work for some reason
      // fix? force the form to re-render with the default values
      // form.reset(undefined, { keepDirtyValues: true });
      reset();

      if (redirectUrl) {
        router.push(redirectUrl);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.success, state.successMessage, form.formState.isSubmitting]);

  const onSubmit = handleSubmit(async () => {
    if (!isDirty) {
      console.error('Form is not dirty');
      toast.error('Please fill out the form before submitting');
      return;
    }

    startTransition(async () => {
      try {
        await formStateAction(new FormData(formRef.current!));
      } catch (error) {
        console.error(error);
        toast.error('An error occurred while submitting the form.');
      }
    });
  });

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
      <form ref={formRef} onSubmit={onSubmit}>
        <Form {...form}>
          <div className={cn(`grid gap-4`, `grid-cols-${columns}`, className)}>
            {fields.map((formField, index) => {
              const { type, name } = formField;
              const isAutoFocus = index === 0;

              switch (type) {
                case 'textarea':
                  return (
                    <TextareaField
                      key={name as string}
                      formField={formField}
                      control={control}
                      autoFocus={isAutoFocus}
                    />
                  );

                case 'select':
                  return (
                    <SelectField
                      key={name as string}
                      formField={formField}
                      control={control}
                    />
                  );

                case 'file':
                  return (
                    <FileInputField
                      key={name as string}
                      formField={formField}
                      control={control}
                    />
                  );

                case 'hidden':
                  return (
                    <HiddenField
                      key={name as string}
                      formField={formField}
                      control={control}
                    />
                  );

                default:
                  return (
                    <InputField
                      key={name as string}
                      formField={formField}
                      control={control}
                      autoFocus={isAutoFocus}
                    />
                  );
              }
            })}
          </div>
          <div className={cn(`mt-6`, `col-span-${columns}`)}>
            <EnhancedButton
              type="submit"
              variant="expandIcon"
              Icon={Send}
              disabled={!isDirty || isPending}
              loading={isPending}
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
