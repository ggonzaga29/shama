import { FieldValues, Path } from 'react-hook-form';
import { CustomFieldProps } from 'src/components/FormRenderer/types';
import { FormField, FormItem } from 'src/components/ui/Form';

type HiddenFieldProps<T extends FieldValues> = CustomFieldProps<T>;

const HiddenField = <T extends FieldValues>({
  formField,
  control,
}: HiddenFieldProps<T>) => {
  const { name } = formField;

  return (
    <FormField
      name={name as Path<T>}
      control={control}
      render={({ field }) => {
        return (
          <FormItem className="hidden">
            <input type="hidden" {...field} value={field.value} />
          </FormItem>
        );
      }}
    />
  );
};

export default HiddenField;
