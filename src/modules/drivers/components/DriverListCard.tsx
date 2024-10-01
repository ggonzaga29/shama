import { Driver } from 'src/common/types';

const DriverListCard = ({ driver: { first_name } }: { driver: Driver }) => {
  return <div>{first_name}</div>;
};

export default DriverListCard;
