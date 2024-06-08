'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { useRef } from 'react';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { EnhancedButton } from 'src/components/ui/EnhancedButton';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'src/components/ui/Form';
import { Input } from 'src/components/ui/Input';
import { submitCarForm } from 'src/modules/cars/actions';
import { type CarFormSchema, carFormSchema } from 'src/modules/cars/schema';

const FORM_FIELDS: {
  name: keyof CarFormSchema;
  label: string;
  placeholder: string;
  description?: string;
  required: boolean;
}[] = [
  {
    name: 'name',
    label: 'Name',
    placeholder: 'e.g. Yaris Cross',
    description:
      'The name of the vehicle. This will be used for bookings and invoices.',
    required: true,
  },
  {
    name: 'license_plate',
    label: 'License plate',
    placeholder: 'e.g. XYZ 123',
    description:
      'The license plate of the vehicle. This will be used for bookings and invoices.',
    required: true,
  },
  {
    name: 'default_price',
    label: 'Default price',
    placeholder: 'e.g. 100',
    description:
      'The default booking price for the vehicle. This can be later changed in the booking form.',
    required: true,
  },
];

const CarForm = () => {
  const [state, formAction] = useFormState(submitCarForm, {
    message: '',
  });

  const form = useForm<CarFormSchema>({
    resolver: zodResolver(carFormSchema),
  });

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Form {...form}>
      {state?.message !== '' && !state.issues && (
        <div className="text-red-500">{state.message}</div>
      )}
      {state?.issues && (
        <div className="text-red-500">
          <ul>
            {state.issues.map((issue) => (
              <li key={issue} className="flex gap-1">
                <X fill="red" />
                {issue}
              </li>
            ))}
          </ul>
        </div>
      )}
      <form
        ref={formRef}
        action={formAction}
        onSubmit={(event) => {
          event.preventDefault();
          form.handleSubmit(() => {
            console.log('formData', new FormData(formRef.current!));
            formAction(new FormData(formRef.current!));
          })(event);
        }}
        className="grid grid-cols-2 gap-4"
      >
        {FORM_FIELDS.map((formField, index) => (
          <FormField
            key={formField.name}
            control={form.control}
            name={formField.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={formField.name}>
                  {formField.label}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={formField.placeholder}
                    {...field}
                    autoFocus={index === 0}
                  />
                </FormControl>
                {formField.description && (
                  <FormDescription>{formField.description}</FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <div className="col-span-2">
          <EnhancedButton type="submit" variant="gooeyRight">
            Add Car
          </EnhancedButton>
        </div>
      </form>
    </Form>
  );
};

export default CarForm;
