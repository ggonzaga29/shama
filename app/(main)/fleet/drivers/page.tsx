import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const DriverList = dynamic(
  () => import('src/modules/drivers/components/DriverList')
);

export default function DriversPage() {
  return (
    <div className="max-w-[300px] flex-1">
      <Suspense fallback={<div>Loading Drivers...</div>}>
        <DriverList />
      </Suspense>
    </div>
  );
}
