import { createClient } from '@refinedev/supabase';

const URL = process.env.SUPABASE_URL!;
const KEY = process.env.SUPABASE_ANON_KEY!;

export const supabaseClient = createClient(URL, KEY, {
  db: {
    schema: 'public',
  },
});
