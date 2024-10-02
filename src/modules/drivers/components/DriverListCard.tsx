'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useRef } from 'react';
import { Driver } from 'src/common/types';
import { cn } from 'src/common/utils/cvaUtils';
import { Avatar, AvatarFallback } from 'src/components/ui/Avatar';

const DriverListCard = ({
  driver: { id, first_name, last_name },
}: {
  driver: Pick<Driver, 'id' | 'first_name' | 'last_name'>;
}) => {
  const pathname = usePathname();
  const isActive = useMemo(() => pathname.includes(id), [pathname, id]);
  const initials = useMemo(
    () => `${first_name[0]}${last_name[0]}`,
    [first_name, last_name]
  );
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isActive]);

  return (
    <Link href={`/fleet/drivers/${id}`}>
      <div
        className={cn(
          'flex items-center gap-2 border-b px-4 py-2 text-sm transition-colors hover:bg-secondary',
          isActive ? 'bg-secondary' : 'bg-background'
        )}
        ref={ref}
      >
        <Avatar>
          <AvatarFallback>{initials}</AvatarFallback>
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
