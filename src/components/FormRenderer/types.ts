import { ReactNode } from 'react';
import { Accept } from 'react-dropzone';
import { DefaultValues } from 'react-hook-form';
import { OnUploadResponse } from 'src/common/types';
import { ZodSchema, ZodType } from 'zod';

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
   * The type of the form field.
   * - TODO: Add 'radio' type
   * - TODO: Add 'date' type
   * - TODO: Add 'datetime' type
   * - TODO: Add 'time' type
   * - TODO: Add 'file' type
   */
  type?:
    | 'text'
    | 'number'
    | 'password'
    | 'email'
    | 'select'
    | 'textarea'
    | 'checkbox'
    | 'radio'
    | 'hidden'
    | 'file'
    | 'file_multiple';

  /**
   * The placeholder text for the form field.
   */
  placeholder?: string;

  /**
   * An optional description for the form field.
   */
  description?: string | ReactNode;

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
      label: string;
      selectOptions: Array<{ label: string; value: string }>;
      value?: never;
    }
  | {
      /**
       * If the type is not 'select', the options property should not be provided.
       */
      type?: 'text' | 'number' | 'password' | 'email' | 'textarea' | 'checkbox';
      label: string;
      selectOptions?: never;
      value?: never;
    }
  | {
      /**
       * If the type is 'hidden', this property is required and defines the value of the hidden field.
       * Used for hidden fields that are not displayed to the user like CSRF tokens, user IDs, etc.
       */
      type: 'hidden';
      label?: never;
      selectOptions?: never;
      value?: string; // Required: The value of the hidden field
    }
  | {
      type: 'file';
      label: string;
      maxFileSize?: number;
      acceptedFileTypes?: Accept;
      onUpload: (file: FormData) => Promise<OnUploadResponse>;
    }
  | {
      type: 'file_multiple';
      label: string;
      acceptedFileTypes?: Accept;
      maxFileCount: number;
      maxFileSize?: number;
      onUpload: (file: FormData) => Promise<OnUploadResponse>;
    }
);

export type FormFieldDefinitionArray<T> = FormFieldDefinition<T>[];

export type FormRendererProps<T> = {
  fields: FormFieldDefinition<T>[];
  formAction: (previousState: FormState, data: FormData) => Promise<FormState>;
  onSuccess?: (data: FormState) => void;
  schema: ZodSchema<T>;
  columns?: number;
  submitButtonLabel?: string;
  defaultValues?: DefaultValues<T>;
  redirectUrl?: string;
  className?: string;
  buttonClassName?: string;
};

export interface ZodFileCheck extends ZodType<File> {
  _input: File;
  _output: File;
}

declare module 'zod' {
  interface ZodTypeDef {
    fileAccept?: string;
  }
}
