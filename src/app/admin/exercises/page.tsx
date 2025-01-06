"use client";
import { getExercises, Exercise } from "@/lib/admin/adminService";
import { MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";

import { DataTable } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ExercisesPage = () => {
  const [data, setData] = useState<Exercise[]>([]);

  useEffect(() => {
    const fetchExercises = async () => {
      const exercises = await getExercises();
      setData(exercises);
    };
    fetchExercises();
  }, []);
  const columns = [
    {
      accessorKey: "chapter_id",
      header: "ID",
    },
    {
      accessorKey: "chapter_name",
      header: "Chapter Name",
    },
    {
      accessorKey: "language_id",
      header: "Language ID",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: any) => {
        const chapter = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-8 h-8 p-0">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => chapter}>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={() => chapter}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default ExercisesPage;
