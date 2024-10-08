'use client';

import {
  Add,
  CalendarAdd,
  CloudDownload,
  DocumentBlank,
  Edit,
  Email,
  Identification,
  Launch,
  ListNumbered,
  Location,
  Phone,
  TrashCan,
} from '@carbon/icons-react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { queryKeys } from 'src/common/lib/queryKeys';
import { createBrowserClient } from 'src/common/lib/supabase/browserClient';
import { Button } from 'src/components/ui/Button';
import { Card, CardContent } from 'src/components/ui/Card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'src/components/ui/Tooltip';
import DeleteDriverButton from 'src/modules/drivers/components/DeleteDriverButton';
import { getDriverById } from 'src/modules/drivers/data';

export const DriverDetail = ({ id }: { id: string }) => {
  const supabase = createBrowserClient();
  const { data } = useQuery({
    queryKey: queryKeys.drivers.byId(id),
    queryFn: () => getDriverById(supabase, id),
  });

  return (
    <div className="relative flex max-h-[82vh] w-full flex-col gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/fleet/drivers/add">
              <Button
                size="icon"
                className="absolute bottom-4 right-8 rounded-full"
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
              className="size-full rounded-full object-cover"
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
              {data?.license_number && (
                <>License Number: {data.license_number}</>
              )}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Link prefetch href={`/fleet/drivers/edit/${data?.id}`}>
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2"
            >
              <Edit size={16} />
              Edit
            </Button>
          </Link>
          {data?.id && <DeleteDriverButton id={data.id} />}
        </div>
      </div>

      <div className="grid max-h-full grid-cols-2 gap-4 overflow-y-auto p-4">
        <Card>
          <CardContent className="py-4">
            <h4 className="mb-4 text-lg font-bold">Personal Information</h4>

            <ul className="flex flex-col gap-2 [&>li]:flex [&>li]:items-center">
              {data?.email && (
                <li>
                  <Email size={16} className="mr-2" />
                  {data.email}
                </li>
              )}
              {data?.phone && (
                <li>
                  <Phone size={16} className="mr-2" />
                  {data.phone}
                </li>
              )}
              {data?.address && (
                <li>
                  <Location size={16} className="mr-2" />
                  {data.address}
                </li>
              )}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="py-4">
            <h4 className="mb-4 text-lg font-bold">Employee Information</h4>

            <ul className="flex flex-col gap-2 [&>li]:flex [&>li]:items-center">
              {data?.employee_id && (
                <li>
                  <ListNumbered size={16} className="mr-2" />
                  {data.employee_id}
                  <span className="ml-2 align-middle text-xs font-bold">
                    (Employee Number)
                  </span>
                </li>
              )}
              {data?.birth_date && (
                <li>
                  <CalendarAdd size={16} className="mr-2" />
                  {data.birth_date}
                </li>
              )}
              {data?.license_number && (
                <li>
                  <Identification size={16} className="mr-2" />
                  {data?.license_number}
                </li>
              )}
              {data?.license_expiry_date && (
                <li>
                  <Identification size={16} className="mr-2" />
                  {data?.license_expiry_date}{' '}
                  <span className="ml-2 align-middle text-xs font-bold">
                    (License Expiry Date)
                  </span>
                </li>
              )}
            </ul>
          </CardContent>
        </Card>

        {data?.driver_files && data.driver_files.length > 0 && (
          <Card className="col-span-2">
            <CardContent className="py-4">
              <h4 className="mb-4 text-lg font-bold">Files</h4>
              <div className="h-[250px] overflow-y-auto pr-4">
                <ul className="space-y-2">
                  {data?.driver_files.map((file) => (
                    <li
                      key={file.id}
                      className="flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-secondary"
                    >
                      <div className="flex items-center space-x-3">
                        <DocumentBlank className="size-4" />
                        <p>{file.file_name || 'Unnamed File'}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled
                          // onClick={() => window.open(file.file_url, '_blank')}
                          title="View file"
                        >
                          <Launch className="size-4" />
                          <span className="sr-only">View file</span>
                        </Button>
                        <Button variant="ghost" size="sm" asChild disabled>
                          <a
                            href={file.file_url}
                            download
                            title="Download file"
                          >
                            <CloudDownload className="size-4" />
                            <span className="sr-only">Download file</span>
                          </a>
                        </Button>
                        <Button variant="ghost" size="sm" disabled>
                          <TrashCan className="size-4" />
                          <span className="sr-only">Delete File</span>
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
