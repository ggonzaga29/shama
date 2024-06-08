'use client';

import { User } from '@supabase/supabase-js';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import useSupabaseBrowser from 'src/common/lib/supabase/useSupabaseClient';
import ActionCell from 'src/components/ui/DataTable/ActionCell';
import { DataTable } from 'src/components/ui/DataTable/DataTable';
import { getAllUsers } from 'src/modules/users/actions';

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'created_at',
    header: 'Created At',
    cell: ({ row }) => {
      const date = new Date(row.original.created_at).toLocaleDateString(
        'en-US',
        {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        }
      );

      return <span>{date}</span>;
    },
  },
  {
    accessorKey: 'updated_at',
    header: 'Updated At',
    cell: ({ row }) => {
      if (row.original.created_at) {
        const date = new Date(row.original.created_at).toLocaleDateString(
          'en-US',
          {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          }
        );

        return <span>{date}</span>;
      } else {
        return <span>Not available</span>;
      }
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <ActionCell
        actions={[
          {
            label: 'Edit',
            onClick: () => {
              console.log('Edit');
            },
          },
          {
            label: 'Delete',
            onClick: () => {
              console.log(row);
            },
          },
        ]}
      />
    ),
  },
];

export default function UserTable() {
  const supabase = useSupabaseBrowser();
  const { data } = useQuery({
    queryKey: ['users'],
    queryFn: () => getAllUsers(supabase),
  });

  const users = data?.data?.users;

  if (!users) {
    return <div>Loading...</div>;
  }

  return <DataTable data={users} columns={columns} />;
}
