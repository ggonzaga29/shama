import { Suspense } from 'react';
import CarGridSkeleton from 'src/modules/cars/components/CarGridSkeleton';
import ContentLayout from 'src/components/ContentLayout';
import CarGrid from 'src/modules/cars/components/CarGrid';
import { Car } from '@carbon/icons-react';

export default async function CarsPage() {
  return (
    <ContentLayout title="Vehicle Inventory" Icon={<Car className='w-6 h-6' />}>
      <Suspense fallback={<CarGridSkeleton />}>
        <CarGrid />
      </Suspense>
    </ContentLayout>
  );
}
