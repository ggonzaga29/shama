import { Add, GasStation, Gears, PassengerPlus } from '@carbon/icons-react';
import { Armchair, CirclePlus, Cog, Droplet, Fuel, Info } from 'lucide-react';
import Image from 'next/image';
import { FC } from 'react';
import { Database } from 'src/common/types/supabase';
import { cn } from 'src/common/utils/cvaUtils';
import { Badge } from 'src/components/ui/Badge';
import { Button } from 'src/components/ui/Button';
import { Card, CardContent } from 'src/components/ui/Card';
import { EnhancedButton } from 'src/components/ui/EnhancedButton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'src/components/ui/Tooltip';
import CarGridCardActions from 'src/modules/cars/components/CarGridCardActions';

type CarGridCardProps = {
  car: Partial<Database['public']['Tables']['vehicles']['Row']>;
};

{
  /* <Image
src="assets/images/toyotaLogo.png"
alt="Toyota"
width={0}
height={0}
sizes="100vw"
className="size-full object-cover"
/> */
}

const CarGridCard: FC<CarGridCardProps> = ({ car }) => {
  return (
    <Card>
      <CardContent className="flex flex-col p-0">
        <div className="flex items-center justify-between p-4 !pb-0">
          <div className="flex items-center gap-2">
            {/* <Image
              src="assets/images/toyotaLogo.png"
              alt="Toyota"
              width={24}
              height={24}
              sizes="100vw"
              className="size-6"
            /> */}
            <div>
              <h5 className="scroll-m-20 text-lg font-medium tracking-tight">
                {car.name}
                <span className="ml-2 text-xs text-muted-foreground">
                  {car.model}
                </span>
              </h5>

              <p className="text-sm text-muted-foreground">
                {car.license_plate}
              </p>
            </div>
          </div>
          <div className="flex align-top">
            <Badge variant="outline">{car.status?.toLocaleUpperCase()}</Badge>
          </div>
        </div>

        <div className="w-full border-b px-4 !pt-0">
          <Image
            src={`cars/${car.image_url ?? 'null.png'}`}
            alt={car.name ?? ''}
            width={100}
            height={45}
            sizes="100vw"
            className="size-full object-cover"
            priority={true}
          />
        </div>

        <div className="flex flex-wrap gap-4 p-4">
          <span className="flex items-center gap-2 text-sm">
            <PassengerPlus size={16} />
            {car.seating_capacity}
          </span>
          <span className="flex items-center gap-2 text-sm">
            <Gears size={16} />
            {car.transmission}
          </span>
          <span className="flex items-center gap-2 text-sm">
            <GasStation size={16} />
            {car.fuel_type}
          </span>
        </div>

        <div className="flex items-center justify-between px-4 pb-4">
          <span>
            <span className="font-bold">Php</span>
            {car.default_price} / Day
          </span>

          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon">
                    <Add size={24} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add to Booking</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarGridCard;
