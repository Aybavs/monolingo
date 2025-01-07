import { get, post, put, remove } from "@/services/api";
import { getWithParams } from "@/services/api/ApiHelper";
import type { User } from "@/types/user";

interface Chapter {
  chapter_name: string;
  language_id: number;
}

export const getAllUsers = async () => {
  return await get("/admin/allUsers");
};

export const getTotalUsers = async () => {
  return await get("/admin/countUsers");
};

export const getTotalLessons = async () => {
  return await get("/admin/countLessons");
};

export const getTotalExercises = async () => {
  return await get("/admin/countExercises");
};

export const getUsersByDate = async (startDate: string, endDate: string) => {
  const body = { startDate, endDate };
  return await getWithParams("/admin/usersByDate", body);
};

export const updateUser = async (userId: number, updatedData: never) => {
  try {
    return await put(`/admin/updateUserByAdmin/${userId}`, updatedData);
  } catch (error) {
    console.error("Failed to update user:", error);
    throw error;
  }
};

export const deleteUser = async (userId: number) => {
  try {
    return await remove(`/users/${userId}`);
  } catch (error) {
    console.error("Failed to delete user:", error);
    throw error;
  }
};

export const addUser = async (userData: User) => {
  try {
    return await post("/admin/addUserByAdmin", userData);
  } catch (error) {
    console.error("Failed to add user:", error);
    throw error;
  }
};

export const getChapters = async () => {
  try {
    return await get("/chapters");
  } catch (error) {
    console.error("Failed to fetch chapters:", error);
    throw error;
  }
};

export const addChapter = async (chapterData: Chapter) => {
  try {
    return await post("/chapters", chapterData);
  } catch (error) {
    console.error("Failed to add chapter:", error);
    throw error;
  }
};

export const updateChapter = async (
  chapterId: number,
  chapterData: Chapter
) => {
  try {
    return await put(`/chapters/${chapterId}`, chapterData);
  } catch (error) {
    console.error("Failed to update chapter:", error);
    throw error;
  }
};

export const deleteChapter = async (chapterId: number) => {
  try {
    return await remove(`/chapters/${chapterId}`);
  } catch (error) {
    console.error("Failed to delete chapter:", error);
    throw error;
  }
};

interface Lesson {
  chapter_id: number;
  lesson_title: string;
  lesson_order: number;
}
export enum ExerciseType {
  MULTIPLE_CHOICE = "multiple_choice",
  FILL_IN_THE_BLANK = "fill_blank",
  TRANSLATION = "translation",
}
export interface Exercise {
  exercise_id: number;
  lesson_id: number;
  exercise_type: ExerciseType;
  question: string;
  answer: string;
}

export const getExercises = async () => {
  try {
    return await get("/exercises");
  } catch (error) {
    console.error("Failed to fetch exercises:", error);
    throw error;
  }
};

export const addExercise = async (exerciseData: Exercise) => {
  try {
    return await post("/exercises", exerciseData);
  } catch (error) {
    console.error("Failed to add exercise:", error);
    throw error;
  }
};

export const updateExercise = async (
  exerciseId: number,
  exerciseData: Exercise
) => {
  try {
    return await put(`/exercises/${exerciseId}`, exerciseData);
  } catch (error) {
    console.error("Failed to update exercise:", error);
    throw error;
  }
};

export const deleteExercise = async (exerciseId: number) => {
  try {
    return await remove(`/exercises/${exerciseId}`);
  } catch (error) {
    console.error("Failed to delete exercise:", error);
    throw error;
  }
};

export const getLessons = async () => {
  try {
    return await get("/lessons");
  } catch (error) {
    console.error("Failed to fetch lessons:", error);
    throw error;
  }
};

export const addLesson = async (lessonData: Lesson) => {
  try {
    return await post("/lessons", lessonData);
  } catch (error) {
    console.error("Failed to add lesson:", error);
    throw error;
  }
};

export const updateLesson = async (lessonId: number, lessonData: Lesson) => {
  try {
    return await put(`/lessons/${lessonId}`, lessonData);
  } catch (error) {
    console.error("Failed to update lesson:", error);
    throw error;
  }
};

export const deleteLesson = async (lessonId: number) => {
  try {
    return await remove(`/lessons/${lessonId}`);
  } catch (error) {
    console.error("Failed to delete lesson:", error);
    throw error;
  }
};
