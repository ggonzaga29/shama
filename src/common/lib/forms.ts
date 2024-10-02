// All Forms used for FormRenderer
// Defined in this file so I can manage all forms in one place
// NOTE: Some forms may be custom and not used in the FormRenderer

import { FormFieldDefinitionArray } from 'src/components/FormRenderer/types';
import {
  UserAvatarSchema,
  UserDetailsSchema,
} from 'src/modules/account/schema';
import { CarFormSchema } from 'src/modules/cars/schema';
import { ClientFormSchema } from 'src/modules/clients/schema';
import { AddDriverSchema } from 'src/modules/drivers/schema';

// Client Create Form Fields
export const createClientFormFields: FormFieldDefinitionArray<ClientFormSchema> =
  [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      placeholder: 'e.g. John Doe',
      description: 'The name of the client.',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      placeholder: 'e.g. john@example.com',
      description: 'The email of the client.',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone',
      placeholder: 'e.g. +639123456789',
      description: 'The phone number of the client.',
    },
    {
      name: 'customer_type',
      label: 'Business Type',
      placeholder: 'e.g. 1234567890',
      type: 'select',
      selectOptions: [
        { label: 'Personal', value: 'personal' },
        { label: 'Hotel', value: 'hotel' },
        { label: 'Travel Agency', value: 'travel_agency' },
        { label: 'Other', value: 'other' },
      ],
      description: 'The type of business this client represents.',
    },
    {
      name: 'notes',
      label: 'Notes',
      type: 'textarea',
      placeholder: 'e.g. This is a note.',
      description: 'Any additional notes about the client.',
      colspan: 2,
      required: false,
    },
  ];

// Car Create Form Fields
export const createCarFormFields: FormFieldDefinitionArray<CarFormSchema> = [
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

// User Details Form Fields (updating Profile Details)
export const updateUserDetailsFormFields: FormFieldDefinitionArray<UserDetailsSchema> =
  [
    {
      name: 'user_id',
      type: 'hidden',
    },
    {
      name: 'first_name',
      label: 'First Name',
      placeholder: 'e.g. John',
      description: 'The name of the user.',
    },
    {
      name: 'last_name',
      label: 'Last Name',
      placeholder: 'e.g. Doe',
      description: 'The last name of the user.',
    },
    {
      name: 'gender',
      label: 'Gender',
      placeholder: 'e.g. Male',
      type: 'select',
      selectOptions: [
        {
          label: 'Male',
          value: 'Male',
        },
        {
          label: 'Female',
          value: 'Female',
        },
      ],
      description: 'The gender of the user.',
    },
    {
      name: 'phone',
      label: 'Phone',
      placeholder: 'e.g. 123-456-7890',
      description: 'The phone number of the user.',
    },
    {
      name: 'address',
      label: 'Address',
      placeholder: 'e.g. 144-E V. Rama Guadalupe, Cebu City',
      description: 'The address of the user.',
    },
  ];

export const userAvatarFormFields: FormFieldDefinitionArray<UserAvatarSchema> =
  [
    {
      name: 'avatar',
      type: 'file',
      description:
        'Upload an image for your profile picture. (JPG, JPEG, PNG, WEBP)',
      accept: 'image/*',
    },
  ];

export const addDriverFormFields: FormFieldDefinitionArray<AddDriverSchema> = [
  {
    name: 'email',
    type: 'email',
    label: 'Email',
  },
  {
    name: 'first_name',
    label: 'First Name',
  },
  {
    name: 'middle_name',
    label: 'Middle Name',
  },
  {
    name: 'last_name',
    label: 'Last Name',
  },
  {
    name: 'phone',
    label: 'Phone',
  },
  {
    name: 'license_number',
    label: 'License Number',
  },
  {
    name: 'avatar',
    type: 'file',
    description:
      'Upload an image for your profile picture. (JPG, JPEG, PNG, WEBP)',
    accept: 'image/*',
  },
];
