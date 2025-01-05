"use client";

import { MoreHorizontal } from "lucide-react";

import { DataTable } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { User } from "@/types/user";

const UserTable = ({
  data,
  onEdit,
}: {
  data: User[];
  onEdit: (user: User) => void;
}) => {
  const columns = [
    {
      accessorKey: "user_id",
      header: "ID",
    },
    {
      accessorKey: "username",
      header: "Username",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "date_joined",
      header: "Date Joined",
      cell: ({ getValue }: { getValue: () => unknown }) =>
        new Date(getValue() as string).toLocaleDateString("tr-TR", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
    },
    {
      accessorKey: "user_role",
      header: "Role",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: { row: { original: User } }) => {
        const user = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-8 h-8 p-0">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(user)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => console.log("Delete", user)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return <DataTable columns={columns} data={data} />;
};

export default UserTable;
