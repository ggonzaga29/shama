'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useRef } from 'react';
import { Driver } from 'src/common/types';
import { cn } from 'src/common/utils/cvaUtils';
import { Avatar, AvatarFallback } from 'src/components/ui/Avatar';

const DriverListCard = ({
  driver,
}: {
  driver: Pick<Driver, 'id' | 'first_name' | 'last_name' | 'avatar_url'>;
}) => {
  const { id, first_name, last_name, avatar_url } = driver;
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
    <Link href={`/drivers/${id}`}>
      <div
        className={cn(
          'flex items-center gap-2 border-b px-4 py-2 text-sm transition-colors hover:bg-secondary',
          isActive ? 'bg-secondary' : 'bg-background'
        )}
        ref={ref}
      >
        <Avatar>
          {avatar_url ? (
            <div className="size-full">
              <Image
                src={`driver_avatars/${avatar_url}`}
                alt="User Avatar"
                width={32}
                height={32}
                priority={true}
                className="size-full object-cover"
              />
            </div>
          ) : (
            <AvatarFallback>{initials}</AvatarFallback>
          )}
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
