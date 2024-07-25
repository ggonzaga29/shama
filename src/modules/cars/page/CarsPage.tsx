import { Download, Plus } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import PageHeader from 'src/components/PageHeader/PageHeader';
import { EnhancedButton } from 'src/components/ui/EnhancedButton';
import CarGridSkeleton from 'src/modules/cars/components/CarGridSkeleton';
import CarGrid from 'src/modules/cars/components/CarGrid';

export default async function CarsPage() {
  return (
    <>
      <PageHeader>
        <PageHeader.Title as="h2">Car Catalogue</PageHeader.Title>

        <PageHeader.Aside>
          <Link href="/cars/form">
            <EnhancedButton variant="gooeyRight" Icon={Plus}>
              Add Car
            </EnhancedButton>
          </Link>
          <EnhancedButton
            variant="gooeyRight"
            Icon={Download}
            iconPlacement="left"
          >
            Export Data
          </EnhancedButton>
        </PageHeader.Aside>
      </PageHeader>
      <Suspense fallback={<CarGridSkeleton />}>
        <CarGrid />
      </Suspense>
    </>
  );
}
