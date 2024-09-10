import { Dashboard } from '@carbon/icons-react';
import { createClient } from 'src/common/lib/supabase/server';
import ContentLayout from 'src/components/ContentLayout';
import { Button } from 'src/components/ui/Button';

export const metadata = {
  title: 'Dashboard | Shama Travel & Tours',
};

export default async function PrivatePage() {
  return (
    <ContentLayout
      title="Dashboard"
      Icon={<Dashboard className="h-6 w-6" />}
    >
      Dashboard
    </ContentLayout>
  );
}
