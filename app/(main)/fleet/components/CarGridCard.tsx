/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import {
  Add,
  Checkmark,
  Edit,
  ErrorOutline,
  GasStation,
  Gears,
  InProgress,
  List,
  PassengerPlus,
  Settings,
  Tools,
  TrashCan,
  View,
} from '@carbon/icons-react';
import { deleteCar } from 'app/fleet/actions';
import { Armchair, CirclePlus, Cog, Droplet, Fuel, Info } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { toast } from 'sonner';
import { Car, Table } from 'src/common/types';
import { Database } from 'src/common/types/supabase';
import { cn } from 'src/common/utils/cvaUtils';
import { Badge } from 'src/components/ui/Badge';
import { Button } from 'src/components/ui/Button';
import { Card, CardContent } from 'src/components/ui/Card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'src/components/ui/DropdownMenu';

type CarGridCardProps = {
  car: Table<'vehicles'>;
};

const CarGridCard: FC<CarGridCardProps> = ({ car }) => {
  return (
    <Card>
      <CardContent className="grid grid-cols-1 p-0">
        <div className="relative h-[200px] w-full border-b p-4">
          <Image
            src={`cars/${car.image_url ?? ''}`}
            alt={car.name ?? ''}
            width={100}
            height={45}
            sizes="100vw"
            className="size-full object-contain"
            priority={true}
          />

          {car.status && (
            <Badge
              title={car.status.toLocaleUpperCase()}
              variant="default"
              className={cn(
                'absolute right-4 top-4 flex size-7 items-center justify-center p-0 text-xs',
                car.status === 'available'
                  ? 'bg-green-500 hover:bg-green-500'
                  : car.status === 'under maintenance'
                    ? 'bg-yellow-500 hover:bg-yellow-500'
                    : 'bg-red-500 hover:bg-red-500'
              )}
            >
              {car.status === 'available' ? (
                <Checkmark className="size-4" />
              ) : car.status === 'under maintenance' ? (
                <Tools className="size-4" />
              ) : (
                <InProgress className="size-4" />
              )}
            </Badge>
          )}
        </div>

        <div className="grid h-full grid-cols-1 p-4">
          <div className="flex h-full flex-col justify-between">
            <div className="flex items-center justify-between">
              <div>
                <h5 className="scroll-m-20 text-lg font-medium tracking-tight">
                  {car.name}
                  <span className="ml-2 text-xs text-muted-foreground">
                    {car.model}
                  </span>
                </h5>
              </div>
              <span className="text-sm">
                <span className="font-bold">Php</span>
                {car.default_price} / Day
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{car.license_plate}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 border-t p-4">
          <span className="flex items-center gap-2 text-sm">
            <PassengerPlus size={16} />
            {car.seating_capacity}
          </span>
          <span className="flex items-center gap-2 text-sm">
            <Gears size={16} />
            {car.transmission}
          </span>
          <span className="flex items-center gap-2 text-sm">
            <GasStation size={16} />
            {car.fuel_type}
          </span>
        </div>

        <div className="flex h-full gap-2 border-t p-4">
          <Link href={`/fleet/cars/${car.id}`} className="flex grow">
            <Button className="w-full">
              <View className="mr-2 size-4" />
              View
            </Button>
          </Link>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="outline">
                  <List size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-24">
                <DropdownMenuLabel className="">
                  <div className="text-sm font-bold">Actions</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <div className="flex items-center gap-2 text-sm">
                      <Edit size={14} />
                      Edit
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <div
                      className="flex items-center gap-2 text-sm"
                      onClick={() =>
                        toast.promise(
                          deleteCar({
                            id: car.id,
                          }),
                          {
                            loading: 'Deleting...',
                            success: 'Car deleted successfully.',
                            error: 'An error occurred while deleting the car.',
                          }
                        )
                      }
                    >
                      <TrashCan size={14} />
                      Delete
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarGridCard;
