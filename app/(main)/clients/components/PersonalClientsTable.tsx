'use client';

import { Package } from '@carbon/icons-react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { getPersonalClients, getPersonalClientsCSV } from 'app/clients/actions';
import AddClientModal from 'app/clients/components/AddPersonalClientModal';
import { useEffect, useState } from 'react';
import { createBrowserClient } from 'src/common/lib/supabase/browserClient';
import { PersonalClient } from 'src/common/types';
import { dateSortingFn } from 'src/common/utils/tableUtils';
import { Button } from 'src/components/ui/Button';
import { DataTable } from 'src/components/ui/DataTable/DataTable';
import { RowSelectionColumn } from 'src/components/ui/DataTable/RowSelectionColumn';
import SortingColumn from 'src/components/ui/DataTable/SortingColumn';

const columnHelper = createColumnHelper<PersonalClient>();

const rowSelectionColumn = RowSelectionColumn<PersonalClient>();

const columns: ColumnDef<PersonalClient, any>[] = [
  rowSelectionColumn,
  columnHelper.accessor('email', {
    header: ({ column }) => (
      <SortingColumn column={column}>E-mail</SortingColumn>
    ),
    cell: (info) => <span>{info.getValue()}</span>,
    enableSorting: true,
  }),
  columnHelper.accessor('first_name', {
    header: ({ column }) => (
      <SortingColumn column={column}>First Name</SortingColumn>
    ),
    cell: (info) => <span>{info.getValue()}</span>,
    enableSorting: true,
  }),
  columnHelper.accessor('last_name', {
    header: 'Last Name',
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor('date_of_birth', {
    header: ({ column }) => (
      <SortingColumn column={column}>Date of Birth</SortingColumn>
    ),
    cell: (info) => <span>{info.getValue()}</span>,
    sortingFn: dateSortingFn,
    enableSorting: true,
  }),
  columnHelper.accessor('phone', {
    header: 'Phone Number',
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor('address', {
    header: 'Address',
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor('driver_license_number', {
    header: 'DL Number',
    cell: (info) => <span>{info.getValue()}</span>,
  }),
];

const Toolbar = () => {
  return (
    <>
      <AddClientModal />
      <Button
        variant="outline"
        className="flex items-center justify-center gap-2"
        onClick={async () => {
          const csvString = await getPersonalClientsCSV();
          console.log(csvString);

          if (typeof csvString === 'string') {
            // const blob = new Blob([csvString], { type: 'text/csv' });
            // const url = URL.createObjectURL(blob);
            // openInNewTab(url);
          }
        }}
      >
        <Package size={16} />
        Export Data
      </Button>
    </>
  );
};

export default function PersonalClientsTable() {
  const supabase = createBrowserClient();
  const [data, setData] = useState<PersonalClient[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      const clients = await getPersonalClients();
      setData(clients);
      setIsLoading(false);
    };

    const changes = supabase
      .channel('db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'personal_clients',
        },
        async () => {
          const clients = await getPersonalClients();
          setData(clients);
        }
      )
      .subscribe();

    void fetchClients();
    return () => {
      changes.unsubscribe();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DataTable
      columns={columns}
      data={data}
      toolbar={<Toolbar />}
      isLoading={isLoading}
    />
  );
}
