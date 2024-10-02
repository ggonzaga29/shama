import {
  Add,
  CalendarAdd,
  Edit,
  Email,
  Identification,
  ListNumbered,
  Location,
  Phone,
  TrashCan,
} from '@carbon/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from 'src/components/ui/Button';
import { Card, CardContent } from 'src/components/ui/Card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'src/components/ui/Tooltip';
import { getDriverById } from 'src/modules/drivers/actions';

export default async function DriverDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { data } = (await getDriverById({ id: params.id })) || {};

  return (
    <div className="relative w-full max-w-full space-y-2">
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

      <div className="flex w-full border-b p-6">
        {/* Name */}
        <div className="flex items-center gap-6">
          <div className="size-32">
            <Image
              src={
                `driver_avatars/${data?.avatar_url}` ||
                'avatars/avatar_3281b24b-e5df-4064-a5ee-702184d35050.png'
              }
              width={128}
              height={128}
              className="rounded-full object-cover"
              alt="Driver avatar"
            />
          </div>
          <div>
            <div className="space-x-2 text-2xl font-bold">
              <h4>
                {data?.last_name}, {data?.first_name} {data?.middle_name}
              </h4>
            </div>
            <div className="text-sm text-muted-foreground">
              License Number: {data?.license_number}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Link href={`/fleet/drivers/edit/${data?.id}`}>
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2"
            >
              <Edit size={16} />
              Edit
            </Button>
          </Link>
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2"
          >
            <TrashCan size={16} />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 p-4">
        <Card>
          <CardContent className="py-4">
            <h4 className="mb-4 text-lg font-bold">Personal Information</h4>

            <ul className="flex flex-col gap-2 [&>li]:flex [&>li]:items-center">
              <li>
                <Email size={16} className="mr-2" />
                {data?.email}
              </li>
              <li>
                <Phone size={16} className="mr-2" />
                {data?.phone}
              </li>
              <li>
                <Location size={16} className="mr-2" />
                {data?.address}
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="py-4">
            <h4 className="mb-4 text-lg font-bold">Employee Information</h4>

            <ul className="flex flex-col gap-2 [&>li]:flex [&>li]:items-center">
              <li>
                <ListNumbered size={16} className="mr-2" />
                {data?.employee_id}{' '}
                <span className="ml-2 align-middle text-xs font-bold">
                  (Employee Number)
                </span>
              </li>
              <li>
                <CalendarAdd size={16} className="mr-2" />
                {data?.created_at}
              </li>
              <li>
                <Identification size={16} className="mr-2" />
                {data?.license_number}
              </li>
              <li>
                <Identification size={16} className="mr-2" />
                {data?.license_expiry_date}{' '}
                <span className="ml-2 align-middle text-xs font-bold">
                  (License Expiry Date)
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardContent className="py-4">
            <h4 className="mb-4 text-lg font-bold">Files</h4>

            <ul className="flex flex-col gap-2 [&>li]:flex [&>li]:items-center">
              <li>
                <ListNumbered size={16} className="mr-2" />
                {data?.employee_id}{' '}
                <span className="ml-2 align-middle text-xs font-bold">
                  (Employee Number)
                </span>
              </li>
              <li>
                <CalendarAdd size={16} className="mr-2" />
                {data?.created_at}
              </li>
              <li>
                <Identification size={16} className="mr-2" />
                {data?.license_number}
              </li>
              <li>
                <Identification size={16} className="mr-2" />
                {data?.license_expiry_date}{' '}
                <span className="ml-2 align-middle text-xs font-bold">
                  (License Expiry Date)
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
