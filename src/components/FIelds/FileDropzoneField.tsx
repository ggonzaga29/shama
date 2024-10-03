import { Control, FieldValues, Path } from 'react-hook-form';
import { cn } from 'src/common/utils/cvaUtils';
import {
  FileUploader,
  FileUploaderProps,
} from 'src/components/FormRenderer/components/FileUploader/FileUploader';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'src/components/ui/Form';

type FileInputFieldProps<T extends FieldValues> = {
  name: Path<T>;
  fileInputProps?: FileUploaderProps;
  autoFocus?: boolean;
  label?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  control: Control<T>;
};

// TODO: Add support for default values
const FileInputField = <T extends FieldValues>({
  name,
  label,
  control,
  autoFocus,
  fileInputProps,
  description,
  className,
}: FileInputFieldProps<T>) => {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={cn('!col-span-2', className)}>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <FormControl>
            <FileUploader
              multiple
              maxFileCount={10}
              {...fileInputProps}
              value={field.value as File[] | undefined}
              onValueChange={field.onChange}
              autoFocus={autoFocus}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FileInputField;
