'use client';

import FormRenderer, {
  FormFieldDefinitionArray,
} from 'src/components/FormRenderer';
// Don't confuse with createClient from supabase
import { submitCarForm } from 'src/modules/cars/actions';
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
    placeholder: 'e.g. 1234567890',
    description: 'The phone number of the client.',
  },
];

const AddClientForm = () => {
  return (
    <div className="w-full rounded-lg bg-white p-6">
      <FormRenderer
        schema={clientFormSchema}
        fields={FORM_FIELDS}
        formAction={submitCarForm}
        columns={2}
        submitButtonLabel="Add Client"
      />
    </div>
  );
};

export default AddClientForm;
