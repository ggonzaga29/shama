import { Dashboard } from '@carbon/icons-react';
import ContentLayout from 'src/components/ContentLayout';

export const metadata = {
  title: 'Dashboard | Shama Travel & Tours',
};

export default async function PrivatePage() {
  return (
    <ContentLayout title="Dashboard" Icon={<Dashboard className="size-6" />}>
      Dashboard
    </ContentLayout>
  );
}
