'use client';

import {
  Control,
  ControllerFieldState,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  UseFormStateReturn,
} from 'react-hook-form';
import { FileUploaderProps } from 'src/components/FormRenderer/components/FileUploader/FileUploader';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'src/components/ui/Form';
import { Input } from 'src/components/ui/Input';

type TextFieldProps<TFieldValues extends FieldValues> = {
  name: FieldPath<TFieldValues>;
  fileInputProps?: FileUploaderProps;
  autoFocus?: boolean;
  label?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  control: Control<TFieldValues>;
  placeholder?: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'hidden';
  render?: (props: {
    field: ControllerRenderProps<TFieldValues, FieldPath<TFieldValues>>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<TFieldValues>;
  }) => React.ReactElement;
};

/**
 * For use in forms that use react-hook-form. This component renders a text input field. Also supports custom render functions.
 *
 * @template TFieldValues - The type of the form values object
 *
 * @example
 * Basic usage:
 * ```tsx
 * interface LoginForm {
 *   email: string;
 *   password: string;
 * }
 *
 * function LoginForm() {
 *   const { control } = useForm<LoginForm>();
 *
 *   return (
 *     <form>
 *       <TextField<LoginForm>
 *         name="email"
 *         control={control}
 *         label="Email"
 *         type="email"
 *       />
 *       <TextField<LoginForm>
 *         name="password"
 *         control={control}
 *         label="Password"
 *         type="password"
 *       />
 *     </form>
 *   );
 * }
 * ```
 *
 * @example
 * Custom render function:
 * ```tsx
 * interface ProfileForm {
 *   bio: string;
 * }
 *
 * function ProfileForm() {
 *   const { control } = useForm<ProfileForm>();
 *
 *   return (
 *     <TextField<ProfileForm>
 *       name="bio"
 *       control={control}
 *       label="Biography"
 *       render={({ field, fieldState }) => (
 *         <div>
 *           <textarea {...field} />
 *           {fieldState.error && (
 *             <span>{fieldState.error.message}</span>
 *           )}
 *         </div>
 *       )}
 *     />
 *   );
 * }
 * ```
 */
const TextField = <TFieldValues extends FieldValues>({
  name,
  label,
  control,
  autoFocus,
  description,
  className,
  placeholder,
  type = 'text',
  render,
}: TextFieldProps<TFieldValues>) => {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field, fieldState, formState }) => {
        if (render) {
          return render({ field, fieldState, formState });
        }

        return (
          <FormItem className={className}>
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <FormControl>
              <Input
                type={type}
                {...field}
                id={name}
                autoFocus={autoFocus}
                placeholder={placeholder}
              />
            </FormControl>
            <FormDescription>{description}</FormDescription>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default TextField;
