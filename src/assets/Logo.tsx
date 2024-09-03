'use client';

import SupabaseImage from 'src/components/SupabaseImage';
import { cn } from 'src/common/utils/cvaUtils';
import { useTheme } from 'next-themes';

interface LogoProps {
  className?: string;
  theme?: 'light' | 'dark';
}

export default function Logo({ className, }: LogoProps) {
  const { resolvedTheme: theme } = useTheme();

  return (
    <SupabaseImage
      src={
        theme === 'dark'
          ? 'assets/images/logoLight.png'
          : 'assets/images/logoDark.png'
      }
      alt="Logo"
      width={97}
      height={128}
      className={cn(theme === 'light' ? 'invert' : 'invert-0', className)}
      priority={true}
    />
  );
}
