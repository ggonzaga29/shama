'use client';

import { AddAlt } from '@carbon/icons-react';
import AddPersonalClientForm from 'app/clients/components/AddPersonalClientForm';
import { useState } from 'react';
import { Button } from 'src/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from 'src/components/ui/Dialog';
import { ScrollArea } from 'src/components/ui/Scrollarea';

const AddClientModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center justify-center gap-2"
        >
          <AddAlt size={16} />
          Add a Personal Client
        </Button>
      </DialogTrigger>
      <DialogContent className="h-screen min-w-full overflow-y-auto">
        <DialogHeader>
          <h2 className="text-2xl font-semibold">Add a Client</h2>
        </DialogHeader>
        <ScrollArea>
          <AddPersonalClientForm setOpen={setOpen} />
        </ScrollArea>
        {/* <DialogFooter>&nbsp;</DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};

export default AddClientModal;
