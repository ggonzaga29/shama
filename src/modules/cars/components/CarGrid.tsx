import { getAllCars } from 'src/modules/cars/actions';
import CarGridCard from 'src/modules/cars/components/CarGridCard';

export default async function CarGrid() {
  const cars = await getAllCars();

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {cars?.map((car) => <CarGridCard key={car.id} car={car} />)}
    </div>
  );
}
