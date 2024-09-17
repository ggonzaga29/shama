'use client';

import { AddAlt } from '@carbon/icons-react';
import { useState } from 'react';
import { Button } from 'src/components/ui/Button';
import {
  EnhancedDialog,
  EnhancedDialogBody,
  EnhancedDialogContent,
  EnhancedDialogFooter,
  EnhancedDialogTrigger,
} from 'src/components/ui/EnhancedDialog';
import { ScrollArea } from 'src/components/ui/Scrollarea';
import AddPersonalClientForm from 'src/modules/clients/components/AddPersonalClientForm';

const AddClientModal = () => {
  const [open, setOpen] = useState(false);

  // const onSuccess = () => {
  //   setOpen(false);
  // };

  return (
    <EnhancedDialog open={open} onOpenChange={setOpen}>
      <EnhancedDialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center justify-center gap-2"
        >
          <AddAlt size={16} />
          Add a Client
        </Button>
      </EnhancedDialogTrigger>
      <EnhancedDialogContent className="h-screen min-w-full overflow-y-auto">
        <EnhancedDialogBody>
          <ScrollArea>
            {/* <FormRenderer
              schema={clientFormSchema}
              fields={createClientFormFields}
              formAction={submitClientForm}
              onSuccess={onSuccess}
              columns={2}
              submitButtonLabel="Add Client"
              redirectUrl="/clients"
              className="px-1"
            /> */}
            <AddPersonalClientForm />
          </ScrollArea>
        </EnhancedDialogBody>
        <EnhancedDialogFooter>&nbsp;</EnhancedDialogFooter>
      </EnhancedDialogContent>
    </EnhancedDialog>
  );
};

export default AddClientModal;
