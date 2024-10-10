'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { queryKeys } from 'src/common/lib/queryKeys';
import { createBrowserClient } from 'src/common/lib/supabase/browserClient';
import { cn } from 'src/common/utils/cvaUtils';
import { Button } from 'src/components/ui/Button';
import { Input } from 'src/components/ui/Input';
import { getCarById } from 'src/modules/cars/data';

const CarDetail = ({
  className,
  title,
  value,
}: {
  className?: string;
  title: string;
  value: string;
}) => {
  return (
    <div className={cn('flex justify-between border-b py-2', className)}>
      <p className="text-muted-foreground">{title}</p>
      <p className="font-bold">{value}</p>
    </div>
  );
};

const CarDetailPage = ({ id }: { id: string }) => {
  const supabase = createBrowserClient();
  const { data } = useQuery({
    queryKey: queryKeys.cars.byId(id),
    queryFn: () => getCarById(supabase, id),
  });

  const {
    name,
    model,
    license_plate,
    transmission,
    fuel_type,
    seating_capacity,
    displacement,
    fuel_capacity,
    default_price,
  } = data ?? {};

  return (
    <div className="grid grid-cols-12">
      <section className="col-span-4 p-4">
        <Image
          src={`cars/${data?.image_url}`}
          alt="Hello"
          width={256}
          height={256}
          className="size-full object-contain"
        />
      </section>
      <section className="col-span-8 row-span-2 border-l">
        <div className="flex items-center gap-2 p-4">
          <div className="size-16 p-2">
            <Image
              src={`assets/images/toyotaLogo.png`}
              alt="Toyota Logo"
              width={64}
              height={64}
              className="size-full object-contain"
            />
          </div>
          <div className="space-y-2">
            <h1 className="block text-xl font-bold">
              {name}, {model}
            </h1>

            <p className="text-sm text-muted-foreground">{license_plate}</p>
          </div>
        </div>

        <div className="mx-4 my-2 border">Current Order</div>

        <div className="mt-4 grid grid-cols-2 p-4">
          <div className="mt-2 flex flex-col space-y-2">
            {name && <CarDetail title="Name" value={name} />}
            {model && <CarDetail title="Model" value={model} />}
            {license_plate && (
              <CarDetail title="License Plate" value={license_plate} />
            )}
            {transmission && (
              <CarDetail title="Transmission" value={transmission} />
            )}
            {fuel_type && <CarDetail title="Fuel Type" value={fuel_type} />}
            {seating_capacity && (
              <CarDetail
                title="Seating Capacity"
                value={seating_capacity.toString()}
              />
            )}
            {displacement && (
              <CarDetail title="Displacement" value={`${displacement}cc`} />
            )}
            {fuel_capacity && (
              <CarDetail title="Fuel Capacity" value={`${fuel_capacity}L`} />
            )}
          </div>
          <div></div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t p-4">
          <div className="flex grow items-center gap-2">
            <span className="font-bold text-muted-foreground">Price</span>
            <Input
              type="number"
              className="max-w-32"
              placeholder="Add custom pricing"
              defaultValue={default_price ?? 0}
            />
            <div className="flex">per Day</div>
          </div>
          <Button>Add to Order</Button>
        </div>
      </section>
      <section className="col-span-4 border-t p-4">order history</section>
    </div>
  );
};

export default CarDetailPage;
