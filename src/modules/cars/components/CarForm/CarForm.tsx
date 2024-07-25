'use client';

import { submitCarForm } from 'src/modules/cars/actions';
import { type CarFormSchema, carFormSchema } from 'src/modules/cars/schema';
import FormRenderer, {
  FormFieldDefinitionArray,
} from 'src/components/FormRenderer';
import { useAddCarContext } from 'src/modules/cars/context/AddCarContext';

const FORM_FIELDS: FormFieldDefinitionArray<CarFormSchema> = [
  {
    name: 'name',
    label: 'Name',
    placeholder: 'e.g. Yaris Cross',
    description:
      'The name of the vehicle. This will be used for bookings and invoices.',
  },
  {
    name: 'license_plate',
    label: 'License plate',
    placeholder: 'e.g. XYZ 123',
    description:
      'The license plate of the vehicle. This will be used for bookings and invoices.',
  },
  {
    name: 'default_price',
    label: 'Default price',
    type: 'number',
    placeholder: 'e.g. 1500',
    description:
      'The default booking price for the vehicle. This can be later changed in the booking form. (Number, Decimal)',
  },
  {
    name: 'transmission',
    label: 'Transmission',
    placeholder: 'e.g. AT, MT, CVT',
    description: 'The transmission type of the vehicle.',
  },
  {
    name: 'fuel_type',
    label: 'Fuel type',
    placeholder: 'e.g. Gasoline, Diesel',
    description: 'The fuel type of the vehicle.',
  },
  {
    name: 'seating_capacity',
    label: 'Seating capacity',
    type: 'number',
    placeholder: 'e.g. 4',
    description: 'The seating capacity of the vehicle.',
  },
  {
    name: 'model',
    label: 'Model',
    placeholder: 'e.g. 1.6L Turbo MT',
    description: 'The model of the vehicle.',
  },
  {
    name: 'type',
    label: 'Type',
    placeholder: 'e.g. Sedan',
    description: 'The type of the vehicle.',
  },
  {
    name: 'displacement',
    label: 'Displacement',
    placeholder: 'e.g. 2500cc, 3.0L',
    description: 'The displacement of the vehicle.',
  },
  {
    name: 'fuel_capacity',
    label: 'Fuel capacity',
    placeholder: 'e.g. 100L',
    description: 'The fuel capacity of the vehicle.',
  },
  {
    name: 'power_transmission',
    label: 'Power transmission',
    placeholder: 'e.g. CVT',
    description: 'The power transmission of the vehicle.',
  },
  {
    name: 'tires',
    label: 'Tires',
    placeholder: 'e.g. P255/45R17',
    description: 'The tires of the vehicle.',
  },
  {
    name: 'wheels',
    label: 'Wheels',
    placeholder: 'e.g. 20", 2.0',
    description: 'The wheels of the vehicle.',
  },
  {
    name: 'image_url',
    label: 'Image URL',
    type: 'text',
    placeholder: 'e.g. https://example.com/image.jpg',
    description: 'The URL of the image of the vehicle.',
  },
];

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
      fields={FORM_FIELDS}
      formAction={submitCarForm}
      columns={2}
      submitButtonLabel="Add Car"
      defaultValues={defaultValues}
      redirectUrl='/cars'
    />
  );
};

export default CarForm;
