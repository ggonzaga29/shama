import Image from 'next/image';
import { cn } from 'src/common/utils/cvaUtils';

type SupabaseImageProps = {
  src: string;
  width?: number;
  height?: number;
  quality?: number;
  alt: string;
  fill?: boolean;
} & React.ComponentProps<typeof Image>;

const SupabaseImage = ({
  src,
  width,
  height,
  quality = 75,
  alt,
  fill,
  className,
  ...props
}: SupabaseImageProps) => {
  const projectId = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_REF!;
  const timestamp = new Date().getTime();

  const imageUrl = `https://${projectId}.supabase.co/storage/v1/object/public/${src}?quality=${quality}&t=${timestamp}`;

  return (
    <Image
      src={imageUrl}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      alt={alt}
      fill={fill}
      className={cn('object-cover', className)}
      {...props}
    />
  );
};

export default SupabaseImage;
