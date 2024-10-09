'use client';

import { Send } from '@carbon/icons-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useHookFormActionErrorMapper } from '@next-safe-action/adapter-react-hook-form/hooks';
import { useRouter } from 'next/navigation';
import { Infer } from 'next-safe-action/adapters/types';
import { useAction } from 'next-safe-action/hooks';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { cn } from 'src/common/utils/cvaUtils';
import { mapInputToFormData } from 'src/common/utils/formUtils';
import FileDropzoneField from 'src/components/FIelds/FileDropzoneField';
import TextField from 'src/components/FIelds/TextField';
import { EnhancedButton } from 'src/components/ui/EnhancedButton';
import { Form } from 'src/components/ui/Form';
import { addCar } from 'src/modules/cars/actions';
import { addCarSchema } from 'src/modules/cars/schema';

type FieldValues = Infer<typeof addCarSchema>;

const AddCarForm = () => {
  const router = useRouter();
  const action = useAction(addCar);
  const [isPending, startTransition] = useTransition();

  const { hookFormValidationErrors } = useHookFormActionErrorMapper<
    typeof addCarSchema
  >(action.result.validationErrors, { joinBy: '\n' });

  const form = useForm<FieldValues>({
    resolver: zodResolver(addCarSchema),
    errors: hookFormValidationErrors,
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { isDirty },
  } = form;

  const onSubmit = handleSubmit((input) => {
    startTransition(async () => {
      try {
        const formData = mapInputToFormData(input);
        await action.executeAsync(formData);
        toast.success('Car created successfully.');
        reset();
        router.push('/fleet/cars');
      } catch (e) {
        console.error('Something went wrong with submitting the form. ', e);
      }
    });
  });

  return (
    <Form {...form}>
      <form
        className={cn(
          'grid grid-cols-1 gap-4 px-1 md:grid-cols-2',
          '[&>*]:col-span-2 [&>*]:md:col-span-1'
        )}
        onSubmit={onSubmit}
      >
        <TextField
          name="name"
          control={control}
          label="Name"
          description="The name of the car. Must be at least 3 characters."
        />

        <TextField
          name="transmission"
          control={control}
          label="Transmission"
          description="The type of transmission the car has (e.g., automatic, manual)."
        />

        <TextField
          name="fuel_type"
          control={control}
          label="Fuel Type"
          description="The type of fuel the car uses (e.g., petrol, diesel)."
        />

        <TextField
          name="seating_capacity"
          control={control}
          label="Seating Capacity"
          description="The number of seats available in the car."
        />

        <TextField
          name="model"
          control={control}
          label="Model"
          description="The model of the car."
        />

        <TextField
          name="type"
          control={control}
          label="Type"
          description="The type or category of the car (e.g., SUV, sedan)."
        />

        <TextField
          name="displacement"
          control={control}
          label="Displacement"
          description="The engine displacement of the car."
        />

        <TextField
          name="fuel_capacity"
          control={control}
          label="Fuel Capacity"
          description="The fuel tank capacity of the car."
        />

        <TextField
          name="power_transmission"
          control={control}
          label="Power Transmission"
          description="The type of power transmission the car has."
        />

        <TextField
          name="tires"
          control={control}
          label="Tires"
          description="The type of tires the car uses."
        />

        <TextField
          name="wheels"
          control={control}
          label="Wheels"
          description="The type of wheels the car has."
        />

        <TextField
          name="license_plate"
          control={control}
          label="License Plate"
          description="The car's license plate number. Must be at least 3 characters."
        />

        <TextField
          name="default_price"
          control={control}
          label="Default Price"
          description="The default rental price per day for the car. Must be a positive number."
        />

        <FileDropzoneField<FieldValues>
          name="image"
          control={control}
          label="Image"
          description="Upload an image of the car."
          fileInputProps={{
            hideOnDisabled: true,
            maxFileCount: 1,
          }}
        />
        <div className="!col-span-2">
          <EnhancedButton
            type="submit"
            variant="expandIcon"
            Icon={Send}
            disabled={!isDirty || isPending}
            loading={isPending}
          >
            Add Driver
          </EnhancedButton>
        </div>
      </form>
    </Form>
  );
};

export default AddCarForm;
