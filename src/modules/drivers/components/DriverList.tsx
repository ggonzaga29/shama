import { ScrollArea, ScrollBar } from 'src/components/ui/Scrollarea';
import { getAllDrivers } from 'src/modules/drivers/actions';
import DriverListCard from 'src/modules/drivers/components/DriverListCard';

const DriverList = async () => {
  const { data = [] } = (await getAllDrivers()) || {};

  return (
    <ScrollArea className="flex flex-col overflow-y-scroll max-h-full">
      <ScrollBar />
      {data.map((driver) => (
        <DriverListCard key={driver.id} driver={driver} />
      ))}
    </ScrollArea>
  );
};

export default DriverList;
