'use client';

import { CircleEllipsis, Eye, Pencil, Trash } from 'lucide-react';
import { Button } from 'src/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'src/components/ui/DropdownMenu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from 'src/components/ui/Dialog';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
} from 'src/components/ui/Table';
import { ScrollArea, ScrollBar } from 'src/components/ui/Scrollarea';
import { Database } from 'src/common/types/supabase';
import debounce from 'debounce';
import { FC, useState, useTransition } from 'react';
import { deleteCar } from 'src/modules/cars/actions';
import { toast } from 'sonner';

type CarGridCardActionsProps = {
  car: Partial<Database['public']['Tables']['vehicles']['Row']>;
};

const CarGridCardActions: FC<CarGridCardActionsProps> = ({ car }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const handleDelete = (id: string) => {
    startTransition(async () => {
      toast.loading(`Deleting ${car.name}...`);
      await deleteCar(id);
      debounce(() => {
        toast.dismiss();
      }, 1000).trigger();
    });
  };

  const tableData = {
    header: [
      'Transmission',
      'Fuel Type',
      'Seating Capacity',
      'model',
      'type',
      'displacement',
      'fuel_capacity',
      'power_transmission',
      'tires',
      'wheels',
    ],
    rows: [
      [
        car.transmission ?? 'N/A',
        car.fuel_type ?? 'N/A',
        car.seating_capacity ?? 'N/A',
        car.model ?? 'N/A',
        car.type ?? 'N/A',
        car.displacement ?? 'N/A',
        car.fuel_capacity ?? 'N/A',
        car.power_transmission ?? 'N/A',
        car.tires ?? 'N/A',
        car.wheels ?? 'N/A',
      ],
    ],
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {car.name ?? ''} {car.model}
            </DialogTitle>
          </DialogHeader>

          <ScrollArea type="always" className="py-4">
            <Table>
              <TableCaption className="text-left">
                Detailed information about the vehicle.
              </TableCaption>
              <TableHeader>
                <TableRow>
                  {tableData.header.map((header) => (
                    <TableCell key={header}>{header}</TableCell>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.rows.map((row) => (
                  <TableRow key={row.join(',')}>
                    {row.map((cell) => (
                      <TableCell key={cell}>{cell}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </DialogContent>
      </Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <CircleEllipsis className="size-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{car.name ?? ''}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Pencil className="mr-2 size-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleDelete(car.id!)}>
            <Trash className="mr-2 size-4" />
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsOpen(true)}>
            <Eye className="mr-2 size-4" />
            View Extra Details
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CarGridCardActions;
