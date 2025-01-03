import { get, put } from "@/services/api";
import { getWithParams } from "@/services/api/ApiHelper";

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

export const updateUser = async (userId: number, updatedData: any) => {
  try {
    return await put(`/admin/users/${userId}`, updatedData);
  } catch (error) {
    console.error("Failed to update user:", error);
    throw error; // Hata yakalayıp frontend'e iletmek için
  }
};
