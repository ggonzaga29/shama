import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { useEffect, useMemo, useState } from 'react';
import { createBrowserClient } from 'src/common/lib/supabase/browserClient';
import { Database } from 'src/common/types/supabase';

type TableRow<T extends string> = T extends keyof Database['public']['Tables']
  ? Database['public']['Tables'][T]['Row']
  : never;

type Table = keyof Database['public']['Tables'];

type SearchFnProps<T extends Table> = {
  table: Table;
  columns: (keyof TableRow<T>)[];
  search: string;
  limit: number;
};

async function searchFn<T extends Table>({
  table,
  columns,
  search,
  limit,
}: SearchFnProps<T>): Promise<TableRow<T>[]> {
  const client = createBrowserClient();
  const escapedSearch = search.replace(/\*/g, '%');
  const orQuery = columns
    .map((column) => `${String(column)}.ilike.%${escapedSearch}%`)
    .join(',');

  const { data, error } = await client
    .from(table)
    .select('*')
    .or(orQuery)
    .limit(limit);

  if (error || !data) {
    console.log(error);
    return [];
  }

  return data;
}

type SearchSupabaseTableProps<T extends Table> = {
  table: T;
  columns: (keyof TableRow<T>)[];
  limit?: number;
  debounceTime?: number;
  initialSearch?: string;
};

export const useSearchSupabaseTable = <T extends Table>({
  table,
  columns,
  limit = 10,
  debounceTime = 500,
  initialSearch,
}: SearchSupabaseTableProps<T>) => {
  const [search, setSearch] = useState(initialSearch ?? '');
  const debouncedSearch = useDebounce(search, debounceTime);

  const queryKey = useMemo(
    () => [table, columns.join(','), debouncedSearch],
    [table, columns, debouncedSearch]
  );

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      if (!debouncedSearch) return [];

      return searchFn({
        table,
        columns,
        search: debouncedSearch,
        limit,
      });
    },
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    // Cancel Query on unmount
    return () => {
      queryClient.cancelQueries({
        queryKey,
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryKey]);

  return {
    search,
    setSearch,
    data,
    isLoading,
    queryKey,
  };
};
