'use client';

const projectId = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_REF!;

interface SupabaseLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

export default function supabaseLoader({
  src,
  width,
  quality,
}: SupabaseLoaderProps) {
  return `https://${projectId}.supabase.co/storage/v1/object/public/${src}?width=${width}&quality=${quality || 75}`;
}
