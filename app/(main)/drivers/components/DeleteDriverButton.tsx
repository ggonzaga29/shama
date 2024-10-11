'use client';

import { TrashCan } from '@carbon/icons-react';
import { deleteDriver } from 'app/drivers/actions';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from 'src/components/ui/Button';

const DeleteDriverButton = ({ id }: { id: string }) => {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      className="flex items-center justify-center gap-2"
      onClick={async () => {
        toast.promise(
          deleteDriver({
            id,
          }),
          {
            loading: 'Deleting driver...',
            success: 'Driver deleted',
            error: 'Failed to delete driver',
          }
        );

        router.push('/fleet/drivers');
      }}
    >
      <TrashCan size={16} />
      Delete
    </Button>
  );
};

export default DeleteDriverButton;
