'use client';

import { AddAlt } from '@carbon/icons-react';
import { useState } from 'react';
import { createClientFormFields } from 'src/common/lib/forms';
import FormRenderer from 'src/components/FormRenderer/FormRenderer';
import { Button } from 'src/components/ui/Button';
import {
  EnhancedDialog,
  EnhancedDialogBody,
  EnhancedDialogContent,
  EnhancedDialogFooter,
  EnhancedDialogHeader,
  EnhancedDialogTitle,
  EnhancedDialogTrigger,
} from 'src/components/ui/EnhancedDialog';
import { ScrollArea } from 'src/components/ui/Scrollarea';
import { submitClientForm } from 'src/modules/clients/actions';
import { clientFormSchema } from 'src/modules/clients/schema';

const AddClientModal = () => {
  const [open, setOpen] = useState(false);

  const onSuccess = () => {
    setOpen(false);
  };

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
      <EnhancedDialogContent className="w-full max-w-[40rem]">
        <EnhancedDialogHeader>
          <EnhancedDialogTitle>Add a Client</EnhancedDialogTitle>
        </EnhancedDialogHeader>
        <EnhancedDialogBody className="w-full max-w-[50rem]">
          <ScrollArea className="h-full max-h-[75vh] overflow-y-auto">
            <FormRenderer
              schema={clientFormSchema}
              fields={createClientFormFields}
              formAction={submitClientForm}
              onSuccess={onSuccess}
              columns={2}
              submitButtonLabel="Add Client"
              redirectUrl="/clients"
            />
          </ScrollArea>
        </EnhancedDialogBody>
        <EnhancedDialogFooter>&nbsp;</EnhancedDialogFooter>
      </EnhancedDialogContent>
    </EnhancedDialog>
  );
};

export default AddClientModal;
