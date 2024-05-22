import Image from "next/image";

type LogoWithTextProps = {
  className?: string;
};

export default function LogoWithText({ className }: LogoWithTextProps) {
  return (
    <Image
      src="/logoDarkWithText.png"
      alt="Logo"
      width={256}
      height={110}
      className={className}
    />
  );
}
