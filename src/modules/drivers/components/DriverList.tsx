import { Input } from 'src/components/ui/Input';
import { getDriverList } from 'src/modules/drivers/actions';
import DriverListCard from 'src/modules/drivers/components/DriverListCard';

const DriverList = async () => {
  const { data } = (await getDriverList()) || {};

  return (
    <div className="flex max-h-full flex-col overflow-y-scroll">
      <div className="sticky top-0 z-10 bg-background p-4 shadow-md dark:border-b">
        <Input placeholder="Search drivers" />
      </div>
      {data?.map((driver) => (
        <DriverListCard key={driver.id} driver={driver} />
      ))}
    </div>
  );
};

export default DriverList;
