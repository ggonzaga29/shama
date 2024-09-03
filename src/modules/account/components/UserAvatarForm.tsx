import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from 'src/components/ui/Card';

const UserAvatarForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Picture</CardTitle>
        <CardDescription>Upload a profile picture</CardDescription>
      </CardHeader>
      <CardContent>
        {/* <FileUploader
          maxFileCount={4}
          maxSize={4 * 1024 * 1024}
          // progresses={progresses}
          // onUpload={onUpload}
          // disabled={isUploading}
        /> */}
      </CardContent>
    </Card>
  );
};

export default UserAvatarForm;
