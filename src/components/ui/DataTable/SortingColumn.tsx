'use client';

import { ArrowDown, ArrowsVertical, ArrowUp } from '@carbon/icons-react';
import { Column } from '@tanstack/react-table';
import { cn } from 'src/common/utils/cvaUtils';

export type SortingColumnProps<TData, TValue> = {
  column: Column<TData, TValue>;
  children: React.ReactNode;
};

function SortingColumn<TData, TValue>({
  column,
  children,
}: SortingColumnProps<TData, TValue>) {
  const isSorted = column.getIsSorted();
  const canSort = column.getCanSort();

  console.log('Column ID:', column.id);
  console.log('Can Sort:', canSort);
  console.log('Is Sorted:', isSorted);

  const handleSort = () => {
    if (canSort) {
      column.toggleSorting();
    } else {
      console.log('Sorting not enabled for this column');
    }
  };

  return (
    <span
      onClick={handleSort}
      className={cn(
        'group flex cursor-pointer items-center transition-colors hover:text-foreground',
        canSort ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
      )}
    >
      {children}
      <span className="ml-2 flex size-4 items-center justify-center">
        {isSorted === 'asc' && <ArrowUp className="size-4" />}
        {isSorted === 'desc' && <ArrowDown className="size-4" />}
        {!isSorted && canSort && (
          <ArrowsVertical className="size-4 opacity-0 transition-opacity group-hover:opacity-100" />
        )}
      </span>
    </span>
  );
}

export default SortingColumn;
