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
  addExercise,
  deleteExercise,
  getExercises,
  updateExercise,
} from "@/lib/admin/adminService";
import { Exercise } from "@/lib/admin/adminService";

const ExercisesPage = () => {
  const [data, setData] = useState<Exercise[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );
  const [editExercise, setEditExercise] = useState<Exercise | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newExercise, setNewExercise] = useState<Exercise>({
    exercise_id: 0,
    lesson_id: 0,
    exercise_type: "",
    question: "",
    answer: "",
  });
  const [exerciseToDelete, setExerciseToDelete] = useState<Exercise | null>(
    null
  );

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const exercises = await getExercises(); // Simply get all exercises
        setData(exercises);
      } catch (error) {
        console.error("Failed to fetch exercises:", error);
      }
    };

    fetchExercises();
  }, []);

  const handleAdd = async () => {
    try {
      const addedExercise = await addExercise(newExercise);
      setData((prevData) => [...prevData, addedExercise]);
      setIsAddDialogOpen(false);
      setNewExercise({
        exercise_id: 0,
        lesson_id: 0,
        exercise_type: "",
        question: "",
        answer: "",
      });
    } catch (error) {
      console.error("Failed to add exercise:", error);
    }
  };

  const handleEdit = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setEditExercise({ ...exercise });
    setIsEditDialogOpen(true);
  };

  const handleDelete = (exercise: Exercise) => {
    setExerciseToDelete(exercise);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      if (exerciseToDelete) {
        await deleteExercise(exerciseToDelete.exercise_id!);
        setData((prevData) =>
          prevData.filter(
            (exercise: any) =>
              exercise.exercise_id !== exerciseToDelete.exercise_id
          )
        );
      }
      setIsDeleteDialogOpen(false);
      setExerciseToDelete(null);
    } catch (error) {
      console.error("Failed to delete exercise:", error);
    }
  };

  const handleSave = async () => {
    try {
      if (!selectedExercise || !editExercise) return;

      const exerciseToUpdate = {
        ...editExercise,
      };

      await updateExercise(selectedExercise.exercise_id!, exerciseToUpdate);

      setData((prevData) =>
        prevData.map((exercise: any) =>
          exercise.exercise_id === selectedExercise.exercise_id
            ? exerciseToUpdate
            : exercise
        )
      );

      console.log("Exercise updated successfully");
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Failed to update exercise:", error);
    }
  };

  const columns = [
    {
      accessorKey: "exercise_id",
      header: "ID",
    },
    {
      accessorKey: "exercise_title",
      header: "Exercise Name",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: any) => {
        const exercise = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-8 h-8 p-0">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleEdit(exercise)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDelete(exercise)}>
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
        <h1 className="text-2xl font-bold">Exercises</h1>
        <Button variant="default" onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2" />
          Add Exercise
        </Button>
        <DataTable
          columns={columns}
          data={data}
          filters={[
            {
              placeholder: "Filter by Exercise Type...",
              columnKey: "exercise_type",
            },
          ]}
        />
        {/* Add Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Exercise</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="add-lesson-id">Lesson ID</Label>
                <Input
                  id="add-lesson-id"
                  type="number"
                  value={newExercise.lesson_id}
                  onChange={(e) =>
                    setNewExercise({
                      ...newExercise,
                      lesson_id: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="add-exercise-type">Exercise Type</Label>
                <Input
                  id="add-exercise-type"
                  value={newExercise.exercise_type}
                  onChange={(e) =>
                    setNewExercise({
                      ...newExercise,
                      exercise_type: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="add-question">Question</Label>
                <Input
                  id="add-question"
                  value={newExercise.question}
                  onChange={(e) =>
                    setNewExercise({
                      ...newExercise,
                      question: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="add-answer">Answer</Label>
                <Input
                  id="add-answer"
                  value={newExercise.answer}
                  onChange={(e) =>
                    setNewExercise({
                      ...newExercise,
                      answer: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
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
              <DialogTitle>Edit Exercise</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-lesson-id">Lesson ID</Label>
                <Input
                  id="edit-lesson-id"
                  type="number"
                  value={editExercise?.lesson_id || 0}
                  onChange={(e) =>
                    setEditExercise((prev) => ({
                      ...prev!,
                      lesson_id: parseInt(e.target.value) || 0,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-exercise-type">Exercise Type</Label>
                <Input
                  id="edit-exercise-type"
                  value={editExercise?.exercise_type || ""}
                  onChange={(e) =>
                    setEditExercise((prev) => ({
                      ...prev!,
                      exercise_type: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-question">Question</Label>
                <Input
                  id="edit-question"
                  value={editExercise?.question || ""}
                  onChange={(e) =>
                    setEditExercise((prev) => ({
                      ...prev!,
                      question: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-answer">Answer</Label>
                <Input
                  id="edit-answer"
                  value={editExercise?.answer || ""}
                  onChange={(e) =>
                    setEditExercise((prev) => ({
                      ...prev!,
                      answer: e.target.value,
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
            <p>Are you sure you want to delete this exercise?</p>
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
    </div>
  );
};

export default ExercisesPage;
