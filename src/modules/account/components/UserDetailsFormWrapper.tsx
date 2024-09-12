// import { updateUserDetailsFormFields } from 'src/common/lib/forms';
// import { UserProfile } from 'src/common/types';
// import FormRenderer from 'src/components/FormRenderer/FormRenderer';
import { createClient } from 'src/common/lib/supabase/server';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from 'src/components/ui/Card';
import UserDetailsForm from 'src/modules/account/components/UserDetailsForm';
// import { updateUserDetails } from 'src/modules/account/actions';
// import { userDetailsSchema } from 'src/modules/account/schema';

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
        {/* <FormRenderer
          schema={userDetailsSchema}
          fields={updateUserDetailsFormFields}
          formAction={updateUserDetails}
          columns={2}
          submitButtonLabel="Update"
          defaultValues={{
            user_id: id ?? '',
            first_name: first_name ?? '',
            last_name: last_name ?? '',
            phone: phone ?? '',
            address: address ?? '',
            gender: validGender,
          }}
        /> */}
      </CardContent>
    </Card>
  );
}
