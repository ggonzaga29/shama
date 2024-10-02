import { Identification } from '@carbon/icons-react';
import { notFound } from 'next/navigation';
import ContentLayout from 'src/components/ContentLayout';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from 'src/components/ui/Breadcrumb';
import { getDriverById } from 'src/modules/drivers/actions';
import EditDriverForm from 'src/modules/drivers/components/EditDriverForm';

export default async function EditDriverPage({
  params,
}: {
  params: { id: string };
}) {
  const { data } = (await getDriverById({ id: params.id })) || {};

  if (!data) {
    return notFound();
  }

  return (
    <ContentLayout title={`Edit Driver ${data.id}`} Icon={<Identification />}>
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Fleet</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/fleet/drivers">Drivers</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Edit</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="border bg-background p-6">
        <EditDriverForm defaultValues={data} />
      </div>
    </ContentLayout>
  );
}
