import { get } from "@/services/api";

// Tüm chapterları getirme fonksiyonu
export const getChapters = async () => {
  try {
    return await get("/chapters");
  } catch (error) {
    console.error("Error fetching chapters:", error);
    throw error;
  }
};

// Belirli bir chapter'ın derslerini getirme fonksiyonu
export const getLessons = async (chapterId: string) => {
  try {
    return await get(`/lessons/getLessons/${chapterId}`);
  } catch (error) {
    console.error(`Error fetching lessons for chapter ${chapterId}:`, error);
    throw error;
  }
};
export const getCompletedLessons = async () => {
  try {
    const response = await get("/lessons/getCompletedLessons");
    if (Array.isArray(response)) {
      return response;
    }
    return response.completedLessons || [];
  } catch (error) {
    console.error("Error fetching completed lessons:", error);
    return [];
  }
};
