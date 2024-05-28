import Image from "next/image";
import { cn } from "src/common/utils/cvaUtils";

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <Image
      src="/logoLight.png"
      className={cn(className)}
      alt="Logo"
      width={97}
      height={128}
      priority={true}
    />
  );
}
