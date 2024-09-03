import Image from 'next/image';
import { cn } from 'src/common/utils/cvaUtils';

type SupabaseImageProps = {
  src: string;
  width: number;
  quality?: number;
  alt: string;
} & React.ComponentProps<typeof Image>;

const SupabaseImage = ({
  src,
  width,
  quality = 75,
  alt,
  className,
  ...props
}: SupabaseImageProps) => {
  const projectId = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_REF!;

  return (
    <Image
      src={`https://${projectId}.supabase.co/storage/v1/object/public/${src}?width=${width}&quality=${quality}`}
      width={width}
      alt={alt}
      className={cn('object-cover', className)}
      {...props}
    />
  );
};

export default SupabaseImage;
