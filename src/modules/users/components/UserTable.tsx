"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "@supabase/supabase-js";
import { DataTable } from "src/components/ui/DataTable/DataTable";
import ActionCell from "src/components/ui/DataTable/ActionCell";

export interface UserTableProps {
  users: User[];
}

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.original.created_at).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        }
      );

      return <span>{date}</span>;
    },
  },
  {
    accessorKey: "updated_at",
    header: "Updated At",
    cell: ({ row }) => {
      if (row.original.created_at) {
        const date = new Date(row.original.created_at).toLocaleDateString(
          "en-US",
          {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          }
        );

        return <span>{date}</span>;
      } else {
        return <span>Not available</span>;
      }
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <ActionCell
        actions={[
          { label: "Edit", onClick: () => {
            console.log('Edit');
          } },
          { label: "Delete", onClick: () => {
            console.log(row)
          } },
        ]}
      />
    ),
  },
];

export default function UserTable({ users }: UserTableProps) {
  return <DataTable data={users} columns={columns} />;
}
