import { getAllCars } from 'src/modules/cars/actions';
import CarGridCard from 'src/modules/cars/components/CarGridCard';

export default async function CarGrid() {
  const cars = await getAllCars();

  return (
    <div className="grid grid-cols-4 gap-6">
      {cars?.map((car) => <CarGridCard key={car.id} car={car} />)}
    </div>
  );
}
