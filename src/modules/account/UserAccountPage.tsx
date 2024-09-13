import { User } from '@carbon/icons-react';
import { Suspense } from 'react';
import ContentLayout from 'src/components/ContentLayout';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from 'src/components/ui/Breadcrumb';
import UserAvatarForm from 'src/modules/account/components/UserAvatarForm';
import UserDetailsFormWrapper from 'src/modules/account/components/UserDetailsFormWrapper';
import UserPreferencesForm from 'src/modules/account/components/UserPreferencesForm';

export default async function AccountPage() {
  return (
    <ContentLayout title="Account" Icon={<User className="size-6" />}>
      <Breadcrumb>
        <BreadcrumbList>
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
