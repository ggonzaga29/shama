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
    <div>
      <Navbar title={title} Icon={Icon} />
      <div className="px-4 py-8 sm:px-8">{children}</div>
    </div>
  );
}
