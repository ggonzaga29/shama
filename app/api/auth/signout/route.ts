import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'src/common/lib/supabase/server';

export async function GET(request: NextRequest) {
  const supabase = createClient();
  await supabase.auth.signOut();

  const url = request.nextUrl.clone();
  url.pathname = '/auth';

  return NextResponse.redirect(url);
}
