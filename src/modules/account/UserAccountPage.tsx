import { User } from '@carbon/icons-react';
import ContentLayout from 'src/components/ContentLayout';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from 'src/components/ui/Breadcrumb';

import UserAvatarForm from './components/UserAvatarForm';
import UserDetailsForm from 'src/modules/account/components/UserDetailsForm';
import UserPreferencesForm from 'src/modules/account/components/UserPreferencesForm';

import { createClient } from 'src/common/lib/supabase/server';

export default async function AccountPage() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  // get user profile data

  if (!data.user) {
    return null;
  }

  const { data: userProfile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', data.user?.id)
    .single();

  return (
    <ContentLayout title="Account" Icon={<User className="h-6 w-6" />}>
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
        <UserDetailsForm userProfile={userProfile} />
        {/* User Preferences Form */}
        <UserPreferencesForm />
      </div>
    </ContentLayout>
  );
}
