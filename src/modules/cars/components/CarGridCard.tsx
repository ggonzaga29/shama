import {
  Armchair,
  CircleEllipsis,
  CirclePlus,
  Cog,
  Droplet,
  Eye,
  Fuel,
  Info,
  Pencil,
  Trash,
} from 'lucide-react';
import Image from 'next/image';
import { FC } from 'react';
import { Database } from 'src/common/types/supabase';
import { Badge } from 'src/components/ui/Badge';
import { Button } from 'src/components/ui/Button';
import { Card, CardContent } from 'src/components/ui/Card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'src/components/ui/DropdownMenu';
import { EnhancedButton } from 'src/components/ui/EnhancedButton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'src/components/ui/Tooltip';

type CarGridCardProps = {
  car: Partial<Database['public']['Tables']['vehicles']['Row']>;
};

const CarGridCard: FC<CarGridCardProps> = ({ car }) => {
  return (
    <Card className="transition-300 flex cursor-pointer flex-col transition-all hover:shadow-lg">
      <CardContent className="pt-4">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-8">
              <Image
                src="assets/images/toyotaLogo.png"
                alt="Toyota"
                width={0}
                height={0}
                sizes="100vw"
                className="size-full object-cover"
              />
            </div>
            <span className="text-lg font-bold">{car.name}</span>
          </div>

          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  <CircleEllipsis className="size-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{car.name ?? ''}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Pencil className="mr-2 size-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Trash className="mr-2 size-4" />
                  Delete
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Eye className="mr-2 size-4" />
                  View Extra Details
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <div className="my-4 h-48 w-full overflow-hidden">
          <Image
            src={`cars/${car.image_url}`}
            alt={car.name ?? ''}
            width={300}
            height={190}
            sizes="100vw"
            className="size-full object-cover"
            priority={true}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Badge variant="default">{car.license_plate}</Badge>
            <Badge variant="secondary">
              <Armchair className="mr-2 size-4" />
              {car.seating_capacity}
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="outline">
                    <Info className="size-4" />
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{car.type}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className="my-3 flex items-center gap-3">
          <div className="flex items-center space-x-1 text-sm font-medium text-muted-foreground">
            <Fuel className="size-4" />
            <span>{car.fuel_type ?? 'N/A'}</span>
          </div>
          <div className="flex items-center space-x-1 text-sm font-medium text-muted-foreground">
            <Cog className="size-4" />
            <span>{car.transmission ?? 'N/A'}</span>
          </div>
          <div className="flex items-center space-x-1 text-sm font-medium text-muted-foreground">
            <Droplet className="size-4" />
            <span>{`${car.fuel_capacity} Liters` ?? 'N/A'}</span>
          </div>
        </div>

        <div className="my-4 text-left">
          <span className="text-2xl font-bold">
            {car.default_price}
            <span className="text-lg">.00 / day</span>
          </span>
        </div>

        <EnhancedButton
          className="w-full font-medium"
          variant="expandIcon"
          Icon={CirclePlus}
        >
          Book {car.name}
        </EnhancedButton>
      </CardContent>
    </Card>
  );
};

export default CarGridCard;
