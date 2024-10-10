import Image from 'next/image';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex h-screen">
      <div className="relative hidden h-full basis-1/2 bg-primary md:block">
        {/* Overlay */}
        <div className="absolute z-[2] size-full bg-black/80">
          <Image
            src="assets/images/logoDarkWithText.png"
            alt="Logo"
            width={150}
            height={55}
            className="absolute left-8 top-8"
          />
        </div>

        {/* Cover Photo */}
        <Image
          src="assets/images/car_fleet.avif"
          alt="Cover Photo"
          className="absolute z-[1] object-cover"
          fill
        />
      </div>

      <div className="size-full basis-full md:basis-1/2">{children}</div>
    </section>
  );
}
