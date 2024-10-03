'use client';

import { Package } from '@carbon/icons-react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { createClient } from 'src/common/lib/supabase/client';
import { Table } from 'src/common/types';
import { openInNewTab } from 'src/common/utils/pathnameUtils';
import { Button } from 'src/components/ui/Button';
import { DataTable } from 'src/components/ui/DataTable/DataTable';
import { RowSelectionColumn } from 'src/components/ui/DataTable/RowSelectionColumn';
import SortingColumn from 'src/components/ui/DataTable/SortingColumn';
import {
  getBusinessClients,
  getBusinessClientsCSV,
} from 'src/modules/clients/actions';
import AddClientModal from 'src/modules/clients/components/AddPersonalClientModal';

type BusinessClient = Table<'business_clients'>;

const columnHelper = createColumnHelper<BusinessClient>();

const rowSelectionColumn = RowSelectionColumn<BusinessClient>();

const columns: ColumnDef<BusinessClient, any>[] = [
  rowSelectionColumn,
  columnHelper.accessor('email', {
    header: ({ column }) => (
      <SortingColumn column={column}>E-mail</SortingColumn>
    ),
    cell: (info) => <span>{info.getValue()}</span>,
    enableSorting: true,
  }),
  columnHelper.accessor('business_name', {
    header: ({ column }) => (
      <SortingColumn column={column}>Business Name</SortingColumn>
    ),
    cell: (info) => <span>{info.getValue()}</span>,
    enableSorting: true,
  }),
  columnHelper.accessor('phone', {
    header: 'Phone',
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor('website', {
    header: 'Website',
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor('registration_number', {
    header: 'TIN',
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor('address', {
    header: 'Address',
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor('state', {
    header: 'State',
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor('city', {
    header: 'City',
    cell: (info) => <span>{info.getValue()}</span>,
  }),
];

const Toolbar = () => (
  <>
    <AddClientModal />
    <Button
      variant="outline"
      className="flex items-center justify-center gap-2"
      onClick={async () => {
        const csvString = await getBusinessClientsCSV();
        console.log(csvString);

        if (typeof csvString === 'string') {
          const blob = new Blob([csvString], { type: 'text/csv' });
          const url = URL.createObjectURL(blob);

          openInNewTab(url);
        }
      }}
    >
      <Package size={16} />
      Export Data
    </Button>
  </>
);

export default function BusinessClientsTable() {
  const supabase = createClient();
  const [data, setData] = useState<BusinessClient[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      const clients = await getBusinessClients();
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
          const clients = await getBusinessClients();
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
