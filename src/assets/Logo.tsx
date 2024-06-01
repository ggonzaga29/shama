import Image from "next/image";
import { cn } from "src/common/utils/cvaUtils";

interface LogoProps {
  className?: string;
  theme?: "light" | "dark";
}

export default function Logo({ className, theme = "light" }: LogoProps) {
  return (
    <Image
      src="/logoDark.png"
      alt="Logo"
      width={97}
      height={128}
      className={cn(theme === "light" ? "invert" : "invert-0", className)}
      priority={true}
    />
  );
}
