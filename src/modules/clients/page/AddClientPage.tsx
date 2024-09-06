'use client';

import { CustomerService, User } from '@carbon/icons-react';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import ContentLayout from 'src/components/ContentLayout';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from 'src/components/ui/Breadcrumb';
import { Button } from 'src/components/ui/Button';
import { DataTable } from 'src/components/ui/DataTable/DataTable';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'src/components/ui/DropdownMenu';
import ClientTable from 'src/modules/clients/components/ClientTable';

export type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'amount',
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
];

// Manually generated placeholder data
export const placeholderPayments: Payment[] = [
  {
    id: '1',
    amount: 150.75,
    status: 'pending',
    email: 'john.doe@example.com',
  },
  {
    id: '2',
    amount: 200.0,
    status: 'processing',
    email: 'jane.smith@example.com',
  },
  {
    id: '3',
    amount: 350.5,
    status: 'success',
    email: 'alice.jones@example.com',
  },
  {
    id: '4',
    amount: 75.25,
    status: 'failed',
    email: 'bob.brown@example.com',
  },
  {
    id: '5',
    amount: 500.0,
    status: 'success',
    email: 'charlie.black@example.com',
  },
  {
    id: '6',
    amount: 120.0,
    status: 'pending',
    email: 'diana.white@example.com',
  },
];

export default async function AddClientPage() {
  return (
    <ContentLayout
      title="Clients"
      Icon={<CustomerService className="h-6 w-6" />}
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
        {/* <DataTable columns={columns} data={placeholderPayments} /> */}
        <ClientTable />
      </div>
    </ContentLayout>
  );
}
