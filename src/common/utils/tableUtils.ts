import { SortingFn } from '@tanstack/react-table';

export const dateSortingFn: SortingFn<any> = (rowA, rowB, columnId) => {
  const dateA = new Date(rowA.getValue(columnId));
  const dateB = new Date(rowB.getValue(columnId));
  return dateB.getTime() - dateA.getTime(); // Reverse the order for descending sort
};
