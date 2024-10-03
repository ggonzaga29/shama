import { Add } from '@carbon/icons-react';
import Link from 'next/link';
import { Button } from 'src/components/ui/Button';
import { Input } from 'src/components/ui/Input';
import { getAllCars } from 'src/modules/cars/actions';
import CarGridCard from 'src/modules/cars/components/CarGridCard';

export default async function CarGrid() {
  const cars = await getAllCars();

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <Input placeholder="Search for a vehicle" />
        </div>

        <Link href="/fleet/cars/add">
          <Button variant="outline" className="flex items-center gap-2">
            <Add size={16} />
            Add Vehicle
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {cars?.map((car) => <CarGridCard key={car.id} car={car} />)}
      </div>
    </div>
  );
}
