'use client';

import FormRenderer, {
  FormFieldDefinitionArray,
} from 'src/components/FormRenderer';
// Don't confuse with createClient from supabase
import { submitClientForm } from 'src/modules/clients/actions';
import { ClientFormSchema, clientFormSchema } from 'src/modules/clients/schema';

const FORM_FIELDS: FormFieldDefinitionArray<ClientFormSchema> = [
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
    required: false,
  },
];

const AddClientForm = () => {
  return (
    <div className="w-full rounded-lg bg-white p-6">
      <FormRenderer
        schema={clientFormSchema}
        fields={FORM_FIELDS}
        formAction={submitClientForm}
        columns={2}
        submitButtonLabel="Add Client"
        redirectUrl="/clients"
      />
    </div>
  );
};

export default AddClientForm;
