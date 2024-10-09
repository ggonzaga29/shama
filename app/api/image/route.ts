import { NextResponse } from 'next/server';
import { createServerClient } from 'src/common/lib/supabase/serverClient';

export async function GET() {
  const supabase = createServerClient();

  const image = await supabase.storage
    .from('assets')
    .getPublicUrl('images/logoDarkWithText.png');

  return NextResponse.json({
    image: image.data.publicUrl,
  });
}
