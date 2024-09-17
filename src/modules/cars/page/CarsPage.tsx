import { Car } from '@carbon/icons-react';
import { Suspense } from 'react';
import ContentLayout from 'src/components/ContentLayout';
import CarGrid from 'src/modules/cars/components/CarGrid';
import CarGridSkeleton from 'src/modules/cars/components/CarGridSkeleton';

export default async function CarsPage() {
  return (
    <ContentLayout title="Vehicle Inventory" Icon={<Car className="size-6" />}>
      <Suspense fallback={<CarGridSkeleton />}>
        <CarGrid />
      </Suspense>
    </ContentLayout>
  );
}
