'use client';

import { createClientFormFields } from 'src/common/lib/forms';
import FormRenderer from 'src/components/FormRenderer/FormRenderer';
import { submitClientForm } from 'src/modules/clients/actions';
import { clientFormSchema } from 'src/modules/clients/schema';

const AddClientForm = () => {
  return (
    <div className="w-full rounded-lg bg-white p-6">
      <FormRenderer
        schema={clientFormSchema}
        fields={createClientFormFields}
        formAction={submitClientForm}
        columns={2}
        submitButtonLabel="Add Client"
        redirectUrl="/clients"
      />
    </div>
  );
};

export default AddClientForm;
