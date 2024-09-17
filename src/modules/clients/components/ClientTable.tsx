/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Export, SettingsAdjust } from '@carbon/icons-react';
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  PaginationState,
  useReactTable,
} from '@tanstack/react-table';
import { memo, useEffect, useState } from 'react';
import { createClient } from 'src/common/lib/supabase/client';
import { Client } from 'src/common/types';
import { Button } from 'src/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'src/components/ui/DropdownMenu';
import { Input } from 'src/components/ui/Input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'src/components/ui/Table';
import { getClients } from 'src/modules/clients/actions';
import AddClientModal from 'src/modules/clients/components/AddClientModal';

export const columnHelper = createColumnHelper<Client>();

const dataColumns = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (info) => <span>{info.getValue()}</span>,
  }),
];

type TableData = Record<string, any>;

// eslint-disable-next-line react/display-name
const ClientTable = memo(({ clients }: { clients: Client[] }) => {
  const supabase = createClient();
  const [data, setData] = useState(clients);
  const [columns, setColumns] = useState<ColumnDef<TableData>[]>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [{ pageIndex, pageSize }] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [pageCount, setPageCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    const changes = supabase
      .channel('db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'clients',
        },
        async () => {
          const clients = await getClients();
          setData(clients);
        }
      )
      .subscribe();

    return () => {
      changes.unsubscribe();
    };
  }, [supabase]);

  return (
    <div>
      {/* Table Controls */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <div className="w-full max-w-64">
          <Input placeholder="Search for a keyword..." />
        </div>
        <div className="flex items-center gap-2">
          <AddClientModal />
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2"
          >
            <Export size={16} />
            Export
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center justify-center gap-2"
              >
                <SettingsAdjust size={16} />
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Table className="bg-background">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? 'cursor-pointer select-none'
                          : '',
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: ' 🔼',
                        desc: ' 🔽',
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
});

export default ClientTable;
