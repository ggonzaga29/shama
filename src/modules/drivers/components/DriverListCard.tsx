import Link from 'next/link';
import { Driver } from 'src/common/types';
import { Avatar, AvatarFallback, AvatarImage } from 'src/components/ui/Avatar';

const DriverListCard = ({
  driver: { id, first_name, last_name },
}: {
  driver: Driver;
}) => {
  return (
    <Link href={`/fleet/drivers/${id}`}>
      <div className="flex items-center gap-2 border-b px-4 py-2 text-sm transition-colors hover:bg-secondary">
        <Avatar>
          <AvatarFallback>GG</AvatarFallback>
        </Avatar>
        <div>
          <span>
            {first_name} {last_name}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default DriverListCard;
