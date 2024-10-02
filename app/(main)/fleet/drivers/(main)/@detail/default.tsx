import { Add } from '@carbon/icons-react';
import Link from 'next/link';
import { Button } from 'src/components/ui/Button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'src/components/ui/Tooltip';

export default function Default() {
  return (
    <div className="relative w-full max-w-full">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/fleet/drivers/add">
              <Button
                size="icon"
                className="absolute bottom-4 right-4 rounded-full"
              >
                <Add size={32} />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>Add Driver</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
