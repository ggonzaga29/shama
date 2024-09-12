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

type InputFieldProps<T extends FieldValues> = CustomFieldProps<T>;

const InputField = <T extends FieldValues>({
  formField,
  control,
  autoFocus,
}: InputFieldProps<T>) => {
  const { name, type, placeholder, label, colspan, description } = formField;

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
              <Input
                placeholder={placeholder}
                type={type ?? 'text'}
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

export default InputField;
