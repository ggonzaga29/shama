import { CustomerService } from '@carbon/icons-react';
import dynamic from 'next/dynamic';
import ContentLayout from 'src/components/ContentLayout';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from 'src/components/ui/Breadcrumb';
import { getClients } from 'src/modules/clients/actions';

const ClientTable = dynamic(
  () => import('src/modules/clients/components/ClientTable')
);

export default async function AddClientPage() {
  const clients = await getClients();

  return (
    <ContentLayout
      title="Clients"
      Icon={<CustomerService className="size-6" />}
    >
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={'/'}>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Clients</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mt-6">
        <ClientTable clients={clients} />
      </div>
    </ContentLayout>
  );
}
