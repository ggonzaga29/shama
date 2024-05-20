import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src="/logo.png"
      alt="Logo"
      width={97}
      height={128}
      priority={true}
    />
  );
}
