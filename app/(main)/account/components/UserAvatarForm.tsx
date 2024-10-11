'use client';

import { submitAvatarForm } from 'app/account/actions';
import { userAvatarSchema } from 'app/account/schema';
import Image from 'next/image';
import { userAvatarFormFields } from 'src/common/lib/forms';
import FormRenderer from 'src/components/FormRenderer/FormRenderer';
import { Avatar, AvatarFallback } from 'src/components/ui/Avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from 'src/components/ui/Card';
import { useSessionContext } from 'src/context/SessionContext';

const UserAvatarForm = () => {
  const { user } = useSessionContext();

  const { profile, avatar } = user || {};

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Picture</CardTitle>
        <CardDescription>Upload a profile picture</CardDescription>
      </CardHeader>
      <CardContent>
        <>
          <Avatar className="mb-4 size-32">
            {avatar?.path ? (
              <div className="aspect-square size-full">
                <Image
                  src={`avatars/${avatar.path}`}
                  alt="User Avatar"
                  layout="fill"
                  objectFit="cover"
                  priority={true}
                />
              </div>
            ) : (
              <AvatarFallback className="bg-transparent">
                {profile?.first_name?.charAt(0)}
                {profile?.last_name?.charAt(0)}
              </AvatarFallback>
            )}
          </Avatar>
          <FormRenderer
            fields={userAvatarFormFields}
            formAction={submitAvatarForm}
            schema={userAvatarSchema}
            submitButtonLabel="Upload"
          />
        </>
      </CardContent>
    </Card>
  );
};

export default UserAvatarForm;
