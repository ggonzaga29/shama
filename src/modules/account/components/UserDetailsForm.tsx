'use client';

import FormRenderer, {
  FormFieldDefinitionArray,
} from 'src/components/FormRenderer';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from 'src/components/ui/Card';
import { updateUserDetails } from 'src/modules/account/actions';
import {
  userDetailsSchema,
  UserDetailsSchema,
} from 'src/modules/account/schema';
import { Database } from 'src/common/types/supabase';

const UserDetailsForm = ({
  userProfile,
}: {
  userProfile: Database['public']['Tables']['profiles']['Row'] | null;
}) => {
  const FORM_FIELDS: FormFieldDefinitionArray<UserDetailsSchema> = [
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

  const { first_name, last_name, gender, phone, address } = userProfile || {};

  // Type guard for gender
  const validGender =
    gender === 'Male' || gender === 'Female' ? gender : undefined;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Details</CardTitle>
        <CardDescription>Update your profile details</CardDescription>
      </CardHeader>
      <CardContent>
        <FormRenderer
          schema={userDetailsSchema}
          fields={FORM_FIELDS}
          formAction={updateUserDetails}
          columns={2}
          submitButtonLabel="Update"
          defaultValues={{
            first_name: first_name ?? undefined,
            last_name: last_name ?? undefined,
            gender: validGender,
            phone: phone ?? undefined,
            address: address ?? undefined,
          }}
        />
      </CardContent>
    </Card>
  );
};

export default UserDetailsForm;
