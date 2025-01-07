"use client";
import {
  getExercises,
  deleteExercise,
  updateExercise,
  addExercise,
  Exercise,
  ExerciseType,
} from "@/lib/admin/adminService";
import { MoreHorizontal, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/admin/DataTable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ExercisesPage = () => {
  const [data, setData] = useState<Exercise[]>([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );
  const [editExercise, setEditExercise] = useState<Exercise | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [exerciseToDelete, setExerciseToDelete] = useState<Exercise | null>(
    null
  );
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newExercise, setNewExercise] = useState<Exercise>({
    exercise_id: 0,
    lesson_id: 1,
    exercise_type: ExerciseType.TRANSLATION,
    question: "",
    answer: "",
  });

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    const exercises = await getExercises();
    exercises.sort(
      (a: { exercise_id: number }, b: { exercise_id: number }) =>
        a.exercise_id - b.exercise_id
    );
    setData(exercises);
  };

  const handleDelete = (exercise: Exercise) => {
    setExerciseToDelete(exercise);
    setIsDeleteDialogOpen(true);
  };

  const handleEdit = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setEditExercise({ ...exercise });
    setIsEditDialogOpen(true);
  };

  const handleAdd = async () => {
    try {
      // Validate exercise data before sending
      if (newExercise.lesson_id <= 0) {
        alert("Lesson ID must be greater than 0");
        return;
      }

      if (!newExercise.question.trim()) {
        alert("Question cannot be empty");
        return;
      }

      if (!newExercise.answer.trim()) {
        alert("Answer cannot be empty");
        return;
      }

      // Create exercise data without ID since it's auto-generated
      const exerciseData = {
        exercise_id: newExercise.exercise_id,
        lesson_id: newExercise.lesson_id,
        exercise_type: newExercise.exercise_type,
        question: newExercise.question.trim(),
        answer: newExercise.answer.trim(),
      };

      const addedExercise = await addExercise(exerciseData);

      setData((prevData) => [
        ...prevData,
        {
          exercise_id: addedExercise.exercise_id,
          lesson_id: addedExercise.lesson_id,
          exercise_type: addedExercise.exercise_type,
          question: addedExercise.question,
          answer: addedExercise.answer,
        },
      ]);

      setIsAddDialogOpen(false);
      window.location.reload();

      // Reset form
      setNewExercise({
        exercise_id: 0,
        lesson_id: 1,
        exercise_type: ExerciseType.TRANSLATION,
        question: "",
        answer: "",
      });
    } catch (error) {
      console.error("Failed to add exercise:", error);
      alert("Failed to add exercise. Please try again.");
    }
  };

  const confirmDelete = async () => {
    try {
      if (exerciseToDelete) {
        await deleteExercise(exerciseToDelete.exercise_id);
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

      const exerciseToEdit = {
        ...editExercise,
      };

      await updateExercise(selectedExercise.exercise_id, editExercise);

      setData((prevData) =>
        prevData.map((exercise: any) =>
          exercise.exercise_id === selectedExercise.exercise_id
            ? exerciseToEdit
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
      accessorKey: "lesson_id",
      header: "Lesson ID",
    },
    {
      accessorKey: "exercise_type",
      header: "Exercise Type",
      cell: ({ row }) => {
        const type = row.getValue("exercise_type");
        return (
          <span className="capitalize">
            {type.toString().replace(/_/g, " ")}
          </span>
        );
      },
    },
    {
      accessorKey: "question",
      header: "Question",
    },
    {
      accessorKey: "answer",
      header: "Answer",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
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
              <DropdownMenuItem
                onClick={() => handleDelete(exercise)}
                className="text-red-600"
              >
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
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Exercises</h1>
        <Button
          onClick={() => setIsAddDialogOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Exercise
        </Button>
      </div>
      <DataTable columns={columns} data={data} />

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Exercise</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Lesson ID</Label>
              <Input
                value={newExercise.lesson_id}
                onChange={(e) =>
                  setNewExercise((prev) => ({
                    ...prev,
                    lesson_id: parseInt(e.target.value),
                  }))
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Exercise Type</Label>
              <select
                value={newExercise.exercise_type}
                onChange={(e) =>
                  setNewExercise((prev) => ({
                    ...prev,
                    exercise_type: e.target.value as ExerciseType,
                  }))
                }
                className="col-span-3 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {Object.values(ExerciseType).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Question</Label>
              <Input
                value={newExercise.question}
                onChange={(e) =>
                  setNewExercise((prev) => ({
                    ...prev,
                    question: e.target.value,
                  }))
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Answer</Label>
              <Input
                value={newExercise.answer}
                onChange={(e) =>
                  setNewExercise((prev) => ({
                    ...prev,
                    answer: e.target.value,
                  }))
                }
                className="col-span-3"
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

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Exercise</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Lesson ID</Label>
              <Input
                value={editExercise?.lesson_id || ""}
                onChange={(e) =>
                  setEditExercise((prev) => ({
                    ...prev!,
                    lesson_id: parseInt(e.target.value),
                  }))
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Exercise Type</Label>
              <select
                value={editExercise?.exercise_type}
                onChange={(e) =>
                  setEditExercise((prev) => ({
                    ...prev!,
                    exercise_type: e.target.value as ExerciseType,
                  }))
                }
                className="col-span-3 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {Object.values(ExerciseType).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Question</Label>
              <Input
                value={editExercise?.question || ""}
                onChange={(e) =>
                  setEditExercise((prev) => ({
                    ...prev!,
                    question: e.target.value,
                  }))
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Answer</Label>
              <Input
                value={editExercise?.answer || ""}
                onChange={(e) =>
                  setEditExercise((prev) => ({
                    ...prev!,
                    answer: e.target.value,
                  }))
                }
                className="col-span-3"
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
            <Button onClick={handleSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
  );
};

export default ExercisesPage;
