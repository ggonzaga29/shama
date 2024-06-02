'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from 'src/common/lib/supabase/server';
import { LoginSchema, loginSchema } from 'src/modules/auth/schema';
import { getCurrentUser } from 'src/modules/users/actions';

export async function loginAction(data: LoginSchema) {
  const parsedData = loginSchema.safeParse(data);

  if (!parsedData.success) {
    throw new Error('Invalid data');
  }

  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function logout() {
  const supabase = createClient();
  await supabase.auth.signOut();

  revalidatePath('/');
  redirect('/');
}

/**
 * For Session Provider to get the current user and session
 */
export async function getInitialSessionAndUser() {
  const supabase = createClient();
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    throw new Error(error.message);
  }

  const user = await getCurrentUser();

  return { session, user };
}
