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
import { Textarea } from 'src/components/ui/Textarea';

type TextareaFieldProps<T extends FieldValues> = CustomFieldProps<T>;

const TextareaField = <T extends FieldValues>({
  formField,
  control,
  autoFocus,
}: TextareaFieldProps<T>) => {
  const { name, placeholder, label, colspan, description } = formField;

  return (
    <FormField
      name={name as Path<T>}
      control={control}
      render={({ field }) => {
        return (
          <FormItem
            className={cn(
              'col-span-full md:col-auto',
              colspan ? `md:col-span-${colspan}` : ''
            )}
          >
            <FormLabel htmlFor={name as string}>{label}</FormLabel>
            <FormControl>
              <Textarea
                placeholder={placeholder}
                {...field}
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

export default TextareaField;
