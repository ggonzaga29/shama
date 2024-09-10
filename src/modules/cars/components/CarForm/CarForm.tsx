'use client';

import { submitCarForm } from 'src/modules/cars/actions';
import { carFormSchema } from 'src/modules/cars/schema';
import FormRenderer from 'src/components/FormRenderer/FormRenderer';
import { useAddCarContext } from 'src/modules/cars/context/AddCarContext';
import { createCarFormFields } from 'src/common/lib/forms';

const CarForm = () => {
  const { selectedVehicle, selectedVariant } = useAddCarContext();

  const defaultValues = {
    name: selectedVehicle?.name ?? '',
    model: selectedVariant?.name ?? '',
    transmission: selectedVariant?.transmission ?? '',
    fuel_type: selectedVariant?.fuel_type ?? '',
    seating_capacity: selectedVariant?.seating_capacity ?? 0,
    fuel_capacity: selectedVariant?.fuel_capacity ?? '',
    power_transmission: selectedVariant?.power_transmission ?? '',
    tires: selectedVariant?.tires ?? '',
    wheels: selectedVariant?.wheels ?? '',
    displacement: selectedVariant?.displacement ?? '',
    image_url: selectedVariant?.vehicle_variant_images?.[0]?.url ?? '',
  };

  return (
    <FormRenderer
      schema={carFormSchema}
      fields={createCarFormFields}
      formAction={submitCarForm}
      columns={2}
      submitButtonLabel="Add Car"
      defaultValues={defaultValues}
      redirectUrl="/cars"
    />
  );
};

export default CarForm;
