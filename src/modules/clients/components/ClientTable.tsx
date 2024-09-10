import { memo } from 'react';
import { Button } from 'src/components/ui/Button';
import { AddAlt, Export, SettingsAdjust } from '@carbon/icons-react';
import { Input } from 'src/components/ui/Input';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from 'src/components/ui/DropdownMenu';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  RowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Client } from 'src/common/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'src/components/ui/Table';
import { clients } from 'src/modules/clients/constants';
import AddClientModal from 'src/modules/clients/components/AddClientModal';

export const columnHelper = createColumnHelper<Client>();

const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (info) => <span>{info.getValue()}</span>,
  }),
];

const ClientTable = memo(() => {
  const table = useReactTable({
    data: clients,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      {/* Table Controls */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <div className="w-full max-w-64">
          <Input placeholder="Search for a keyword..." />
        </div>
        <div className="flex items-center gap-2">
          <AddClientModal/>
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
