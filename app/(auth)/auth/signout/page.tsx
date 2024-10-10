import { signout } from 'app/auth/actions';
import { redirect } from 'next/navigation';

export default function SignoutPage() {
  let redirectPath: string | null = null;

  try {
    signout();
    redirectPath = `/auth`;
  } catch (error) {
    console.error(error);
  } finally {
    if (redirectPath) redirect(redirectPath);
  }

  return <></>;
}
