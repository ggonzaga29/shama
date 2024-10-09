import { CustomerService } from '@carbon/icons-react';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import ContentLayout from 'src/components/ContentLayout';
import {
  Breadcrumb,
  BreadcrumbBackButtton,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from 'src/components/ui/Breadcrumb';

const ClientsTableWrapper = dynamic(
  () => import('src/modules/clients/components/ClientsTableWrapper')
);

export default async function AddClientPage() {
  return (
    <ContentLayout
      title="Clients"
      Icon={<CustomerService className="size-6" />}
    >
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbBackButtton />
          <BreadcrumbItem>
            <BreadcrumbLink href={'/'}>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Clients</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Suspense>
        <ClientsTableWrapper />
      </Suspense>
    </ContentLayout>
  );
}
