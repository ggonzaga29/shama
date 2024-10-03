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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/Select';

type SelectFieldProps<T extends FieldValues> = CustomFieldProps<T>;

const SelectField = <T extends FieldValues>({
  formField,
  control,
}: SelectFieldProps<T>) => {
  const { name, type, label, colspan, description } = formField;

  // Type guard
  if (type !== 'select') {
    return null;
  }

  return (
    <FormField
      name={name as Path<T>}
      control={control}
      render={({ field: { name: fieldName, value, onChange } }) => {
        return (
          <FormItem
            className={cn(
              'col-span-full md:col-auto',
              colspan ? `md:col-span-${colspan}` : ''
            )}
          >
            <FormLabel htmlFor={name as string}>{label}</FormLabel>
            <Select
              defaultValue={value}
              onValueChange={onChange}
              name={fieldName}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a value" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {formField.selectOptions.map((option) => (
                  <SelectItem key={option.label} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default SelectField;
