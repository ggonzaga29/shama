import { DocumentMultiple_02 } from '@carbon/icons-react';
import BookingForm from 'app/bookings/components/BookingForm';
import { BookingFormProvider } from 'app/bookings/context/BookingFormContext';
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
