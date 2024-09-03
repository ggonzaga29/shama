import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from 'src/components/ui/Card';
import FileUploader from 'src/components/FileUploader/FileUploader';
import { uploadAvatar } from 'src/modules/account/actions';

const UserAvatarForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Picture</CardTitle>
        <CardDescription>Upload a profile picture</CardDescription>
      </CardHeader>
      <CardContent>
        <FileUploader
          onUpload={uploadAvatar}
          acceptedFileTypes={{
            'image/jpeg': [],
            'image/png': [],
          }}
        />
      </CardContent>
    </Card>
  );
};

export default UserAvatarForm;
