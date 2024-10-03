import { TrashCan } from '@carbon/icons-react';
import Image from 'next/image';
import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';
import { Button } from 'src/components/ui/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from 'src/components/ui/Dialog';

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
          <Image
            src={src}
            alt={alt || ''}
            className={className}
            width={width}
            height={height}
          />

          <div></div>

          <Button
            variant="ghost"
            className="absolute right-2 top-2 size-8 rounded-full bg-background/80 p-1 opacity-0 transition-opacity group-hover:opacity-100"
          >
            <TrashCan className="size-4 text-destructive" />
            <span className="sr-only">Delete image</span>
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-7xl border-0 bg-transparent p-0">
        <div className="relative h-[calc(100vh-220px)] w-full text-clip rounded-md bg-transparent shadow-md">
          <Image
            src={src}
            alt={alt || ''}
            width={width}
            height={height}
            fill
            className="size-full object-contain"
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
