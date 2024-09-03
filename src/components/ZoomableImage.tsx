import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from 'src/components/ui/Dialog';
import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';
import SupabaseImage from 'src/components/SupabaseImage';
import { Button } from 'src/components/ui/Button';
import { TrashCan } from '@carbon/icons-react';

export default function ZoomableImage({
  src,
  alt,
  width,
  height,
  className,
}: {
  width: number;
  height: number;
} & DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) {
  if (!src) return null;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="group relative">
          <SupabaseImage
            src={src}
            alt={alt || ''}
            className={className}
            width={width}
            height={height}
          />

          <div></div>

          <Button
            variant="ghost"
            className="absolute right-2 top-2 h-8 w-8 rounded-full bg-background/80 p-1 opacity-0 transition-opacity group-hover:opacity-100"
          >
            <TrashCan className="h-4 w-4 text-destructive" />
            <span className="sr-only">Delete image</span>
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-7xl border-0 bg-transparent p-0">
        <div className="relative h-[calc(100vh-220px)] w-full overflow-clip rounded-md bg-transparent shadow-md">
          <SupabaseImage
            src={src}
            alt={alt || ''}
            width={width}
            height={height}
            fill
            className="h-full w-full object-contain"
          />

          <DialogClose asChild>
            <Button
              variant="secondary"
              className="absolute right-4 top-4 flex items-center space-x-2"
            >
              Close
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
