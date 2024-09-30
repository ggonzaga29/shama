'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from 'src/common/lib/supabase/server';
import { LoginSchema, loginSchema } from 'src/modules/auth/schema';

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
  redirect(`/?message=${encodeURIComponent('You have been signed in')}`);
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

export async function signout() {
  const supabase = createClient();
  await supabase.auth.signOut();
}
