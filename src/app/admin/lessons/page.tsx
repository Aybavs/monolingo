/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { MoreHorizontal, Plus } from "lucide-react";
import { useEffect, useState } from "react";

import { DataTable } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  addLesson,
  deleteLesson,
  getLessons,
  updateLesson,
} from "@/lib/admin/adminService";

interface Lesson {
  lesson_id?: number;
  lesson_title: string;
  chapter_id: number;
  lesson_order: number;
}

const LessonsPage = () => {
  const [data, setData] = useState<Lesson[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [editLesson, setEditLesson] = useState<Lesson | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newLesson, setNewLesson] = useState<Lesson>({
    lesson_title: "",
    chapter_id: 0,
    lesson_order: 0,
  });
  const [lessonToDelete, setLessonToDelete] = useState<Lesson | null>(null);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const lessons = await getLessons(); // Simply get all lessons
        setData(lessons);
      } catch (error) {
        console.error("Failed to fetch lessons:", error);
      }
    };

    fetchLessons();
  }, []);

  const handleAdd = async () => {
    try {
      const addedLesson = await addLesson(newLesson);
      setData((prevData) => [...prevData, addedLesson]);
      setIsAddDialogOpen(false);
      setNewLesson({
        lesson_title: "",
        chapter_id: 0,
        lesson_order: 0,
      });
    } catch (error) {
      console.error("Failed to add lesson:", error);
    }
  };

  const handleEdit = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setEditLesson({ ...lesson });
    setIsEditDialogOpen(true);
  };

  const handleDelete = (lesson: Lesson) => {
    setLessonToDelete(lesson);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      if (lessonToDelete) {
        await deleteLesson(lessonToDelete.lesson_id!);
        setData((prevData) =>
          prevData.filter(
            (lesson: any) => lesson.lesson_id !== lessonToDelete.lesson_id
          )
        );
      }
      setIsDeleteDialogOpen(false);
      setLessonToDelete(null);
    } catch (error) {
      console.error("Failed to delete lesson:", error);
    }
  };

  const handleSave = async () => {
    try {
      if (!selectedLesson || !editLesson) return;

      const lessonToUpdate = {
        ...editLesson,
      };

      await updateLesson(selectedLesson.lesson_id!, lessonToUpdate);

      setData((prevData) =>
        prevData.map((lesson: any) =>
          lesson.lesson_id === selectedLesson.lesson_id
            ? lessonToUpdate
            : lesson
        )
      );

      console.log("Lesson updated successfully");
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Failed to update lesson:", error);
    }
  };

  const columns = [
    {
      accessorKey: "lesson_id",
      header: "ID",
    },
    {
      accessorKey: "lesson_title",
      header: "Lesson Name",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: any) => {
        const lesson = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-8 h-8 p-0">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleEdit(lesson)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDelete(lesson)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Lessons</h1>
        <Button variant="default" onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2" />
          Add Lesson
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={data}
        filters={[
          {
            placeholder: "Filter by Lesson Name...",
            columnKey: "lesson_title",
          },
        ]}
      />
      {/* Add Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Lesson</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="add-lesson-name">Lesson Name</Label>
              <Input
                id="add-lesson-name"
                value={newLesson.lesson_title}
                onChange={(e) =>
                  setNewLesson({ ...newLesson, lesson_title: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAdd}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Lesson</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-lesson-name">Lesson Name</Label>
              <Input
                id="edit-lesson-name"
                value={editLesson?.lesson_title || ""}
                onChange={(e) =>
                  setEditLesson((prev) => ({
                    ...prev!,
                    lesson_title: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this lesson?</p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LessonsPage;
