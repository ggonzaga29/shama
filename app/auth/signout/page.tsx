import { redirect } from 'next/navigation';
import { logout } from 'src/modules/auth/actions';

export default function SignoutPage() {
  logout();
  redirect('/auth');

  return <></>;
}
