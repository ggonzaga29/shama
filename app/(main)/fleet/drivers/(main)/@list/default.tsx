import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const DriverList = dynamic(
  () => import('src/modules/drivers/components/DriverList')
);

export default function DriverListPage() {
  return (
    <div className="w-full max-w-[350px]">
      <Suspense fallback={<span>Loading Drivers...</span>}>
        <DriverList />
      </Suspense>
    </div>
  );
}
