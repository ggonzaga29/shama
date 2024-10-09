import { User } from '@carbon/icons-react';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import ContentLayout from 'src/components/ContentLayout';
import {
  Breadcrumb,
  BreadcrumbBackButtton,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from 'src/components/ui/Breadcrumb';

const UserAvatarForm = dynamic(
  () => import('src/modules/account/components/UserAvatarForm')
);
const UserDetailsFormWrapper = dynamic(
  () => import('src/modules/account/components/UserDetailsFormWrapper')
);
const UserPreferencesForm = dynamic(
  () => import('src/modules/account/components/UserPreferencesForm')
);

export default async function AccountPage() {
  return (
    <ContentLayout title="Account" Icon={<User className="size-6" />}>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbBackButtton />
          <BreadcrumbItem>
            <BreadcrumbLink href={'/'}>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Account</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mt-6 grid grid-cols-1 gap-4">
        {/* User Avatar Form */}
        <UserAvatarForm />
        {/* User Details Form */}
        <Suspense>
          <UserDetailsFormWrapper />
        </Suspense>
        {/* User Preferences Form */}
        <UserPreferencesForm />
      </div>
    </ContentLayout>
  );
}
