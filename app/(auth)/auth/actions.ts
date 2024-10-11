'use server';

import { LoginSchema, loginSchema } from 'app/auth/schema';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createServerClient } from 'src/common/lib/supabase/serverClient';

export async function loginAction(data: LoginSchema) {
  const parsedData = loginSchema.safeParse(data);

  if (!parsedData.success) {
    throw new Error('Invalid data');
  }

  const supabase = createServerClient();
  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  revalidatePath('/', 'layout');
  redirect(`/?message=${encodeURIComponent('You have been signed in')}`);
}

export async function signup(formData: FormData) {
  const supabase = createServerClient();

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

export async function signout() {
  const supabase = createServerClient();
  await supabase.auth.signOut();
}

export async function checkAuth() {
  const supabase = createServerClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw new Error('Authentication error: ' + error.message);
  }

  if (!user) {
    throw new Error('No user found');
  }

  return user;
}
