import { redirect } from 'next/navigation';
import { signout } from 'src/modules/auth/actions';

export default function SignoutPage() {
  let redirectPath: string | null = null;

  try {
    signout();
    redirectPath = `/auth`;
  } catch (error) {
    /* empty */
  } finally {
    if (redirectPath) redirect(redirectPath);
  }

  return <></>;
}
