import Image from 'next/image';
import { cn } from 'src/common/utils/cvaUtils';

interface LogoProps {
  className?: string;
  theme?: 'light' | 'dark';
}

export default function Logo({ className }: LogoProps) {
  return (
    <Image
      src="assets/images/logoDark.png"
      alt="Logo"
      width={97}
      height={128}
      className={cn('invert dark:invert-0', className)}
      priority
    />
  );
}
