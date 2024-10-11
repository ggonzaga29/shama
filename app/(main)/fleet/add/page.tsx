// import CarFormPage from 'src/modules/cars/page/CarFormPage';

import { InventoryManagement } from '@carbon/icons-react';
import ContentLayout from 'src/components/ContentLayout';
import {
  Breadcrumb,
  BreadcrumbBackButtton,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from 'src/components/ui/Breadcrumb';
import AddCarForm from 'src/modules/cars/components/CarForm/CarForm';

export async function generateMetadata() {
  return {
    title: 'Car Form | Shama Travel & Tours',
  };
}

export default function CarFormPage() {
  return (
    <ContentLayout title="Add a Driver" Icon={<InventoryManagement />}>
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbBackButtton />
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbEllipsis />
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/fleet/cars">Cars</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Add</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="border bg-background p-6">
        <AddCarForm />
      </div>
    </ContentLayout>
  );
}
