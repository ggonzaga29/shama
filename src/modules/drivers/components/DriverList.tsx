import { getAllDrivers } from 'src/modules/drivers/actions';
import DriverListCard from 'src/modules/drivers/components/DriverListCard';

const DriverList = async () => {
  const { data = [] } = (await getAllDrivers()) || {};

  return (
    <div className="flex max-h-full flex-col overflow-y-scroll">
      {data.map((driver) => (
        <DriverListCard key={driver.id} driver={driver} />
      ))}
    </div>
  );
};

export default DriverList;
