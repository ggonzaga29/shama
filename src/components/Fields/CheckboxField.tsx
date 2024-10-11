'use client';

import { useId } from 'react';
import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { FileUploaderProps } from 'src/components/FormRenderer/components/FileUploader/FileUploader';
import { Checkbox } from 'src/components/ui/Checkbox';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from 'src/components/ui/Form';

type CheckboxFieldProps<TFieldValues extends FieldValues> = {
  name: FieldPath<TFieldValues>;
  fileInputProps?: FileUploaderProps;
  label?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  control: Control<TFieldValues>;
};

const CheckboxField = <TFieldValues extends FieldValues>({
  name,
  label,
  control,
  description,
  className,
}: CheckboxFieldProps<TFieldValues>) => {
  const id = useId();

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <FormItem className={className}>
            <FormControl>
              <div className="items-top flex space-x-2">
                <Checkbox
                  id={id}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <div className="grid gap-1.5 leading-none">
                  {label && (
                    <label
                      htmlFor={id}
                      className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {label}
                    </label>
                  )}
                  {description && (
                    <p className="text-sm text-muted-foreground">
                      {description}
                    </p>
                  )}
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default CheckboxField;
