import { Navbar } from 'src/components/Navbar/Navbar';

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
  Icon?: React.ReactNode;
}

export default function ContentLayout({
  title,
  children,
  Icon,
}: ContentLayoutProps) {
  return (
    <div className="relative">
      {/* <div className="z-1 absolute inset-0 size-full min-h-screen bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:invert"></div> */}
      <div className="relative z-10">
        <Navbar title={title} Icon={Icon} />
        <div className="px-4 py-6 sm:px-8">{children}</div>
      </div>
    </div>
  );
}
