import { createClient } from 'src/common/lib/supabase/server';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from 'src/components/ui/Card';
import UserDetailsForm from 'src/modules/account/components/UserDetailsForm';

export default async function UserDetailsFormWrapper() {
  const supabase = createClient();
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
