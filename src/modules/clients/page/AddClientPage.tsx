import PageHeader from 'src/components/PageHeader/PageHeader';
import AddClientForm from 'src/modules/clients/components/AddClientForm';

export default async function AddClientPage() {
  return (
    <div>
      <PageHeader>
        <PageHeader.Title as="h2">Add a Client</PageHeader.Title>

        <PageHeader.Aside></PageHeader.Aside>
      </PageHeader>
      <AddClientForm />
    </div>
  );
}
