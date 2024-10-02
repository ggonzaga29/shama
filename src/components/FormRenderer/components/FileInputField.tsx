'use client';

import { FieldValues, Path } from 'react-hook-form';
import { cn } from 'src/common/utils/cvaUtils';
import { CustomFieldProps } from 'src/components/FormRenderer/types';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'src/components/ui/Form';
import { Input } from 'src/components/ui/Input';

type FileInputFieldProps<T extends FieldValues> = CustomFieldProps<T>;

const FileInputField = <T extends FieldValues>({
  formField,
  control,
  autoFocus,
}: FileInputFieldProps<T>) => {
  if (formField.type !== 'file') {
    return null;
  }

  const {
    name,
    placeholder,
    label,
    colspan,
    description,
    accept,
    maxFileSize,
  } = formField;

  return (
    <FormField
      name={name as Path<T>}
      control={control}
      render={({ field }) => {
        const value = field.value as FileList;

        // Check File Size
        if (maxFileSize && value.length) {
          const file = value[0];
          if (file.size > maxFileSize) {
            return (
              <FormItem className="col-span-full">
                <FormMessage>
                  File size should be less than {maxFileSize / 1024 / 1024} MB
                </FormMessage>
              </FormItem>
            );
          }

          // Reset the field
          if (file.size > maxFileSize) {
            field.onChange(null);
          }
        }

        return (
          <FormItem
            className={cn(
              'col-span-full md:col-auto',
              colspan ? `md:col-span-${colspan}` : ''
            )}
          >
            <FormLabel htmlFor={name as string}>{label}</FormLabel>
            <FormControl>
              <Input
                placeholder={placeholder}
                {...field}
                type="file"
                accept={accept}
                autoFocus={autoFocus}
              />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default FileInputField;
