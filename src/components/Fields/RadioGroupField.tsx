'use client';

import { useId } from 'react';
import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { cn } from 'src/common/utils/cvaUtils';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'src/components/ui/Form';
import { RadioGroup, RadioGroupItem } from 'src/components/ui/RadioGroup';

type RadioGroupFieldProps<TFieldValues extends FieldValues> = {
  name: FieldPath<TFieldValues>;
  label?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  control: Control<TFieldValues>;
  options: { value: string; label: string }[];
  layout?: 'horizontal' | 'vertical';
};

const RadioGroupField = <TFieldValues extends FieldValues>({
  name,
  label,
  control,
  description,
  className,
  options,
  layout = 'vertical',
}: RadioGroupFieldProps<TFieldValues>) => {
  const id = useId();

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <FormItem className={className}>
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className={cn(
                  layout === 'horizontal' ? 'flex gap-4' : 'grid gap-2'
                )}
              >
                {options.map((option) => (
                  <FormItem
                    className="flex items-center space-x-3 space-y-0"
                    key={option.value}
                  >
                    <FormControl>
                      <RadioGroupItem
                        id={`${id}-${option.value}`}
                        value={option.value}
                      />
                    </FormControl>
                    <FormLabel
                      htmlFor={`${id}-${option.value}`}
                      className="cursor-pointer"
                    >
                      {option.label}
                    </FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormDescription>{description}</FormDescription>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default RadioGroupField;
