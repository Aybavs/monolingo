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
  addChapter,
  deleteChapter,
  getChapters,
  updateChapter,
} from "@/lib/admin/adminService";

interface Chapter {
  chapter_id: number;
  chapter_name: string;
  language_id: number;
}

const ChaptersPage = () => {
  const [data, setData] = useState<Chapter[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [editChapter, setEditChapter] = useState<Chapter | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newChapter, setNewChapter] = useState<Chapter>({
    chapter_id: 0,
    chapter_name: "",
    language_id: 0,
  });
  const [chapterToDelete, setChapterToDelete] = useState<Chapter | null>(null);

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const chapters = await getChapters(); // Simply get all chapters
        setData(chapters);
      } catch (error) {
        console.error("Failed to fetch chapters:", error);
      }
    };

    fetchChapters();
  }, []);

  const handleAdd = async () => {
    try {
      // Validate chapter data before sending
      if (!newChapter.chapter_name.trim()) {
        alert("Chapter name cannot be empty");
        return;
      }

      if (newChapter.language_id <= 0) {
        alert("Language ID must be greater than 0");
        return;
      }

      // Create chapter data without ID since it's auto-generated
      const chapterData = {
        chapter_name: newChapter.chapter_name.trim(),
        language_id: newChapter.language_id
      };

      const addedChapter = await addChapter(chapterData);

      // Update the state with properly structured data
      setData((prevData) => [
        ...prevData, 
        {
          chapter_id: addedChapter.chapter_id,
          chapter_name: addedChapter.chapter_name,
          language_id: addedChapter.language_id
        }
      ]);

      setIsAddDialogOpen(false);
      window.location.reload();
      
      // Reset form
      setNewChapter({
        chapter_id: 0,
        chapter_name: "",
        language_id: 0,
      });
    } catch (error) {
      console.error("Failed to add chapter:", error);
      alert("Failed to add chapter. Please try again.");
    }
  };

  const handleEdit = (chapter: Chapter) => {
    setSelectedChapter(chapter);
    setEditChapter({ ...chapter });
    setIsEditDialogOpen(true);
  };

  const handleDelete = (chapter: Chapter) => {
    setChapterToDelete(chapter);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      if (chapterToDelete) {
        await deleteChapter(chapterToDelete.chapter_id);
        setData((prevData) =>
          prevData.filter(
            (chapter: any) => chapter.chapter_id !== chapterToDelete.chapter_id
          )
        );
      }
      setIsDeleteDialogOpen(false);
      setChapterToDelete(null);
    } catch (error) {
      console.error("Failed to delete chapter:", error);
    }
  };

  const handleSave = async () => {
    try {
      if (!selectedChapter || !editChapter) return;

      const chapterToUpdate = {
        ...editChapter,
      };

      await updateChapter(selectedChapter.chapter_id, chapterToUpdate);

      setData((prevData) =>
        prevData.map((chapter: any) =>
          chapter.chapter_id === selectedChapter.chapter_id
            ? chapterToUpdate
            : chapter
        )
      );

      console.log("Chapter updated successfully");
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Failed to update chapter:", error);
    }
  };

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
              <DropdownMenuItem onClick={() => handleEdit(chapter)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDelete(chapter)}>
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
        <h1 className="text-2xl font-bold">Chapters</h1>
        <Button variant="default" onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2" />
          Add Chapter
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={data}
        filters={[
          {
            placeholder: "Filter by Chapter Name...",
            columnKey: "chapter_name",
          },
        ]}
      />
      {/* Add Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Chapter</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="add-chapter-name">Chapter Name</Label>
              <Input
                id="add-chapter-name"
                value={newChapter.chapter_name}
                onChange={(e) =>
                  setNewChapter({ ...newChapter, chapter_name: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="add-language-id">Language ID</Label>
              <Input
                id="add-language-id"
                type="number"
                value={newChapter.language_id}
                onChange={(e) =>
                  setNewChapter({
                    ...newChapter,
                    language_id: parseInt(e.target.value),
                  })
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
            <DialogTitle>Edit Chapter</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-chapter-name">Chapter Name</Label>
              <Input
                id="edit-chapter-name"
                value={editChapter?.chapter_name || ""}
                onChange={(e) =>
                  setEditChapter((prev) => ({
                    ...prev!,
                    chapter_name: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label htmlFor="edit-language-id">Language ID</Label>
              <Input
                id="edit-language-id"
                type="number"
                value={editChapter?.language_id || 0}
                onChange={(e) =>
                  setEditChapter((prev) => ({
                    ...prev!,
                    language_id: parseInt(e.target.value),
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
          <p>Are you sure you want to delete this chapter?</p>
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

export default ChaptersPage;
