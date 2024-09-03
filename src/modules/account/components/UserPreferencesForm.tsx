import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from 'src/components/ui/Card';

const UserDetailsForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Preferences</CardTitle>
        <CardDescription>Update your user preferences</CardDescription>
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

export default UserDetailsForm;
