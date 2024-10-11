import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from 'src/common/lib/supabase/serverClient';

export async function GET(request: NextRequest) {
  const supabase = createServerClient();
  await supabase.auth.signOut();

  const url = request.nextUrl.clone();
  url.pathname = '/auth';

  return NextResponse.redirect(url);
}
