import UserDetailsForm from 'app/account/components/UserDetailsForm';
import { createServerClient } from 'src/common/lib/supabase/serverClient';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from 'src/components/ui/Card';

export default async function UserDetailsFormWrapper() {
  const supabase = createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from('profiles')
    .select()
    .eq('id', user?.id ?? '')
    .single();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Details</CardTitle>
        <CardDescription>Update your profile details</CardDescription>
      </CardHeader>
      <CardContent>
        <UserDetailsForm profile={data} />
      </CardContent>
    </Card>
  );
}
