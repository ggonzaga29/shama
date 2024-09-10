'use client';

// import FileUploader from 'src/components/FileUploader/FileUploader';
import { userAvatarFormFields } from 'src/common/lib/forms';
import FormRenderer from 'src/components/FormRenderer/FormRenderer';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from 'src/components/ui/Card';
import { submitAvatarForm } from 'src/modules/account/actions';
import { userAvatarSchema } from 'src/modules/account/schema';

const UserAvatarForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Picture</CardTitle>
        <CardDescription>Upload a profile picture</CardDescription>
      </CardHeader>
      <CardContent>
        <FormRenderer
          fields={userAvatarFormFields}
          formAction={submitAvatarForm}
          schema={userAvatarSchema}
        />
      </CardContent>
    </Card>
  );
};

export default UserAvatarForm;
