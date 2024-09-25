import { ColumnDef, RowData } from '@tanstack/react-table';
import { Checkbox } from 'src/components/ui/Checkbox';

export const RowSelectionColumn = <TData extends RowData>() => {
  const column: ColumnDef<TData> = {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="m-2 inline-block size-4 align-middle"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="m-2 inline-block size-4 align-middle"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  };

  return column;
};
