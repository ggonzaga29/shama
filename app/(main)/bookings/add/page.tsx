import { DocumentMultiple_02 } from '@carbon/icons-react';
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
import BookingForm from 'src/modules/bookings/components/BookingForm';
import { BookingFormProvider } from 'src/modules/bookings/context/BookingFormContext';

export default async function AddBookingPage() {
  return (
    <ContentLayout title="Create Booking" Icon={<DocumentMultiple_02 />}>
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbBackButtton />
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Bookings</BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Add</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <BookingFormProvider>
        <BookingForm />
      </BookingFormProvider>
    </ContentLayout>
  );
}
