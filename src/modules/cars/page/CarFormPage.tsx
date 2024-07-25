import PageHeader from 'src/components/PageHeader/PageHeader';
import CarFormWrapper from 'src/modules/cars/components/CarForm/CarFormWrapper';

export default async function CarFormPage() {
  return (
    <div>
      <PageHeader>
        <PageHeader.Title as="h2">Add a Vehicle</PageHeader.Title>

        <PageHeader.Aside></PageHeader.Aside>
      </PageHeader>

      <CarFormWrapper />
    </div>
  );
}
