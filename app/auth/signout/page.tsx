import { redirect } from 'next/navigation';
import { logout } from 'src/modules/auth/actions';

export default function SignoutPage() {
  let redirectPath: string | null = null;

  try {
    logout();
    redirectPath = `/auth`;
  } catch (error) {
    /* empty */
  } finally {
    if (redirectPath) redirect(redirectPath);
  }

  return <></>;
}
